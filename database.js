const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync"); //todo concurrency
const adapter = new FileSync(".data/db.json");
var db = low(adapter);

const brackets = [
  {
    id: 1
  }
];

const matches = [
  {
    id: 1,
    bracketId: 1,
    round: 1,
    competitor1: {
      value: "+1",
      seed: 1
    },
    competitor2: {
      value: "-1",
      seed: 16
    }
  },
  {
    id: 2,
    bracketId: 1,
    round: 1,
    competitor1: {
      value: "wave",
      seed: 2
    },
    competitor2: {
      value: "grin",
      seed: 15
    }
  },
  {
    id: 3,
    bracketId: 1,
    round: 1,
    competitor1: {
      value: "joy",
      seed: 3
    },
    competitor2: {
      value: "smile",
      seed: 14
    }
  },
  {
    id: 4,
    bracketId: 1,
    round: 1,
    competitor1: {
      value: "kissing",
      seed: 4
    },
    competitor2: {
      value: "smirk",
      seed: 13
    }
  }
];

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

const getRound = () =>
  db
    .get("round")
    .value();

const incrementRound = () =>
  db
    .update("round", round => round + 1)
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
exports.getMatch = getMatch;
exports.getMatchesByRound = getMatchesByRound;
exports.getRound = getRound;
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
