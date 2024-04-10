let currentPokemon;
let allPokemon = [];
let amountOfAllPokemon; // ID1 bis 1025 und ID10001 bis 10277
let counter = 0;
let nextCounter = 20;
let triggerHeight = document.documentElement.scrollHeight - window.innerHeight;
let previousScrollY = window.scrollY;


async function init() {
    await howManyPokemonAreThere();
    await pushAllPokemon();
    render20Pokemon();
    checkForScrollbar()
}


async function howManyPokemonAreThere() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0.';
    let response = await fetch(url);
    let amountOfPokemon = await response.json();
    amountOfAllPokemon = await amountOfPokemon['count'];
    console.log(amountOfAllPokemon);
}


async function pushAllPokemon() {
    for (let i = 1; i < 1026; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemon.push(currentPokemon);
    }
    console.log(allPokemon[1]);
}


window.addEventListener('scroll', function () {
    if (window.scrollY > previousScrollY) {
        const triggerHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (window.innerHeight + window.scrollY >= triggerHeight) {
            render20Pokemon();
        }
    }
    previousScrollY = window.scrollY;
});


function checkForScrollbar() {
    while (document.body.scrollHeight < window.innerHeight) {
        render20Pokemon();
    }
};


function render20Pokemon() {
    for (let i = counter; i < nextCounter; i++) {
        let pokemonName = allPokemon[i]['name'];   
        let pokemonImg = allPokemon[i]['sprites']['other']['dream_world']['front_default'];
        let pokemonTypeBackground = allPokemon[i]['types']['0']['type']['name'];

        pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
        pokemonImg = obtainAlternativeImgInCaseOfNull(pokemonImg, i);

        document.getElementById('cards').innerHTML += htmlCardsClosed(i, pokemonTypeBackground, pokemonImg, pokemonName);
        generateTypeImg(i);
    }
    counter = counter + 20;
    nextCounter = counter + 20;
}


function htmlCardsClosed(i, pokemonTypeBackground, pokemonImg, pokemonName) {
    return `
        <div id="card-closed${i}" class="card-closed ${pokemonTypeBackground}" onclick="openCard(${i})">
            <div class="heaven">
                <div id="types${i}" class="types margin-t8">
                </div>
                <div class="pokemon-img-container-closed">
                    <img class="pokemon-img-closed" src=${pokemonImg}>
                </div>
            </div>
            <div id="base1" class="base white">
                <h3 class="#" id="pokemonName">${pokemonName}</h3>
            </div>
        </div>
    `;
}


function generateTypeImg(i) {
    let pokemonTypeArray = allPokemon[i]['types'];

    for (let j = 0; j < pokemonTypeArray.length; j++) {
        let pokemonType = pokemonTypeArray[j]['type']['name'];
        document.getElementById(`types${i}`).innerHTML += `
        <img class="types-img" src="./img/${pokemonType}.png">
        `;
    }
}


function searchPokemon() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();

    if (search.length < 3) {
        return;
    }

    let cards = document.getElementById('cards');
    cards.innerHTML = '';

    renderSearchedPokemon(cards, search);
}


function renderSearchedPokemon(cards, search) {
    for (let i = 0; i < allPokemon.length; i++) {
        let pokemonName = allPokemon[i]['name'];
        let pokemonImg = allPokemon[i]['sprites']['other']['dream_world']['front_default'];
        let pokemonTypeBackground = allPokemon[i]['types']['0']['type']['name'];

        pokemonName = capitalizeFirstLetter(pokemonName);
        pokemonImg = obtainAlternativeImgInCaseOfNull(pokemonImg, i);

        if (pokemonName.toLowerCase().includes(search)) {
            cards.innerHTML += htmlCardsClosed(i, pokemonTypeBackground, pokemonImg, pokemonName);
            generateTypeImg(i);
        }
    }
}


function searchInputEmpty() {
    let search = document.getElementById('search').value;
    if (search === '') {
        counter = 0;
        nextCounter = 20;
        document.getElementById('cards').innerHTML = '';
        render20Pokemon();
    }
}


function obtainAlternativeImgInCaseOfNull(pokemonImg, i) {
    if (pokemonImg === null) {
        return allPokemon[i]['sprites']['other']['home']['front_default'];
    } else {
        return pokemonImg;
    }
}


function capitalizeFirstLetter(pokemonName) {
    return pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
}


function openCard(i) {
    imgContent = document.getElementById('main-container');
    imgContent.innerHTML = '';
    imgContent.innerHTML += `
    <div class="black-box" id="black-box">   
        <div class="container-wrap"> 
            <div class="container-arrow-left">
                <div class="btn-alignment1">
                    <img class="arrows back" src="./img/zurueck-pfeil.png" onclick="renderImages()">
                    <img class="arrows" src="./img/pfeil-nach-links.png" onclick="previousImage(${index})">
                </div>
                <div class="btn-alignment2">
                </div>
            </div>

            <img class="image-black-box" src="${images[index]}">

            <div class="container-arrow-right">
                <div class="btn-alignment3">
                    <img class="arrows" src="./img/pfeil-nach-rechts.png" onclick="nextImage(${index})">
                </div>
                <div class="btn-alignment2">
                </div>

            </div>
        </div>
    </div>
     `;
}


function previousImage(previous) {
    counter = previous - 1;
    if (counter < 0) {
        counter = images.length - 1;
    }
    openImage(counter);
}


function nextImage(next) {
    counter = next + 1;
    if (counter >= images.length) {
        counter = 0;
    }
    openImage(counter);
}


// function close() {
//     document.getElementById('black-box').classList.add('d-none');
// }
