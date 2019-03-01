const config = require("../config/airtable.js")

const Airtable = require("airtable")
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: config.airtable_api_key,
})
var base = Airtable.base(config.airtable_base_id)

//'{notification_sent} = 0'

const queryApplicationsByFormula = formula => {
  return new Promise((resolve, reject) => {
    let results = []
    base("Applications")
      .select({
        maxRecords: 1200,
        pageSize: 100,
        view: "All Responses",
        filterByFormula: formula,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(record => {
            results.push(record)
          })
          fetchNextPage()
        },
        function done(err) {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
        }
      )
  })
}

const querySurveysByFormula = formula => {
  return new Promise((resolve, reject) => {
    let results = []
    base("User Research Survey")
      .select({
        maxRecords: 1200,
        pageSize: 100,
        view: "Grid view",
        filterByFormula: formula,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(record => {
            results.push(record)
          })
          fetchNextPage()
        },
        function done(err) {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
        }
      )
  })
}

module.exports = { queryApplicationsByFormula, querySurveysByFormula }
