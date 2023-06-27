import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);

export default function VoteDetailScreen() {
  return (
    <StyledView className="flex h-screen items-center justify-center">
      <StatusBar style="auto" />
      <Text>Vote Detail!</Text>
    </StyledView>
  );
}
