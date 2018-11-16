const config = require('../config/airtable.js');

const Airtable = require('airtable');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: config.airtable_api_key,
});
var base = Airtable.base(config.airtable);

//'{notification_sent} = 0'

const queryById = (id, cb) => {
  base('Applications').find(id, function(err, record) {
    if (err) {
      console.error(err);
      return;
    }
    cb(record);
  });
};

module.exports = queryById;
