import { Workout } from "../../types";

const API_URL = "http://192.168.1.8:8080";

export async function fetchWorkouts(token : string, page = "0", direction = "desc") {
    const response = await fetch(`${API_URL}/workouts?page=${page}&direction=${direction}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });

    const result = await response.json();
    return result;
};

export async function fetchWorkoutExercises(token: string, workoutId: string) {
    const response = await fetch(`${API_URL}/workouts/${workoutId}/exercises?grouped=true`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });

    const result = await response.json();
    return result;
};

export async function submitWorkout(token: string, workout: any) {
    const response = await fetch(`${API_URL}/workouts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(workout),
    });

    const result = await response.json();
    return result.message;
};

export async function updateWorkout(token: string, workout: Workout) {
    const response = await fetch(`${API_URL}/workouts/${workout.id.toString()}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(workout)
    });

    return response.status;
}

export async function deleteWorkout(token: string, workoutId: string) {
    const response = await fetch(`${API_URL}/workouts/${workoutId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response.status;
};

export async function submitWorkoutExercise(token: string, workoutId: string, workoutExercise: any) {
    const response = await fetch(`${API_URL}/workouts/${workoutId}/exercises`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(workoutExercise)
    });

    return response.status;
};

export async function removeWorkoutExercise(token: string, workoutId: string, workoutExerciseId: string) {
    const response = await fetch(`${API_URL}/workouts/${workoutId}/exercises/${workoutExerciseId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response.status;
};

export async function fetchExercises(token: string) {
    const response = await fetch(`${API_URL}/exercises`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const result = await response.json();

    return result;
}