/* istanbul ignore next */
const apiKey = process.env.AIRTABLE_API_KEY
  ? process.env.AIRTABLE_API_KEY
  : process.env.NODE_ENV === 'production'
    ? null
    : 'keyTestValue';

if (process.env.EMAIL_PASSWORD) {
  const emailPass = process.env.EMAIL_PASSWORD;
} else {
  throw new Error('environment var EMAIL_PASSWORD must be set');
}

module.exports = {
  airtable: 'apppmIXrkh2V5c2xA',
  base: 'General User Survey',
  view: 'All Responses',
  user: 'coursefacilitator@foundersandcoders.com',
  password: emailPass,
  airtable_api_key: apiKey,
  airtable_link: 'https://airtable.com/tblb7XTGa07Uhe8bG/viwON2FQq5fqc9RDF',
};
