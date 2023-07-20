// Import the required libraries
import axios from 'axios';

// Create a function to make the API request
async function makeMockApiRequest() {
  try {
    // Set the URL of the API you want to request data from
    const apiUrl = 'http://localhost:3000/api/verification'; // Replace this with config file

    // Make the GET request using axios
    const response = await axios.get(apiUrl);

    // Assuming the API responds with JSON data, you can access it through response.data
    const apiData = response.data;

    // Process the data as needed (e.g., return it or use it in some way)
    return apiData;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error making API request:', (error as Error).message);
    throw error; // Optionally re-throw the error or handle it in the caller function
  }
}

export default makeMockApiRequest;
