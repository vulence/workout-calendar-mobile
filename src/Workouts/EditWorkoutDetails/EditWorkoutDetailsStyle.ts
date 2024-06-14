import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    content: {
        display: 'flex',
        backgroundColor: "rgb(66, 66, 66)"
    },
    titleContainer: {
        backgroundColor: "rgb(25, 25, 25)",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        borderRadius: 5
    },
    title: {
        fontSize: 30,
    },
    subtitle: {
        fontSize: 20,
        color: 'rgb(180, 180, 180)'
    },
    detailsContainer: {
        display: "flex",
        backgroundColor: "rgb(25, 25, 25)",
        margin: 12,
        marginTop: 0,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    detailsContent: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    workoutExerciseContainer: {
        marginBottom: 10
    },
    workoutExerciseTitleContainer: {
        backgroundColor: "rgb(15, 15, 15)",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        padding: 16,
    },
    workoutExerciseDetailsContainer: {
        display: "flex",
        backgroundColor: "rgb(55, 55, 55)",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingRight: 10,
        flexDirection: "row",
        borderBottomWidth: 2,
        borderBottomColor: "black"
    },
    workoutExerciseDetails: {
        flex: 1,
        flexDirection: "row"
    },
});