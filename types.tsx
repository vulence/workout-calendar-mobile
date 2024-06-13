import { ReactNode } from "react";

export type AccountStackParamsList = {
    Home: undefined,
    Login: undefined,
    Register: undefined
};

export type SnackbarProps = {
    visible: boolean;
    closeSnackbar: () => void;
    snackbarContent: string;
    action?: string;
};

export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
};

export type UserStackParamsList = {
    User: undefined;
    History: undefined;
    Settings: undefined;
};

export type AuthContextType = {
    user: User | null;
    accessToken: string | null;
    setAccessToken: (accessToken: string | null) => void;
};

export type AuthProviderProps = {
    children: ReactNode;
};

export type SupportDialogProps = {
    visible: boolean;
    hideDialog: () => void;
    token: string | null;
};

export type LoadingProps = {
    isLoading: boolean;
};

export type DriveData = {
    date: string;
    homeAddress: string;
    destinationAddress: string;
    distance: number;
    duration: string;
    price: number;
}

export type WorkoutDetailsProps = {
    visible: boolean;
    handleClose: () => void;
    workout: Workout | null;
    workoutExercises: GroupedExercise[] | null;
    navigation: any;
};

export type Workout = {
    id: number;
    title: string;
    date: string;
    notes: string;
    duration: number;
    rating: number;
};

export type WorkoutExercise = {
    id: number;
    exerciseName: string;
    weight: number;
    sets: number;
    reps: number;
    completed: boolean;
    workoutId: number;
    exerciseId: number;
};

export type GroupedExercise = {
    exercise: string;
    details: GroupedExerciseDetails[];
};

type GroupedExerciseDetails = {
    weight: number;
    sets: number;
    reps: number;
    id: number;
};

export type WorkoutDialogProps = {
    visible: boolean;
    hideDialog: () => void;
    handleSubmit: (workout: any) => void;
    isSubmitting: boolean;
};

export type WorkoutStackParamsList = {
    Home: undefined;
    Workouts: undefined;
    EditWorkoutDetails: undefined;
};

export type EditWorkoutDetailsScreenProps = {
    workout: Workout;
    workoutExercises: GroupedExercise[];
};