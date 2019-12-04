const fs = require("fs");
const pdfParse = require("pdf-parse");

module.exports = function(year, id) {
  const pdfID = id.split("_").slice(-1);

  const dataBuffer = fs.readFileSync(
    `src/_data/papers/pdf/${year}/${year}_${pdfID}.pdf`
  );

  const pages = pdfParse(dataBuffer).then(function(data) {
    return data.numpages;
  });

  return pages;
};
