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
gradient.addColorStop(0, "red");
gradient.addColorStop(0.17, "orange");
gradient.addColorStop(0.33, "yellow");
gradient.addColorStop(0.5, "green");
gradient.addColorStop(0.67, "blue");
gradient.addColorStop(0.83, "indigo");
gradient.addColorStop(1, "violet");

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
// Function to fetch BTC price data from CoinGecko API
async function fetchBTCPrice() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
    );
    const data = await response.json();
    const btcData = data.bitcoin;
    const priceUSD = btcData.usd;
    const priceChange = btcData.usd_24h_change.toFixed(2);

    // Display BTC price
    const btcPriceElement = document.getElementById("btc-price");
    btcPriceElement.innerHTML = `<img
                                    src="https://s3.coinmarketcap.com/static-gravity/image/6fbea0356edd48a4a68a4b877195443c.png"
                                    alt="Bitcoin Logo"
                                    class="btc-logo"
                                  />
                                  $${priceUSD}`;

    // Display price change and apply appropriate color
    const priceChangeElement = document.getElementById("price-change");
    priceChangeElement.textContent = `${priceChange}% `;
    priceChangeElement.classList.remove("green", "red"); // Remove existing classes
    if (parseFloat(priceChange) > 0) {
      priceChangeElement.classList.add("green");
    } else if (parseFloat(priceChange) < 0) {
      priceChangeElement.classList.add("red");
    }

    // Show the BTC price element
    btcPriceElement.classList.remove("hidden");
  } catch (error) {
    console.error("Error fetching BTC price:", error);
  }
}

// Function to update BTC price every 10 seconds
async function updateBTCPrice() {
  await fetchBTCPrice();
  setInterval(fetchBTCPrice, 10000);
}

// Call the function to initially fetch and update BTC price
updateBTCPrice();
// Function to fetch news reports about BTC halving from CryptoCompare API
async function fetchBTCNews() {
  try {
    const response = await fetch(
      "https://min-api.cryptocompare.com/data/v2/news/?categories=BTC"
    );
    const data = await response.json();

    // Select the container to display news reports
    const newsContainer = document.querySelector(".news-reports");

    // Clear any existing news reports
    newsContainer.innerHTML = "";

    // Iterate through the articles and create HTML elements for each article
    data.Data.forEach((article) => {
      // Create a card for each news article
      const card = document.createElement("div");
      card.classList.add("news-card");

      // Add title
      const title = document.createElement("h3");
      title.textContent = article.title;

      // Add description
      const description = document.createElement("p");
      description.textContent = article.body;

      // Add image
      const image = document.createElement("img");
      image.src = article.imageurl; // Set image source
      image.alt = "Article Image"; // Add alt attribute for accessibility
      image.classList.add("article-image"); // Add a class for styling

      // Add link to read more
      const link = document.createElement("a");
      link.textContent = "Read more";
      link.href = article.url; // Set href to the article URL
      link.target = "_blank"; // Open link in a new tab
      link.rel = "noopener noreferrer"; // Add rel attribute for security
      link.classList.add("read-more"); // Add a class for easier selection

      // Append elements to the card
      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(image);
      card.appendChild(link);

      // Append card to the news container
      newsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching BTC news:", error);
  }
}

// Function to handle click on "Read more" link
function handleReadMoreClick(event) {
  event.preventDefault(); // Prevent default link behavior
  const url = event.target.getAttribute("href"); // Get URL from href attribute
  if (url) {
    window.open(url, "_blank"); // Open link in a new tab
  }
}

// Add event listener to all "Read more" links
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("read-more")) {
    handleReadMoreClick(event);
  }
});

// Function to update BTC news every 60 seconds
async function updateBTCNews() {
  while (true) {
    await fetchBTCNews();
    await new Promise((resolve) => setTimeout(resolve, 60000)); // Wait for 60 seconds before making the next request
  }
}

// Call the function to initially fetch and update BTC news
updateBTCNews();
