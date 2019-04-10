# tech-for-better-bot

🤖 Automation for the Tech for Better process.

Author: @arrested-developer

## What does it do?

When I started the CF role, around half of my time was dedicated to coordinating the Tech for Better programme - communicating with applicants, scheduling workshops, updating information in tech-for-better-leads, organising user research, updating tech-for-better-leads some more, sending some more emails... etc. etc.

First, I tried Airtable integrations in Zapier, but it didn't really solve my problems. I spotted an opportunity to write some code, and speed up a very time-consuming part of my job!

This project is an Express server which integrates with an Airtable base, Github and Email.

It can:

- Notify you when a new Tech for Better application is received
- Notify the client that we have received their application
- Send an invitation to attend a workshop, with a link to a given page (e.g. Eventbrite)
- Send a reminder invitation if a client has not yet booked themselves in
- Create a new issue in tech-for-better-leads, add the application info and initial labels
- Send individual emails to Tech for Better clients with user research survey links, as well as a reminder email if needed
- Send feedback forms once a project has been completed
- Look for user research surveys in the airtable base, add them to the relevant issue in tech-for-better-leads and update the labels

It could potentially do even more!

## Setup

- Clone or download this repo

- Run `npm install`

- The server is set up to check the **Tech for better applications** base on Airtable. If you don't have access to this base and you think you should, @sofer or @arrested-developer can share it with you.

- The server will create issues, add comments and labels in [tech-for-better-leads](https://github.com/foundersandcoders/tech-for-better-leads) as @techforbetterbot. This account is linked to the coursefacilitator email, should you need to get access or a new Github authentication token.

- The server sends emails using `nodemailer`, using the coursefacilitator G-Suite account. The CF should have the password for this account.

### App Configuration

Configuration is set through environment variables. The following must be set in a `.env` file in the root of the project to run locally, or set directly in the deployment environment (e.g. Heroku)

- AIRTABLE_API_KEY=YOURSECRET
- AIRTABLE_BASE_ID=YOURSECRET
- EMAIL_ACCOUNT=coursefacilitator@foundersandcoders.com // account that nodemailer sends from
- EMAIL_PASSWORD=YOURSECRET // corresponding password
- EMAIL_NAME=Charlie La Fosse // name that emails are sent from
- GITHUB_TOKEN=YOURSECRET
- GITHUB_OWNER=foundersandcoders
- GITHUB_REPO=tech-for-better-leads // repo to create new issues in
- GITHUB_ASSIGNEE=charlielafosse // who to assign new issues to
- LINKS_EVENTBRITE=https://www.eventbrite.co.uk/e/tech-for-better-discovery-workshop-tickets-55336783810
- LINKS_PO_AGREEMENT=https://docs.google.com/document/d/1PA6i2VILi4kJOF7QuJxHMwTX2dILNI2BxCBfmZ0ARHs/edit?usp=sharing
- LINKS_RESEARCH_SURVEY_URL=YOURSURVEYLINK // URL to the follow up survey
- LINKS_EXIT_FEEDBACK_FORM_URL=YOURFEEDBACKFORMLINK // URL to the exit feedback form
- USER_RESEARCH_DEADLINE=YOURDATE // The current deadline for POs to return their user research results. Make sure it's formatted like so: 22nd-April

### Airtable Setup

The fields in Airtable should be configured as per [this example](https://airtable.com/invite/l?inviteId=invjFabwJZfMFqaxf&inviteToken=79d712b468354a15d8bfc298eec154bf9bc9adc76fb59d8050617c5425563b35). Ask @charlielafosse if there are problems with access.

## Running locally

- Run the server locally by running `npm start` and trigger the application to run once by visiting `localhost:5000` in your browser. You should see a status message of `200` or `OK`

## Deploying

- This is intended to be deployed to a service such as Heroku. To allow Heroku apps their beauty sleep, this app can be called using a cron job. Every time the cron job calls the app with a GET request, it will be triggered to check the Airtable for new responses. I used cron-job.org to send a GET request to the deployed Heroku app every 30 minutes.

- The app is currently deployed using the coursefacilitator@foundersandcoders.com Heroku account. Pushes or merges to master on this repo will initiate a new build. If you need access, @arrested-developer might be able to help.

## How to use

- The server will automatically send an email to coursefacilitator, and a notification email to the applicant, whenever a new Tech for Better application is received.
- Once the CF has looked over the application, and wishes to invite the applicant to a workshop, they should tick the `send_invitation` checkbox in Airtable. This will trigger the server to create a new issue in tech-for-better-leads with the initial labels added and send an invitation to the applicant with a link to workshops and a link to the PO agreement (note: the server is currently configured to run once every 30 minutes, so there may be a delay of up to 30 minutes before the new issues appear)
- If the client has not booked into a workshop, the CF can send a reminder by checking the `send_invitation_reminder` checkbox in Airtable.
- After the client has attended workshop 1, you can tick the `attended_workshop_1` checkbox, which will send out an email with an individualised link for the follow-up user research survey and update the labels on Github.
- If the client hasn't yet returned their user survey results, then `follow_up_survey_received` will be unchecked. In order to nudge the client, check `send_survey_reminder` in Airtable. This will send out a reminder email, and `sent_survey_reminder` will be checked once that email is actually sent (could take up to 30 mins).
- When the user research survey is received back, `follow_up_survey_received` will be checked in Airtable, the contents of the survey will be automatically added to the existing issue, and the labels will be updated.
- If `project_completed` is checked in Airtable, then feel free to check `send_exit_feedback`. This will send out the participant feedback form to the client, and `sent_exit_feedback` will also be ticked when that email is actually sent (it may take up to 30 mins).

## Contributing

This is intended to be maintained by the current course facilitator. The CF should feel free to adapt this to their needs. @arrested-developer will be happy to merge or review PRs, but anyone in our community can be asked to merge or review a PR. Additionally, anyone from our community is welcome to contribute to issues labelled `help-wanted`.
