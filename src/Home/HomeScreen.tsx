import { SafeAreaView, View } from "react-native";
import { useFonts } from 'expo-font';
import { Calendar } from "react-native-calendars";

import { homeStyle } from './HomeStyle';
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { CompletedWorkout, Workout } from "../../types";
import { completeWorkout, fetchCompletedWorkouts, fetchWorkouts } from "../api/api";
import { AuthContext } from "../../AuthContext";
import { Dropdown } from "react-native-element-dropdown";

export default function HomeScreen({navigation} : any) {
    const [fontsLoaded] = useFonts({
        'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
        'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
        'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    });

    const context = useContext(AuthContext);

    const [completedWorkouts, setCompletedWorkouts] = useState<CompletedWorkout[]>([]);
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [selectedWorkoutId, setSelectedWorkoutId] = useState<number | null>();
    const [markedDates, setMarkedDates] = useState<object>({});
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [wasWorkoutCompleted, setWasWorkoutCompleted] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        getCompletedWorkouts();
        getWorkouts();
    }, []);

    const getCompletedWorkouts = async () => {
        fetchCompletedWorkouts(context.accessToken!)
            .then((data) => setCompletedWorkouts(data))
            .catch((error) => console.error(error));
    };

    const getWorkouts = async () => {
        fetchWorkouts(context.accessToken!)
            .then((data) => setWorkouts(data))
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        if (completedWorkouts.length > 0) {
            const marks = completedWorkouts.reduce((acc: any, completedWorkout) => {
                acc[completedWorkout.date] = { marked: true, dotColor: '#1e88e5' };
                return acc;
            }, {});

            setMarkedDates(marks);
        }
    }, [completedWorkouts]);

    const handleDateSelect = (day: any) => {
        setSelectedDate(day.dateString);

        const workoutExists = completedWorkouts.some(
            (completedWorkout) => completedWorkout.date === day.dateString
        );

        setWasWorkoutCompleted(workoutExists);
        setSelectedWorkoutId(null);
    };

    const handleCompleteWorkout = async () => {
        setIsSubmitting(true);
        completeWorkout(context.accessToken!, { workoutId: selectedWorkoutId, date: selectedDate })
            .then((data) => { getCompletedWorkouts(); setIsSubmitting(false) })
            .catch(error => console.error(error));
    };

    const handleNavigateToWorkoutDetails = async () => {
        const workoutId = completedWorkouts.find(cw => cw.date === selectedDate)?.workoutId;

        navigation.navigate("Workout", {screen: "EditWorkoutDetails", params: {workout: workouts.find(workout => workout.id === workoutId)}});
    }

    return (
        <View style={homeStyle.container}>
            <SafeAreaView style={homeStyle.content}>
                <View style={homeStyle.header}>
                    <Text style={homeStyle.headerText}>Home</Text>
                </View>

                <Calendar
                    style={homeStyle.calendar}
                    theme={{
                        backgroundColor: '#1e1e1e',
                        calendarBackground: '#1e1e1e',
                        textSectionTitleColor: '#b6c1cd',
                        selectedDayBackgroundColor: '#5c0f0f',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#f4511e',
                        dayTextColor: '#d9e1e8',
                        textDisabledColor: '#43484d',
                        arrowColor: '#f4511e',
                        monthTextColor: '#ffffff',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 18,
                        textDayHeaderFontSize: 14,
                    }}
                    onDayPress={handleDateSelect}
                    markedDates={{
                        ...markedDates,
                        [selectedDate]: {
                            selected: true,
                            marked: true,
                            dotColor: '#f4511e',
                        },
                    }}
                />

                <Text style={homeStyle.selectedDateText}>
                    {selectedDate ? `Selected Date: ${selectedDate}` : 'No date selected'}
                </Text>

                {!wasWorkoutCompleted ? (
                    <>
                        <Dropdown
                            style={homeStyle.dropdown}
                            placeholderStyle={homeStyle.placeholderStyle}
                            selectedTextStyle={homeStyle.selectedTextStyle}
                            inputSearchStyle={homeStyle.inputSearchStyle}
                            itemContainerStyle={homeStyle.itemContainerStyle}
                            itemTextStyle={homeStyle.itemTextStyle}
                            activeColor="#555"
                            data={workouts}
                            value={workouts ? workouts.find(workout => workout.id === selectedWorkoutId) : null}
                            labelField="title"
                            valueField="title"
                            placeholder="Select workout"
                            onChange={(item) => {
                                setSelectedWorkoutId(item.id);
                            }}
                        />

                        {isSubmitting ? (
                            <ActivityIndicator size={40} style={homeStyle.button} />
                        ) : (
                            <Button
                                mode="contained"
                                onPress={handleCompleteWorkout}
                                style={homeStyle.button}
                                disabled={selectedWorkoutId === null}
                            >
                                Complete a workout
                            </Button>
                        )}
                    </>
                ) : selectedDate && (
                    <>
                        <Text style={homeStyle.completedWorkoutText}>
                            You have already completed a workout on this date.{'\n\n'}Tap the button below to see the details.
                        </Text>

                        <Button
                            mode="contained"
                            onPress={() =>  handleNavigateToWorkoutDetails()}
                            style={homeStyle.button}
                        >
                            Go to workout details
                        </Button>
                    </>
                )}
    
            </SafeAreaView>
        </View>
    );
}