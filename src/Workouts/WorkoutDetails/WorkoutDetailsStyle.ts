import { StyleSheet } from "react-native";

export const workoutDetailsStyle = StyleSheet.create({
    detailsTitleContainer: {
        marginLeft: 50
    },
    detailsTitleText: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 25
    },
    detailsModal: {
        backgroundColor: "transparent",
        margin: 16,
    },
    card: {
        backgroundColor: "rgb(30, 30, 30)",
    },
    detailsClockContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: 5
    },
    listAccordionExercise: {
        backgroundColor: "rgb(20, 20, 20)",
        borderRadius: 10,
    },
    listAccordionTitle: {
        color: "white",
    },
    listSection: {
        borderRadius: 10,
        backgroundColor: "rgb(20, 20, 20)",
        marginTop: 0,
        paddingTop: 10,
        paddingBottom: 10
    },
    listItemTitle: {
        alignSelf: "center"
    },
    listItem: {
        borderRightColor: "white",
        borderRightWidth: 0.3,
        flex: 1,
        backgroundColor: "rgb(50, 50, 50)",
        borderRadius: 10
    },
    workoutExerciseDetails: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 0.5,
        borderColor: "white",
        borderRadius: 10,
    },
});