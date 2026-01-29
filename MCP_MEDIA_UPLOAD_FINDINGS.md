# MCP Media Upload Findings

## Research Results

### Available MCP Tools

Based on the Marketer MCP server configuration, the available tools appear to be:

- `create_content_item` - Creates content items (including media items with metadata)
- `update_fields_on_content_item` - Updates fields on items
- `get_content_item_by_path` - Retrieves items
- Other standard content management tools

### Blob Field Structure

From examining existing media items in the codebase:

- **Blob Field ID**: `40e50ed9-ba07-4702-992e-a912738d32dc`
- **Structure**: Media items have a Blob field with:
  - `BlobID`: A unique identifier for the blob storage
  - `Value`: Base64-encoded binary data (for serialized items)

### Sitecore Media Upload Pattern

According to web research, Sitecore XM Cloud uses:

1. **GraphQL `uploadMedia` mutation** - Generates a pre-signed URL
2. **Direct upload to pre-signed URL** - Binary file uploaded to Azure Blob Storage
3. **Media processing** - Pipeline processes the uploaded file

This approach:

- Provides security (time-limited, file-specific URLs)
- Leverages cloud-native storage (Azure Blob Storage)
- Offloads file I/O from the CMS application

### Current Limitation

The Marketer MCP API's `update_fields_on_content_item` tool may not support:

- Large binary data uploads (400K+ characters of base64)
- Direct blob field updates with binary data
- Pre-signed URL generation

## Options for Media Upload

### Option 1: Try Direct Blob Field Update (Test)

Attempt to update the Blob field directly with base64 data:

```json
{
  "itemId": "media-item-id",
  "fields": {
    "Blob": "base64-encoded-image-data"
  }
}
```

**Risk**: May fail due to size limitations or API restrictions.

### Option 2: Use GraphQL API Directly

If MCP doesn't support media uploads, use Sitecore's GraphQL API:

1. Call `uploadMedia` mutation to get pre-signed URL
2. Upload binary file to pre-signed URL
3. Link media item to news item

**Requires**: Direct GraphQL API access, authentication tokens.

### Option 3: Manual Upload via Sitecore Content Hub

1. Create media items with metadata via MCP
2. Manually upload binary files through Sitecore Content Hub UI
3. Link media items to news items via MCP

**Pros**: Guaranteed to work
**Cons**: Requires manual intervention

### Option 4: Check for Specialized MCP Tool

There may be a specialized tool like:

- `upload_media_item`
- `create_media_item_with_blob`
- `update_media_blob`

**Action**: Need to check MCP server documentation or tool list.

## Recommendation

1. **First**: Try updating the Blob field with base64 data for a small image to test if it works
2. **If that fails**: Check if there's a specialized media upload tool in the MCP server
3. **If no tool exists**: Use GraphQL API directly or manual upload via Content Hub

## Next Steps

1. Test Blob field update with a small image (< 100KB)
2. Check MCP server documentation for media-specific tools
3. If needed, implement GraphQL uploadMedia mutation workflow
4. Complete remaining news items and media items creation
