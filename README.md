# Web Audio Conference website

## Get started

1. Install Node.js from [Node.js](https://nodejs.org/en/) or [NVM](https://github.com/nvm-sh/nvm).
2. Clone the repository
3. Run "npm install" to install dependencies.

### Process of adding a new year

- Export the xls-file from CMT.
- Go through the xls-file.
  1. Make sure it has no special caracters in the author names, captitalised names etc.
  2. Add columns in the xls-files for pagination and Media-links. You can take a look at the [xls-file from 2019](src/_data/papers/excel) and see how it should be added.
  3. The script seperates names by the character ";". Make sure that character is not used for anything else in "Author Names".
- Add all the pdf's to a new folder with the current year in [this folder](src/_data/papers/pdf).
- Every pdf should be named in the format "year_id". You can use the script [pdfRename](pdfRename.js) to rename every pdf in the new folder to this format. to run it write "node pdfRename.js" in the terminal.
- Go to [ProceedingsTemp.html](ProceedingsTemp.html), and edit all occurences of 2019 to the year of the new proceedings. Also make sure to add/remove tracks to fit your xls-file if needed.
- Copy the edited code and paste it above the last year (line 30) in [proceedings.html](src/proceedings.html).
- Go to [eleventy.js](.eleventy.js) and edit the commonFields object values (line 7 to 14) to the values of the current proceedings.
- Change the name of the xls-file to the current year's xls-file on line 17.
- Make sure you have saved both eleventy.js and proceedings.html.
- Run "npm start" in the terminal. This will build the dist-folder which can be served on https://webaudioconf.com/.

If you encounter problems, it might be due to unexpected differences in the xls-file for the current year to the last year. You can debug what is going wrong in the terminal. I have not made the system handle all possible exceptions. If you have to (and please, if you want to) you can update [excelToWeb.js](excelToWeb.js) and make it handle your exceptions.

All updates to the system that will improve the smooothness and lead to fewer steps needed for updating the proceedings are very much welcome!

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

Every "proceeding-page" from 2015 until 2018 are built by extracting data from BibTeX-collections. This has been achived using the bibtex-parse package, which is used in the module called "bibToWeb.js". In this module we convert the BibTeX-collection to JSON, loop through the JSON data, and extract the data we want to have diplayed on the website, or present in the BibTeX we display on the "proceeding-pages". The extracted data is then written to markdown-files as YAML. When the loop is finished it has built a markdown-file for each proceeding, and these files are what is passed to the output directory (dist) during the build process.

When 11ty builds the website it looks in its configuration file, called .eleventy.js. Here we run the bibToWeb.js module, so that it is included in the build process. If this is how 11ty wants me to do things...I have no idea, but it turned out to work.

## From 2019 and into the future!

From 2019 and forward we build these "proceeding-pages" from excel files. This has been achived using the module called xls-to-json, which converts excel-sheets to JSON, and is used in the module called excelToWeb.js. The extraction and build process is then almost identical to the one in bibToWeb.

## Code optimalization and improved automation of adding a new year

The code is written to do its work, and few iterations are made. If you want to contribute, please do all the improvements you see necessary. Maybe the most needed work to be done it to automate step involving changes to proceedings.html. it should be possible to eliminate these steps completely. Not all the files that are passed to the dist-folder are necessary to serve, so if you want you can exclude them in eleventy.js.

## Improving design

Design has not been the main focus of the work done on this project. If you have some design and css skills, please make a new design branch and push some design updates!
