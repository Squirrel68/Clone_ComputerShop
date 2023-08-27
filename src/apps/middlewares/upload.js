const multer = require("multer");
const tmpRoute = `${__dirname}/../../tmp`;
const upload = multer({
  dest: tmpRoute,
});
module.exports = upload;
