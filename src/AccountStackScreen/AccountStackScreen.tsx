import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountStackParamsList } from "../../types";
import LoginScreen from "../Login/LoginScreen";
import RegisterScreen from "../Register/RegisterScreen";

const Stack = createNativeStackNavigator<AccountStackParamsList>();

export default function AccountStackScreen() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerStyle: {
                        backgroundColor: "rgb(30, 30, 30)"
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    },
                }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                    headerStyle: {
                        backgroundColor: "rgb(30, 30, 30)"
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    },
                }}
            />
        </Stack.Navigator>
    );
}