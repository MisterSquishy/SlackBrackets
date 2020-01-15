const { App } = require("@slack/bolt");
require("dotenv").config();
const appHomeOpenedListener = require("./listeners/appHome");
const reactionAddedListener = require("./listeners/reactionAdded");
const endRoundListener = require("./listeners/endRound");
const newRoundListener = require("./listeners/newRound");
const channelSelectedListener = require("./listeners/channelSelected");
const getVotersListener = require("./listeners/getVoters");
const voteReceivedListener = require("./listeners/voteReceived");
const captainOptInListener = require("./listeners/captainOptIn");

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
app.action("captain_opt_in", ({ body, ack }) => {
  ack();
  captainOptInListener.handle({ user: body.user.id });
});
app.action("start_round", ({ body, ack }) => {
  ack();
  newRoundListener.handle({ body, app, token });
});
app.action("end_round", ({ ack }) => {
  ack();
  endRoundListener.handle({ app, token })
});
app.action("competitor_select", ({ body, ack }) => {
  ack();
  voteReceivedListener.handle({ app, token, user: body.user.id, value: body.actions[0].selected_option.value })
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
