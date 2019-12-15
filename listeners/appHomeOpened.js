const appHome = require("../messageBlocks/appHome");


const handleAppHomeOpened = async ({ app, event, context }) => {
  try {
    const result = await app.client.views.publish({
      token: context.botToken,
      user_id: event.user,

      view: {
        type: "home",
        callback_id: "home_view",

        blocks: appHome.blocks()
      }
    });
  } catch (error) {
    console.error(error);
  }
};

exports.handle = handleAppHomeOpened;
