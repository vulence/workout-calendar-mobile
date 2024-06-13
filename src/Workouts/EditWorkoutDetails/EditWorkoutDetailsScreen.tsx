import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useFonts } from 'expo-font';
import { EditWorkoutDetailsScreenProps } from "../../../types";

import { style } from "./EditWorkoutDetailsStyle";

export default function EditWorkoutDetailsScreen({ route }: any) {
    const [fontsLoaded] = useFonts({
        'Inter-Regular': require('../../../assets/fonts/Inter-Regular.ttf'),
        'Inter-Bold': require('../../../assets/fonts/Inter-Bold.ttf'),
        'Inter-Medium': require('../../../assets/fonts/Inter-Medium.ttf'),
    });
    const { workout, workoutExercises }: EditWorkoutDetailsScreenProps = route.params;

    const returnDuration = () => {
        let hours = Math.trunc(workout.duration / 60);
        let minutes = workout.duration - hours * 60;

        return `${hours} ${hours === 1 ? "hour" : "hours"} ${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
    };

    return (
        <ScrollView style={style.content}>
            <View style={style.titleContainer}>
                <Text style={[style.title, { fontFamily: 'Inter-Medium' }]}>{workout.title}</Text>
                <Text style={style.subtitle}>{workout.date}</Text>
            </View>

            <View>
                {workoutExercises.map((exercise) => (
                    <Text>{exercise.exercise}</Text>
                ))}
            </View>

            <View style={style.detailsContainer}>
                <View style={style.detailsContent}>
                    <Text style={{ fontFamily: 'Inter-Regular', marginRight: 10, fontSize: 15 }}>Duration</Text>
                    <Button mode="outlined" style={{backgroundColor: "black", borderRadius: 10}} labelStyle={{ color: "white", fontSize: 13 }}>{returnDuration()}</Button>
                </View>
            </View>

            {/* {workoutExercises.map((workoutExercise) => (
                <Text>{workoutExercise.exercise}</Text>
            ))} */}
        </ScrollView>
    );
}