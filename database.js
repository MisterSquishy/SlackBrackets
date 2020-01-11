const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync"); //todo concurrency
const adapter = new FileSync(".data/db.json");
const competitors = require("./competitors");
const { chunk } = require("lodash")
var db = low(adapter);

const brackets = [
  {
    id: 1
  }
];

const matches = chunk(competitors.get(), 2).map((competitors, index) => {
  return {
    id: index,
    round: 1,
    competitor1: {
      value: competitors[0],
    },
    competitor2: {
      value: competitors[1],
    }
  }
});
const votes = [];
const channel = [];
const users = [];
const captain = {};

const round = 1;

const data = { brackets, matches, votes, round, channel, users, captain };
db.defaults(data).write();

const getBracket = ({ bracketId }) =>
  db
    .get("brackets")
    .find({ id: bracketId })
    .value();

const resetMatches = () =>
  db.unset("matches").write();
  db.defaults({ matches }).write();

const getMatch = ({ id }) =>
  db
    .get("matches")
    .filter(match => match.id === id)
    .find()
    .value();

const getMatchesByRound = ({ round }) =>
  db
    .get("matches")
    .filter(match => match.round === round)
    .value();

const insertMatches = ({ matches }) =>
  matches.forEach(match => db
    .get("matches")
    .push(match)
    .value());

const getRound = () =>
  db
    .get("round")
    .value();

const incrementRound = () =>
  db
    .update("round", round => round + 1)
    .write()

const resetRound = () =>
  db
    .set("round", 1)
    .write()

const addVote = ({ round, matchId, userId, competitorId }) =>
  db
    .get("votes")
    .push({ round, matchId, userId, competitorId })
    .write();

const removeVote = ({ round, matchId, userId, competitorId }) =>
  db
    .get("votes")
    .remove({ round, matchId, userId, competitorId })
    .write();

const getVotes = ({ matchId, competitorId }) =>
  db
    .get("votes")
    .filter(
      vote => vote.matchId === matchId && vote.competitorId === competitorId
    )
    .groupBy(vote => vote.userId)
    .write();

const getChannel = () =>
  db
    .get("channel")
    .find()
    .value();

const setChannel = ({ channel }) =>
  db
    .set("channel", [ { channel } ])
    .write()

const getUsers = () =>
  db
    .get("users")
    .value();

const pushUser = ({ userId }) =>
  db
    .get("users")
    .push({ userId })
    .value();

const resetUsers = () =>
  db
    .get("users")
    .remove()
    .write();

const resetVotes = () =>
  db
    .get("votes")
    .remove()
    .write();

const getCaptain = () =>
  db
    .get("captain")
    .write();

const setCaptain = ({ captain }) =>
  db
    .set("captain", { captain })
    .write();

exports.getBracket = getBracket;
exports.resetMatches = resetMatches;
exports.getMatch = getMatch;
exports.getMatchesByRound = getMatchesByRound;
exports.insertMatches = insertMatches;
exports.getRound = getRound;
exports.incrementRound = incrementRound;
exports.resetRound = resetRound;
exports.addVote = addVote;
exports.removeVote = removeVote;
exports.getVotes = getVotes;
exports.getChannel = getChannel;
exports.setChannel = setChannel;
exports.getUsers = getUsers;
exports.pushUser = pushUser;
exports.resetUsers = resetUsers;
exports.resetVotes = resetVotes;
exports.getCaptain = getCaptain;
exports.setCaptain = setCaptain;
