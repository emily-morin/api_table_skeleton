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
        console.log(data)
    })
}

function sortData(data){

}



function capitalizeFirst(word){

}

function rowIsClicked(row){

}

function addRowClickEvents(){

}

function displayData(data){

}

function characterLookup(name){

}
