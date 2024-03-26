import { StyleSheet } from 'react-native';

export const supportDialogStyle = StyleSheet.create({
    modal: {
        backgroundColor: "transparent",
        margin: 16,
    },
    container: {
        backgroundColor: "rgb(40, 40, 40)",
        borderRadius: 20,
    },
    card: {
        borderRadius: 20,
    },
    cardTitleText: {
        alignSelf: "center", 
        marginLeft: 40, 
        marginTop: 10, 
        fontWeight: "bold", 
        fontSize: 18,
    },
    subjectText: {
        margin: 5,
    },
    subjectOutline: {
        borderRadius: 30,
    },
    messageText: {
        margin: 5,
        marginBottom: 15, 
        height: 150,
    },
    sendEmailButton: {
        alignSelf: "center",
    },
});