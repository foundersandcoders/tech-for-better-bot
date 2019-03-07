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

const researchSurveyUrl = process.env.LINKS_RESEARCH_SURVEY_URL
  ? process.env.LINKS_RESEARCH_SURVEY_URL
  : false
if (!researchSurveyUrl)
  throw new Error(
    "LINKS_RESEARCH_SURVEY_URL must be set to the URL for the folow-up Airtable survey form"
  )

if (!surveyId)
  throw new Error(
    "AIRTABLE_SURVEY_ID must be set in environment variables, using the ID of the survey table"
  )

let emailPass
if (process.env.EMAIL_PASSWORD) {
  emailPass = process.env.EMAIL_PASSWORD
} else {
  throw new Error("environment var EMAIL_PASSWORD must be set")
}

let emailUser
if (process.env.EMAIL_ACCOUNT) {
  emailUser = process.env.EMAIL_ACCOUNT
} else {
  throw new Error("environment var EMAIL_ACCOUNT must be set")
}

let cfName
if (process.env.EMAIL_NAME) {
  cfName = process.env.EMAIL_NAME
} else {
  throw new Error("environment var CF_NAME must be set")
}

const token = process.env.GITHUB_TOKEN ? process.env.GITHUB_TOKEN : false
if (!token) {
  throw new Error("GITHUB_TOKEN must be set in environment variables")
}

const owner = process.env.GITHUB_OWNER ? process.env.GITHUB_OWNER : false
if (!owner) {
  throw new Error("GITHUB_OWNER must be set in environment variables")
}

const repo = process.env.GITHUB_REPO ? process.env.GITHUB_REPO : false
if (!repo) {
  throw new Error("GITHUB_REPO must be set in environment variables")
}

const assignee = process.env.GITHUB_ASSIGNEE
  ? process.env.GITHUB_ASSIGNEE
  : false
if (!assignee) {
  throw new Error("GITHUB_TOKEN must be set in environment variables")
}

const bookingUrl = process.env.LINKS_EVENTBRITE
  ? process.env.LINKS_EVENTBRITE
  : false
if (!bookingUrl)
  throw new Error("Eventbrite booking URL must be set in environment variables")

const productOwnerAgreement = process.env.LINKS_PO_AGREEMENT
  ? process.env.LINKS_PO_AGREEMENT
  : false
if (!bookingUrl)
  throw new Error(
    "URL for Product Owner Agreement document must be set in environment variables"
  )

module.exports = {
  airtable: {
    baseId,
    apiKey,
  },
  email: {
    user: emailUser,
    pass: emailPass,
    name: cfName,
  },
  github: {
    token,
    owner,
    repo,
    assignee,
  },
  links: {
    bookingUrl,
    productOwnerAgreement,
    researchSurveyUrl,
  },
}
