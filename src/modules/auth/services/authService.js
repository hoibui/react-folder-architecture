// Ensure the API_URL is configurable via environment variables
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/identity/Authentication";
// Log the raw response for debugging and handle non-JSON responses gracefully
export const authService = {
    async signIn(username, password) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
            redirect: "follow",
        });

        const contentType = response.headers.get('content-type');
        console.log("Raw response:", response); // Log the raw response for debugging

        if (!response.ok) {
            if (contentType && contentType.includes('application/json')) {
                const json = await response.json();
                throw new Error(json.message);
            } else {
                throw new Error(`An error occurred: ${response.status} ${response.statusText}`);
            }
        }

        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            throw new Error('The response is not JSON.');
        }
    }
};