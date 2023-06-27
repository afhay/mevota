import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);

export default function AccountScreen({ navigation }) {
  return (
    <StyledView className="flex h-full items-center justify-center">
      <StatusBar style="auto" />
      <Text>Account Screen</Text>
    </StyledView>
  );
}
