const allCountry = document.getElementById("country");
const inputCountrySearch = document.getElementById("inputCountrySearch");
let countries = [];

const newData = async () => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        countries = data;
        displayCountries(countries);
    } catch (error) {
        console.error("Hata:", error);
    }
}

const displayCountries = (countries) => {
    allCountry.innerHTML = '';

    countries.forEach(country => {
        const countryCard = createCountryCard(country);
        allCountry.appendChild(countryCard);
    });
}

const createCountryCard = (country) => {
    const { flags, name, population } = country;
    const flag = flags?.svg || "https://via.placeholder.com/150";
    const countryName = name?.common || "Bilinmiyor";
    const populationText = population ? population.toLocaleString() : "Bilinmiyor";

    const countryCard = document.createElement("div");
    countryCard.classList.add("bg-white", "p-4", "rounded-lg", "shadow-lg", "text-center", "cursor-pointer", "transition-all", "duration-300", "ease-in-out", "transform", "hover:scale-105", "hover:shadow-2xl", "hover:ring-2", "hover:ring-blue-500");

    countryCard.innerHTML = `
      <img src="${flag}" alt="${countryName}" class="w-full h-32 object-cover rounded-md mb-4 transition-all duration-300 ease-in-out transform hover:scale-110" title="${countryName}">

        <h3 class="text-lg font-semibold text-gray-800 mb-2">${countryName}</h3>
        <p class="text-gray-500">Nüfus: ${populationText}</p>
        
        <!-- Detaylar kısmı, başlangıçta gizli -->
        <div class="details-content mt-4">
            <p><strong>Başkent:</strong> ${country.capital ? country.capital.join(", ") : "Bilinmiyor"}</p>
            <p><strong>Bölge:</strong> ${country.region || "Bilinmiyor"}</p>
            <p><strong>Nüfus:</strong> ${populationText}</p>
            <p><strong>Diller:</strong> ${country.languages ? Object.values(country.languages).join(", ") : "Bilinmiyor"}</p>
        </div>
    `;


    countryCard.addEventListener("click", () => toggleCountryDetails(countryCard));

    return countryCard;
}

const toggleCountryDetails = (countryCard) => {
    const detailsContent = countryCard.querySelector(".details-content");

    if (detailsContent.classList.contains("show")) {
        detailsContent.classList.remove("show");
    } else {
        detailsContent.classList.add("show");
    }
}

inputCountrySearch.addEventListener("input", (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredCountries = countries.filter(country =>
        country.name?.common.toLowerCase().includes(searchQuery)
    );
    displayCountries(filteredCountries);
});

newData();
