import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Text, Button, Divider, FAB } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { workoutsStyle } from './WorkoutsStyle';
import HistoryDetailsScreen from './HistoryDetailsScreen';
import { useFonts } from 'expo-font';
import { Workout } from '../../types';
import { fetchWorkouts } from '../api/api';
import { AuthContext } from '../../AuthContext';
import WorkoutDialog from './WorkoutDialog';

export default function WorkoutsScreen() {
    const [fontsLoaded] = useFonts({
        'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
        'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
        'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    });

    // Details modal states
    const [visible, setVisible] = useState<boolean>(false);
    const [driveData, setDriveData] = useState<any>({
        date: '',
        homeAddress: '',
        destinationAddress: '',
        distance: 0,
        duration: '',
        price: 0,
    });

    // Sets the details props to corresponding cards and displays it
    const handleDetailsOpen = (newDate: string, newHomeAddress: string, newDistance: number, newDestinationAddress: string, newDuration: string, newPrice: number) => {
        setDriveData({
            date: newDate,
            homeAddress: newHomeAddress,
            distance: newDistance,
            destinationAddress: newDestinationAddress,
            duration: newDuration,
            price: newPrice
        });

        setVisible(true);
    };

    // Hides the details modal
    const handleDetailsClose = () => {
        setVisible(false);
    };

    const context = useContext(AuthContext);
    const [workouts, setWorkouts] = useState<Workout[]>();
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);

    useEffect(() => {
        fetchWorkouts(context.accessToken!).then((data) => setWorkouts(data)).catch((error) => console.error(error));
    }, []);

    return (
        <ScrollView style={workoutsStyle.content} contentContainerStyle={workoutsStyle.contentContainer}>
            <View style={{ backgroundColor: "rgb(30, 30, 30)", paddingTop: 40 }}>
                <Text style={{ marginLeft: 10, marginBottom: 10, fontFamily: "Inter-Bold", fontSize: 30 }}>Workouts</Text>
            </View>
            <Divider style={{ backgroundColor: "rgb(0, 0, 0)" }} />

            {workouts?.map((workout, index) => (
                <Card key={workout.id} style={workoutsStyle.card}>
                    <Card.Title title={workout.title} subtitle={workout.duration + " min"} titleStyle={{ color: "white" }} subtitleStyle={{ color: "white" }} />

                    <Divider />

                    <Button style={workoutsStyle.cardButton} mode="text" textColor='white' onPress={() => { handleDetailsOpen("15/09/2023", "Ljube Tadica 32", 15, "Trg republike 1a", "0:45", 2500) }}>Details</Button>

                    <View style={workoutsStyle.ratingContainer}>
                        <AirbnbRating
                            size={20}
                            defaultRating={workout.rating}
                            showRating={false}
                            isDisabled={false}
                            selectedColor="rgb(143, 27, 27)"
                        />
                    </View>
                </Card>
            ))}

            <FAB
                icon={() => <MaterialIcon name="add" size={24} color="white" />}
                label="Add"
                color="white"
                style={workoutsStyle.fab}
                onPress={() => setDialogVisible(true)}
            />

            <WorkoutDialog visible={dialogVisible} hideDialog={() => setDialogVisible(false)} />

            <HistoryDetailsScreen visible={visible} handleClose={handleDetailsClose} driveData={driveData} />
        </ScrollView>
    );
}