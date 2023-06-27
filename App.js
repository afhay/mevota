import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import HomeScreen from "./app/HomeScreen";
import VoteDetailScreen from "./app/VoteDetailScreen";
import AccountScreen from "./app/AccountScreen";
import Feather from "@expo/vector-icons/Feather";
import NewPollScreen from "./app/NewPollScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Homes"
        screenOptions={({ route }) => ({
          headerShown: route.name !== "Homes",
        })}
      >
        <Stack.Screen name="Homes">
          {() => (
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={({ route }) => ({
                headerShown: false,
              })}
              tabBar={(props) => <MyTabBar {...props} />}
            >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="NewPoll" component={NewPollScreen} />
              <Tab.Screen name="Account" component={AccountScreen} />
            </Tab.Navigator>
          )}
        </Stack.Screen>

        <Stack.Screen name="VoteDetail" component={VoteDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View className="h-20 flex flex-row items-center justify-between gap-1" style={{ backgroundColor: "#222222" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1 }}
            key={label}
          >
            <View className="h-full flex items-center justify-center mb-2">
              {label === "Home" && (
                <View className={`w-12 h-12 rounded-full flex items-center justify-center ${isFocused && "bg-white"}`}>
                  <Feather name="home" size={24} color={`${isFocused ? "#222" : "#fff"}`} />
                </View>
              )}
              {label === "NewPoll" && (
                <View className={`flex flex-row gap-1 items-center justify-center rounded-full w-36 h-12 ${isFocused ? "bg-white" : "bg-white/10"}`}>
                  <Feather name="plus" size={24} color={`${isFocused ? "#222" : "#fff"}`} />
                  <Text className={`font-bold text-sm ${isFocused ? "text-dark" : "text-white"}`}>New Poll</Text>
                </View>
              )}
              {label === "Account" && (
                <View className={`w-12 h-12 rounded-full flex items-center justify-center ${isFocused && "bg-white"}`}>
                  <Feather name="user" size={24} color={`${isFocused ? "#222" : "#fff"}`} />
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
