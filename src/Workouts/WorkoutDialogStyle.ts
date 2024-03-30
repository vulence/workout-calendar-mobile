import { StyleSheet } from "react-native";

export const workoutDialogStyle = StyleSheet.create({
    modal: {
        backgroundColor: "rgb(30, 30, 30)",
        margin: 16,
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        justifyContent: 'center'
    },
    input: {
        height: 40,
        width: 250,
        marginLeft: 20
    },
    inputButton: {
        marginLeft: 30,
        backgroundColor: "rgb(20, 20, 20)",
        borderRadius: 10
    },
    inputButtonText: {
        fontSize: 18,
        color: "white"
    },
    submitButton: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5
    }
});