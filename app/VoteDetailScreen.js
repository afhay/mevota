import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getDetailPoll } from "../flow/scripts";
import moment from "moment";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const StyledView = styled(View);

const votersSample = [
  { address: "0x39b8492838492658", vote: "Raff" },
  { address: "0x39b8492838492653", vote: "Raff" },
  { address: "0x39b8492838492655", vote: "Thomas" },
  { address: "0x39b8492838492652", vote: "Raff" },
  { address: "0x39b8492838492651", vote: "Thomas" },
];

export default function VoteDetailScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { pollId } = route.params;
  const [loading, setLoading] = useState(true);
  const [poll, setPoll] = useState();
  const [votedOption, setVotedOption] = useState();
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    if (pollId) {
      getDetailPoll(pollId)
        .then((res) => {
          setPoll(res);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });

      setVoters(votersSample);
    }
  }, [pollId]);

  const handleVoted = (option) => {
    if (votedOption) {
      return Toast.show({ type: "error", text1: "Forbidden", text2: "You have voted", position: "bottom" });
    }

    setVotedOption(option);
    setVoters((prev) => ([...prev, {address: "0x123456", vote: option}]))
    return Toast.show({ type: "success", text1: "Success", text2: "Thanks for your vote!", position: "bottom" });
  }

  if (loading) {
    return (
      <StyledView className="h-full bg-dark flex flex-col items-center justify-center">
        <ActivityIndicator />
      </StyledView>
    );
  }

  return (
    <StyledView
      className="h-full bg-dark flex flex-col"
      style={{
        paddingTop: 8,
        paddingLeft: insets.left + 16,
        paddingRight: insets.right + 16,
        paddingBottom: insets.paddingBottom,
      }}
    >
      <StatusBar style="light" />
      <ScrollView className="flex-1">
        <StyledView className={`p-4 rounded-xl ${poll?.color} mb-4`}>
          <StyledView className="flex flex-row items-center justify-between">
            <StyledView className="flex flex-row items-center">
              <Image
                className="w-4 h-4 object-cover rounded-full mr-2"
                source={{ uri: `https://www.gravatar.com/avatar/${poll?.createdBy}?s=200&r=pg&d=retro` }}
              />
              <Text className="text-white text-xs">
                {poll?.createdBy.substr(0, 4)}...{poll?.createdBy.substr(-4, 4)}
              </Text>
            </StyledView>
            <Text className="text-white text-xs">Ended {new Date(poll?.endedAt * 1000).toLocaleString()}</Text>
          </StyledView>
        </StyledView>
        <StyledView className={`p-4 rounded-xl bg-zinc-800`}>
          <Text className="text-white mb-2 text-2xl font-semibold">{poll?.title}</Text>
          {poll?.options?.map((i) => (
            <TouchableOpacity onPress={() => handleVoted(i)} key={i}>
              <StyledView className={`w-full p-4 rounded-lg mt-2 ${votedOption === i ? poll.color : 'bg-zinc-700'}`}>
                <Text className="text-white text-lg">{i}</Text>
              </StyledView>
            </TouchableOpacity>
          ))}
        </StyledView>

        <StyledView className="mt-8">
          <Text className="text-white/50 text-xl font-bold mb-4">Voters ({voters.length})</Text>
          {/* <FlatList data={voters} renderItem={({ item }) => <VotersItem address={item.address} vote={item.vote} />} keyExtractor={(item) => item.address} /> */}
          {voters.map((i) => (
            <VotersItem address={i.address} vote={i.vote} key={i.address} />
          ))}
        </StyledView>
      </ScrollView>
      <Toast />
    </StyledView>
  );
}

const VotersItem = ({ address, vote }) => (
  <StyledView className="w-full flex flex-row items-center justify-between mb-2">
    <StyledView className="flex flex-row items-center">
      <Image className="shrink-0 w-7 h-7 object-cover rounded-full mr-2" source={{ uri: `https://www.gravatar.com/avatar/${address}?s=200&r=pg&d=retro` }} />
      <Text className="text-white text-lg text-white/50">
        {address.substr(0, 4)}...{address.substr(-4, 4)}
      </Text>
    </StyledView>
    <StyledView>
      <Text className="text-white/50">Voted {vote.substr(0,10)}{vote.length > 10 && "..."}</Text>
    </StyledView>
  </StyledView>
);
