const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/../../config.env` });
const app = require(`${__dirname}/../apps/app.js`);

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
