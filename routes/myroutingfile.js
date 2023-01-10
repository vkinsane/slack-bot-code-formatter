const express = require("express");
const prettier = require("prettier");
const Axios = require("axios");
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

router.post("/returnmsg", async (req, res) => {
  let userInpCode = req.body.text;
  let formattedCode = formatCode(userInpCode);
  // console.log(userInpCode);
  await Axios.post(
    `https://hooks.slack.com/services/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`,
    {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: formattedCode,
          },
        },
      ],
    }
  );
  res.end();
  // return res.send("here is your formatted code");
});

module.exports = router;
