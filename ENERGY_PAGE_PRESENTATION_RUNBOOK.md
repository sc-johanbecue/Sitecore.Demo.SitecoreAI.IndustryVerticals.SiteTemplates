# Energy Page: Copy Presentation from Automotive and Create Datasources

**Goal:** Create the Energy page (or use existing) under  
`/sitecore/content/johnson-matthey/matthey-corporate-website/Home/Products and markets/`  
with the **same presentation components** as Automotive, and **Energy-specific datasource items** in the same location pattern as Automotive.

**Prerequisite:** Connect and authenticate the **marketer MCP** (user-marketer) in Cursor Settings.

---

## Known IDs (from previous session)

| Item                              | ID                                     |
| --------------------------------- | -------------------------------------- |
| **Products and markets** folder   | `fb631f51-6657-45a3-9fa2-48159b0937e8` |
| **Automotive** page               | `d42ed261-8328-4935-94b0-c81dd62d8c32` |
| **Energy** page (already created) | `ddbb19be-a6ad-47d3-96af-c5e1eb76056f` |

If the Energy page was not created yet, create it first with `create_page` (name: Energy, parentId: Products-and-markets folder, templateId: same as Automotive `dab3306c-ed70-43bd-be64-30c8498298d5`), then run the steps below.

---

## Step 1: Get Automotive page components and placeholders

**Tool:** `get_components_on_page`  
**Arguments:**

```json
{ "pageId": "d42ed261-8328-4935-94b0-c81dd62d8c32" }
```

From the response, note for **each component**:

- Placeholder key/name (e.g. `main`, `hero`, `content`)
- Component type/definition (e.g. Page Hero, Stats, Related Links)
- Component instance ID (if returned)
- Any **datasource item ID** or path

---

## Step 2: Get each component’s datasource and location

For each component from Step 1:

**Tool:** `get_component`  
**Arguments:** (use the component’s instance ID or pageId + placeholder + index as required by the tool schema)

From each response, note:

- **Datasource item ID** and **path** (e.g. `/sitecore/content/.../Automotive/Data/Hero` or similar)
- **Template ID** of the datasource item
- **Parent folder** of the datasource (so you can replicate the structure under Energy)

Pattern: If Automotive datasources live under  
`/sitecore/content/johnson-matthey/matthey-corporate-website/Home/Products and markets/Automotive/Data/<ComponentName>`  
then Energy datasources should live under  
`/sitecore/content/johnson-matthey/matthey-corporate-website/Home/Products and markets/Energy/Data/<ComponentName>`  
(or the same relative pattern: `.../Energy/...` instead of `.../Automotive/...`).

---

## Step 3: Get Automotive page placeholder structure (if needed)

**Tool:** `get_components_by_placeholder`  
**Arguments:**

```json
{ "pageId": "d42ed261-8328-4935-94b0-c81dd62d8c32" }
```

Use this to see which placeholders exist and in what order components sit (so you can replicate order on Energy).

---

## Step 4: Ensure Energy has a Data folder (same as Automotive)

If Automotive has a child item **Data** (or similar) that holds all datasources:

**Tool:** `get_content_item_by_path`  
**Arguments:**

```json
{
  "itemPath": "/sitecore/content/johnson-matthey/matthey-corporate-website/Home/Products and markets/Automotive/Data"
}
```

(Adjust path if your structure uses a different name than `Data`.)

Then create the same under Energy:

**Tool:** `create_child_item` or `create_content_item`

- **Parent:** Energy page ID `ddbb19be-a6ad-47d3-96af-c5e1eb76056f` (or the Data folder’s template if you need a “Data” folder first)
- Create a **Data** folder under Energy with the same template as Automotive’s Data folder (if applicable).

Note the **Energy Data folder item ID** for the next step.

---

## Step 5: Create Energy-specific datasource items

For **each** component that has a datasource on Automotive:

1. **Resolve parent for Energy datasource**  
   Same relative path as Automotive but under Energy (e.g. `.../Energy/Data` or `.../Energy/Data/<Subfolder>`).

2. **Create the datasource item**  
   **Tool:** `create_component_datasource` or `create_content_item`
   - **name:** Same as Automotive’s datasource item name, or an Energy-specific name (e.g. `Energy-Hero`, `Energy-Stats`).
   - **templateId:** Same as the Automotive datasource item’s template.
   - **parentId:** The Energy Data folder (or the correct subfolder under Energy that mirrors Automotive).
   - **fields:** Set fields from **energy_page_content.json** (and from https://matthey.com/products-and-markets/energy) so the component renders Energy content, e.g.:
     - **Page Hero:** Title “Energy”, summary/body from Energy page.
     - **Stats:** Use the two stats (450Mt, 65%) from energy_page_content.json.
     - **Text/Content:** Hydrogen section, Future fuels section.
     - **Related Links:** Use the “Read more” links (Biorenewables, Hydrogen, SAF, etc.) from energy_page_content.json.

3. Record the **new datasource item ID** for use when adding the component to the Energy page.

---

## Step 6: Add components to the Energy page

For **each** component you want to copy from Automotive:

**Tool:** `add_component_on_page`  
**Arguments (conceptually):**

```json
{
  "pageId": "ddbb19be-a6ad-47d3-96af-c5e1eb76056f",
  "placeholderKey": "<same as Automotive, e.g. main or hero>",
  "componentDefinitionId": "<same component type as on Automotive>",
  "datasourceId": "<new Energy datasource item ID from Step 5>"
}
```

Use the exact parameter names required by the tool (e.g. `placeholderName`, `componentId`, `datasourceItemId`). Add components in the **same order** as on Automotive (from Step 1 / Step 3).

---

## Step 7: Set datasource on each component (if needed)

If adding the component does not attach the datasource, or the tool adds “shared” and you need to point to the Energy datasource:

**Tool:** `set_component_datasource`  
**Arguments:**

```json
{
  "pageId": "ddbb19be-a6ad-47d3-96af-c5e1eb76056f",
  "componentInstanceId": "<returned from add_component_on_page>",
  "datasourceItemId": "<Energy datasource item ID>"
}
```

---

## Step 8: Verify

- Open the Energy page in the Experience Editor or front-end.
- Confirm all placeholders show the same component types as Automotive.
- Confirm each component shows **Energy** content (title “Energy”, stats 450Mt / 65%, Hydrogen / Future fuels text, Energy-related links).

---

## Content reference for Energy datasources

Use **energy_page_content.json** in this repo for:

- **Title / page title:** `"Energy"` / `"Transforming our energy systems"`.
- **Summary:** `summary` field.
- **Stats:** `stats` array (450Mt, 65%).
- **Sections:** `sections` (Hydrogen, Future fuels) for rich text / content components.
- **Related links:** `relatedLinks` for link list / “Read more” components.

Copy from https://matthey.com/products-and-markets/energy for any extra copy or links not yet in the JSON.

---

## Tool list summary

| Step | Tool                                                                    |
| ---- | ----------------------------------------------------------------------- |
| 1    | `get_components_on_page` (Automotive)                                   |
| 2    | `get_component` (per component)                                         |
| 3    | `get_components_by_placeholder` (Automotive)                            |
| 4    | `get_content_item_by_path`, `create_child_item` / `create_content_item` |
| 5    | `create_component_datasource` / `create_content_item` (per datasource)  |
| 6    | `add_component_on_page` (Energy, per component)                         |
| 7    | `set_component_datasource` (if needed, per component)                   |

Once the marketer MCP is connected, run these steps in order; you can run Steps 1–3 first and then script or manually repeat Steps 5–7 for each component.
