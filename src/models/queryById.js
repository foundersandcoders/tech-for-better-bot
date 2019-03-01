const config = require("../config/airtable.js")

const Airtable = require("airtable")
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: config.airtable_api_key,
})
var base = Airtable.base(config.airtable_base_id)

//'{notification_sent} = 0'

const queryById = id => {
  return new Promise((resolve, reject) => {
    base("Applications").find(id, function(err, record) {
      if (err) {
        reject(err)
      }
      resolve(record)
    })
  })
}

module.exports = queryById
