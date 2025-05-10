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

      // displayResults(matchingCities);
      // Open the new results window with the matched cities
      openResultsInNewWindow(matchingCities);
    })
    .catch((error) =>
      console.error("There was a problem with the fetch operation:", error)
    );
}

function displayResults(cities) {
  resultsContainer.innerHTML = "";

  if (cities.length === 0) {
    resultsContainer.innerHTML = "<p>No destinations found.</p>";
    return;
  }

  cities.forEach((city) => {
    const card = document.createElement("div");
    card.className = "city-card";
    card.innerHTML = `
      <h3>${city.name}</h3>
      <img src="${city.imageUrl}" alt="${city.name}" width="200">
      <p>${city.description}</p>
    `;
    resultsContainer.appendChild(card);
  });
}

function clearSearch() {
  searchInput.value = "";
  resultsContainer.innerHTML = "";

  console.log("Search cleared");
}


function openResultsInNewWindow(cities) {
  // Store the search results in localStorage
  localStorage.setItem("searchResults", JSON.stringify(cities));
  
  // Open a new window that will read the data
  window.open("results-window.html", "ResultsWindow", "width=800,height=800");
}

