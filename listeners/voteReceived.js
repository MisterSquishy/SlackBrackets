const voteBlocks = require("../messageBlocks/vote");
const database = require("../database");

const handle = async ({ app, token, user, value }) => {
  try {
    const round = database.getRound();	
    const matches = database.getMatchesByRound({ round });	
    const matchWithCompetitor = matches.find(	
      match =>	
        match.competitor1.value === value ||	
        match.competitor2.value === value
    );	
    if (!matchWithCompetitor) {	
      //todo DM?? should be impossible
      console.log("idiot");	
      return;	
    }	
    database.addVote({	
      round: round,	
      matchId: matchWithCompetitor.id,	
      userId: user,	
      competitorId: matchWithCompetitor.competitor1.value === value
        ? 1	
        : 2	
    });
    await app.client.chat.postMessage({
      token,
      channel: user,
      text: "Got your vote for :" + value + ":. Change it anytime by resubmitting!"
    });
  } catch (error) {
    console.error(error);
  }
};

exports.handle = handle;
