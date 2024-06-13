import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    content: {
        display: 'flex',
        backgroundColor: "rgb(66, 66, 66)"
    },
    titleContainer: {
        backgroundColor: "rgb(15, 15, 15)",
        alignItems: "center",
        justifyContent: "center",
        margin: 12,
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
    }
});