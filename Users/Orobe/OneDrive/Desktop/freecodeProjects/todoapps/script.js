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
