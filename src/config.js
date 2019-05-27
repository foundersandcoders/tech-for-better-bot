// loads config options from the environment variables.
// a .env file in the root folder with these variables is required to run locally
// in production, environment variables should be set in Heroku

// required variables:

//AIRTABLE_API_KEY=API key from Airtable
//AIRTABLE_BASE_ID=Base Id of the Airtable base
//EMAIL_ACCOUNT=Account to send emails from
//EMAIL_PASSWORD=Corresponding password
//EMAIL_NAME=Name to put on emails (CF's name)
//GITHUB_TOKEN=Valid token with access to FAC repos
//GITHUB_OWNER=foundersandcoders
//GITHUB_REPO=tech-for-better-leads
//GITHUB_ASSIGNEE=CF's Github handle
//LINKS_EVENTBRITE=Link to eventbrite booking page for workshop 1
//LINKS_PO_AGREEMENT=Link to PO agreement on Google docs
//LINKS_RESEARCH_SURVEY_URL=Link to follow-up research survey on Airtable
// LINKS_EXIT_FEEDBACK_FORM_URL=Link to exit feedback form on Airtable

const apiKey = process.env.AIRTABLE_API_KEY
  ? process.env.AIRTABLE_API_KEY
  : process.env.NODE_ENV === "test"
  ? "keyTestValue"
  : null;

if (!apiKey)
  throw new Error("AIRTABLE_API_KEY must be set in environment variables");

const baseId = process.env.AIRTABLE_BASE_ID
  ? process.env.AIRTABLE_BASE_ID
  : process.env.NODE_ENV === "test"
  ? "TEST_BASE_ID"
  : null;

if (!baseId)
  throw new Error("AIRTABLE_BASE_ID must be set in environment variables");

const researchSurveyUrl = process.env.LINKS_RESEARCH_SURVEY_URL
  ? process.env.LINKS_RESEARCH_SURVEY_URL
  : false;
if (!researchSurveyUrl)
  throw new Error(
    "LINKS_RESEARCH_SURVEY_URL must be set to the URL for the folow-up Airtable survey form"
  );

const exitFeedbackFormUrl = process.env.LINKS_EXIT_FEEDBACK_FORM_URL
  ? process.env.LINKS_EXIT_FEEDBACK_FORM_URL
  : false;
if (!exitFeedbackFormUrl)
  throw new Error(
    "LINKS_EXIT_FEEDBACK_FORM_URL must be set to the URL for the Airtable exit feedback form"
  );

const userResearchDeadline = process.env.USER_RESEARCH_DEADLINE
 ? process.env.USER_RESEARCH_DEADLINE
 : false;
if(!userResearchDeadline)
  throw new Error("USER_RESEARCH_DEADLINE must be set to the current deadline for returning the results of the user research survey");

let pass;
if (process.env.EMAIL_PASSWORD) {
  pass = process.env.EMAIL_PASSWORD;
} else {
  throw new Error("environment var EMAIL_PASSWORD must be set");
}

let user;
if (process.env.EMAIL_ACCOUNT) {
  user = process.env.EMAIL_ACCOUNT;
} else {
  throw new Error("environment var EMAIL_ACCOUNT must be set");
}

let name;
if (process.env.EMAIL_NAME) {
  name = process.env.EMAIL_NAME;
} else {
  throw new Error("environment var CF_NAME must be set");
}

const token = process.env.GITHUB_TOKEN ? process.env.GITHUB_TOKEN : false;
if (!token) {
  throw new Error("GITHUB_TOKEN must be set in environment variables");
}

const owner = process.env.GITHUB_OWNER ? process.env.GITHUB_OWNER : false;
if (!owner) {
  throw new Error("GITHUB_OWNER must be set in environment variables");
}

const repo = process.env.GITHUB_REPO ? process.env.GITHUB_REPO : false;
if (!repo) {
  throw new Error("GITHUB_REPO must be set in environment variables");
}

const assignee = process.env.GITHUB_ASSIGNEE
  ? process.env.GITHUB_ASSIGNEE
  : false;
if (!assignee) {
  throw new Error("GITHUB_TOKEN must be set in environment variables");
}

const bookingUrl = process.env.LINKS_EVENTBRITE
  ? process.env.LINKS_EVENTBRITE
  : false;
if (!bookingUrl)
  throw new Error(
    "Eventbrite booking URL must be set in environment variables"
  );

  const discoverySignup = process.env.LINKS_DISCOVERY_WORKSHOP
    ? process.env.LINKS_DISCOVERY_WORKSHOP
    : false;
  if (!discoverySignup)
    throw new Error(
      "Discovery Workshop signup URL must be set in environment variables"
    );

const productOwnerAgreementUrl = process.env.LINKS_PO_AGREEMENT
  ? process.env.LINKS_PO_AGREEMENT
  : false;
if (!bookingUrl)
  throw new Error(
    "URL for Product Owner Agreement document must be set in environment variables"
  );

module.exports = {
  airtable: {
    baseId,
    apiKey
  },
  dates: {
    userResearchDeadline
  },
  email: {
    user,
    pass,
    name
  },
  github: {
    token,
    owner,
    repo,
    assignee
  },
  links: {
    bookingUrl,
    productOwnerAgreementUrl,
    researchSurveyUrl,
    exitFeedbackFormUrl,
    discoverySignup
  }
};
