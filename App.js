import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === "Home") {
                    iconName = "home";
                  } else if (route.name === "NewPoll") {
                    iconName = "plus";
                  } else if (route.name === "Account") {
                    iconName = "user";
                  }

                  return <Feather name={iconName} size={size} color={color} />;
                },
                headerShown: false,
              })}
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
