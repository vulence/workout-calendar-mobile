import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import { useContext, useState } from "react";
import { Keyboard, ScrollView } from "react-native";
import { ActivityIndicator, Button, Card } from "react-native-paper";
import * as SecureStore from 'expo-secure-store';

import { loginStyle } from "./LoginStyle";
import { AccountStackParamsList, AuthContextType } from "../../types";
import SuccessSnackbar from "./LoginSuccessSnackbar";
import StyledTextInput from "../components/StyledTextInput";
import { AuthContext } from "../../AuthContext";

type Props = MaterialBottomTabScreenProps<AccountStackParamsList, "Login">;

export default function LoginScreen({ route, navigation }: Props) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const context = useContext<AuthContextType>(AuthContext);

    const [visible, setVisible] = useState<boolean>(false);
    const [snackbarContent, setSnackbarContent] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        Keyboard.dismiss();

        const payload = {
            password: password,
            emailOrUsername: username,
            options: {}
        };

        const response = await fetch("https://api.userfront.com/v0/tenants/7n84856n/auth/password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        if (data.tokens?.access?.value) {
            await SecureStore.setItemAsync('accessToken', data.tokens.access.value);
            context.setAccessToken(data.tokens.access.value);
            setSnackbarContent("Login successful!");
            navigation.jumpTo("Home");
        } else {
            setSnackbarContent(data.message);
        }

        setIsSubmitting(false);
        setVisible(true);
    };

    return (
        <ScrollView contentContainerStyle={loginStyle.content} keyboardShouldPersistTaps="handled">
            <Card style={loginStyle.card}>
                <Card.Title title="Login" titleVariant="labelLarge"></Card.Title>

                <Card.Content>
                    <StyledTextInput mode="outlined" style={loginStyle.fieldInput} placeholder="Username" onChangeText={(newUsername) => setUsername(newUsername)} />
                    <StyledTextInput mode="outlined" placeholder="Password" secureTextEntry={true} onChangeText={(newPassword) => setPassword(newPassword)} />
                    <Button style={loginStyle.cardButton} textColor="white">Forgot email/password?</Button>
                    {isSubmitting ? (
                        <ActivityIndicator size={40} style={loginStyle.cardButton} />
                    ) : (
                        <Button style={loginStyle.cardButton} mode="contained" onPress={() => handleSubmit()}>Login</Button>
                    )}
                    <Button style={loginStyle.cardButton} mode="outlined" textColor="white" onPress={() => navigation.navigate("Register")}>Register</Button>

                    <SuccessSnackbar visible={visible} closeSnackbar={() => setVisible(false)} snackbarContent={snackbarContent} />
                </Card.Content>
            </Card>
        </ScrollView>
    );
}