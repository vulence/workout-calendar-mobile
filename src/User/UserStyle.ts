import { StyleSheet } from 'react-native';

export const userStyle = StyleSheet.create({
    // Styles for the containers
    content: {
        height: "100%",
        backgroundColor: "rgb(20, 20, 20)",
    },
    card: {
        backgroundColor: "rgb(50, 50, 50)",
        borderRadius: 0,
    },

    // Styles for the avatar, name, and email
    cardContentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        marginRight: 16,
    },
    titleContainerHeader: {
        flex: 1,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
    },
    text: {
        textAlign: 'center',
    },

    // Styles for the three-column info below the avatar
    infoContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    infoColumn: {
        flex: 1,
        margin: 8,
        alignItems: "center",
    },

    // Styles for the home location
    listAccordion: {
        margin: 0,
        backgroundColor: "rgb(50, 50, 50)"
    },
    listAccordionTitle: {
        color: "rgb(147, 27, 27)",
    },
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 0.2,
        borderBottomColor: 'black',
        backgroundColor: "rgb(50, 50, 50)",
    },
    editAddressButton: {
        marginRight: 10
    },

    // Styles for the account buttons (history, logout..)
    buttonContainer: {
        margin: 16,
    },
    button: {
        marginBottom: 8,
        backgroundColor: "rgb(242,242,242)"
    },
    buttonContent: {
        width: "100%",
        justifyContent: "flex-start"
    },

    // FAB style
    fab: {
        position: 'absolute',
        margin: 10,
        right: 0,
        bottom: 0,
        backgroundColor: "rgb(64,1,1)",
        borderRadius: 30
    }
});