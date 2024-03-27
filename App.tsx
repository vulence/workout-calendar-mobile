import { useContext, useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';

import HomeScreen from "./src/Home/HomeScreen";
import WorkoutsScreen from "./src/Workouts/WorkoutsScreen";
import { AuthContext } from "./AuthContext";
import AccountStackScreen from "./src/AccountStackScreen/AccountStackScreen";
import UserStackScreen from "./src/UserStackScreen/UserStackScreen";
import { theme } from "./AppStyle";
import { StatusBar } from "expo-status-bar";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    SecureStore.deleteItemAsync('accessToken');

    try {
      const token = await SecureStore.getItemAsync('accessToken');
      setAccessToken(token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={{ user: user, accessToken: accessToken, setAccessToken: setAccessToken }}>
        <StatusBar />
        
        <NavigationContainer theme={DarkTheme}>
          <Tab.Navigator
            initialRouteName="Home"
            activeColor="white"
            barStyle={{
              backgroundColor: "rgb(30, 30, 30)",
            }}
          >
            <Tab.Screen name="Account" component={accessToken ? UserStackScreen : AccountStackScreen} options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
              ),
            }}
            />

            {true ? (
              <>
                <Tab.Screen name="Home" component={HomeScreen} options={{
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                  ),
                }}
                />
                <Tab.Screen name="Workouts" component={WorkoutsScreen} options={{
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="weight-lifter" color={color} size={26} />
                  ),
                }}
                />
              </>
            ) : null}
          </Tab.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}