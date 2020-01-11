const resultBlocks = require("../messageBlocks/results");
const database = require("../database");
const { chunk } = require("lodash")

const handle = async ({ app, token }) => {
  try {
    const round = database.getRound();
    const results = await computeAndSendRoundResults({ app, token, round });
    advanceCompetitors({ results, round });
    database.incrementRound();
  } catch (error) {
    console.error(error);
  }
};

const computeAndSendRoundResults = async ({ app, token, round }) => {
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
  return results;
}

const advanceCompetitors = ({ results, round }) => {
  const nextRoundMatches = chunk(results, 2)
    .map((resultPair, index) => {
      return {
        id: results.length + index,
        round: round + 1,
        competitor1: {
          value: resultPair[0].winner.value
        },
        competitor2: {
          value: resultPair[1].winner.value
        }
      }
    });
  database.insertMatches({ matches: nextRoundMatches });
}

exports.handle = handle;
