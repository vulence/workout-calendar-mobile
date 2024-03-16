import { useContext } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from "./src/Home/HomeScreen";
import AuthProvider, { AuthContext } from "./AuthContext";
import { AuthContextType } from "./types";
import AccountStackScreen from "./src/AccountStackScreen/AccountStackScreen";
import { theme } from "./AppStyle";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const { authenticated } = useContext<AuthContextType>(AuthContext);

  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            activeColor="white"
            barStyle={{
              backgroundColor: "rgb(30, 30, 30)",
            }}
          >
            <Tab.Screen name="Account" component={AccountStackScreen} options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
              ),
              
            }}
            />

            {authenticated ? (
              <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }}
              />
            ) : null}
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}