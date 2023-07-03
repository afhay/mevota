import * as fcl from "@onflow/fcl/dist/fcl-react-native";

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
  let polls = Mevota.getActivePolls()
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