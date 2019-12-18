const { App } = require("@slack/bolt");
require("dotenv").config();
const appHomeOpenedListener = require("./listeners/appHomeOpened");
const reactionAddedListener = require("./listeners/reactionAdded");
const whoWonMessageListener = require("./listeners/whoWonMessage");
const newRoundVoteListener = require("./listeners/newRoundVote");
const channelSelectedListener = require("./listeners/channelSelected");
const getVotersListener = require("./listeners/getVoters");
const comptitorSelectedHandler = require("./listeners/competitorSelected");

const token = process.env.SLACK_BOT_TOKEN
const app = new App({
  token,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.event("app_home_opened", async ({ event, context }) =>
  appHomeOpenedListener.handle({ app, event, context })
);
app.event("reaction_added", async ({ event, context }) =>
  reactionAddedListener.handle({ app, event, context, token })
);
app.action("channel_select", ({ body, ack }) => {
  ack();
  channelSelectedListener.handle({ channel: body.actions[0].selected_channel });
});
app.action("start_round", ({ body, ack }) => {
  ack();
  newRoundVoteListener.handle({ body, app, token });
});
app.action("end_round", ({ ack }) => {
  ack();
  whoWonMessageListener.handle({ app, token })
});
app.action("competitor_select", ({ body, ack }) => {
  ack();
  comptitorSelectedHandler.handle({ user: body.user.id, value: body.actions[0].selected_option.value })
});
app.action("get_voters", ({ ack }) => {
  ack();
  getVotersListener.handle({ app, token });
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
