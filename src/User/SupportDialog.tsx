import React, { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { Modal, TextInput, Button, Card, Text, Divider, IconButton } from 'react-native-paper';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

import { SupportDialogProps } from '../../types';
import { supportDialogStyle } from './SupportDialogStyle';
import LoadingIndicator from '../components/LoadingIndicator';
import NotificationSnackbar from '../components/NotificationSnackbar';

export default function SupportDialog(props: SupportDialogProps) {
    // States for the email fields
    const [subject, setSubject] = useState<string>('');
    const [body, setBody] = useState<string>('');

    // State for the loading indicator
    const [isEmailSending, setIsEmailSending] = useState<boolean>(false);

    // Snackbar states
    const [visible, setVisible] = useState<boolean>(false);
    const [snackbarContent, setSnackbarContent] = useState<string>('');

    // Animation constant
    const translateY = useSharedValue(500);

    // Initiates the animation when clicking on the support button
    useEffect(() => {
        translateY.value = withSpring(props.visible ? 0 : 500, { damping: 10, stiffness: 100 });
    }), [props.visible]

    // Closes the snackbar on click and closes the email modal
    const closeSnackbar = () => {
        setVisible(false);
        props.hideDialog();
    };

    // Sends an email via the backend
    const sendEmail = async () => {
        Keyboard.dismiss();

        try {
            // Shows the loading indicator
            setIsEmailSending(true);

            const response = await fetch('http://192.168.0.12:8080/sendEmail', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subject, body }),
            });

            const data : string = await response.text();
            console.log(data);

            // Disables the loading indicator, erases the subject and message fields, and displays the snackbar
            setIsEmailSending(false);
            setSnackbarContent("Email sent successfully!");
            setVisible(true);
            setSubject("");
            setBody("");
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal visible={props.visible} onDismiss={props.hideDialog} contentContainerStyle={supportDialogStyle.modal}>
            <Animated.View style={[supportDialogStyle.container, { transform: [{ translateY: translateY }] }]}>
                <Card elevation={0} style={supportDialogStyle.card}>
                    <Card.Title title={<Text style={supportDialogStyle.cardTitleText}>Imate problem?</Text>}
                        right={(pr) => <IconButton {...pr} icon="close" onPress={props.hideDialog} />}
                    />
                    <Divider bold={true} />

                    <Card.Content>
                        <TextInput mode="outlined" label="Subjekat" style={supportDialogStyle.subjectText} outlineStyle={supportDialogStyle.subjectOutline} value={subject} onChangeText={(text) => setSubject(text)} />
                        <TextInput mode="outlined" label="Poruka" style={supportDialogStyle.messageText} value={body} onChangeText={(text) => setBody(text)} multiline />
                    </Card.Content>
                    <Divider bold={true} />

                    <Card.Actions style={supportDialogStyle.sendEmailButton}>
                        <Button onPress={sendEmail}>Pošalji mejl</Button>
                    </Card.Actions>

                    <LoadingIndicator isLoading={isEmailSending} />
                    <NotificationSnackbar visible={visible} closeSnackbar={closeSnackbar} snackbarContent={snackbarContent} />
                </Card>
            </Animated.View>
        </Modal>
    );
}