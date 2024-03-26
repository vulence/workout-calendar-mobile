import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { UserStackParamsList } from "../../types";

import UserScreen from "../User/UserScreen";

const Stack = createNativeStackNavigator<UserStackParamsList>();

// Creates a stack that stores user and history screens
export default function UserStackScreen() {
    return (
        <Stack.Navigator initialRouteName="User">
            <Stack.Screen
                name="User"
                component={UserScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}