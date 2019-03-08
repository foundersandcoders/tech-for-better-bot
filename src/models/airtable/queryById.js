const {
  airtable: { apiKey, baseId },
} = require("../../config")

const Airtable = require("airtable")
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey,
})
var base = Airtable.base(baseId)

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
