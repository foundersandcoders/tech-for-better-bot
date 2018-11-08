# airtable_survey_watcher 👀 💌

Sends an automated email when a new Airtable survey response is received 🎉

## Setup

- Clone or download this repo

- Run `npm install`

- Set up an Airtable survey, add a column called `notification_sent` using type Checkbox. Make sure it is hidden in the form view.

- Set up environment variables AIRTABLE_API_KEY and EMAIL_PASSWORD. Locally these should be set in a `.env` file. In production they should be set directly in the deployment environment.

- Customise your settings in `config.js`

- Run the server locally by running `npm start` and trigger the watcher to run once by visiting `localhost:5000` in your browser. You should see a status message of `200` or `OK`

- This is intended to be deployed to a service such as Heroku. To avoid server load this should be called using a cron job. Every time the cron job calls the app with a GET request, it will be triggered to check the Airtable for new responses. I used cron-jobs.org to set up a cron job that makes a GET request to my Heroku app every 5 minutes.
