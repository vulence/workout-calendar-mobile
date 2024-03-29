import { useState } from "react";
import { Button, Card, Divider, IconButton, Modal, Text } from "react-native-paper";
import { View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { WorkoutDialogProps } from "../../types";
import { workoutDialogStyle } from "./WorkoutDialogStyle";
import StyledTextInput from "../components/StyledTextInput";

export default function WorkoutDialog(props: WorkoutDialogProps) {
    const [date, setDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    const handleDateChange = (e: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
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
                        <StyledTextInput mode="outlined" placeholder="Title" style={workoutDialogStyle.input} />
                    </View>

                    <View style={workoutDialogStyle.inputContainer}>
                        <Text>Date</Text>
                        <Button mode="outlined" style={{marginLeft: 30, backgroundColor: "rgb(20, 20, 20)", borderRadius: 10}} labelStyle={{fontSize: 18, color: "white"}} onPress={() => setShowDatePicker(true)}>{date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}</Button>
                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>
                </Card.Content>

                <Divider bold={true} />
            </Card>
        </Modal>
    );
}