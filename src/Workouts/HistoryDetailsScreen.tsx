import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Text, Button, Divider, Portal, Modal, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Svg, { Line } from 'react-native-svg';

import { workoutsStyle } from './WorkoutsStyle';
import { HistoryDetailsProps } from '../../types';

export default function HistoryDetailsScreen(props: HistoryDetailsProps) {
    return (
        <Portal>
            <Modal visible={props.visible} onDismiss={props.handleClose} style={workoutsStyle.detailsModal}>
                <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }} elevation={0}>
                    <Card.Title title={<Text style={workoutsStyle.detailsTitleText}>{props.driveData.date}</Text>} style={workoutsStyle.detailsTitleContainer}
                        right={(pr) => <IconButton {...pr} icon="close" onPress={props.handleClose} />}
                    />
                    <Divider bold={true} style={{ marginBottom: 15 }} />

                    <Card.Content>
                        <View style={workoutsStyle.detailsClockContainer}>
                            <Icon name="clock" size={30} color="rgb(147, 27, 27)" />
                            <Text style={{ marginLeft: 10 }}>{props.driveData.duration}</Text>
                        </View>

                        <View style={workoutsStyle.detailsRouteContainer}>
                            <Icon name="home" size={30} />
                            <Svg height={2} width={260}>
                                <Line x1="0" y1="0" x2="260" y2="0" stroke="black" strokeWidth="5" />
                            </Svg>
                            <Icon name="flag-checkered" size={30} color="green" />
                        </View>

                        <View style={workoutsStyle.detailsRouteAddresses}>
                            <Text style={{ maxWidth: 65 }}>{props.driveData.homeAddress}</Text>
                            <Text style={{ maxWidth: 40 }}>{props.driveData.distance}km</Text>
                            <Text style={{ maxWidth: 65 }}>{props.driveData.destinationAddress}</Text>
                        </View>

                        <View style={workoutsStyle.detailsPriceContainer}>
                            <Icon name="money-bill-alt" size={25} color="rgb(5, 71, 42)" style={{marginRight: 10}} />
                            <Text>{props.driveData.price} rsd</Text>
                        </View>

                        <View style={workoutsStyle.detailsDriverContainer}>
                            <Text style={{ fontSize: 22, fontWeight: "bold" }}>Vukašin</Text>
                            <Icon name="user-circle" size={40} />
                        </View>
                    </Card.Content>
                </Card>
            </Modal>
        </Portal>
    );
}
