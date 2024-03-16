import { StyleSheet } from 'react-native';

export const loginStyle = StyleSheet.create({
    content: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "rgb(66, 66, 66)",
    },
    card: {
        backgroundColor: "rgb(35, 35, 35)",
        width: "90%",
    },
    cardButton: {
        margin: 5,
        marginLeft: 0,
        marginRight: 0,
    },
    fieldInput: {
        marginBottom: 15,
    }
})