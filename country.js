
const countryDOM = document.getElementById("country");
const nameDOM = document.getElementById("name");
const areaDOM = document.getElementById("area");
const populationDOM = document.getElementById("population");
const currencyDOM = document.getElementById("currency");
const languageDOM = document.getElementById("language");
const flagDOM = document.getElementById("flag");
const armsDOM = document.getElementById("arms");

const countryName = countryDOM.value;

fetch('https://restcountries.com/v3.1/name/Lithuania')
    .then((response) => {
        //Gautą informaciją konvertuojame į JSON
        return response.json();
    })
    .then((data) => {
        console.log(data);
        const countryName = data[0].altSpellings;
        nameDOM.value = countryName[2];
        // ['LT', 'Republic of Lithuania', 'Lietuvos Respublika']

        populationDOM.value = data[0].population;
        areaDOM.value = data[0].area;


        const currencyTotal = data[0].currencies;
        currencyDOM.value = Object.keys(currencyTotal)[0];


        const language = data[0].languages;
        languageDOM.value = language[Object.keys(language)];

        // console.log(data[0].borders);
        // ['BLR', 'LVA', 'POL', 'RUS']

        const flag = data[0].flags;
        flagDOM.src = flag[Object.keys(flag)[0]];

        const arms = data[0].coatOfArms;
        armsDOM.src = arms[Object.keys(arms)[0]]
        // {png: 'https://mainfacts.com/media/images/coats_of_arms/lt.png', svg: 'https://mainfacts.com/media/images/coats_of_arms/lt.svg'}

    });




