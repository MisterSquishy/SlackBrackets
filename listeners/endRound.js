const resultBlocks = require("../messageBlocks/results");
const database = require("../database");
const { chunk } = require("lodash");

const MAX_MATCHES_PER_MESSAGE = 16;

const handle = async ({ app, token }) => {
  try {
    const round = database.getRound();
    const results = await computeAndSendRoundResults({ app, token, round });
    advanceCompetitors({ results, round });
  } catch (error) {
    console.error(error);
  }
};

const computeAndSendRoundResults = async ({ app, token, round }) => {
  const matches = database.getMatchesByRound({ round });
  const results = matches.map(match => {
    const unadjustedCompetitor1Votes = Object.keys(database.getVotes({
      matchId: match.id,
      competitorId: 1
    })).length;
    const unadjustedCompetitor2Votes = Object.keys(database.getVotes({
      matchId: match.id,
      competitorId: 2
    })).length;
    const { competitor1Votes, competitor2Votes } = maybeAdjustVoteCountsForTotallyAboveBoardReasons({
      match,
      competitor1Votes: unadjustedCompetitor1Votes,
      competitor2Votes: unadjustedCompetitor2Votes
    })
    const competitor1Won = competitor1Votes > competitor2Votes;
    const winner = competitor1Won ? match.competitor1 : match.competitor2;
    const winningVotes = competitor1Won ? competitor1Votes : competitor2Votes;
    const loser = competitor1Won ? match.competitor2 : match.competitor1;
    const losingVotes = competitor1Won ? competitor2Votes : competitor1Votes;

    return { winner, winningVotes, loser, losingVotes };
  });
  const { channel } = database.getChannel();
  chunk(results, MAX_MATCHES_PER_MESSAGE)
      .forEach(async resultChunk => {
        console.log(resultChunk)
        await app.client.chat.postMessage({
          token,
          channel,
          blocks: resultBlocks.blocks({ round, results: resultChunk })
        });
      });
  return results;
}

const maybeAdjustVoteCountsForTotallyAboveBoardReasons = ({ match, competitor1Votes, competitor2Votes }) => {
  if(competitor1Votes === competitor2Votes) {
    if (match.competitor1.value === 'stewart-butterfield') competitor1Votes = competitor1Votes + 1;
    else if (match.competitor2.value === 'stewart-butterfield') competitor2Votes = competitor2Votes + 1;
    else if (Math.random() >= 0.5) {
      competitor1Votes = competitor1Votes + 1;
    } else {
      competitor2Votes = competitor2Votes + 1;
    }
  }
  
  return { competitor1Votes, competitor2Votes };
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
          value: resultPair[1].winner.value // this crashes on non-powers of 2 (and the final round)
        }
      }
    });
  database.insertMatches({ matches: nextRoundMatches });
}

exports.handle = handle;
