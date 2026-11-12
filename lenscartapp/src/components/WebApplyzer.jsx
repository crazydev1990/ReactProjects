
import React, { useState } from "react";

const API_URL = "https://api.builtwith.com/free1/api.json";

const styles = {
  page: {
    minHeight: "100vh",
    boxSizing: "border-box",
    background: "#10101d",
    color: "#f5f5fa",
    padding: "35px 18px",
    fontFamily: "Arial, sans-serif",
  },
  container: { maxWidth: "1100px", margin: "auto" },
  panel: {
    background: "#1b1a2b",
    border: "1px solid #34324b",
    borderRadius: "14px",
    padding: "22px",
    marginBottom: "20px",
  },
  heading: {
    textAlign: "center",
    fontSize: "34px",
    marginBottom: "8px",
  },
  subtitle: {
    textAlign: "center",
    color: "#aaa8bd",
    marginBottom: "30px",
  },
  label: {
    display: "block",
    color: "#d5d2e8",
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "7px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    borderRadius: "8px",
    border: "1px solid #45435f",
    background: "#11101e",
    color: "white",
    marginBottom: "17px",
    outline: "none",
  },
  button: {
    background: "#7857ed",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "13px 22px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
  },
  secondaryButton: {
    background: "#292740",
    color: "white",
    border: "1px solid #45435f",
    borderRadius: "7px",
    padding: "9px 14px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: "14px",
  },
  stat: {
    background: "#25243a",
    padding: "17px",
    borderRadius: "9px",
  },
  item: {
    background: "#25243a",
    padding: "13px",
    borderRadius: "8px",
    marginTop: "9px",
    overflowWrap: "anywhere",
  },
  muted: {
    color: "#aaa8bd",
    fontSize: "13px",
    lineHeight: 1.6,
  },
  error: {
    color: "#ff9999",
    background: "#3b202b",
    padding: "13px",
    borderRadius: "8px",
    marginTop: "12px",
    overflowWrap: "anywhere",
  },
  success: { color: "#83e5b0" },
};

function normalizeDomain(value) {
  const input = String(value || "").trim();

  if (!input) {
    throw new Error("Please enter a website domain.");
  }

  let url;

  try {
    const formatted = /^[a-z][a-z0-9+.-]*:\/\//i.test(input)
      ? input
      : `https://${input}`;

    url = new URL(formatted);
  } catch {
    throw new Error("Invalid website URL. Example: example.com");
  }

  let host = url.hostname
    .toLowerCase()
    .replace(/^www\./, "")
    .replace(/\.$/, "");

  if (
    !host ||
    !host.includes(".") ||
    host === "localhost" ||
    host.includes("..") ||
    host.startsWith(".") ||
    !/^[a-z0-9.-]+$/.test(host) ||
    /^\d{1,3}(\.\d{1,3}){3}$/.test(host)
  ) {
    throw new Error(
      "Enter a public domain name such as example.com. Localhost and IP addresses are not supported."
    );
  }

  const labels = host.split(".");

  if (
    labels.some(
      (label) =>
        !label ||
        label.length > 63 ||
        label.startsWith("-") ||
        label.endsWith("-")
    )
  ) {
    throw new Error("Invalid domain format. Please check the domain name.");
  }

  return host;
}

function getLookupResult(data) {
  if (!data || typeof data !== "object") {
    throw new Error("BuiltWith returned an invalid response.");
  }

  // BuiltWith may return an error as an array item.
  const errorItem = Array.isArray(data)
    ? data.find(
        (item) =>
          item &&
          typeof item === "object" &&
          (item.Message || item.message || item.Errors || item.error)
      )
    : null;

  const errorData = errorItem || data;

  if (
    errorData.Message ||
    errorData.message ||
    errorData.Errors ||
    errorData.error
  ) {
    const message =
      errorData.Message ||
      errorData.message ||
      errorData.Errors ||
      errorData.error;

    const readableMessage =
      typeof message === "string"
        ? message
        : JSON.stringify(message);

    const code =
      errorData.Code !== undefined
        ? ` (Code: ${errorData.Code})`
        : "";

    throw new Error(readableMessage + code);
  }

  if (Array.isArray(data)) {
    const validItem = data.find(
      (item) =>
        item &&
        typeof item === "object" &&
        (item.Groups ||
          item.groups ||
          item.Domain ||
          item.domain ||
          item.Results ||
          item.results)
    );

    if (!validItem) {
      throw new Error(
        "BuiltWith returned no lookup data for this domain."
      );
    }

    return getLookupResult(validItem);
  }

  if (Array.isArray(data.Results)) {
    return data.Results[0] || null;
  }

  if (Array.isArray(data.results)) {
    return data.results[0] || null;
  }

  if (data.result && typeof data.result === "object") {
    return data.result;
  }

  return data;
}

function parseGroups(data, requestedDomain) {
  const lookup = getLookupResult(data);

  if (!lookup) {
    throw new Error("No lookup result was returned by BuiltWith.");
  }

  const groups = Array.isArray(lookup.groups)
    ? lookup.groups
    : Array.isArray(lookup.Groups)
      ? lookup.Groups
      : [];

  const normalizedGroups = groups.map((group) => {
    const categories = Array.isArray(group.categories)
      ? group.categories
      : Array.isArray(group.Categories)
        ? group.Categories
        : [];

    return {
      name: group.name || group.Name || "Unknown",
      live: Number(group.live ?? group.Live ?? 0),
      dead: Number(group.dead ?? group.Dead ?? 0),
      latest: group.latest ?? group.Latest ?? null,
      oldest: group.oldest ?? group.Oldest ?? null,
      categories: categories.map((category) => ({
        name: category.name || category.Name || "Unknown",
        live: Number(category.live ?? category.Live ?? 0),
        dead: Number(category.dead ?? category.Dead ?? 0),
        latest: category.latest ?? category.Latest ?? null,
        oldest: category.oldest ?? category.Oldest ?? null,
      })),
    };
  });

  return {
    domain:
      lookup.domain ||
      lookup.Domain ||
      requestedDomain,
    first: lookup.first ?? lookup.First ?? null,
    last: lookup.last ?? lookup.Last ?? null,
    groups: normalizedGroups,
  };
}

function formatDate(value) {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return String(value);
  }

  // API timestamps are expected to be Unix seconds.
  const date = new Date(number * 1000);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleString();
}

function StatCard({ label, value }) {
  return (
    <div style={styles.stat}>
      <div style={styles.muted}>{label}</div>
      <h2 style={{ margin: "8px 0 0" }}>{value}</h2>
    </div>
  );
}

function getFriendlyError(error) {
  const message = String(error?.message || "Unknown error");

  if (message.includes("Code: -8")) {
    return (
      "BuiltWith rejected this domain (Code: -8). " +
      "Check that you entered a public root domain such as example.com. " +
      "The domain may also be unsupported or excluded from BuiltWith lookup."
    );
  }

  if (
    message.toLowerCase().includes("failed to fetch") ||
    message.toLowerCase().includes("networkerror")
  ) {
    return (
      "Browser request failed. This may be caused by CORS restrictions, " +
      "network access, or the API server. React-only code cannot bypass " +
      "a server-side CORS restriction."
    );
  }

  if (message.includes("401") || message.includes("403")) {
    return "API key rejected or access denied. Check your BuiltWith API key and plan.";
  }

  if (message.includes("429")) {
    return "API request limit reached. Please wait before trying again.";
  }

  return message;
}

export default function WebApplyzer() {
  const [website, setWebsite] = useState("");
  const [apiKey, setApiKey] = useState("20532a86-cc02-4205-a5a4-2f9302bac86d");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [rawData, setRawData] = useState(null);
  const [showRaw, setShowRaw] = useState(false);
  const [expanded, setExpanded] = useState({});

  async function inspectWebsite(event) {
    event?.preventDefault();

    if (loading) return;

    setError("");
    setResult(null);
    setRawData(null);
    setShowRaw(false);
    setExpanded({});

    let domain;

    try {
      domain = normalizeDomain(website);
    } catch (err) {
      setError(err.message);
      return;
    }

    const cleanApiKey = apiKey.trim();

    if (!cleanApiKey) {
      setError("Please enter your BuiltWith Free API Key.");
      return;
    }

    setLoading(true);

    try {
      const params = new URLSearchParams({
        KEY: cleanApiKey,
        LOOKUP: domain,
      });

      const response = await fetch(`${API_URL}?${params.toString()}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const responseText = await response.text();

      let json;

      try {
        json = JSON.parse(responseText);
      } catch {
        throw new Error(
          `BuiltWith returned an invalid JSON response. HTTP ${response.status}.`
        );
      }

      // Parse API error bodies even when HTTP status is not successful.
      if (!response.ok) {
        try {
          getLookupResult(json);
        } catch (apiError) {
          throw apiError;
        }

        throw new Error(
          `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const parsed = parseGroups(json, domain);

      setRawData(json);

      if (!parsed.groups.length) {
        setResult({
          ...parsed,
          noData: true,
        });
        return;
      }

      setResult(parsed);
    } catch (err) {
      setError(getFriendlyError(err));
    } finally {
      setLoading(false);
    }
  }

  function toggleGroup(index) {
    setExpanded((previous) => ({
      ...previous,
      [index]: !previous[index],
    }));
  }

  function exportJSON() {
    if (!result) return;

    const report = {
      reportName: "WebApplyzer",
      generatedAt: new Date().toISOString(),
      source: "BuiltWith Free API",
      data: result,
      rawApiResponse: rawData,
    };

    const blob = new Blob(
      [JSON.stringify(report, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${result.domain}-webapplyzer-report.json`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    // Delay cleanup so the browser can begin the download.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const totalLive = result
    ? result.groups.reduce((sum, group) => sum + group.live, 0)
    : 0;

  const totalDead = result
    ? result.groups.reduce((sum, group) => sum + group.dead, 0)
    : 0;

  const totalCategories = result
    ? result.groups.reduce(
        (sum, group) => sum + group.categories.length,
        0
      )
    : 0;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>WebApplyzer</h1>

        <p style={styles.subtitle}>
          Website Technology Intelligence
        </p>

        <form style={styles.panel} onSubmit={inspectWebsite}>
          <h2>Website Inspection</h2>

          <label style={styles.label} htmlFor="website">
            Website URL
          </label>

          <input
            id="website"
            style={styles.input}
            type="text"
            placeholder="example.com"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            autoComplete="url"
          />

          <label style={styles.label} htmlFor="apiKey">
            BuiltWith Free API Key
          </label>

          <input
            id="apiKey"
            style={styles.input}
            type="password"
            placeholder="Enter your new BuiltWith API Key"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            autoComplete="off"
          />

          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
            }}
            disabled={loading}
          >
            {loading ? "Inspecting..." : "Inspect Website"}
          </button>

          <p style={{ ...styles.muted, marginTop: "16px" }}>
            API key is kept only in this component's memory. It is not
            saved to localStorage. However, browser requests and developer
            tools can expose it. Do not use a sensitive production key here.
          </p>

          <p style={styles.muted}>
            BuiltWith Free API has a request limit. Avoid repeated rapid
            requests.
          </p>

          {error && (
            <div role="alert" style={styles.error}>
              {error}
            </div>
          )}
        </form>

        {loading && (
          <div style={styles.panel} aria-live="polite">
            Fetching technology group information...
          </div>
        )}

        {result && (
          <>
            <div style={styles.panel}>
              <h2>Website Report</h2>

              <p>
                <strong>Domain:</strong> {result.domain}
              </p>

              <p>
                <strong>Data source:</strong> BuiltWith Free API
              </p>

              <p>
                <strong>First indexed:</strong>{" "}
                {formatDate(result.first)}
              </p>

              <p>
                <strong>Last indexed:</strong>{" "}
                {formatDate(result.last)}
              </p>

              {result.noData ? (
                <div style={styles.error}>
                  BuiltWith did not return technology groups for this
                  domain. This does not prove that the website has no
                  technologies. The domain may not be indexed or may be
                  excluded from BuiltWith data.
                </div>
              ) : (
                <>
                  <div style={styles.grid}>
                    <StatCard
                      label="Technology Groups"
                      value={result.groups.length}
                    />

                    <StatCard
                      label="Categories"
                      value={totalCategories}
                    />

                    <StatCard
                      label="Live Technology Count"
                      value={totalLive}
                    />

                    <StatCard
                      label="Dead Technology Count"
                      value={totalDead}
                    />
                  </div>

                  <button
                    type="button"
                    style={{
                      ...styles.button,
                      marginTop: "20px",
                    }}
                    onClick={exportJSON}
                  >
                    Export JSON Report
                  </button>
                </>
              )}
            </div>

            {!result.noData && (
              <div style={styles.panel}>
                <h2>Technology Groups & Categories</h2>

                <p style={styles.muted}>
                  These are BuiltWith group/category counts, not
                  individual detected technology names or versions.
                </p>

                {result.groups.map((group, index) => (
                  <div
                    key={`${group.name}-${index}`}
                    style={styles.item}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <strong style={{ textTransform: "capitalize" }}>
                          {group.name}
                        </strong>

                        <div style={styles.muted}>
                          Live: {group.live} | Dead: {group.dead}
                        </div>
                      </div>

                      <button
                        type="button"
                        style={styles.secondaryButton}
                        onClick={() => toggleGroup(index)}
                      >
                        {expanded[index]
                          ? "Hide Categories"
                          : "View Categories"}
                      </button>
                    </div>

                    {expanded[index] && (
                      <div style={{ marginTop: "12px" }}>
                        {group.categories.length ? (
                          group.categories.map(
                            (category, categoryIndex) => (
                              <div
                                key={`${category.name}-${categoryIndex}`}
                                style={{
                                  background: "#19182a",
                                  padding: "11px",
                                  borderRadius: "7px",
                                  marginTop: "8px",
                                }}
                              >
                                <strong
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {category.name}
                                </strong>

                                <div style={styles.muted}>
                                  Live: {category.live} | Dead:{" "}
                                  {category.dead}
                                </div>

                                <div style={styles.muted}>
                                  Latest: {formatDate(category.latest)}
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <p style={styles.muted}>
                            No categories returned for this group.
                          </p>
                        )}
                      </div>
                    )}

                    <div style={{ ...styles.muted, marginTop: "9px" }}>
                      Latest update: {formatDate(group.latest)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={styles.panel}>
              <h2>Raw API Response</h2>

              <button
                type="button"
                style={styles.secondaryButton}
                onClick={() => setShowRaw((value) => !value)}
              >
                {showRaw ? "Hide JSON" : "Show JSON"}
              </button>

              {showRaw && (
                <pre
                  style={{
                    background: "#11101e",
                    padding: "15px",
                    borderRadius: "8px",
                    overflowX: "auto",
                    fontSize: "12px",
                    color: "#b8e6ce",
                    marginTop: "15px",
                    whiteSpace: "pre-wrap",
                    overflowWrap: "anywhere",
                  }}
                >
                  {JSON.stringify(rawData, null, 2)}
                </pre>
              )}
            </div>
          </>
        )}

        <div style={styles.panel}>
          <h2>Important Notes</h2>

          <ul style={styles.muted}>
            <li>
              BuiltWith Free API provides technology group and category
              counts.
            </li>
            <li>
              It does not provide the complete list of individual
              technology names or versions.
            </li>
            <li>
              Live and dead values are counts supplied by BuiltWith.
            </li>
            <li>
              Hosting group counts do not identify the exact hosting
              company.
            </li>
            <li>
              An empty result does not prove that a website has no
              technologies.
            </li>
            <li>
              Results depend on BuiltWith's indexed data and coverage.
            </li>
            <li>
              This project does not fetch or parse the target website's
              HTML.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
