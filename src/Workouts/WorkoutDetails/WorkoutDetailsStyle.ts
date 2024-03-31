import { StyleSheet } from "react-native"

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
        color: "white"
    },
    workoutExerciseDetails: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,
        marginRight: 10,
    },
});