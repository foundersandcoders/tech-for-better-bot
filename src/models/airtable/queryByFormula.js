const {
  airtable: { apiKey, baseId }
} = require("../../config");

const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey
});
var base = Airtable.base(baseId);

//'{notification_sent} = 0'

const queryApplicationsByFormula = formula => {
  return new Promise((resolve, reject) => {
    let results = [];
    base()
      .select({
        maxRecords: 1200,
        pageSize: 100,
        view: "All Responses",
        filterByFormula: formula
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(record => {
            results.push(record);
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
  });
};

const querySurveysByFormula = formula => {
  return new Promise((resolve, reject) => {
    let results = [];
    base("Applications")
      .select({
        maxRecords: 1200,
        pageSize: 100,
        view: "Grid view",
        filterByFormula: formula
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(record => {
            results.push(record);
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
  });
};

// this can definitely be refactored and pass a template literal into base()

const queryWorkshopsByFormula = formula => {
  return new Promise((resolve, reject) => {
    let results = [];
    base("Discovery Workshops")
      .select({
        maxRecords: 1200,
        pageSize: 100,
        view: "Grid view",
        filterByFormula: formula
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(record => {
            results.push(record);
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
  });
};

module.exports = {
  queryApplicationsByFormula,
  querySurveysByFormula,
  queryWorkshopsByFormula
};
