// Set the date of the next Bitcoin halving event (example date)
const nextHalvingDate = new Date("May 21, 2024 00:00:00 GMT+00:00").getTime();

// Update the countdown every second
const countdown = setInterval(function () {
  // Get the current date and time
  const now = new Date().getTime();

  // Calculate the remaining time
  const distance = nextHalvingDate - now;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the countdown
  document.getElementById("countdown").innerHTML = `
        <h2>Countdown to BTC Halving</h2>
        <p>${days}d ${hours}h ${minutes}m ${seconds}s</p>
    `;

  // If the countdown is over, stop updating it
  if (distance < 0) {
    clearInterval(countdown);
    document.getElementById("countdown").innerHTML =
      "<h2>BTC Halving is happening now!</h2>";
  }
}, 1000);
