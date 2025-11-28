import axios from 'axios';

async function fetchData(url: string): Promise<void> {
  try {
    const response = await axios.get(url);
    console.log('Status:', response.status);
    console.log('Data:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Example usage
fetchData('https://api.github.com/users/github');