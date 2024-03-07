import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountStackParamsList } from "../../types";
import LoginScreen from "../Login/LoginScreen";

const Stack = createNativeStackNavigator<AccountStackParamsList>();

export default function AccountStackScreen() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
        </Stack.Navigator>
    );
}