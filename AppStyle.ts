import { MD3DarkTheme } from "react-native-paper";

export const theme = {
    ...MD3DarkTheme,
    roundness: 10,
    colors: {
        ...MD3DarkTheme.colors,
        primary: "black",
        onPrimary: "white",
        background: "transparent"
    },
}