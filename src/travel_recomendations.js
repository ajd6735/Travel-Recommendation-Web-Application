const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const clearButton = document.getElementById("clear-btn");
const resultsContainer = document.getElementById("results");

searchButton.addEventListener("click", searchFunction);
clearButton.addEventListener("click", clearSearch);

function searchFunction() {
  console.log("Searching...");
  const query = searchInput.value.toLowerCase().trim();

  fetch("./travel_recomendations_api.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const matchingCities = [];

      data.countries.forEach((country) => {
        country.cities.forEach((city) => {
          if (city.name.toLowerCase().includes(query)) {
            matchingCities.push(city);
          }
        });
      });

      // Search in temples
      data.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(query)) {
          matchedItems.push(temple);
        }
      });

      // Search in beaches
      data.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(query)) {
          matchedItems.push(beach);
        }
      });

      // Open the new results window with the matched cities
      openResultsInNewWindow(matchingCities);
    })
    .catch((error) =>
      console.error("There was a problem with the fetch operation:", error)
    );
}


function openResultsInNewWindow(cities) {
  // Store the search results in localStorage
  localStorage.setItem("searchResults", JSON.stringify(cities));

  // Dimensions of the popup
  const width = 800;
  const height = 760;

  // Calculate the position to center the popup
  const left = (screen.width - width) / 2;
  const top = (screen.height - height) / 2;

  // Open the window in the center
  window.open(
    "results-window.html",
    "ResultsWindow",
    `width=${width},height=${height},left=${left},top=${top}`
  );
}