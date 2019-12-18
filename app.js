const { App } = require("@slack/bolt");
require("dotenv").config();
const appHomeOpenedListener = require("./listeners/appHomeOpened");
const reactionAddedListener = require("./listeners/reactionAdded");
const nextRoundMessageListener = require("./listeners/nextRoundMessage");
const whoWonMessageListener = require("./listeners/whoWonMessage");
const newRoundVoteListener = require("./listeners/newRoundVote");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.event("app_home_opened", async ({ event, context }) =>
  appHomeOpenedListener.handle({ app, event, context })
);
app.event("reaction_added", async ({ event, context }) =>
  reactionAddedListener.handle({ app, event, context })
);
// app.message("who's up next??", async ({ message, say }) =>
//   nextRoundMessageListener.handle({ message, say })
// );
// app.message("who won??", async ({ message, say }) =>
//   whoWonMessageListener.handle({ message, say })
// );
app.action("channel_select", ({ body, ack }) => {
  ack();
  console.log(body.actions[0].selected_channel);
});
app.action("start_round", ({ body, ack }) => {
  ack();
  newRoundVoteListener.handle({ body, app, token: process.env.SLACK_BOT_TOKEN });
});
app.action("end_round", ({ body, ack }) => {
  ack();
  console.log('i should end');
});
app.action("competitor_select", ({ body, ack }) => {
  ack();
  console.log(body.actions[0].selected_option.value);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
