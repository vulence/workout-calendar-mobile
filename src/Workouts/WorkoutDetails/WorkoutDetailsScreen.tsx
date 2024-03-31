import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Text, Button, Divider, Portal, Modal, IconButton, List } from 'react-native-paper';
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
                        <List.Accordion title={workoutExercise.exercise} key={workoutExercise.exercise} style={workoutDetailsStyle.listAccordionExercise} titleStyle={workoutDetailsStyle.listAccordionTitle}>
                            <View style={workoutDetailsStyle.workoutExerciseDetails}>
                                <Text>Weight</Text >
                                <Text>Sets</Text>
                                <Text>Reps</Text>
                            </View>
                            {workoutExercise.details.map((detail) => (
                                <View style={workoutDetailsStyle.workoutExerciseDetails}>
                                    <Text>{detail.weight}</Text >
                                    <Text>{detail.sets}</Text>
                                    <Text>{detail.reps}</Text>
                                </View>
                            ))}
                        </List.Accordion>
                    ))}

                </Card.Content>
            </Card>
        </Modal>
    );
}
