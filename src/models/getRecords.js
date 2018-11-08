const config = require('../config/airtable.js');

const Airtable = require('airtable');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: config.airtable_api_key,
});
var base = Airtable.base(config.airtable);

//'{notification_sent} = 0'

const getRecords = (formula, cb) => {
  base(config.base)
    .select({
      maxRecords: 1200,
      pageSize: 100,
      view: config.view,
      filterByFormula: formula,
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(record => {
          cb(record);
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
};

module.exports = getRecords;
