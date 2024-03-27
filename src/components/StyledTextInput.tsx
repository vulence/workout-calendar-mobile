import { TextInput, TextInputProps } from "react-native-paper";

export default function StyledTextInput(props: TextInputProps) {
    return (
        <TextInput
            {...props}
            placeholderTextColor="white"
            outlineColor="white"
            activeOutlineColor="white"
            textColor="white"
        />
    );
};