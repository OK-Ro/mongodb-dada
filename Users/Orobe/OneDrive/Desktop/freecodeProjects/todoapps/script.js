// Set the date of the Bitcoin halving event (in milliseconds)
const halvingDate = new Date("April 28, 2024 00:00:00").getTime();

// Update the countdown every 1 second
const countdown = setInterval(function () {
  // Get the current date and time
  const now = new Date().getTime();

  // Calculate the remaining time until the halving event
  const distance = halvingDate - now;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the countdown
  document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
  document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerHTML =
    minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerHTML =
    seconds < 10 ? "0" + seconds : seconds;

  // If the countdown is over, stop updating it
  if (distance < 0) {
    clearInterval(countdown);
    document.getElementById("countdown").innerHTML =
      "Bitcoin halving event has ended!";
  }
}, 1000);

const ctx = document.getElementById("btcChart").getContext("2d");
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "#ff4d00");
gradient.addColorStop(0.5, "#ffcc01");
gradient.addColorStop(1, "#00ff5f");

const data = {
  labels: [
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
  ],
  datasets: [
    {
      label: "Price in USD",
      data: [
        0, 0.08, 0.3, 4, 13, 127, 318, 571, 4920, 13794, 6988, 7172, 49158,
        35935, 12964, 31888,
      ],
      fill: true,
      borderColor: gradient,
      tension: 0.4,
    },
  ],
};

const options = {
  scales: {
    x: {
      title: {
        display: true,
        text: "Year",
      },
    },
    y: {
      title: {
        display: true,
        text: "Price in USD",
      },
    },
  },
};

const btcChart = new Chart(ctx, {
  type: "line",
  data: data,
  options: options,
});
