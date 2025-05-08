const queryPlace = document.getElementById("searchInput");

document.getElementById("searchButton").addEventListener("click", () => {
  const query = queryPlace.value.toLowerCase().trim();

  const path = "./data/travel_recommendations.json";

  fetch(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const mathingCitites = [];

      data.coutries.array.forEach((country) => {
        country.cities.forEach((city) => {
          if (city.name.toLowerCase().includes(query)) {
            mathingCitites.push(city);
          }
        });

        console.log("Results: ", country.cities);
      });
    })
    .catch((error) =>
      console.error("There was a problem with the fetch operation:", error)
    );
});
