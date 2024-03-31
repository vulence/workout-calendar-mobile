import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Text, Button, Divider, FAB, ActivityIndicator, Modal } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { workoutsStyle } from './WorkoutsStyle';
import WorkoutDetailsScreen from './WorkoutDetails/WorkoutDetailsScreen';
import { useFonts } from 'expo-font';
import { GroupedExercise, Workout, WorkoutExercise } from '../../types';
import { fetchWorkoutExercises, fetchWorkouts, submitWorkout } from '../api/api';
import { AuthContext } from '../../AuthContext';
import WorkoutDialog from './WorkoutDialog';

export default function WorkoutsScreen() {
    const [fontsLoaded] = useFonts({
        'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
        'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
        'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    });

    // Details modal states
    const [detailsDialogVisible, setDetailsDialogVisible] = useState<boolean>(false);
    const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
    const [selectedWorkoutExercises, setSelectedWorkoutExercises] = useState<GroupedExercise[] | null>(null);

    // Sets the details props to corresponding cards and displays it
    const handleDetailsOpen = (workout: Workout) => {
        setSelectedWorkout(workout);
        getWorkoutExercises(workout.id).then(() => setDetailsDialogVisible(true));
    };

    // Hides the details modal
    const handleDetailsClose = () => {
        setDetailsDialogVisible(false);
    };

    const context = useContext(AuthContext);
    const [workouts, setWorkouts] = useState<Workout[]>();
    const [newWorkoutDialogVisible, setNewWorkoutDialogVisible] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getWorkouts();
    }, []);

    const getWorkouts = () => {
        setLoading(true);
        fetchWorkouts(context.accessToken!).then((data) => { setWorkouts(data); setLoading(false) }).catch((error) => console.error(error));
    };

    const getWorkoutExercises = (workoutId: number) => {
        return fetchWorkoutExercises(context.accessToken!, workoutId.toString()).then((data) => setSelectedWorkoutExercises(data)).catch((error) => console.error(error));
    };

    const [ratingColors, setRatingColors] = useState<{ [key: number]: string }>({});

    // Set AirbnbRatings component color for each workout
    useEffect(() => {
        const initialColors: { [key: number]: string } = {};

        workouts?.forEach((workout) => {
            initialColors[workout.id] = getRatingColor(workout.rating);
        });

        setRatingColors(initialColors);
    }, [workouts]);

    const getRatingColor = (rating: number) => {
        switch (rating) {
            case 1:
                return 'rgb(204,0,0)';
            case 2:
                return 'rgb(255,128,0)';
            case 3:
                return 'rgb(255,255,102)';
            case 4:
                return 'rgb(153,255,153)'
            case 5:
                return 'rgb(0,204,0)';
            default:
                return 'grey';
        }
    };

    const handleRatingChange = (workoutId: number, value: number) => {
        const updatedColors = { ...ratingColors };
        updatedColors[workoutId] = getRatingColor(value);
        setRatingColors(updatedColors);
    };

    const [isSubmittingWorkout, setIsSubmittingWorkout] = useState<boolean>(false);

    const handleWorkoutSubmit = (workout: any) => {
        setIsSubmittingWorkout(true);

        submitWorkout(context.accessToken!, workout).then((data) => {
            setNewWorkoutDialogVisible(false);
            setIsSubmittingWorkout(false);
            getWorkouts();
        }).catch((error) => console.error(error));
    };

    return (
        <View style={workoutsStyle.container}>
            <ScrollView style={workoutsStyle.content} contentContainerStyle={workoutsStyle.contentContainer}>
                <View style={{ backgroundColor: "rgb(30, 30, 30)", paddingTop: 40 }}>
                    <Text style={{ marginLeft: 10, marginBottom: 10, fontFamily: "Inter-Bold", fontSize: 30 }}>Workouts</Text>
                </View>
                <Divider style={{ backgroundColor: "rgb(0, 0, 0)" }} />

                {loading ? (
                    <Modal visible={true} style={workoutsStyle.activityIndicatorOverlay} dismissable={false}>
                        <ActivityIndicator animating={true} size='large' color='white' />
                    </Modal>
                ) : (
                    workouts!.map((workout, index) => (
                        <Card key={workout.id} style={workoutsStyle.card}>
                            <Card.Title title={workout.title} subtitle={workout.duration + " min"} titleStyle={{ color: "white" }} subtitleStyle={{ color: "white" }} />

                            <Divider />

                            <Button style={workoutsStyle.cardButton} mode="text" textColor='white' onPress={() => { handleDetailsOpen(workout) }}>Details</Button>

                            <View style={workoutsStyle.ratingContainer}>
                                <AirbnbRating
                                    size={20}
                                    defaultRating={workout.rating ? workout.rating : 0}
                                    showRating={false}
                                    isDisabled={false}
                                    onFinishRating={(value) => handleRatingChange(workout.id, value)}
                                    selectedColor={ratingColors[workout.id]}
                                />
                            </View>
                        </Card>
                    ))
                )}
            </ScrollView>

            <FAB
                icon={() => <MaterialIcon name="add" size={24} color="white" />}
                label="Add"
                color="white"
                style={workoutsStyle.fab}
                onPress={() => setNewWorkoutDialogVisible(true)}
                disabled={loading}
            />

            <WorkoutDialog visible={newWorkoutDialogVisible} hideDialog={() => setNewWorkoutDialogVisible(false)} handleSubmit={handleWorkoutSubmit} isSubmitting={isSubmittingWorkout} />
            <WorkoutDetailsScreen visible={detailsDialogVisible} handleClose={handleDetailsClose} workout={selectedWorkout} workoutExercises={selectedWorkoutExercises} />
        </View>
    );
}