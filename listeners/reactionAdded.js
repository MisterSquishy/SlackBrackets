const database = require("../database");

const handle = async ({ app, event, context, token }) => {
  try {
    if (event.item_user === context.botUserId &&
        event.reaction === 'hand' &&
        database.getUsers().filter(({ userId }) => userId === event.user).length === 0) {
      database.pushUser({ userId: event.user });
      await app.client.chat.postMessage({
        token,
        channel: event.user,
        text: "You're in!! Hang tight and wait for the next round to start."
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.handle = handle;
