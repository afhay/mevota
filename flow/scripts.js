import * as fcl from "@onflow/fcl/dist/fcl-react-native";

const GET_ALL_POLLS = `
import Mevota from 0xMevota
pub fun main(): {UInt64: Mevota.Poll} {
  return Mevota.polls
}`;

export async function getAllPolls() {
  return fcl.query({
    cadence: GET_ALL_POLLS,
  });
}

const GET_ACTIVE_POLLS = `
import Mevota from 0xMevota
pub fun main(): {UInt64: Mevota.Poll} {
  return Mevota.getActivePolls()
}`;

export async function getActivePolls() {
  return fcl.query({
    cadence: GET_ACTIVE_POLLS,
  });
}


const GET_DETAIL_POLL = `
import Mevota from 0xMevota
pub fun main(pollId: UInt64): Mevota.Poll {
  let polls = Mevota.polls
  return polls[pollId] ?? panic("Poll not found")
}`;

export async function getDetailPoll(pollId) {
  return fcl.query({
    cadence: GET_DETAIL_POLL,
    args: (arg, t) => [
			arg(pollId, t.UInt64), 
		],
  });
}

const GET_POLL_RESULT = `
import Mevota from 0xMevota
pub fun main(pollId: UInt64): {String: UInt64} {
  return Mevota.getPollResult(pollId: pollId)
}`;

export async function getPollResult(pollId) {
  return fcl.query({
    cadence: GET_POLL_RESULT,
    args: (arg, t) => [
			arg(pollId, t.UInt64), 
		],
  });
}