exports.send = async ({ app, token, user, blocks, text }) => {
  const { channel } = await app.client.conversations.open({
    token,
    users: user
  })
  app.client.chat.postMessage({
    token,
    channel: channel.id,
    blocks,
    text
  });
}