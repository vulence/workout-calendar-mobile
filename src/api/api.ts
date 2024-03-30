import { Workout } from "../../types";

const API_URL = "http://192.168.0.13:8080";

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
}