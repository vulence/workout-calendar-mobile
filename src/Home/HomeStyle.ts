import { StyleSheet } from 'react-native';

export const homeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(66, 66, 66)",
    },
    content: {
        height: "100%",
        backgroundColor: "rgb(66, 66, 66)",
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
    },
    header: {
        backgroundColor: "rgb(30, 30, 30)",
        paddingTop: 40,
        paddingLeft: 17,
        paddingBottom: 7
    },
    headerText: {
        fontFamily: "Inter-Bold",
        fontSize: 30,
        color: 'white'
    },
    calendar: {
        marginTop: 20,
        margin: 10,
        borderRadius: 10
    },
    selectedDateText: {
        alignSelf: "center",
        fontFamily: "Inter-Medium",
        color: "white",
        fontSize: 18
    },
    button: {
        marginTop: 20,
        alignSelf: "center",
        backgroundColor: '#5c0f0f',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: 200,
        alignSelf: "center",
        marginTop: 15,
        backgroundColor: "rgb(46, 46, 46)"
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'white'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "white"
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    itemContainerStyle: {
        backgroundColor: '#333'
    },
    itemTextStyle: {
        color: 'white'
    },
    completedWorkoutText: {
        color: '#c2c2c2',
        alignSelf: 'center',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        fontSize: 17,
        fontFamily: "Inter-Regular",
        textAlign: 'center'
    },
});