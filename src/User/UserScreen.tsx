import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import type { MaterialBottomTabScreenProps } from 'react-native-paper';
import { Text, Card, Title, Button, List, Divider, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as SecureStore from 'expo-secure-store';

import { userStyle } from './UserStyle';
import { AuthContext } from '../../AuthContext';
import LoadingIndicator from '../components/LoadingIndicator';
import SupportDialog from './SupportDialog';
import { UserStackParamsList } from '../../types';
import { useFonts } from 'expo-font';

type Props = MaterialBottomTabScreenProps<UserStackParamsList, "User">;

export default function UserScreen({ route, navigation }: Props) {
    // Loads the necessary fonts
    const [fontsLoaded] = useFonts({
        'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
        'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
        'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    });

    // Load the app context in order to print user's name
    const context = useContext(AuthContext);

    // Home address and logout indicator states
    const [homeAddress, setHomeAddress] = useState<string>('Ljube Tadica');
    const [isLogoutLoading, setIsLogoutLoading] = useState<boolean>(false);

    // States for support dialog
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const showDialog = () => setDialogVisible(true);
    const hideDialog = () => setDialogVisible(false);

    // Removes the token from local storage and sets the user and usertoken states as null
    const handleLogout = async () => {
        try {
            setIsLogoutLoading(true);

            context?.setAccessToken(null);
            // context?.setUser(null);
            SecureStore.deleteItemAsync("accessToken");
            await new Promise(resolve => setTimeout(resolve, 2000));

            setIsLogoutLoading(false);
        }
        catch (error) {
            console.error(error);
            setIsLogoutLoading(false);
        }
    };

    const handleEditAddress = () => {

    };

    // Waits to display until fonts are loaded
    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={userStyle.content}>
            <Card elevation={5} style={userStyle.card}>
                <Card.Content style={userStyle.cardContentHeader}>
                    <View style={userStyle.avatarContainer}>
                        <AntIcon size={80} name="user" />
                    </View>
                    <View style={userStyle.titleContainerHeader}>
                        <Title style={[userStyle.title, { fontFamily: "Inter-Bold" }]}>{context?.user ? context?.user?.username : "Vukasin Marinkovic"}</Title>
                        <Text style={[userStyle.text, { fontFamily: "Inter-Regular" }]}>{context?.user ? context?.user?.email : "vukasinmarinkovic0@gmail.com"}</Text>
                    </View>
                </Card.Content>

                <Card.Content>
                    <View style={userStyle.infoContent}>
                        <View style={userStyle.infoColumn}>
                            <Title style={[userStyle.title, { fontFamily: "Inter-Medium" }]}>Member Since</Title>
                            <Text style={[userStyle.text, { fontFamily: "Inter-Regular" }]}>{context?.user ? context.user.createdAt : "11/09/2023"}</Text>
                        </View>
                        <View style={userStyle.infoColumn}>
                            <Title style={[userStyle.title, { fontFamily: "Inter-Medium" }]}>Lorem</Title>
                            <Text style={[userStyle.text, { fontFamily: "Inter-Regular" }]}>12</Text>
                        </View>
                        <View style={userStyle.infoColumn}>
                            <Title style={[userStyle.title, { fontFamily: "Inter-Medium" }]}>Level</Title>
                            <Text style={[userStyle.text, { fontFamily: "Inter-Regular" }]}>Basic</Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>

            <Divider />
            <List.Accordion title="Home Address" titleStyle={[userStyle.listAccordionTitle, { fontFamily: "Inter-Bold" }]} style={userStyle.listAccordion} left={props => <List.Icon {...props} color="rgb(207,27,27)" icon="pin" />}>
                <View style={userStyle.listItemContainer}>
                    <Text variant="bodyLarge">{homeAddress}</Text>
                    <Button mode="elevated" style={userStyle.editAddressButton} textColor="rgb(207,27,27)" buttonColor='rgb(242,242,242)' onPress={() => handleEditAddress()}>Change</Button>
                </View>
            </List.Accordion>

            <View style={userStyle.buttonContainer}>
                <Button mode="elevated" contentStyle={userStyle.buttonContent} style={userStyle.button} icon="history" onPress={() => navigation.navigate("History")}>
                    History
                </Button>
                <Button mode="elevated" contentStyle={userStyle.buttonContent} style={userStyle.button} icon="sale" onPress={() => { }}>
                    Promotions
                </Button>
                <Button mode="elevated" contentStyle={userStyle.buttonContent} style={userStyle.button} icon="wrench" onPress={() => navigation.navigate("Settings")}>
                    Settings
                </Button>
                <Button mode="contained" contentStyle={userStyle.buttonContent} buttonColor='rgb(143,27,27)' icon="logout" onPress={() => handleLogout()}>
                    Logout
                </Button>
            </View>

            <FAB
                icon={() => <MaterialIcon name="support-agent" size={24} color="white" />}
                style={userStyle.fab}
                label="Support"
                color="white"
                onPress={showDialog}
            />
            <SupportDialog visible={dialogVisible} hideDialog={hideDialog} token={context ? context.accessToken : null} />
            <LoadingIndicator isLoading={isLogoutLoading} />

        </SafeAreaView>
    );
}