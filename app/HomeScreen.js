import { StatusBar } from "expo-status-bar";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { styled } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { getActivePolls } from "../flow/scripts";
import { useEffect } from "react";

const StyledView = styled(View);

const datas = [
  { id: 1, creator: "0xAddress", title: "Vote for the next Lead Afhay Team", color: "#3B82F6", time: "3h left" },
  { id: 2, creator: "0xAddress", title: "Vote for the next Lead Afhay Team", color: "#14B8A6", time: "3h left" },
  { id: 3, creator: "0xAddress", title: "Vote for the next Lead Afhay Team", color: "#f59e0b", time: "3h left" },
  { id: 4, creator: "0xAddress", title: "Vote for the next Lead Afhay Team", color: "#f43f5e", time: "3h left" },
  { id: 5, creator: "0xAddress", title: "Vote for the next Lead Afhay Team", color: "#6366F1", time: "3h left" },
];

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getActivePolls().then((res) => console.log("RES", res)).catch((err) => console.log("Error", err));
  })

  return (
    <StyledView
      className="bg-dark h-full"
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left + 12,
        paddingRight: insets.right + 12,
      }}
    >
      <StatusBar style="light" />
      <Image className="h-6 w-32 mt-3 mb-6" source={require("../assets/img/logo.png")} />
      <Text className="text-white opacity-50 tracking-widest font-bold text-xs mb-2">ONGOING POLL</Text>

      <FlatList
        data={datas}
        renderItem={({ item }) => <VoteItem title={item.title} color={item.color} creator={item.creator} time={item.time} navigation={navigation} />}
        keyExtractor={(item) => item.id}
      />
    </StyledView>
  );
}

const VoteItem = ({ title, color, creator, time, navigation }) => (
  <StyledView className="w-full p-4 rounded-xl mb-4" style={{ backgroundColor: `${color}` }}>
    <StyledView className="flex flex-row items-center justify-between mb-2">
      <Text className="text-white opacity-50 text-xs">{creator}</Text>
      <Text className="text-white opacity-50 text-xs">{time}</Text>
    </StyledView>
    <Text className="text-white font-bold text-2xl mb-3">{title}</Text>
    <StyledView className="flex flex-row items-center justify-between mb-2 gap-2">
      <Pressable onPress={() => navigation.navigate("VoteDetail")} className="flex-1 flex justify-center items-center bg-black/20 h-12 rounded-full">
        <StyledView>
          <Text className="text-white font-bold">Vote Now</Text>
        </StyledView>
      </Pressable>
      <Pressable onPress={() => null} className="shrink-0 flex justify-center items-center bg-black/20 h-12 w-12 rounded-full">
        <Text className="text-white">
          <Feather name="share" size={16} color="white" />
        </Text>
      </Pressable>
    </StyledView>
  </StyledView>
);
