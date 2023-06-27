import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const StyledView = styled(View);

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <StyledView className="flex h-screen items-center justify-center">
          <StatusBar style="auto" />
          <Text>Open up App.js to start working on your app!</Text>
        </StyledView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
