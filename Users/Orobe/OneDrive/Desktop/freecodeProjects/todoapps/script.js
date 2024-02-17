const axios = require("axios");

const apiUrl = "https://api-football-v1.p.rapidapi.com/v2/fixtures/live";
const apiKey = "your-api-key";
const leagueId = "39";

const apiOptions = {
  headers: {
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    "x-rapidapi-key": apiKey,
  },
  params: {
    timezone: "Europe/London",
    league: leagueId,
  },
};

const fetchDataWithRetry = async (maxRetries = 5) => {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      const response = await axios.get(apiUrl, apiOptions);
      return response.data.api.fixtures;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const waitTime = Math.pow(2, retries) * 1000; // Exponential backoff
        console.log(
          `Rate limit exceeded. Retrying in ${waitTime / 1000} seconds...`
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        retries++;
      } else {
        throw error;
      }
    }
  }
  throw new Error(`Failed to fetch data after ${maxRetries} retries`);
};

fetchDataWithRetry()
  .then((data) => {
    console.log(data);
    // Add code here to display fixtures on the webpage
  })
  .catch((err) => {
    console.error("Error fetching data:", err);
  });
