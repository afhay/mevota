import * as fcl from "@onflow/fcl/dist/fcl-react-native";

const CREATE_NEW_POLL = `
import Mevota from 0xMevota
transaction (title: String, options: [String], color: String, startedAt: UFix64, endedAt: UFix64, isRestricted: Bool) {
	let createdBy: Address
	prepare(acct: AuthAccount) {
		self.createdBy = acct.address
	}
	execute {
		Mevota.createPoll(createdBy: self.createdBy, title: title, options: options, color: color, startedAt: startedAt, endedAt: endedAt, isRestricted: isRestricted)
	}
}`;

export async function createNewPoll(title, options, color, startedAt, endedAt, isRestricted) {
  return fcl.mutate({
    cadence: CREATE_NEW_POLL,
		args: (arg, t) => [
			arg(title, t.String), 
			arg(options, t.Array(t.String)), 
			arg(color, t.String),
			arg(startedAt, t.UFix64),
			arg(endedAt, t.UFix64),
			arg(isRestricted, t.Bool),
		],
		payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
		limit: 1000,
  });
}
