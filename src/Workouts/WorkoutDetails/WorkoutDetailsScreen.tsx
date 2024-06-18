import React, { useEffect, useState } from 'react';
import { View, LayoutAnimation, ScrollView } from 'react-native';
import { Card, Text, Divider, Modal, IconButton, List, MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { workoutDetailsStyle } from './WorkoutDetailsStyle';
import { WorkoutDetailsProps } from '../../../types';

export default function WorkoutDetailsScreen(props: WorkoutDetailsProps) {
    const handlePress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };

    const handleEditButton = () => {
        props.navigation.navigate("EditWorkoutDetails", { workout: props.workout });
        props.handleClose();
    };

    return (
        <Modal visible={props.visible} onDismiss={props.handleClose} style={workoutDetailsStyle.detailsModal}>
            <ScrollView>
                <Card style={workoutDetailsStyle.card} elevation={0}>
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
                            <List.Accordion onPress={handlePress} title={workoutExercise.exercise} key={workoutExercise.exercise} style={workoutDetailsStyle.listAccordionExercise} titleStyle={workoutDetailsStyle.listAccordionTitle}>
                                <List.Section style={workoutDetailsStyle.listSection}>
                                    <View style={workoutDetailsStyle.workoutExerciseDetails}>
                                        <List.Item titleStyle={workoutDetailsStyle.listItemTitle} style={workoutDetailsStyle.listItem} title="Weight" />
                                        <List.Item titleStyle={workoutDetailsStyle.listItemTitle} style={workoutDetailsStyle.listItem} title="Sets" />
                                        <List.Item titleStyle={workoutDetailsStyle.listItemTitle} style={workoutDetailsStyle.listItem} title="Reps" />
                                    </View>
                                    {workoutExercise.details.map((detail) => (
                                        <View key={detail.id} style={workoutDetailsStyle.workoutExerciseDetails}>
                                            <List.Item titleStyle={workoutDetailsStyle.listItemTitle} style={workoutDetailsStyle.listItem} title={detail.weight} />
                                            <List.Item titleStyle={workoutDetailsStyle.listItemTitle} style={workoutDetailsStyle.listItem} title={detail.sets} />
                                            <List.Item titleStyle={workoutDetailsStyle.listItemTitle} style={workoutDetailsStyle.listItem} title={detail.reps} />
                                        </View>
                                    ))}
                                </List.Section>
                            </List.Accordion>
                        ))}

                        <IconButton
                            icon="pencil-circle"
                            iconColor={MD3Colors.primary100}
                            size={40}
                            style={{ alignSelf: "center", marginBottom: 0 }}
                            onPress={() => handleEditButton()}
                        />
                    </Card.Content>
                </Card>
            </ScrollView>
        </Modal>
    );
}
