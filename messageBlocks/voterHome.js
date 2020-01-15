const randomPuppy = require('random-puppy');

exports.blocks = async () => {
  const pup = await randomPuppy()

  return [
    {
      "type": "image",
      "title": {
        "type": "plain_text",
        "text": "here's a puppy for you",
        "emoji": true
      },
      "image_url": pup,
      "alt_text": "image1"
    }
  ]
}
