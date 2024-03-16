import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import { useState } from "react";
import { ScrollView } from "react-native";
import { ActivityIndicator, Button, Card, TextInput } from "react-native-paper";

import { loginStyle } from "./LoginStyle";
import { AccountStackParamsList } from "../../types";
import SuccessSnackbar from "./LoginSuccessSnackbar";

type Props = MaterialBottomTabScreenProps<AccountStackParamsList, "Login">;

export default function LoginScreen({ route, navigation }: Props) {

    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    const [visible, setVisible] = useState<boolean>(false);
    const [snackbarContent, setSnackbarContent] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    
    return (
        <ScrollView contentContainerStyle={loginStyle.content} keyboardShouldPersistTaps="handled">
            <Card style={loginStyle.card}>
                <Card.Title title="Login" titleVariant="labelLarge"></Card.Title>

                <Card.Content>
                    <TextInput mode="outlined" style={loginStyle.fieldInput} placeholder="Username" placeholderTextColor="white" outlineColor="white" activeOutlineColor="white" textColor="white" onChangeText={(newUsername) => setUsername(newUsername)} />
                    <TextInput mode="outlined" placeholder="Password" placeholderTextColor="white" outlineColor="white" activeOutlineColor="white" textColor="white" secureTextEntry={true} onChangeText={(newPassword) => setPassword(newPassword)} />
                    <Button style={loginStyle.cardButton} textColor="white">Forgot email/password?</Button>
                    {isSubmitting ? (
                        <ActivityIndicator size={40} style={loginStyle.cardButton} />
                    ): (
                        <Button style={loginStyle.cardButton} mode="contained">Login</Button>
                    )}
                    <Button style={loginStyle.cardButton} mode="outlined" textColor="white" onPress={() => navigation.navigate("Register")}>Register</Button>

                    <SuccessSnackbar visible={visible} closeSnackbar={() => setVisible(false)} snackbarContent={snackbarContent} />
                </Card.Content>
            </Card>
        </ScrollView>
    );
}