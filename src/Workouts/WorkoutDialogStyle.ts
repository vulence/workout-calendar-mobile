import { StyleSheet } from "react-native";

export const workoutDialogStyle = StyleSheet.create({
    modal: {
        backgroundColor: "rgb(40, 40, 40)",
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
});