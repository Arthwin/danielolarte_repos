import axios from "axios";
import { externalMockApiUrl } from "../config/externalMockApiConfig";

async function callMockVerificationApi() {
  // Calling a self hosted mock api as poc
  try {
    // Set the URL of the API
    const apiUrl = externalMockApiUrl;

    // Make the GET request using axios
    const response = await axios.get(apiUrl);

    // Assuming the API responds with JSON data, access it through response.data
    const apiData = response.data;

    // Process the data as needed

    return apiData;
  } catch (error) {
    // Handle any errors that occur during the request, ignoring since it's a Mock
    throw error; // Optionally re-throw the error or handle it in the caller function
  }
}

export default callMockVerificationApi;
