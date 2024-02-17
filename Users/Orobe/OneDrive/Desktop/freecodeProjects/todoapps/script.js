const url = "https://api-football-v1.p.rapidapi.com/v3/fixtures";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3b6f1870dcmshaa36bb5ebb2e54ep1fd88cjsnb75795376b82",
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
