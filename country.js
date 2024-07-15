
const countryDOM = document.getElementById("country");
const areaDOM = document.getElementById("area");
const populationDOM = document.getElementById("population");
const currencyDOM = document.getElementById("currency");
const languageDOM = document.getElementById("language");
const flag = document.getElementById("flag");
const arms = document.getElementById("arms");
const borderDOM = document.getElementById("border");
const buttonDOM = document.getElementById("button");
const loading = document.getElementById("loading");
const pranesimas = document.getElementById("pranesimas");
pranesimas.style.display = "none";
const kaimynaiName = document.getElementById("kaimynai name")
const kaimynaiPopulation = document.getElementById("kaimynai population")


fetch('https://restcountries.com/v3.1/all')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data.forEach((arr) => {
            console.log(arr.name.common);
            const o = document.createElement("option");
            o.textContent = arr.name.common;
            countryDOM.appendChild(o);
        })

    });

const showCountryInfo = () => {
    const countryName = countryDOM.value;
    loading.style.display = "block";
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            if (data.status == '404') {
                let e = new Error("Klaida: salis nerasta")
                pranesimas.innerHTML = e.message;
                throw e;
            }

            populationDOM.value = data[0].population;
            areaDOM.value = data[0].area;

            currencyDOM.value = data[0].currencies ? Object.values(data[0].currencies).map((c) => c.name).join(', ') : '-';

            const language = data[0].languages;
            languageDOM.value = language[Object.keys(language)];

            flag.src = data[0].flags.png || '-';
            arms.src = data[0].coatOfArms.png || '-';

            borderDOM.value = data[0].borders !== undefined ? data[0].borders : 'Kaimynų neturi';

            loading.style.display = "none";
        })
        .catch((e) => {
            // console.log(`Klaida: ${e.message}`)
            loading.style.display = "none";
            if (e.name == "TypeError") {
                pranesimas.innerHTML = `Klaida, serveris neveikia arba nėra interneto.`;
            } else if (e.name == 'nerasta') {
                pranesimas.innerHTML = `Klaida ieškant šalies.`;
            }
            pranesimas.style.display = "block";
        })
};

buttonDOM.onclick = showCountryInfo;

