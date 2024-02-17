const url = "https://api-football-v1.p.rapidapi.com/v3/fixtures";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3b6f1870dcmshaa36bb5ebb2e54ep1fd88cjsnb75795376b82",
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
};

const fetchFixtures = async () => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (!data || !data.response || !Array.isArray(data.response)) {
      throw new Error("Invalid data structure received from API");
    }
    return data.response;
  } catch (error) {
    console.error("Error fetching fixtures:", error.message);
    return []; // Return empty array to indicate no fixtures
  }
};

const displayFixtures = (fixtures) => {
  const liveScores = document.getElementById("liveScores");
  liveScores.innerHTML = ""; // Clear previous fixtures

  fixtures.forEach((fixture) => {
    const {
      fixture_id,
      league,
      homeTeam,
      awayTeam,
      goalsHomeTeam,
      goalsAwayTeam,
    } = fixture;

    const fixtureElement = document.createElement("div");
    fixtureElement.classList.add("fixture");

    const fixtureInfo = document.createElement("p");
    fixtureInfo.textContent = `${league.name}: ${homeTeam.team_name} vs ${awayTeam.team_name}`;

    const scoreInfo = document.createElement("p");
    scoreInfo.textContent = `Score: ${goalsHomeTeam || 0} - ${
      goalsAwayTeam || 0
    }`;

    fixtureElement.appendChild(fixtureInfo);
    fixtureElement.appendChild(scoreInfo);

    liveScores.appendChild(fixtureElement);
  });
};

const loadFixtures = async () => {
  const fixtures = await fetchFixtures();
  displayFixtures(fixtures);
};

document.addEventListener("DOMContentLoaded", loadFixtures);
