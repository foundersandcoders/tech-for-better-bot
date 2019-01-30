# tech-for-better-bot

🤖 Automation for the Tech for Better process.

## What does it do?

When I started the CF role, around half of my time was dedicated to coordinating the Tech for Better programme - communicating with applicants, scheduling workshops, updating information in tech-for-better-leads, organising user research, updating tech-for-better-leads some more, sending some more emails... etc. etc.

First, I tried Airtable integrations in Zapier, but it didn't really solve my problems. I spotted an opportunity to write some code, and speed up a very time-consuming part of my job!

This project is an Express server which integrates with an Airtable base, Github and Email.

It can:

- Notify you when a new Tech for Better application is received
- Notify the client that we have received their application
- Create a new issue in tech-for-better-leads, add the application info and initial labels
- Send individual emails to Tech for Better clients with user research survey links
- Look for user research surveys in the airtable base, add them to the relevant issue in tech-for-better-leads and update the labels

It could potentially do even more!

## Setup

- Clone or download this repo

- Run `npm install`

- The server is set up to check the **Tech for better applications** base on Airtable. If you don't have access to this base and you think you should, @sofer or @arrested-developer can share it with you.

- The server will create issues, add comments and labels in [tech-for-better-leads](https://github.com/foundersandcoders/tech-for-better-leads) as @techforbetterbot. This account is linked to the coursefacilitator email, should you need to get access or a new Github authentication token.

- The server sends emails using `nodemailer`, using the coursefacilitator G-Suite account. The CF should have the password for this account.

- You will need to define environment variables `AIRTABLE_API_KEY`, `GITHUB_TOKEN` and `EMAIL_PASSWORD.` Locally these should be set in a `.env` file. In production they should be set directly in the deployment environment. The Airtable key does not need to be set for testing (and so is not required on Travis).

- Customise your settings in `config.js`

- Run the server locally by running `npm start` and trigger the application to run once by visiting `localhost:5000` in your browser. You should see a status message of `200` or `OK`

## Deploying

- This is intended to be deployed to a service such as Heroku. To allow Heroku apps their beauty sleep, this app can be called using a cron job. Every time the cron job calls the app with a GET request, it will be triggered to check the Airtable for new responses. I used cron-job.org to send a GET request to my Heroku app every 30 minutes.

- The app is currently deployed using the coursefacilitator@foundersandcoders.com Heroku account. Pushes or merges to master on this repo will initiate a new build. If you need access, @arrested-developer might be able to help.

## How to use

- The server will automatically send an email to coursefacilitator, and a notification email to the applicant, whenever a new Tech for Better application is received.
- Once the CF has looked over the application, and has invited the applicant to a workshop, they should tick the `invitation_sent` checkbox in Airtable. This will trigger the server to create a new issue in tech-for-better-leads with the initial labels added (note: the server is currently configured to run once every 30 minutes, so there may be a delay of up to 30 minutes before the new issues appear)
- After the client has attended workshop 1, you can tick the `attended_workshop_1` checkbox, which will send out an email with an individualised link for the follow-up user research survey.
- When the user research survey is received back, the contents of the survey will be automatically added to the existing issue and the labels will be updated.

## Contributing

This is intended to be maintained by the current course facilitator. The CF should feel free to adapt this to their needs. @arrested-developer will be happy to merge or review PRs, but anyone in our community can be asked to merge or review a PR. Additionally, anyone from our community is welcome to contribute to issues labelled `help-wanted`.
