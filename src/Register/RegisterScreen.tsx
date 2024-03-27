import React, { useState } from 'react';
import type { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { Keyboard, ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Card, HelperText, TextInput } from 'react-native-paper';

import type { AccountStackParamsList } from '../../types';
import { registerStyle } from './RegisterStyle';
import NotificationSnackbar from '../components/NotificationSnackbar';
import StyledTextInput from '../components/StyledTextInput';

type Props = MaterialBottomTabScreenProps<AccountStackParamsList, "Register">;

export default function RegisterScreen({ route, navigation }: Props) {
    // Data states for registration form
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    // Toggles password visiblity
    const [showPassword, setShowPassword] = useState<boolean>(true);

    // Snackbar states
    const [visible, setVisible] = useState<boolean>(false);
    const [snackbarContent, setSnackbarContent] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [actionLabel, setActionLabel] = useState<string | undefined>(undefined);

    // Closes the snackbar
    const closeSnackbar = () => {
        setVisible(false);

        if (snackbarContent === 'User created') {
            navigation.navigate("Login");
        }
    };

    // Submits the registration to the server
    const handleSubmit = async () => {
        if (hasUsernameErrors() || hasEmailErrors() || hasPasswordErrors()) return;

        Keyboard.dismiss();

        try {
            // Initiate the loading icon
            setIsSubmitting(true);

            const response = await fetch('http://192.168.0.12:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password })
            });

            const data:string = await response.text();

            // Sets what the bottom snackbar will show, if the user was successfully created, go to login page
            setSnackbarContent(data);
            if (data === 'User created') {
                setActionLabel("GO TO LOGIN");
            }

            // Hide loading icon and load the snackbar
            setIsSubmitting(false);
            setVisible(true);
        }
        catch (error) {
            console.error(error);
        }
    };

    // Check for username errors
    const hasUsernameErrors = () => {
        return username === '';
    };

    // Check for email errors
    const hasEmailErrors = () => {
        return email === '';
    };

    // Checks if the password has at least 8 characters, an upper and lower character, a digit and a special character
    const hasPasswordErrors = () => {
        const regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.,]).{8,}$");
        return password !== confirmPassword || !regex.test(password);
    };

    return (
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={registerStyle.content}>
            <Card style={registerStyle.card}>
                <Card.Title title="Register" titleVariant="headlineSmall" />
                <Card.Content>
                    <StyledTextInput
                        mode="outlined"
                        placeholder="Username"
                        onChangeText={(newUsername) => setUsername(newUsername)}
                    />
                    {hasUsernameErrors() ? (<HelperText type="error" visible={hasUsernameErrors()}>
                        Username must not be empty
                    </HelperText>) : null}

                    <StyledTextInput
                        mode="outlined"
                        placeholder="Email"
                        inputMode='email'
                        onChangeText={(newEmail) => setEmail(newEmail)}
                    />
                    {hasEmailErrors() ? (<HelperText type="error" visible={hasEmailErrors()}>
                        Email must not be empty
                    </HelperText>) : null}

                    <StyledTextInput
                        mode="outlined"
                        placeholder="Password"
                        secureTextEntry={showPassword}
                        right={showPassword ?
                            (<TextInput.Icon icon="eye-outline" color={registerStyle.icon.color} onPress={() => setShowPassword(!showPassword)} />)
                            :
                            (<TextInput.Icon icon="eye-off-outline" color={registerStyle.icon.color} onPress={() => setShowPassword(!showPassword)} />)}
                        onChangeText={(newPassword) => setPassword(newPassword)}
                    />
                    {hasPasswordErrors() ? (<HelperText type="error" visible={hasPasswordErrors()}>
                        Password must contain at least 8 characters, an upper and lower case letter, a digit, and a special character.
                    </HelperText>) : null}

                    <StyledTextInput
                        mode="outlined"
                        placeholder="Confirm password"
                        secureTextEntry={showPassword}
                        onChangeText={(newConfirmPassword) => setConfirmPassword(newConfirmPassword)}
                    />
                    {isSubmitting ? (
                        <ActivityIndicator size={50} style={registerStyle.button} />
                    ) : (
                        <Button style={registerStyle.button} mode="contained" onPress={handleSubmit}>Register</Button>
                    )}
                </Card.Content>
            </Card>

            <NotificationSnackbar visible={visible} closeSnackbar={closeSnackbar} snackbarContent={snackbarContent} action={actionLabel} />
        </ScrollView>
    );
}