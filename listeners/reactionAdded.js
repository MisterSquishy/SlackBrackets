const database = require("../database");

const handle = async ({ app, event, context }) => {
  try {
    if (event.item_user === context.botUserId) {
      const round = database.getRound().index;
      const matches = database.getMatchesByRound({ round });
      const matchWithCompetitor = matches.find(
        match =>
          match.competitor1.includes(event.reaction) ||
          match.competitor2.includes(event.reaction)
      );
      if (!matchWithCompetitor) {
        //todo DM??
        console.log("idiot");
        return;
      }
      database.addVote({
        round: round,
        matchId: matchWithCompetitor.id,
        userId: event.user,
        competitorId: matchWithCompetitor.competitor1.includes(event.reaction)
          ? 1
          : 2
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.handle = handle;
