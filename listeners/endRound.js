const resultBlocks = require("../messageBlocks/results");
const database = require("../database");

const handle = async ({ app, token }) => {
  try {
    const round = database.getRound();
    const matches = database.getMatchesByRound({ round });
    const results = matches.map(match => {
      const competitor1Votes = Object.keys(database.getVotes({
        matchId: match.id,
        competitorId: 1
      })).length;
      const competitor2Votes = Object.keys(database.getVotes({
        matchId: match.id,
        competitorId: 2
      })).length;
      const competitor1Won = competitor1Votes > competitor2Votes;
      const winner = competitor1Won ? match.competitor1 : match.competitor2;
      const winningVotes = competitor1Won ? competitor1Votes : competitor2Votes;
      const loser = competitor1Won ? match.competitor2 : match.competitor1;
      const losingVotes = competitor1Won ? competitor2Votes : competitor1Votes;

      return { winner, winningVotes, loser, losingVotes };
    });
    const { channel } = database.getChannel();
    const result = await app.client.chat.postMessage({
      token,
      channel,
      blocks: resultBlocks.blocks({ round, results })
    });
  } catch (error) {
    console.error(error);
  }
};

//tally votes

//increment round

exports.handle = handle;
