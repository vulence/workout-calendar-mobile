import { useEffect, useRef } from "react";
import { Keyboard } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

export default function StyledTextInput(props: TextInputProps) {
    const localInputRef = useRef<any>();

    const keyboardDidHideCallBack = () => {
        localInputRef.current.blur?.();
    };

    // Solves the android back button not unfocusing the textfield
    useEffect(() => {
        const keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', keyboardDidHideCallBack);
   
        return () => {
         keyboardDidHideSubscription?.remove();
       };
     }, []);

    return (
        <TextInput
            {...props}
            ref={(ref: any) => {
                localInputRef && (localInputRef.current = ref as any)
            }}
            placeholderTextColor="rgb(180, 180, 180)"
            outlineColor="white"
            activeOutlineColor="white"
            textColor="white"
        />
    );
};