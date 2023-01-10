const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// const bodyParser = require("body-parser");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());

const routingfile = require("./routes/myroutingfile");
const { urlencoded } = require("express");
app.use("/", routingfile);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
