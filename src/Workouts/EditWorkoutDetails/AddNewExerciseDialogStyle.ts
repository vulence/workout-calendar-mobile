import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
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
        width: 100,
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
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: 200
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "white"
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
});