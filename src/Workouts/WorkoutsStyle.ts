import { StyleSheet } from 'react-native';

export const workoutsStyle = StyleSheet.create({
    content: {
        height: "100%",
        backgroundColor: "rgb(66, 66, 66)",
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
    },
    card: {
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        backgroundColor: "rgb(35, 35, 35)",
        color: "white",
    },
    cardButton: {
        width: "30%",
        alignSelf: "center",
    },
    ratingContainer: {
        position: 'absolute',
        top: -12,
        right: 8,
        backgroundColor: 'transparent',
    },
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
    detailsRouteContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    detailsRouteAddresses: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    detailsPriceContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    detailsDriverContainer: {
        alignItems: "center",
        justifyContent: "center",
        margin: 16,
        marginTop: 25,
        padding: 10,
        borderWidth: 2,
    }
});