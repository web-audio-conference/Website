const fs = require("fs");

const year = "2019";
const dir = `src/_data/papers/pdf/${year}/`;
const oldName = "CameraReadySubmission";

for (ID = 0; ID < 100; ID++) {
  try {
    fs.renameSync(`${dir}${oldName} ${ID}.pdf`, `${dir}${year}_${ID}.pdf`);
  } catch (error) {}
}
