# Create Energy Page via Marketer MCP

Create a page for **https://matthey.com/products-and-markets/energy** under  
`/sitecore/content/johnson-matthey/matthey-corporate-website/Home/Products and markets/`  
modeled on the existing **Automotive** page.

## Prerequisites

- Marketer MCP (**user-marketer**) connected and authenticated in Cursor Settings.
- If `list_sites` does not show **johnson-matthey** / **matthey-corporate-website**, get **parentId** and **templateId** from Sitecore XM Cloud Content Editor (see below).

## Steps (using Marketer MCP tools)

### 1. Get parent folder ID

**Tool:** `get_content_item_by_path`  
**Arguments:**

```json
{
  "itemPath": "/sitecore/content/johnson-matthey/matthey-corporate-website/Home/Products and markets"
}
```

→ Note the returned **itemId** (e.g. `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`) as **parentId**.

### 2. Inspect Automotive page (same template/structure)

**Tool:** `get_content_item_by_path`  
**Arguments:**

```json
{
  "itemPath": "/sitecore/content/johnson-matthey/matthey-corporate-website/Home/Products and markets/Automotive"
}
```

→ Note **templateId** and any field names you want to reuse for Energy.

### 3. Create Energy page

**Tool:** `create_content_item`  
**Arguments:**

- **name:** `Energy`
- **templateId:** (same as Automotive from step 2)
- **parentId:** (from step 1)
- **fields:** Use the content in `energy_page_content.json` (Title, Body, etc. as defined by the template)

If the template matches the content spec in `energy_page_content.json`, pass those field names and values. If the template uses different field names (e.g. Content, Summary), map the JSON content to those fields.

## Content source

Page content is based on:  
[https://matthey.com/products-and-markets/energy](https://matthey.com/products-and-markets/energy)  
“Transforming our energy systems | Johnson Matthey”.

See **energy_page_content.json** in this folder for the structured copy and stats to use on the Energy page.

---

## Alternative: Get IDs from Content Editor

If the Marketer MCP `list_sites` does not include the Johnson Matthey site:

1. In **Sitecore XM Cloud Content Editor**, go to  
   `/sitecore/content/johnson-matthey/matthey-corporate-website/Home/Products and markets`
2. Copy the **Item ID** of that folder → use as **parentId**.
3. Open the **Automotive** item under that folder and copy its **Template ID** → use as **templateId**.
4. Call **create_page** with:
   - `name`: `Energy`
   - `parentId`: (from step 2)
   - `templateId`: (from step 3)
   - plus any other required fields (e.g. title, content) from **energy_page_content.json**.
5. Or use **create_content_item** with the same `parentId`, `templateId`, and `name`, and pass `fields` built from **energy_page_content.json** to match the template (Title, Body, etc.).
