import { StyleSheet } from 'react-native';

export const workoutsStyle = StyleSheet.create({
    container: {
        flex: 1
    },
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
    fab: {
        position: 'absolute',
        margin: 10,
        right: 0,
        bottom: 0,
        backgroundColor: "black",
        borderRadius: 30
    },
    activityIndicatorOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    }
});