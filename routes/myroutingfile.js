const express = require("express");
const prettier = require("prettier");

const router = express.Router();

// const userString = `router.get('/:eId', (req,res) => {Event.find({ "ename": { $regex: req.params.eId, $options: 'i' }})
//     .then((events) => res.json(events)).catch((err) => res.status(400).json('Error '+err));
// });`;

const formatCode = (userInpCode) => {
  const formattedCodeUsingPrettier = prettier.format(userInpCode, {
    semi: true,
    parser: "html",
  });

  return formattedCodeUsingPrettier;
};

router.post("/returnmsg", (req, res) => {
  let userInpCode = req.body.text;
  let formattedCode = formatCode(userInpCode);
  // console.log(userInpCode);
  res.send(formattedCode);
});

module.exports = router;
