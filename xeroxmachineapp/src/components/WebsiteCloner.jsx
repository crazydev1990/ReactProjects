
import React, { useState } from 'react';

function WebsiteCloner() {
  const [urlInput, setUrlInput] = useState('https://wikipedia.org');
  const [clonedHtml, setClonedHtml] = useState('');
  const [viewMode, setViewMode] = useState('preview');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    'Enter a public website URL to start.'
  );
  const [proxyResults, setProxyResults] = useState([]);

  // 1. URL Validation
  const validateUrl = (value) => {
    let formattedUrl = value.trim();

    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const parsedUrl = new URL(formattedUrl);

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Only HTTP and HTTPS URLs are supported.');
    }

    if (
      parsedUrl.hostname === 'localhost' ||
      parsedUrl.hostname.endsWith('.local') ||
      parsedUrl.hostname === '127.0.0.1' ||
      parsedUrl.hostname === '0.0.0.0'
    ) {
      throw new Error('Local URLs are not supported.');
    }

    return parsedUrl.href;
  };

  // 2. Add Base URL
  const addBaseUrl = (html, targetUrl) => {
    const baseTag = `<base href="${targetUrl.replace(/"/g, '&quot;')}">`;

    if (/<head[^>]*>/i.test(html)) {
      return html.replace(
        /<head([^>]*)>/i,
        (match) => `${match}\n${baseTag}`
      );
    }

    if (/<html[^>]*>/i.test(html)) {
      return html.replace(
        /<html[^>]*>/i,
        (match) => `${match}\n<head>${baseTag}</head>`
      );
    }

    return `<!DOCTYPE html>
<html>
<head>${baseTag}</head>
<body>${html}</body>
</html>`;
  };

  // 3. Proxy Configuration
  const getProxies = (targetUrl) => [
    {
      name: 'AllOrigins',
      url: `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
    },
    {
      name: 'CodeTabs',
      url: `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`,
    },
  ];

  // 4. Fetch with timeout
  const fetchWithTimeout = async (url, milliseconds = 25000) => {
    const controller = new AbortController();

    const timeoutId = setTimeout(
      () => controller.abort(),
      milliseconds
    );

    try {
      return await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          Accept: 'text/html,application/xhtml+xml',
        },
      });
    } finally {
      clearTimeout(timeoutId);
    }
  };

  // 5. Error Description
  const getErrorMessage = (error) => {
    const message = error.message || '';

    if (error.name === 'AbortError') {
      return 'Request timeout: Server did not respond within 25 seconds.';
    }

    if (message.includes('522')) {
      return '522 Connection Timed Out: Proxy cannot connect to target server.';
    }

    if (message.includes('524')) {
      return '524 Timeout: Target website took too long to respond.';
    }

    if (message.includes('500')) {
      return '500 Internal Server Error: Proxy server encountered an internal error.';
    }

    if (message.includes('502')) {
      return '502 Bad Gateway: Proxy received an invalid response.';
    }

    if (message.includes('503')) {
      return '503 Service Unavailable: Proxy service is temporarily unavailable.';
    }

    if (message.includes('504')) {
      return '504 Gateway Timeout: Proxy server timed out.';
    }

    if (message.includes('403')) {
      return '403 Forbidden: Website denied the request.';
    }

    if (message.includes('401')) {
      return '401 Unauthorized: Authentication is required.';
    }

    if (message.includes('404')) {
      return '404 Not Found: Requested page was not found.';
    }

    if (message.includes('429')) {
      return '429 Too Many Requests: Please try again later.';
    }

    if (message.includes('Invalid HTML')) {
      return 'The server did not return a valid HTML page.';
    }

    if (error instanceof TypeError) {
      return 'Network or CORS error: Proxy may be unavailable.';
    }

    return message || 'Unknown error occurred.';
  };

  // 6. Fetch Website HTML with Fallback
  const fetchWebsiteHTML = async (targetUrl) => {
    const proxies = getProxies(targetUrl);
    const errors = [];

    for (const proxy of proxies) {
      try {
        setStatusMessage(`⏳ Connecting through ${proxy.name}...`);

        const response = await fetchWithTimeout(proxy.url);

        if (!response.ok) {
          const responseText = await response.text();

          throw new Error(
            `HTTP ${response.status}: ${responseText.slice(0, 150)}`
          );
        }

        const html = await response.text();

        if (!html || !/<html|<!doctype html/i.test(html)) {
          throw new Error('Invalid HTML response');
        }

        setProxyResults((previous) => [
          ...previous,
          {
            name: proxy.name,
            status: 'Success',
            message: 'HTML received successfully',
          },
        ]);

        return {
          html,
          proxyName: proxy.name,
        };

      } catch (error) {
        console.error(`${proxy.name} failed:`, error);

        const errorMessage = getErrorMessage(error);

        errors.push(`${proxy.name}: ${errorMessage}`);

        setProxyResults((previous) => [
          ...previous,
          {
            name: proxy.name,
            status: 'Failed',
            message: errorMessage,
          },
        ]);
      }
    }

    throw new Error(errors.join(' | '));
  };

  // 7. Main Clone Function
  const cloneOriginalWebsite = async (e) => {
    e.preventDefault();

    if (!urlInput.trim()) {
      setStatusMessage('❌ Please enter a website URL.');
      return;
    }

    setLoading(true);
    setClonedHtml('');
    setProxyResults([]);

    try {
      const targetUrl = validateUrl(urlInput);

      setStatusMessage(`⏳ Starting website fetch: ${targetUrl}`);

      const result = await fetchWebsiteHTML(targetUrl);

      const finalHtml = addBaseUrl(
        result.html,
        targetUrl
      );

      setClonedHtml(finalHtml);
      setViewMode('preview');

      setStatusMessage(
        `✅ HTML loaded successfully through ${result.proxyName}. Size: ${(finalHtml.length / 1024).toFixed(1)} KB`
      );

    } catch (error) {
      console.error('Clone Error:', error);

      setStatusMessage(
        `❌ ${error.message}`
      );

    } finally {
      setLoading(false);
    }
  };

  // 8. Copy HTML
  const copyHtmlCode = async () => {
    try {
      await navigator.clipboard.writeText(clonedHtml);

      setStatusMessage('✅ HTML source copied successfully!');

    } catch (error) {
      console.error(error);

      setStatusMessage(
        '❌ Clipboard permission denied or unavailable.'
      );
    }
  };

  // 9. Download HTML
  const downloadHtmlFile = () => {
    if (!clonedHtml) return;

    const blob = new Blob(
      [clonedHtml],
      { type: 'text/html;charset=utf-8' }
    );

    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = objectUrl;
    link.download = `website_clone_${Date.now()}.html`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
    }, 1000);

    setStatusMessage('✅ HTML download started!');
  };

  // 10. Reset
  const resetCloner = () => {
    setClonedHtml('');
    setViewMode('preview');
    setProxyResults([]);
    setStatusMessage('Enter another website URL to start.');
  };

  return (
    <div
      style={{
        maxWidth: '1050px',
        width: '100%',
        margin: '0 auto',
        padding: '25px',
        backgroundColor: '#0f172a',
        borderRadius: '24px',
        border: '2px solid #38bdf8',
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <h2 style={{
        color: '#38bdf8',
        margin: '0 0 8px',
      }}>
        Full Website Cloner 🌐✨
      </h2>

      <p style={{
        color: '#94a3b8',
        fontSize: '12px',
        marginBottom: '22px',
      }}>
        HTML • CSS REFERENCES • IMAGES • LIVE PREVIEW
      </p>

      {/* URL Form */}
      <form
        onSubmit={cloneOriginalWebsite}
        style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '20px',
        }}
      >
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="https://example.com"
          disabled={loading}
          style={{
            flex: '1 1 250px',
            minWidth: 0,
            padding: '14px',
            borderRadius: '10px',
            border: '1px solid #334155',
            backgroundColor: '#020617',
            color: '#fff',
            fontSize: '14px',
            outline: 'none',
          }}
        />

        <button
          type="submit"
          disabled={loading || !urlInput.trim()}
          style={{
            padding: '13px 22px',
            backgroundColor: '#38bdf8',
            color: '#000',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? '⏳ Cloning...' : '🚀 Clone Website'}
        </button>
      </form>

      {/* Status */}
      <div
        role="status"
        aria-live="polite"
        style={{
          padding: '13px',
          marginBottom: '20px',
          backgroundColor: '#020617',
          borderRadius: '10px',
          color: loading ? '#facc15' : '#94a3b8',
          fontSize: '13px',
          overflowWrap: 'anywhere',
          lineHeight: 1.6,
        }}
      >
        {statusMessage}
      </div>

      {/* Proxy Diagnostics */}
      {proxyResults.length > 0 && (
        <div style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#020617',
          border: '1px solid #334155',
          borderRadius: '12px',
          textAlign: 'left',
        }}>
          <h4 style={{
            margin: '0 0 12px',
            color: '#38bdf8',
          }}>
            Proxy Diagnostics
          </h4>

          {proxyResults.map((proxy, index) => (
            <div
              key={`${proxy.name}-${index}`}
              style={{
                padding: '10px',
                marginBottom: '8px',
                backgroundColor: '#1e293b',
                borderRadius: '8px',
                fontSize: '12px',
                overflowWrap: 'anywhere',
              }}
            >
              <strong>{proxy.name}</strong>

              <span style={{
                float: 'right',
                color: proxy.status === 'Success' ? '#4ade80' : '#f87171',
              }}>
                {proxy.status === 'Success' ? '✓ Success' : '✕ Failed'}
              </span>

              <p style={{
                color: '#94a3b8',
                margin: '7px 0 0',
              }}>
                {proxy.message}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Result */}
      {clonedHtml && (
        <div
          style={{
            backgroundColor: '#020617',
            padding: '15px',
            borderRadius: '16px',
            border: '1px solid #334155',
            textAlign: 'left',
          }}
        >
          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '15px',
            }}
          >
            <div style={{
              display: 'flex',
              gap: '7px',
              flexWrap: 'wrap',
            }}>
              <button
                type="button"
                onClick={() => setViewMode('preview')}
                style={{
                  padding: '9px 13px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor:
                    viewMode === 'preview' ? '#a78bfa' : '#1e293b',
                  color: viewMode === 'preview' ? '#000' : '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                👁️ Preview
              </button>

              <button
                type="button"
                onClick={() => setViewMode('code')}
                style={{
                  padding: '9px 13px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor:
                    viewMode === 'code' ? '#38bdf8' : '#1e293b',
                  color: viewMode === 'code' ? '#000' : '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                💻 Source Code
              </button>
            </div>

            <div style={{
              display: 'flex',
              gap: '7px',
              flexWrap: 'wrap',
            }}>
              <button
                type="button"
                onClick={copyHtmlCode}
                style={{
                  padding: '9px 13px',
                  backgroundColor: '#334155',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                📋 Copy
              </button>

              <button
                type="button"
                onClick={downloadHtmlFile}
                style={{
                  padding: '9px 13px',
                  backgroundColor: '#22c55e',
                  color: '#000',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                💾 Download HTML
              </button>

              <button
                type="button"
                onClick={resetCloner}
                style={{
                  padding: '9px 13px',
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                ↻ Reset
              </button>
            </div>
          </div>

          {/* Preview / Code */}
          {viewMode === 'preview' ? (
            <iframe
              title="Website Preview"
              srcDoc={clonedHtml}
              sandbox="allow-scripts allow-forms allow-popups"
              referrerPolicy="no-referrer"
              style={{
                width: '100%',
                height: '600px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                border: '2px solid #334155',
              }}
            />
          ) : (
            <textarea
              value={clonedHtml}
              readOnly
              rows={22}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#0f172a',
                color: '#4ade80',
                border: '1px solid #334155',
                borderRadius: '10px',
                fontFamily: 'monospace',
                fontSize: '12px',
                boxSizing: 'border-box',
                resize: 'vertical',
              }}
            />
          )}
        </div>
      )}

      {/* Footer */}
      <p style={{
        color: '#64748b',
        fontSize: '11px',
        marginTop: '18px',
        lineHeight: 1.7,
      }}>
        This tool fetches publicly accessible HTML through third-party
        proxies. External CSS, fonts and images may load from the original
        website. Some websites block automated requests. Use only websites
        you own or have permission to reproduce.
      </p>
    </div>
  );
}

export default WebsiteCloner;
