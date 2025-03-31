const allCountry = document.getElementById("allCountry");
const inputCountrySearch = document.getElementById("inputCountrySearch");
const country = document.getElementById("country");

const newData = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    displayCountries(data);

}