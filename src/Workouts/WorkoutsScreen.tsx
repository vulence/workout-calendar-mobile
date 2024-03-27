import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Text, Button, Divider } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';

import { workoutsStyle } from './WorkoutsStyle';
import HistoryDetailsScreen from './HistoryDetailsScreen';
import { StatusBar } from 'expo-status-bar';

export default function WorkoutsScreen() {
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
    }

    return (
        <ScrollView style={workoutsStyle.content} contentContainerStyle={workoutsStyle.contentContainer}>
            <Text variant="displaySmall" style={{marginLeft: 10}}>Workouts</Text>
            
            <Card style={workoutsStyle.card}>
                <Card.Title title="15/09/2023, 02:45" subtitle="45 min" titleStyle={{color: "white"}} subtitleStyle={{color: "white"}} />

                <Divider />

                <Button style={workoutsStyle.cardButton} mode="text" textColor='white' onPress={() => { handleDetailsOpen("15/09/2023", "Ljube Tadica 32", 15, "Trg republike 1a", "0:45", 2500) }}>Details</Button>

                <View style={workoutsStyle.ratingContainer}>
                    <AirbnbRating
                        size={20}
                        defaultRating={5}
                        showRating={false}
                        isDisabled={true}
                        selectedColor="rgb(143, 27, 27)"
                    />
                </View>
            </Card>

            <Card style={workoutsStyle.card}>
                <Card.Title title="20/09/2023, 00:30" subtitle="1 hr 20 min" titleStyle={{color: "white"}} subtitleStyle={{color: "white"}} />

                <Divider />

                <Button style={workoutsStyle.cardButton} mode="text" textColor='white' onPress={() => { handleDetailsOpen("20/09/2023", "Mirijevsko Brdo 52j", 10, "Jove Ilica 232", "1:20", 2000) }}>Details</Button>

                <View style={workoutsStyle.ratingContainer}>
                    <AirbnbRating
                        size={20}
                        defaultRating={3}
                        showRating={false}
                        isDisabled={true}
                        selectedColor="rgb(143, 27, 27)"
                    />
                </View>
            </Card>

            <HistoryDetailsScreen visible={visible} handleClose={handleDetailsClose} driveData={driveData} />
        </ScrollView>
    );
}