
const countryDOM = document.getElementById("country");
const nameDOM = document.getElementById("name");
const areaDOM = document.getElementById("area");
const populationDOM = document.getElementById("population");
const currencyDOM = document.getElementById("currency");
const languageDOM = document.getElementById("language");
const flagDOM = document.getElementById("flag");
const armsDOM = document.getElementById("arms");
const borderDOM = document.getElementById("border");
const buttonDOM = document.getElementById("button");



fetch('https://restcountries.com/v3.1/all')
    .then((response) => {
        //Gautą informaciją konvertuojame į JSON
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
    console.log();

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((response) => {
            //Gautą informaciją konvertuojame į JSON
            return response.json();
        })
        .then((data) => {
            const countryName = data[0].altSpellings;
            nameDOM.value = countryName[2];
            // ['LT', 'Republic of Lithuania', 'Lietuvos Respublika']

            populationDOM.value = data[0].population;
            areaDOM.value = data[0].area;


            const currencyTotal = data[0].currencies;
            currencyDOM.value = Object.keys(currencyTotal)[0];


            const language = data[0].languages;
            languageDOM.value = language[Object.keys(language)];


            borderDOM.value = data[0].borders;
            // ['BLR', 'LVA', 'POL', 'RUS']

            const flag = data[0].flags;
            flagDOM.src = flag[Object.keys(flag)[0]];

            const arms = data[0].coatOfArms;
            armsDOM.src = arms[Object.keys(arms)[0]]
        });
};
buttonDOM.onclick = showCountryInfo;


