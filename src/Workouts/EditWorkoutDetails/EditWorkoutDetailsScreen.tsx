import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Divider, FAB, Icon, IconButton, MD3Colors, Text } from "react-native-paper";
import { useFonts } from 'expo-font';
import { EditWorkoutDetailsScreenProps, GroupedExercise } from "../../../types";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { style } from "./EditWorkoutDetailsStyle";
import { fetchWorkoutExercises, removeWorkoutExercise } from "../../api/api";
import { AuthContext } from "../../../AuthContext";

export default function EditWorkoutDetailsScreen({ route }: any) {
    const [fontsLoaded] = useFonts({
        'Inter-Regular': require('../../../assets/fonts/Inter-Regular.ttf'),
        'Inter-Bold': require('../../../assets/fonts/Inter-Bold.ttf'),
        'Inter-Medium': require('../../../assets/fonts/Inter-Medium.ttf'),
    });
    const { workout }: EditWorkoutDetailsScreenProps = route.params;
    const [workoutExercises, setWorkoutExercises] = useState<GroupedExercise[]>();

    useEffect(() => {
        fetchWorkoutExercises(context.accessToken!, workout.id.toString())
        .then(data => setWorkoutExercises(data))
        .catch(error => console.log(error));
    }, []);

    const context = useContext(AuthContext);

    const returnDuration = () => {
        let hours = Math.trunc(workout.duration / 60);
        let minutes = workout.duration - hours * 60;

        return `${hours} ${hours === 1 ? "hour" : "hours"} ${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
    };

    const handleDeleteWorkoutExercise = async (workoutExerciseId: number) => {
        try {
            const status = await removeWorkoutExercise(context.accessToken!, workout.id.toString(), workoutExerciseId.toString())
            
            if (status == 204) {
                setWorkoutExercises((prevExercises) =>
                    prevExercises?.map((we) => ({
                        ...we,
                        details: we.details.filter((detail) => detail.id !== workoutExerciseId)
                    }))
                );
            } else {
                console.error("Failed to delete workout exercise!");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ScrollView style={style.content}>
            <View style={style.titleContainer}>
                <Text style={[style.title, { fontFamily: 'Inter-Medium' }]}>{workout.title}</Text>
                <Text style={style.subtitle}>{workout.date}</Text>
            </View>

            {workoutExercises?.map((workoutExercise) => (
                <View style={style.workoutExerciseContainer}>
                    <View style={style.workoutExerciseTitleContainer}>
                        <Text>{workoutExercise.exercise}</Text>
                    </View>

                    <View style={[style.workoutExerciseDetails, {paddingTop: 5, paddingBottom: 10}]}>
                            <Text style={{marginLeft: 7, marginRight: 55}}>Weight</Text>
                            <Text style={{marginRight: 73}}>Sets</Text>
                            <Text style={{marginRight: 45}}>Reps</Text>
                            <Text style={{marginRight: 20}}>Edit</Text>
                            <Text>Remove</Text>
                    </View>

                    {workoutExercise.details.map(detail => (
                        <View style={style.workoutExerciseDetailsContainer}>
                            <View style={style.workoutExerciseDetails}>
                                <Text style={{flex: 2}}>{detail.weight}</Text>
                                <Text style={{flex: 2}}>{detail.sets}</Text>
                                <Text style={{flex: 1}}>{detail.reps}</Text>
                            </View>
                            <Divider  />
                            <IconButton
                                icon="pencil-circle"
                                iconColor={MD3Colors.primary100}
                                size={40}
                                style={{ alignSelf: "center", margin: 0, padding: 0 }}
                                onPress={() => {}}
                            />
                            <IconButton
                                icon="close-circle"
                                iconColor={MD3Colors.error100}
                                size={40}
                                style={{ alignSelf: "center", margin: 0, padding: 0 }}
                                onPress={() => {handleDeleteWorkoutExercise(detail.id)}}
                            />
                        </View>
                    ))}
                    
                    <FAB
                        icon={() => <MaterialIcon name="add" size={24} color="white" />}
                        label="Add"
                        color="white"
                        style={style.fabStyle}
                        onPress={() => {}}
                    />
                </View>
            ))}

            <View style={style.detailsContainer}>
                <View style={style.detailsContent}>
                    <Text style={{ fontFamily: 'Inter-Regular', marginRight: 10, fontSize: 15 }}>Duration</Text>
                    <Button mode="outlined" style={{ backgroundColor: "black", borderRadius: 10 }} labelStyle={{ color: "white", fontSize: 13 }}>{returnDuration()}</Button>
                </View>
            </View>
        </ScrollView>
    );
}