const express = require("express");
const prettier = require("prettier");
const Axios = require("axios");
const router = express.Router();

var bot_logo =
  "https://avatars.slack-edge.com/2023-01-10/4619537860514_fd3e1b2e5c2dbdb645c6_32.png";

var formattedCode;

const getBlockKitObj = (formattedCode, userName) => {
  return {
    response_type: "in_channel",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*@${userName} sent this code:*`,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          // text: "formattedCode",
          text: "```" + formattedCode + "```",
        },
      },
      {
        type: "divider",
      },
      // {
      //   type: "context",
      //   elements: [
      //     {
      //       type: "mrkdwn",
      //       text: "*Thank you for using* <https://www.zipy.ai/|Code Formatter>",
      //     },
      //     {
      //       type: "image",
      //       image_url: bot_logo,
      //       alt_text: "bot logo",
      //     },
      //   ],
      // },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "*Thank you for using Code Formatter by* <https://www.zipy.ai|Zipy.ai>",
          },
          {
            type: "image",
            image_url: "https://i.imgur.com/UlvWRpP.png",
            alt_text: "Zipy.ai",
          },
        ],
      },
    ],
  };
};

const getHelpBlockKitObj = (userName) => {
  return {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Hey! @${userName} Welcome to Code Formatter*`,
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
            text: "*Thank you for using Code Formatter by* <https://www.zipy.ai|Zipy.ai>",
          },
          {
            type: "image",
            image_url: "https://i.imgur.com/UlvWRpP.png",
            alt_text: "Zipy.ai",
          },
        ],
      },
    ],
  };
};

const formatCode = (userInpCode, parserValue) => {
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
  console.log(req.body.text);
  await Axios.post(webhook, userInpCode);
});

const sendCodeFormattedResponse = async (requestBody, parserValue) => {
  formattedCode = formatCode(requestBody.text, parserValue);
  // return getBlockKitObj(formattedCode, requestBody.user_name);
  return Axios.post(
    requestBody.response_url,
    getBlockKitObj(formattedCode, requestBody.user_name)
  );
};

const sendErrorResponse = async (requestBody, error) => {
  // console.log(error);
  var errorString = error.toString();
  // var errorToDisplay = errorString.substr(
  //   0,
  //   errorString.indexOf(" ", errorString.indexOf("https"))
  // );
  // var errorToDisplay = errorString.substr(0, 200);
  var errorToDisplay = errorString.substr(0, errorString.indexOf("\n"));

  var errorResponseObj = {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Sorry :cry: An error occured \n ${errorToDisplay}`,
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
            text: "*Thank you for using Code Formatter by* <https://www.zipy.ai|Zipy.ai>",
          },
          {
            type: "image",
            image_url: "https://i.imgur.com/UlvWRpP.png",
            alt_text: "Zipy.ai",
          },
        ],
      },
    ],
  };
  return Axios.post(requestBody.response_url, errorResponseObj);
};

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
  console.log(req.body.response_url);
  try {
    // res.send(await sendCodeFormattedResponse(req.body, "html"));
    await sendCodeFormattedResponse(req.body, "html");
  } catch (error) {
    // res.send(sendErrorResponse(error));
    await sendErrorResponse(req.body, error);
  }
  res.end();
});

// -------------------------------------------------------- Format CSS --------------------------------------------------------
/*
p {
  color: red; text-align: center;
} 
*/
router.post("/formatcss", async (req, res) => {
  // try {
  //   res.send(sendCodeFormattedResponse(req.body, "css"));
  // } catch (error) {
  //   res.send(sendErrorResponse(error));
  // }
  try {
    await sendCodeFormattedResponse(req.body, "css");
  } catch (error) {
    await sendErrorResponse(req.body, error);
  }
  res.end();
});

// -------------------------------------------------------- Format Javascript --------------------------------------------------------
/*
// generating  a random number
const a = Math.random(); console.log(a);
*/
router.post("/formatjs", async (req, res) => {
  // try {
  //   res.send(sendCodeFormattedResponse(req.body, "babel"));
  // } catch (error) {
  //   res.send(sendErrorResponse(error));
  // }
  try {
    await sendCodeFormattedResponse(req.body, "babel");
  } catch (error) {
    await sendErrorResponse(req.body, error);
  }
});

// -------------------------------------------------------- Format JSX --------------------------------------------------------
/*
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

*/
router.post("/formatjsx", async (req, res) => {
  // try {
  //   res.send(sendCodeFormattedResponse(req.body, "babel"));
  // } catch (error) {
  //   res.send(sendErrorResponse(error));
  // }
  try {
    await sendCodeFormattedResponse(req.body, "babel");
  } catch (error) {
    await sendErrorResponse(req.body, error);
  }
});

// -------------------------------------------------------- Format hbs(Remaining) --------------------------------------------------------
/*
 ======== to do

router.post("/formathbs", async (req, res) => {
  try {
    res.send(sendCodeFormattedResponse(req.body, ""));
  } catch (error) {
    res.send(sendErrorResponse(error));
  }
  
});
*/

// -------------------------------------------------------- Format angular --------------------------------------------------------
/*
<div ng-app="">

<p>Name: <input type="text" ng-model="name"></p>
<p>You wrote: {{ name }}</p>

</div>
*/
router.post("/formatangular", async (req, res) => {
  // try {
  //   res.send(sendCodeFormattedResponse(req.body, "angular"));
  // } catch (error) {
  //   res.send(sendErrorResponse(error));
  // }
  try {
    await sendCodeFormattedResponse(req.body, "angular");
  } catch (error) {
    await sendErrorResponse(req.body, error);
  }
});

// -------------------------------------------------------- Format scss --------------------------------------------------------
/*
$bgcolor: lightblue;
$textcolor: darkblue;
$fontsize: 18px;

// Use the variables 
body {
  background-color: $bgcolor;
 color: $textcolor;
 font-size: $fontsize;
}

*/
router.post("/formatscss", async (req, res) => {
  // try {
  //   res.send(sendCodeFormattedResponse(req.body, "scss"));
  // } catch (error) {
  //   res.send(sendErrorResponse(error));
  // }
  try {
    await sendCodeFormattedResponse(req.body, "scss");
  } catch (error) {
    await sendErrorResponse(req.body, error);
  }
});

// -------------------------------------------------------- Format less --------------------------------------------------------
/*

*/
router.post("/formatless", async (req, res) => {
  // try {
  //   res.send(sendCodeFormattedResponse(req.body, "less"));
  // } catch (error) {
  //   res.send(sendErrorResponse(error));
  // }
  try {
    await sendCodeFormattedResponse(req.body, "less");
  } catch (error) {
    await sendErrorResponse(req.body, error);
  }
});

// -------------------------------------------------------- Format typescript --------------------------------------------------------
/*
 ========
*/
router.post("/formattypescript", async (req, res) => {
  // try {
  //   res.send(sendCodeFormattedResponse(req.body, "typescript"));
  // } catch (error) {
  //   res.send(sendErrorResponse(error));
  // }
  try {
    await sendCodeFormattedResponse(req.body, "typescript");
  } catch (error) {
    await sendErrorResponse(req.body, error);
  }
});

// -------------------------------------------------------- Format flow --------------------------------------------------------
/*
 ========
*/
router.post("/formatflow", async (req, res) => {
  // try {
  //   res.send(sendCodeFormattedResponse(req.body, "flow"));
  // } catch (error) {
  //   res.send(sendErrorResponse(error));
  // }
  try {
    await sendCodeFormattedResponse(req.body, "flow");
  } catch (error) {
    await sendErrorResponse(req.body, error);
  }
});

// -------------------------------------------------------- Format JSON --------------------------------------------------------
/*
 ========
*/
router.post("/formatjson", async (req, res) => {
  // try {
  //   res.send(sendCodeFormattedResponse(req.body, "json"));
  // } catch (error) {
  //   res.send(sendErrorResponse(error));
  // }
  try {
    await sendCodeFormattedResponse(req.body, "json");
  } catch (error) {
    await sendErrorResponse(req.body, error);
  }
});

// -------------------------------------------------------- Format GraphQL --------------------------------------------------------
/*
 ========
*/
router.post("/formatgraphql", async (req, res) => {
  // try {
  //   res.send(sendCodeFormattedResponse(req.body, "graphql"));
  // } catch (error) {
  //   res.send(sendErrorResponse(error));
  // }
  try {
    await sendCodeFormattedResponse(req.body, "graphql");
  } catch (error) {
    await sendErrorResponse(req.body, error);
  }
});

// -------------------------------------------------------- Format YAML --------------------------------------------------------
/*
 ========
*/
router.post("/formatyaml", async (req, res) => {
  // try {
  //   res.send(sendCodeFormattedResponse(req.body, "yaml"));
  // } catch (error) {
  //   res.send(sendErrorResponse(error));
  // }
  try {
    await sendCodeFormattedResponse(req.body, "yaml");
  } catch (error) {
    await sendErrorResponse(req.body, error);
  }
});

// -------------------------------------------------------- Help Box --------------------------------------------------------

router.post("/gethelp", async (req, res) => {
  res.send(getHelpBlockKitObj(req.body.user_name));
});

module.exports = router;

// https://604e-123-201-214-8.in.ngrok.io
// https://9315-123-201-214-8.in.ngrok.io
// https://e914-123-201-215-218.in.ngrok.io/
// https://github.com/vkinsane/slack-bot-code-formatter/tree/master
// const userString = `router.get('/:eId', (req,res) => {Event.find({ "ename": { $regex: req.params.eId, $options: 'i' }})
//     .then((events) => res.json(events)).catch((err) => res.status(400).json('Error '+err));
// });`;

//req.body object:
// {
//   token: 'RrR2DOWfm6ju7ncdLUjUWHaB',
//   team_id: 'T04JVH2FK1N',
//   team_domain: 'bot-workspace-2',
//   channel_id: 'C04JJFA5Q1X',
//   channel_name: 'working-on-slack-bot',
//   user_id: 'U04J5RZL14J',
//   user_name: 'khandate.vishal03',
//   command: '/html',
//   text: '<!DOCTYPE html>\n' +
//     '<html>\n' +
//     '<head>\n' +
//     '<title>Page Title</title>\n' +
//     '</head>\n' +
//     '<body>\n' +
//     '\n' +
//     '<h1>This is a Heading</h1>\n' +
//     '<p>This is a paragraph.</p>\n' +
//     '\n' +
//     '</body>\n' +
//     '</html>',
//   api_app_id: 'A04HZ8SFJS2',
//   is_enterprise_install: 'false',
//   response_url: 'https://hooks.slack.com/commands/T04JVH2FK1N/4617966832166/nh0LnaQF5jvm6iAc0chQIyxx',
//   trigger_id: '4621623133925.4641580529056.1f8e5155e8946fc3041644b2269780ac'
// }

// /html Hypertext Markup Language
// /css Cascading Style Sheets
// /js JavaScript
// /jsx JavaScript XML
// /hbs Ember/Handlebars
// /angular AngularJS
// /scss Syntactically Awesome Style Sheet
// /less Less.js
// /typescript TypeScript
// /flow FLOW
// /json JavaScript Object Notation
// /graphql GRAPH Query Language
// /yaml YAML Ain't markup language
