import { TextInput, TextInputProps } from "react-native-paper";

export default function StyledTextInput(props: TextInputProps) {
    return (
        <TextInput
            {...props}
            placeholderTextColor="rgb(180, 180, 180)"
            outlineColor="white"
            activeOutlineColor="white"
            textColor="white"
        />
    );
};