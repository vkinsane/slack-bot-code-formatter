const express = require("express");
const prettier = require("prettier");
const Axios = require("axios");
const router = express.Router();

var parserValue = "babel"; //default value
var bot_logo =
  "https://avatars.slack-edge.com/2023-01-10/4619537860514_fd3e1b2e5c2dbdb645c6_32.png";

var formattedCode;
const getBlockKitObj = (formattedCode) => {
  return {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Your formatted code is:*",
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: formattedCode,
        },
      },
      {
        type: "divider",
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "*Thank you for using* <https://www.zipy.ai/|Code Formatter>",
          },
          {
            type: "image",
            image_url: bot_logo,
            alt_text: "bot logo",
          },
        ],
      },
    ],
  };
};
const formatCode = (userInpCode) => {
  const formattedCodeUsingPrettier = prettier.format(userInpCode, {
    semi: true, //try
    parser: parserValue,
  });

  return formattedCodeUsingPrettier;
};
var webhook =
  "https://hooks.slack.com/services/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";

router.post("/returnmsg", async (req, res) => {
  let userInpCode = req.body.text;
  formattedCode = formatCode(userInpCode);
  parserValue = "babel";
  await Axios.post(webhook, getBlockKitObj(formattedCode));
  res.end();
});

// -------------------------------------------------------- Format HTML --------------------------------------------------------
/*
<html>
 <head>
   <title>Page Title</title>
 </head>
 <body><h1>This is a Heading</h1><p>This is a paragraph.</p>
 </body>
</html>
*/
router.post("/formathtml", async (req, res) => {
  let userInpCode = req.body.text;
  parserValue = "html";
  formattedCode = formatCode(userInpCode);
  await Axios.post(webhook, getBlockKitObj(formattedCode));
  res.end();
});

// -------------------------------------------------------- Format CSS --------------------------------------------------------
/*
p {
  color: red; text-align: center;
} 
*/
router.post("/formatcss", async (req, res) => {
  let userInpCode = req.body.text;
  parserValue = "css";
  formattedCode = formatCode(userInpCode);
  await Axios.post(webhook, getBlockKitObj(formattedCode));
  res.end();
});

// -------------------------------------------------------- Format Javascript --------------------------------------------------------
/*
// generating  a random number
const a = Math.random(); console.log(a);
*/
router.post("/formatjs", async (req, res) => {
  let userInpCode = req.body.text;
  parserValue = "babel";
  formattedCode = formatCode(userInpCode);
  await Axios.post(webhook, getBlockKitObj(formattedCode));
  res.end();
});

// -------------------------------------------------------- Help Box --------------------------------------------------------
var helpBlockKitObj = {
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Hey! Welcome to Code Formatter*",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Use */language-name <code>* Languages supported are-",
      },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: "*/html*",
        },
        {
          type: "plain_text",
          text: "Hypertext Markup Language",
        },
      ],
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: "*/css*",
        },
        {
          type: "plain_text",
          text: "Cascading Style Sheets",
        },
      ],
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: "*/js*",
        },
        {
          type: "plain_text",
          text: "JavaScript",
        },
      ],
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: "*/jsx*",
        },
        {
          type: "plain_text",
          text: "JavaScript XML",
        },
      ],
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: "*/hbs*",
        },
        {
          type: "plain_text",
          text: "Ember/Handlebars",
        },
      ],
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: "*/angular*",
        },
        {
          type: "plain_text",
          text: "AngularJS",
        },
      ],
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: "*/scss*",
        },
        {
          type: "plain_text",
          text: "Syntactically Awesome Style Sheet",
        },
      ],
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: "*/less*",
        },
        {
          type: "plain_text",
          text: "Less.js",
        },
      ],
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: "*/typescript*",
        },
        {
          type: "plain_text",
          text: "TypeScript",
        },
      ],
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: "*/flow*",
        },
        {
          type: "plain_text",
          text: "FLOW",
        },
      ],
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: "*/json*",
        },
        {
          type: "plain_text",
          text: "JavaScript Object Notation",
        },
      ],
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: "*/graphql*",
        },
        {
          type: "plain_text",
          text: "GRAPH Query Language",
        },
      ],
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: "*/yaml*",
        },
        {
          type: "plain_text",
          text: "YAML Ain't markup language",
        },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: "*Thank you for using* <https://www.zipy.ai/|Code Formatter>",
        },
        {
          type: "image",
          image_url: bot_logo,
          alt_text: "bot logo",
        },
      ],
    },
  ],
};
router.post("/gethelp", async (req, res) => {
  await Axios.post(webhook, helpBlockKitObj);
  res.end();
});

module.exports = router;

// https://604e-123-201-214-8.in.ngrok.io
// https://9315-123-201-214-8.in.ngrok.io
// https://github.com/vkinsane/slack-bot-code-formatter/tree/master
// const userString = `router.get('/:eId', (req,res) => {Event.find({ "ename": { $regex: req.params.eId, $options: 'i' }})
//     .then((events) => res.json(events)).catch((err) => res.status(400).json('Error '+err));
// });`;
