const database = require("../database");
const DM = require("../utils/DM")

const handle = async ({ app, event, context, token }) => {
  try {
    maybeAddNewVoter({ app, event, context, token })
  } catch (error) {
    console.error(error);
  }
};

const maybeAddNewVoter = async ({ app, event, context, token }) => {
  const { channel } = database.getChannel();
  if (event.item.channel === channel &&
      event.reaction === 'hand' &&
      database.getUsers().filter(({ userId }) => userId === event.user).length === 0) {
    database.pushUser({ userId: event.user });
    await DM.send({ app, token, user: event.user, text: "You're in!! Hang tight and wait for the next round to start." });
  }
}

exports.handle = handle;
