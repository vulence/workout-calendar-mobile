import { View } from "react-native";
import { Text } from "react-native-paper";
import { useFonts } from 'expo-font';

export default function HomeScreen() {
    const [fontsLoaded] = useFonts({
        'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
    });
    
    return (
        <View style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
            <Text style={{fontFamily: "Inter-Bold", fontSize: 20}}>Welcome to the Workout Calendar!</Text>
        </View>
    );
}