import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WorkoutStackParamsList } from "../../types";
import { useFonts } from 'expo-font';
import WorkoutsScreen from "../Workouts/WorkoutsScreen";
import EditWorkoutDetailsScreen from "../Workouts/EditWorkoutDetails/EditWorkoutDetailsScreen";

const Stack = createNativeStackNavigator<WorkoutStackParamsList>();

export default function WorkoutStackScreen() {
    const [fontsLoaded] = useFonts({
        'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
    });

    return (
        <Stack.Navigator initialRouteName="Workouts">
            <Stack.Screen
                name="Workouts"
                component={WorkoutsScreen}
                options={{
                    headerStyle: {
                        backgroundColor: "rgb(30, 30, 30)"
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                        fontFamily: "Inter-Bold",
                        fontSize: 30
                    },
                }}
            />
            <Stack.Screen
                name="EditWorkoutDetails"
                component={EditWorkoutDetailsScreen}
                options={{
                    headerStyle: {
                        backgroundColor: "rgb(30, 30, 30)"
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    },
                    headerTitle: "Workout Details"
                }}
            />
        </Stack.Navigator>
    );
}