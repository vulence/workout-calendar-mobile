const API_URL = "http://127.0.0.1:8080";

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