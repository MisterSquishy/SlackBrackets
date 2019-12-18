const database = require("../database");

const handle = async ({ app, event, context }) => {
  try {
    if (event.item_user === context.botUserId && event.reaction === 'hand') {
      database.pushUser({ userId: event.user });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.handle = handle;
