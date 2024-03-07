import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from "./src/Home/HomeScreen";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (  
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}