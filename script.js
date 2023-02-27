const axios = require("axios");
const download = require("download");

let URL = "";
let filePath = `${__dirname}/files`;

async function getCsvUrl() {
  await axios
    .get(
      "https://open.canada.ca/data/api/action/package_show?id=3ff1e1de-d665-4398-a12a-e8ce55f887ac"
    )
    .then(function (response) {
      URL = response.data.result.resources[0].url;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function downloadCsvFile() {
  await download(URL, filePath).then(() => {
    console.log("Download Completed");
  });
}

async function main() {
  await getCsvUrl();
  await downloadCsvFile();
}

main();

setInterval(() => {
  main();
}, 6 * 60 * 60 * 1000);
