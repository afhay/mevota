import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";

const StyledView = styled(View);

export default function AccountScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState("voted");
  const [user, setUser] = useState({ loggedIn: null });
  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  return (
    <StyledView
      className="h-full flex"
      style={{
        backgroundColor: "#222222",
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <StatusBar style="light" />
      <StyledView className="h-48 flex items-center justify-center">
        <TouchableOpacity className="absolute top-3 right-3" onPress={() => fcl.unauthenticate()}>
            <Feather name="log-out" size={24} color="white" />
        </TouchableOpacity>
        <StyledView className="border-2 w-24 h-24 p-1.5 border-white/20 rounded-full border-dashed mb-3">
          <Image className="w-20 h-20 object-cover rounded-full" source={{ uri: `https://www.gravatar.com/avatar/${user?.addr}?s=200&r=pg&d=retro` }} />
        </StyledView>
        <Text className="text-white text-lg">{user?.addr}</Text>
      </StyledView>
      <StyledView className="bg-dark flex-1 px-3 pt-3">
        <StyledView className="flex flex-row items-center gap-4">
          <TouchableOpacity className="flex-1 h-10 rounded-full" onPress={() => setTab("voted")}>
            <StyledView className={`h-full rounded-full flex items-center justify-center flex-row ${tab === "voted" && "bg-white"}`}>
              <Feather name="check-circle" size={16} color={`${tab === "voted" ? "#222" : "#fff"}`} />
              <Text className={`font-medium ml-2 ${tab === "voted" ? "text-dark" : "text-white"}`}>My Voted</Text>
            </StyledView>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 h-10 rounded-full" onPress={() => setTab("poll")}>
            <StyledView className={`h-full rounded-full flex items-center justify-center flex-row ${tab === "poll" && "bg-white"}`}>
              <Feather name="layers" size={16} color={`${tab === "poll" ? "#222" : "#fff"}`} />
              <Text className={`font-medium ml-2 ${tab === "poll" ? "text-dark" : "text-white"}`}>My Poll</Text>
            </StyledView>
          </TouchableOpacity>
        </StyledView>
        <Text className="text-white mt-6">{tab} list</Text>
      </StyledView>
    </StyledView>
  );
}
