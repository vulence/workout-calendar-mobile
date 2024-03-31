import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Text, Button, Divider, Portal, Modal, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { workoutDetailsStyle } from './WorkoutDetailsStyle';
import { WorkoutDetailsProps } from '../../../types';

export default function WorkoutDetailsScreen(props: WorkoutDetailsProps) {
    return (
        <Modal visible={props.visible} onDismiss={props.handleClose} style={workoutDetailsStyle.detailsModal}>
            <Card style={{ backgroundColor: "rgb(30, 30, 30)" }} elevation={0}>
                <Card.Title title={<Text style={workoutDetailsStyle.detailsTitleText}>{props.workout?.title}</Text>} style={workoutDetailsStyle.detailsTitleContainer}
                    right={(pr) => <IconButton {...pr} icon="close" onPress={props.handleClose} />}
                />
                <Divider bold={true} style={{ marginBottom: 15 }} />

                <Card.Content>
                    <View style={workoutDetailsStyle.detailsClockContainer}>
                        <Icon name="clock" size={30} color="rgb(147, 27, 27)" />
                        <Text style={{ marginLeft: 10 }}>{props.workout?.duration} min</Text>
                    </View>

                    {props.workoutExercises?.map((workoutExercise) => (
                        <View key={workoutExercise.id} style={workoutDetailsStyle.workoutExerciseContainer}>
                            <Text>{workoutExercise.exerciseName}</Text>
                            <Text>{workoutExercise.weight}</Text>
                            <Text>{workoutExercise.sets}</Text>
                            <Text>{workoutExercise.reps}</Text>
                        </View>
                    ))}

                </Card.Content>
            </Card>
        </Modal>
    );
}
