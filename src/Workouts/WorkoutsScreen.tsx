import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Card, Text, Button, Divider, FAB, ActivityIndicator, Modal, IconButton, MD3Colors } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { workoutsStyle } from './WorkoutsStyle';
import WorkoutDetailsScreen from './WorkoutDetails/WorkoutDetailsScreen';
import { useFonts } from 'expo-font';
import { GroupedExercise, Workout } from '../../types';
import { fetchWorkoutExercises, fetchWorkouts, submitWorkout } from '../api/api';
import { AuthContext } from '../../AuthContext';
import WorkoutDialog from './WorkoutDialog';

export default function WorkoutsScreen({navigation}: any) {
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

    const getWorkouts = async () => {
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

    const [refreshing, setRefreshing] = useState<boolean>(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getWorkouts().then(() => setRefreshing(false));
    }, []);

    return (
        <View style={workoutsStyle.container}>
            <ScrollView style={workoutsStyle.content} contentContainerStyle={workoutsStyle.contentContainer} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                {loading ? (
                    <Modal visible={true} style={workoutsStyle.activityIndicatorOverlay} dismissable={false}>
                        <ActivityIndicator animating={true} size='large' color='white' />
                    </Modal>
                ) : (
                    workouts!.map((workout, index) => (
                        <Card key={workout.id} style={workoutsStyle.card}>
                            <Card.Title title={workout.date} subtitle={workout.title} titleStyle={{ color: "white", fontWeight: "bold" }} subtitleStyle={{ color: "rgb(210, 210, 210)" }} />

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
                            <View style={workoutsStyle.deleteContainer}>
                                <IconButton
                                    icon="delete-circle"
                                    iconColor={MD3Colors.error50}
                                    size={35}
                                    onPress={() => {}}
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

            <WorkoutDialog
                visible={newWorkoutDialogVisible}
                hideDialog={() => setNewWorkoutDialogVisible(false)}
                handleSubmit={handleWorkoutSubmit} 
                isSubmitting={isSubmittingWorkout} 
            />
            <WorkoutDetailsScreen 
                navigation={navigation} 
                visible={detailsDialogVisible} 
                handleClose={handleDetailsClose} 
                workout={selectedWorkout} 
                workoutExercises={selectedWorkoutExercises} 
            />
        </View>
    );
}