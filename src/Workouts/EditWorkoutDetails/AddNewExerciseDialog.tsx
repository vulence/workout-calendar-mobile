import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Button, Card, Divider, IconButton, Modal, Text } from "react-native-paper";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { style } from "./AddNewExerciseDialogStyle";
import StyledTextInput from "../../components/StyledTextInput";
import { AddNewExerciseDialogProps, Exercise } from "../../../types";
import AntDesign from "react-native-vector-icons/AntDesign";
import { fetchExercises } from "../../api/api";
import { AuthContext } from "../../../AuthContext";

export default function AddNewExerciseDialog(props: AddNewExerciseDialogProps) {
    const { accessToken } = useContext(AuthContext);

    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [weight, setWeight] = useState<string>();
    const [sets, setSets] = useState<string>();
    const [reps, setReps] = useState<string>();
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [value, setValue] = useState<Exercise>();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        loadExercises();
    }, [props.currentExercises]);

    const loadExercises = async () => {
        try {
            const result : Exercise[] = await fetchExercises(accessToken!);
            setExercises(
                result.filter(exercise => !props.currentExercises.includes(exercise.name))
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await props.handleSubmit(props.workoutId, {exerciseId: value!.id, weight: weight, sets: sets, reps: reps});
        props.hideDialog();
        setIsSubmitting(false);
    };

    return (
        <Modal visible={props.visible} onDismiss={props.hideDialog} contentContainerStyle={style.modal}>
            <Card elevation={0} style={style.card}>
                <Card.Title title={<Text style={style.cardTitleText}>Add new workout exercise</Text>}
                    right={(pr) => <IconButton {...pr} icon="close" onPress={props.hideDialog} />}
                />

                <Divider bold={true} />

                <Card.Content>
                    <View style={style.inputContainer}>
                        <Text>Exercise</Text>
                        <Dropdown
                            style={[style.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={style.placeholderStyle}
                            selectedTextStyle={style.selectedTextStyle}
                            inputSearchStyle={style.inputSearchStyle}
                            iconStyle={style.iconStyle}
                            data={exercises}
                            search
                            maxHeight={200}
                            labelField="name"
                            valueField="name"
                            placeholder={!isFocus ? 'Select item' : '...'}
                            searchPlaceholder="Search..."
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={style.icon}
                                    color={isFocus ? 'blue' : 'black'}
                                    name="Safety"
                                    size={20}
                                />
          )}
                        />
                    </View>

                    <View style={style.inputContainer}>
                        <Text>Weight</Text>
                        <StyledTextInput mode="outlined" placeholder="Weight" value={weight} style={style.input} keyboardType="numeric" onChangeText={(weight) => setWeight(weight)} />
                    </View>

                    <View style={style.inputContainer}>
                        <Text>Sets</Text>
                        <StyledTextInput mode="outlined" placeholder="Sets" value={sets} style={style.input} keyboardType="numeric" onChangeText={(sets) => setSets(sets)} />
                    </View>

                    <View style={style.inputContainer}>
                        <Text>Reps</Text>
                        <StyledTextInput mode="outlined" placeholder="Reps" value={reps} style={style.input} keyboardType="numeric" onChangeText={(reps) => setReps(reps)} />
                    </View>

                    {isSubmitting ? (
                        <ActivityIndicator size={40} style={style.submitButton} />
                    ) : (
                        <Button mode="contained" textColor="white" style={style.submitButton} onPress={() => handleSubmit()}>Submit</Button>
                    )}
                </Card.Content>

                <Divider bold={true} />
            </Card>
        </Modal>
    );
}