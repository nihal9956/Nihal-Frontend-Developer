// api.js

import axios from 'axios';

const makeApiRequest = async (method, url, data = null, headers = {}) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    // Handle the response as needed
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('API request error:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export default makeApiRequest;
