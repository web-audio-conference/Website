const fs = require("fs");
const pdfParse = require("pdf-parse");

module.exports = function(year, id) {
  pdfID = id.split("_").slice(-1);

  let dataBuffer = fs.readFileSync(
    `src/_data/papers/pdf/${year}/${year}_${pdfID}.pdf`
  );

  let pages = pdfParse(dataBuffer).then(function(data) {
    return data.numpages;
  });

  return pages;
};
