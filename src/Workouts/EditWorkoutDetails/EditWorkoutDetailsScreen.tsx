import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Divider, FAB, Icon, IconButton, MD3Colors, Text, TextInput } from "react-native-paper";
import { useFonts } from 'expo-font';
import { EditWorkoutDetailsScreenProps, GroupedExercise } from "../../../types";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { style } from "./EditWorkoutDetailsStyle";
import { fetchWorkoutExercises, removeWorkoutExercise, submitWorkoutExercise } from "../../api/api";
import { AuthContext } from "../../../AuthContext";
import StyledTextInput from "../../components/StyledTextInput";
import AddNewExerciseDialog from "./AddNewExerciseDialog";

export default function EditWorkoutDetailsScreen({ route }: any) {

    const [fontsLoaded] = useFonts({
        'Inter-Regular': require('../../../assets/fonts/Inter-Regular.ttf'),
        'Inter-Bold': require('../../../assets/fonts/Inter-Bold.ttf'),
        'Inter-Medium': require('../../../assets/fonts/Inter-Medium.ttf'),
    });
    const context = useContext(AuthContext);

    const { workout }: EditWorkoutDetailsScreenProps = route.params;
    const [workoutExercises, setWorkoutExercises] = useState<GroupedExercise[]>();
    const [newRowVisible, setNewRowVisible] = useState<{ [key: number]: boolean }>({});
    const [newWorkoutExercise, setNewWorkoutExercise] = useState({
        weight: '',
        sets: '',
        reps: ''
    });
    const [newExerciseDialogVisible, setNewExerciseDialogVisible] = useState<boolean>(false);
    const [currentExercises, setCurrentExercises] = useState<string[]>([]);

    const loadExercises = async () => {
        try {
            const data : GroupedExercise[] = await fetchWorkoutExercises(context.accessToken!, workout.id.toString());
            setWorkoutExercises(data);
            setCurrentExercises(data.map(we => we.exercise));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadExercises();
    }, []);

    const toggleNewRowVisible = (id: number) => {
        setNewRowVisible(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

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

    const handleSubmitWorkoutExercise = async (workoutId: number, workoutExercise: any) => {
        try {
            const status = await submitWorkoutExercise(context.accessToken!, workoutId.toString(), workoutExercise);

            if (status == 204) {
                loadExercises();
                setNewRowVisible(prev => ({
                    ...prev,
                    [workoutExercise.exerciseId]: false
                }));
            } else {
                console.error("Failed to add workout exercise!");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <ScrollView style={style.content}>
                <View style={style.titleContainer}>
                    <Text style={[style.title, { fontFamily: 'Inter-Medium' }]}>{workout.title}</Text>
                    <Text style={style.subtitle}>{workout.date}</Text>
                </View>

                {workoutExercises?.map((workoutExercise) => (
                    <View key={workoutExercise.exercise} style={style.workoutExerciseContainer}>
                        <View style={style.workoutExerciseTitleContainer}>
                            <Text>{workoutExercise.exercise}</Text>
                        </View>

                        <View style={[style.workoutExerciseDetails, { paddingTop: 5, paddingBottom: 10 }]}>
                            <Text style={{ marginLeft: 10, marginRight: 55 }}>Weight</Text>
                            <Text style={{ marginRight: 75 }}>Sets</Text>
                            <Text style={{ marginRight: 85 }}>Reps</Text>
                            <Text>Remove</Text>
                        </View>

                        {workoutExercise.details.map(detail => (
                            <View key={detail.id} style={style.workoutExerciseDetailsContainer}>
                                <View style={style.workoutExerciseDetails}>
                                    <Text style={{ flex: 2 }}>{detail.weight}</Text>
                                    <Text style={{ flex: 2 }}>{detail.sets}</Text>
                                    <Text style={{ flex: 2 }}>{detail.reps}</Text>
                                </View>
                                <Divider />
                                <IconButton
                                    icon="close-circle"
                                    iconColor={MD3Colors.error100}
                                    size={40}
                                    style={{ alignSelf: "center", margin: 0, padding: 0 }}
                                    onPress={() => { handleDeleteWorkoutExercise(detail.id) }}
                                />
                            </View>
                        ))}

                        {newRowVisible[workoutExercise.exerciseId] && <View style={style.workoutExerciseDetailsContainer}>
                            <View style={style.workoutExerciseDetails}>
                                <StyledTextInput keyboardType="numeric" mode="outlined" style={{ flex: 2, margin: 5, marginLeft: 0 }} placeholder="Weight"
                                    onChangeText={(value) => setNewWorkoutExercise(prevState => ({ ...prevState, weight: value }))} />

                                <StyledTextInput keyboardType="numeric" mode="outlined" style={{ flex: 2, margin: 5 }} placeholder="Sets"
                                    onChangeText={(value) => setNewWorkoutExercise(prevState => ({ ...prevState, sets: value }))} />

                                <StyledTextInput keyboardType="numeric" mode="outlined" style={{ flex: 2, margin: 5 }} placeholder="Reps"
                                    onChangeText={(value) => setNewWorkoutExercise(prevState => ({ ...prevState, reps: value }))} />
                            </View>

                            <Divider />

                            <IconButton
                                icon="check-circle"
                                iconColor={MD3Colors.primary100}
                                size={40}
                                style={{ alignSelf: "center", margin: 0, padding: 0 }}
                                onPress={() => {
                                    handleSubmitWorkoutExercise(workout.id, {
                                        exerciseId: workoutExercise.exerciseId,
                                        weight: newWorkoutExercise.weight,
                                        sets: newWorkoutExercise.sets,
                                        reps: newWorkoutExercise.reps
                                    })
                                }}
                            />
                        </View>}

                        <FAB
                            icon={() => <MaterialIcon name="add" size={24} color="white" />}
                            label="Add"
                            color="white"
                            style={style.fabStyle}
                            onPress={() => { toggleNewRowVisible(workoutExercise.exerciseId) }}
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

            <FAB
                icon={() => <MaterialIcon name="add" size={24} color="white" />}
                label="New exercise"
                color="white"
                style={style.fabAddNewExerciseStyle}
                onPress={() => setNewExerciseDialogVisible(true)}
            />

            <AddNewExerciseDialog
                visible={newExerciseDialogVisible}
                hideDialog={() => setNewExerciseDialogVisible(false)}
                handleSubmit={handleSubmitWorkoutExercise} 
                currentExercises={currentExercises}
                workoutId={workout.id}
            />
        </View>
    );
}