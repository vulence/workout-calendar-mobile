import { StyleSheet } from 'react-native';
import { theme } from '../../AppStyle';

export const registerStyle = StyleSheet.create({
    content: {
        backgroundColor: "rgb(66, 66, 66)",
        display: "flex",
        flex: 1,
    },
    button: {
        margin: 15,
        marginLeft: 0,
        marginRight: 0,
    },
    card: {
        paddingTop: 0,
        backgroundColor: "rgb(35, 35, 35)",
    },
    icon: {
        color: theme.colors.primary,
    },
})