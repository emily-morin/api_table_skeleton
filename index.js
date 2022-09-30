/************************Main Body Elements *******************/
let sortedTableBody = document.getElementById('tbody')
let tableSectionBody = document.getElementById('data-table')
let controls = document.getElementById('controls')
let characterLookupBody = document.getElementById('character-lookup')


/*************************Buttons *****************************/
let sortedTableButton = document.getElementById('sort-data')
let dataTableButton = document.getElementById('data-table-button')
let characterLookupButton = document.getElementById('character-lookup-button')

/************************Character Profile Elements ***************/
let characterName = document.getElementById('character-name')
let characterPic = document.getElementById('character-pic')
let characterHomeworld = document.getElementById('homeworld')
let characterSpecies = document.getElementById('species')
let characterWiki = document.getElementById('wiki')

let characterData = []

/************************Event Listeners ***********************/
sortedTableButton.addEventListener('click', () => {
    fetchData();
}, false);
dataTableButton.addEventListener('click', () => {
    clickDataTable();
}, false);
characterLookupButton.addEventListener('click', () => {
    clickCharacterLookup();
}, false);

/**********************Functions **************************/
function clickDataTable(){
    controls.hidden = false;
    tableSectionBody.hidden = false;
    characterLookupBody.hidden = true;
    dataTableButton.classList.toggle('active');
    characterLookupButton.classList.toggle('active');
    fetchData();
    }

function clickCharacterLookup(){
    controls.hidden = true;
    tableSectionBody.hidden = true;
    characterLookupBody.hidden = false;
    dataTableButton.classList.toggle('active');
    characterLookupButton.classList.toggle('active');
    }

function fetchData() {
    characterData = [];
    fetch('https://akabab.github.io/starwars-api/api/all.json')
    .then((response) => response.json())
    .then((data) => {   
        // console.log(data)
        for (let i = 0; i < data.length; i++) {
            let first = data[i].name.split(' ')[0];
            let last = (data[i].name.split(' ')[1] === undefined) ? '' : data[i].name.split(' ')[1];
            let homeworld = (data[i].homeworld === undefined) ? '' : data[i].homeworld;
            let species = (data[i].species === undefined) ? '' : data[i].species;
            let wiki = (data[i].wiki === undefined) ? '' : data[i].wiki;
            let image = (data[i].image === undefined) ? '' : data[i].image;
            
            characterData.push({first: first, last: last, homeworld: homeworld, species: species, wiki: wiki, image: image});
        }   
        return characterData;
    }).then(characterData => sortData(characterData))
}

function sortData(data){
    let sortBy = document.getElementById('category');
    let sortByValue = sortBy['options'][sortBy.selectedIndex].value;
    let filteredUsers = data.filter(person => person[sortByValue] !== '');
    let sortedUsers = filteredUsers.sort((objA, objB) => {
        if(sortByValue !== 'homeworld') {
            let nameA = objA[sortByValue].toLowerCase();
            let nameB = objB[sortByValue].toLowerCase();

            if(nameB > nameA){return -1}
            if(nameA > nameB){return 1}
            return 0;
        }
    });
    displayData(sortedUsers);
}



// function capitalizeFirst(word){

// }

function rowIsClicked(row){
    let name = row.dataset.value;
    clickCharacterLookup();
    characterLookup(name);
}

function addRowClickEvents(){
    let rows = document.querySelectorAll('.character-click');
    rows.forEach(row => {
        row.addEventListener('click', () => {
            rowIsClicked(row);
        }, false);
    })
}

function displayData(data){
    sortedTableBody.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        sortedTableBody.innerHTML += `
        <tr>
            <td style="cursor: pointer; color: blue; text-decoration: underline;" class="character-click" data-value="${data[i].first + ' ' + data[i].last}">${data[i].first}</td>
            <td>${data[i].last}</td>
            <td>${data[i].homeworld}</td>
            <td>${data[i].species}</td>
            <td><a href=${data[i].wiki} target="_blank">${data[i].first}'s wiki</td>
            <td><img src=${data[i].image} style="width: 20px"></td>
        `
    }
    tableSectionBody.hidden = false;
    addRowClickEvents();
}

function characterLookup(name){
    let currentCharacter;
    for (let i = 0; i < characterData.length; i++) {
        let charName = `${characterData[i].first} ${characterData[i].last}`;
        if (charName === name) {
            currentCharacter = characterData[i];
            break;
        }
    }
    characterName.innerText = `Character: ${name}`;
    characterPic.innerHTML = (currentCharacter.image === undefined) ? `<img style="max-width: 100%; max-height: 300px;" src="./no-image.png">`
    : `<img style="max-height: 300px; max-width: 100%;" src=${currentCharacter.image}>`;
    characterHomeworld.innerText = `Homeworld: ${currentCharacter.homeworld}`;
    characterSpecies.innerText = `Species: ${currentCharacter.species}`;
    characterWiki.innerHTML = `Want more details? <a href=${currentCharacter.wiki} target="_blank">Visit ${name}'s Wiki!</a>`

}
