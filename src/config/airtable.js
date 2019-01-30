/* istanbul ignore next */
// Check for Airtable API key in environment vars
// In test environment only, this will default to 'keyTestValue'
const apiKey = process.env.AIRTABLE_API_KEY
  ? process.env.AIRTABLE_API_KEY
  : process.env.NODE_ENV === 'test'
  ? 'keyTestValue'
  : null;

if (!apiKey)
  throw new Error('AIRTABLE_API_KEY must be set in environment variables');

module.exports = {
  airtable_base_id: 'apppmIXrkh2V5c2xA',
  base: 'General User Survey',
  view: 'All Responses',
  airtable_api_key: apiKey,
  airtable_link: 'https://airtable.com/tblb7XTGa07Uhe8bG/viwON2FQq5fqc9RDF',
};
