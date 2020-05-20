const bibToWeb = require("./bibToWeb");
const excelToWeb = require("./excelToWeb");

module.exports = function (config) {
  const commonFields = {
    // Change values to the current
    address: "Trondheim, Norway",
    booktitle: "Proceedings of the International Web Audio Conference", // No changes required
    editor: "Xambó, Anna and Martín, Sara R. and Roma, Gerard", //Write in bibtex format
    month: "December",
    publisher: "NTNU",
    series: "WAC '19",
    year: "2019",
    issn: "2663-5844", // No changes required
  };

  const xlToParse = "WAC19Metadata.xls"; //Change to current year's xls-file
  const tracks = [
    "Keynote",
    "Workshop",
    "Performance",
    "Artwork",
    "Demo",
    "Talk",
    "Poster",
    "Paper",
  ];

  for (let track of tracks) {
    excelToWeb(xlToParse, track, commonFields);
  }

  bibToWeb("src/_data/papers/bib/");

  config.addCollection("posts", (collection) => {
    return collection.getFilteredByGlob(["src/posts/*.md"]);
  });

  config.addPassthroughCopy("src/assets"); // To pass through css, images and scripts to output folder (dist)

  config.addPassthroughCopy("src/_data/papers");

  return {
    dir: {
      input: "src",
      output: "dist",
    },
    templateFormats: ["html", "md", "css", "liquid"],
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid",
    passthroughFileCopy: true,
  };
};
