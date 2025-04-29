// Service to handle API calls for employees
const EMPLOYEE_API_URL = "https://dummyjson.com/users";

export const employeeService = {
    async fetchEmployees() {
        const response = await fetch(EMPLOYEE_API_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch employees: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    },
};