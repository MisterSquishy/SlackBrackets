const voteBlocks = require("../messageBlocks/vote");
const database = require("../database");

const handle = async ({ user, value }) => {
  try {
    const round = database.getRound().index;	
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
  } catch (error) {
    console.error(error);
  }
};

exports.handle = handle;
