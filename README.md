# Website

## Get started

1. Run "npm install" to install dependencies

2. Run "npx eleventy --serve" to generate output folder called "dist" and to start servers.

## Website purpose

This website serves all previous proceedings of the Web Audio Conference. All proceedings are listed by year and track (Papers, posters, Talks etc), and each proceeding has its own webpage, displaying its abstract, BibTex, and link to PDF and video if these are available.

## Built with

- Basics: HTML, CSS, Javascript, Markdown, Liquid, YAML
- [11ty](https://www.11ty.io/) - Static site generator
- [Bootstrap](https://getbootstrap.com/) - Front-end component library (Styling, responsive design)
- External Node packages (npm modules)
  - [bibtex-parse](https://www.npmjs.com/package/bibtex-parse) - Parse BibTeX to JSON
  - [xls-to-json](https://www.npmjs.com/package/xls-to-json) - Converts XLS files to JSON

## How it has been built

Since there are a lot of proceedings, and there will be plenty more every year into the future, it is preferable to have this part of the website "build itself".

Every "proceeding-page" from 2015 until 2018 are built by extracting data from BibTeX-collections. This has been achived using the bibtex-parse package, which is used in the module called "bibToWeb.js". In this module we convert the BibTeX-collection to JSON, loop through the JSON data, and extract the data we want to have diplayed on the website, or present in the BibTeX we display on the "proceeding-pages". The extracted data is then written to markdown-files as YAML. When the loop is finished it has built a markdown-file for each proceeding, and these files are what is passed to the output directory (dist) during the build process (more details later).

When 11ty builds the website it looks in its configuration file, called .eleventy.js. Here we run the bibToWeb.js module, so that it is included in the build process. If this is how 11ty wants me to do things...I have no idea, but it turned out to work.

## From 2019 and into the future!

From 2019 and forward the plan is to build these "proceeding-pages" from excel files. This has been achived using the module called xls-to-json, which converts excel-sheets to JSON, and is used in the module called excelToWeb.js. The extraction and build process is then almost identical to the one in bibToWeb.

There are some issues that have to be addressed before this is a viable option..to be continued.

## Code optimalization and improved automation
