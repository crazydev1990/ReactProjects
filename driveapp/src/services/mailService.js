
const API_KEY = import.meta.env.VITE_MAILSLURP_API_KEY;
const INBOX_ID = import.meta.env.VITE_MAILSLURP_INBOX_ID;

const BASE_URL = "https://api.mailslurp.com";

async function request(path, options = {}) {
  if (!API_KEY || !INBOX_ID) {
    throw new Error("MailSlurp API Key અથવા Inbox ID .env માં સેટ નથી.");
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      ...options.headers,
    },
  });

  const text = await response.text();

  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      (typeof data === "string" ? data : "") ||
      `Request failed: ${response.status}`;

    throw new Error(message);
  }

  return data;
}

export async function sendEmail(emailData) {
  return request(`/inboxes/${INBOX_ID}/confirm`, {
    method: "POST",
    body: JSON.stringify({
      to: [emailData.to],
      subject: emailData.subject,
      body: emailData.message,
    }),
  });
}

export async function getInboxEmails() {
  const data = await request(`/inboxes/${INBOX_ID}/emails`);

  return Array.isArray(data) ? data : [];
}

export async function getSentEmails() {
  const data = await request(`/inboxes/${INBOX_ID}/sent`);

  if (Array.isArray(data)) return data;

  return data?.content || data?.items || [];
}

export async function getEmailDetails(emailId) {
  return request(`/emails/${encodeURIComponent(emailId)}`);
}
