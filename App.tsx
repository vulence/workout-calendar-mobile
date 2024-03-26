import { useContext, useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';

import HomeScreen from "./src/Home/HomeScreen";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "./types";
import AccountStackScreen from "./src/AccountStackScreen/AccountStackScreen";
import { theme } from "./AppStyle";

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

            {accessToken ? (
              <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }}
              />
            ) : null}
          </Tab.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}