var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('.data/db.json')
var db = low(adapter)

const brackets =
  [
    {
      "id": 1
    }
  ]

const matches =
  [
    {
      "id": 1,
      "bracketId": 1,
      "round": 1,
      "competitor1": ":+1:",
      "competitor2": ":-1:",
    },
    {
      "id": 2,
      "bracketId": 1,
      "round": 1,
      "competitor1": ":wave:",
      "competitor2": ":grin:",
    },
    {
      "id": 3,
      "bracketId": 1,
      "round": 1,
      "competitor1": ":joy:",
      "competitor2": ":-1:",
    },
    {
      "id": 4,
      "bracketId": 1,
      "round": 1,
      "competitor1": ":test:",
      "competitor2": ":whoops:",
    }
  ]

const votes = []

const round = [
  {
    "index": 1
  }
]

const data = { brackets, matches, votes, round }

db.defaults(data).write();

const getBracket = ({ bracketId }) =>
  db.get('brackets')
    .find({ id: bracketId })
    .value();

const getMatch = ({ id }) =>
  db.get('matches')
    .filter(match => match.id === id)
    .find()
    .value();

const getMatchesByRound = ({ round }) =>
  db.get('matches')
    .filter(match => match.round === round)
    .value();

const getRound = () =>
  db.get('round')
    .find()
    .value();

const addVote = ({ round, userId, competitor }) =>
  db.get('votes')
    .push({ round, userId, competitor }) //todo why doesnt this work
    .write();

const removeVote = ({ matchId, userId, competitor }) =>
  db.get('votes')
    .remove({ matchId, userId, competitor })
    .write();

const getVotes = ({ matchId, competitorId }) =>
  db.get('votes')
    .filter(vote => vote.matchId === matchId && vote.competitorId === competitorId)
    // .groupBy(vote => vote.userId) todo figure out how to do this
    .write();


exports.getBracket = getBracket;
exports.getMatch = getMatch;
exports.getMatchesByRound = getMatchesByRound;
exports.getRound = getRound;
exports.addVote = addVote;
exports.removeVote = removeVote;
exports.getVotes = getVotes;
