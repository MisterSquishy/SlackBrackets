const database = require("../database");

const handle = async ({ app, event, context, token }) => {
  try {
    maybeAddNewVoter({ app, event, context, token })
  } catch (error) {
    console.error(error);
  }
};

const maybeAddNewVoter = async ({ app, event, context, token }) => {
  if (event.reaction === 'hand' &&
      database.getUsers().filter(({ userId }) => userId === event.user).length === 0) {
    database.pushUser({ userId: event.user });
    await app.client.chat.postMessage({
      token,
      channel: event.user, //'DSDF4HLNM',
      text: "You're in!! Hang tight and wait for the next round to start."
    });
  }
}

exports.handle = handle;
