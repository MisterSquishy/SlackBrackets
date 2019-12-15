const handleAppHomeOpened = async ({ app, event, context }) => {
  try {
    const result = await app.client.views.publish({
      token: context.botToken,
      user_id: event.user,

      view: {
        type: "home",
        callback_id: "home_view",

        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text:
                "I would *like* to build a bracket creation/editing interface here!"
            }
          }
        ]
      }
    });
  } catch (error) {
    console.error(error);
  }
};

exports.handle = handleAppHomeOpened;
