const allCountry = document.getElementById("allCountry");
const inputCountrySearch = document.getElementById("inputCountrySearch");
const country = document.getElementById("country");


let countries = [];

const newData = async () => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        displayCountries(data);
    }
    catch (err) {
        console.error("hata yaptınız", err);
    }

}



const displayCountry = () => {

    allCountry.innerHTML = "";
    countries.forEach(country => {
        const countryDivCard = document.createElement("div");
        countryDivCard.classList.add("bg-white", "p-4", "rounded-lg", "shadow-lg", "text-center", "cursor-pointer")

        const flag = country.flags?.svg || "https://via.placeholder.com/150";
        const countryName = country.name?.common || "Bilinmiyor";
        const population = country.population || "Bilinmiyor";
        countryDivCard.innerHTML = `
        
    <img src="${flag}" alt="${countryName}" class="w-full h-32 object-cover rounded-md mb-4">        
    <h2 class="text-lg font-semibold">${countryName}</h2>
    <p class=""text-gray-500">">Nüfus:${population}</p>
        
        `
        countryCard.addEventListener("click", () => showCountryDetails(country));
        allCountry.appendChild(countryDivCard)

    })
}