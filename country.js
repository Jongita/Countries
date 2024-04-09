
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
const loading = document.getElementById("loading");
const pranesimas = document.getElementById("pranesimas");
pranesimas.style.display = "none";
const kaimynaiName = document.getElementById("kaimynai name")
const kaimynaiPopulation = document.getElementById("kaimynai population")


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
// gali buti, kad bus nuluzes serveris, blogas URL arba nerado ne vieno 
const showCountryInfo = () => {
    const countryName = countryDOM.value;
    loading.style.display = "block";
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((response) => {
            //Gautą informaciją konvertuojame į JSON
            return response.json();
        })
        .then((data) => {

            if (data.status == '404') {
                let e = new Error("Informacija nerasta")
                pranesimas.innerHTML = new Error("Salis nerasta")
                throw e;
            }
            // jei nebuvo klaidos kodas bus tesiamas

            const countryName = data[0].altSpellings;
            nameDOM.value = countryName[2];
            // ['LT', 'Republic of Lithuania', 'Lietuvos Respublika']

            populationDOM.value = data[0].population;
            areaDOM.value = data[0].area;


            const currencyTotal = data[0].currencies;
            currencyDOM.value = Object.keys(currencyTotal)[0];


            const language = data[0].languages;
            languageDOM.value = language[Object.keys(language)];

            const flag = data[0].flags;
            flagDOM.src = flag[Object.keys(flag)[0]];

            const arms = data[0].coatOfArms;
            armsDOM.src = arms[Object.keys(arms)[0]]

            borderDOM.value = data[0].borders;
            // ['BLR', 'LVA', 'POL', 'RUS']

            loading.style.display = "none";
        })
        // Kai ivyks klaida vykdysime pranesima
        .catch((e) => {
            console.log(`Klaida: ${e.message}`)
            loading.style.display = "none";
            // parodome pranesima apie klaida
            if (e.name == "TypeError") {
                pranesimas.innerHTML = `Klaida, serveris neveikia arba nera interneto`;
            } else if (e.name == 'nerasta') {
                pranesimas.innerHTML = `Klaida, serveris neveikia arba nera interneto`;
            }
            // pranesimas.innerHTML = `Klaida: ${e.name}`;
            // kadangi error yra klases objektas is jo e.name galime pasiimti klaidas, kurios bus skirtingos
            pranesimas.style.display = "block";
        })

};

buttonDOM.onclick = showCountryInfo;

