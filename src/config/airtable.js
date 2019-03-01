// Check for Airtable API key in environment vars
// In test environment only, this will default to 'keyTestValue'
/* istanbul ignore next */
const apiKey = process.env.AIRTABLE_API_KEY
  ? process.env.AIRTABLE_API_KEY
  : process.env.NODE_ENV === "test"
  ? "keyTestValue"
  : null

if (!apiKey)
  throw new Error("AIRTABLE_API_KEY must be set in environment variables")

const airtableBase = process.env.AIRTABLE_BASE_ID
  ? process.env.AIRTABLE_BASE_ID
  : process.env.NODE_ENV === "test"
  ? "TEST_BASE_ID"
  : null

if (!airtableBase)
  throw new Error("AIRTABLE_BASE_ID must be set in environment variables")

const surveyId = process.env.AIRTABLE_SURVEY_ID
  ? process.env.AIRTABLE_SURVEY_ID
  : process.env.NODE_ENV === "test"
  ? "TEST_SURVEY_ID"
  : null

if (!surveyId)
  throw new Error(
    "AIRTABLE_SURVEY_ID must be set in environment variables, using the ID of the survey table"
  )

module.exports = {
  airtable_base_id: airtableBase,
  airtable_survey_id: surveyId,
  base: "Applications",
  view: "All Responses",
  airtable_api_key: apiKey,
  airtable_link: "https://airtable.com/tblb7XTGa07Uhe8bG/viwON2FQq5fqc9RDF",
}
