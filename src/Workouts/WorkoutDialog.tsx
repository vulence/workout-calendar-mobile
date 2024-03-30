import { useState } from "react";
import { Button, Card, Divider, IconButton, Modal, Text } from "react-native-paper";
import { View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { WorkoutDialogProps } from "../../types";
import { workoutDialogStyle } from "./WorkoutDialogStyle";
import StyledTextInput from "../components/StyledTextInput";
import { submitWorkout } from "../api/api";

export default function WorkoutDialog(props: WorkoutDialogProps) {
    const [title, setTitle] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const [duration, setDuration] = useState<Date>(() => {
        const currentDate = new Date();
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        return currentDate;
    });
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [showDurationPicker, setShowDurationPicker] = useState<boolean>(false);

    const handleDateChange = (e: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const handleDurationChange = (e: DateTimePickerEvent, selectedDuration?: Date) => {
        const currentDuration = selectedDuration || duration;
        setShowDurationPicker(false);
        setDuration(currentDuration);
    };

    const handleSubmit = async () => {
        const workout: any = {title: title, date: date, notes: '', duration: (duration.getHours() * 60 + duration.getMinutes())};

        submitWorkout(props.token, workout).then((data) => console.log(data)).catch((error) => console.error(error));
    };

    return (
        <Modal visible={props.visible} onDismiss={props.hideDialog} contentContainerStyle={workoutDialogStyle.modal}>
            <Card elevation={0} style={workoutDialogStyle.card}>
                <Card.Title title={<Text style={workoutDialogStyle.cardTitleText}>Add new workout</Text>}
                    right={(pr) => <IconButton {...pr} icon="close" onPress={props.hideDialog} />}
                />

                <Divider bold={true} />

                <Card.Content>
                    <View style={workoutDialogStyle.inputContainer}>
                        <Text>Title</Text>
                        <StyledTextInput mode="outlined" placeholder="Title" value={title} style={workoutDialogStyle.input} onChangeText={(title) => setTitle(title)} />
                    </View>

                    <View style={workoutDialogStyle.inputContainer}>
                        <Text>Date</Text>
                        <Button mode="outlined" style={workoutDialogStyle.inputButton} labelStyle={workoutDialogStyle.inputButtonText} onPress={() => setShowDatePicker(true)}>{date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}</Button>
                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>

                    <View style={workoutDialogStyle.inputContainer}>
                        <Text>Duration</Text>
                        <Button mode="outlined" style={workoutDialogStyle.inputButton} labelStyle={workoutDialogStyle.inputButtonText} onPress={() => setShowDurationPicker(true)}>{duration.getHours() + ":" + duration.getMinutes()}</Button>
                        {showDurationPicker && (
                            <DateTimePicker
                                value={duration}
                                mode="time"
                                display="spinner"
                                minuteInterval={5}
                                onChange={handleDurationChange}
                            />
                        )}
                    </View>

                    <Button mode="contained" textColor="white" style={workoutDialogStyle.submitButton} onPress={() => handleSubmit()}>Submit</Button>
                </Card.Content>

                <Divider bold={true} />
            </Card>
        </Modal>
    );
}