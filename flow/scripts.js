import * as fcl from "@onflow/fcl/dist/fcl-react-native";

const GET_ACTIVE_POLLS = `
import Mevota from 0xMevota
pub fun main(): {UInt64: Mevota.Poll} {
  return Mevota.getActivePolls();
}`;

export async function getActivePolls() {
  return fcl.query({
    cadence: GET_ACTIVE_POLLS,
  });
}
