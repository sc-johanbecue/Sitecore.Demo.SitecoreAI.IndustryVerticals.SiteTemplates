// Node.js script to create all news items via MCP
const fs = require("fs");

const data = JSON.parse(fs.readFileSync("news_items_processed.json", "utf8"));
const parentId = "e8617a60-2961-498e-bef8-9751cd2b35ff";
const templateId = "950b7f23-903c-447b-b2fd-63dfd4d7b296";

// Helper to decode HTML entities
function decodeHtml(html) {
  return html
    .replace(/\\u003c/g, "<")
    .replace(/\\u003e/g, ">")
    .replace(/\\u0027/g, "'")
    .replace(/\\u0026/g, "&")
    .replace(/\\u0026amp;/g, "&amp;");
}

const items = data.map((item) => ({
  name: item.ItemName,
  fields: {
    Title: item.Title,
    Label: "News",
    PublicationDate: item.PublicationDate,
    Body: decodeHtml(item.Body),
    DownloadLink: item.DownloadLink ? decodeHtml(item.DownloadLink) : "",
    DownloadButtonText: item.DownloadLink ? "Download full release" : "",
    ContactTitle: "For media enquiries",
    ContactEmail: "jmpr@matthey.com",
    ContactPhone: "+44 207 269 8001",
    ContactEmailLabel: "Email:",
    ContactPhoneLabel: "Telephone:",
    XUrl: decodeHtml(item.XUrl),
    LinkedInUrl: decodeHtml(item.LinkedInUrl),
  },
}));

console.log(JSON.stringify(items, null, 2));
