const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());

const routingfile = require("./routes/myroutingfile");

app.use("/", routingfile);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
