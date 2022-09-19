"use strict"

// Creating table row with coffee stats
function renderCoffee(coffee) {
    let html = '' +
        '<div class="col-sm-6 col-lg-4 col-12">' +
        '<div class="card text-variant bg-transparent border-0 mx-5 my-4">' +
        '<div class="card-body">' +
        '<h2 class="card-title text-center brown-color">' + coffee.name + '</h2>' +
        '<div class="card-subtitle text-center brown-color">' + coffee.roast + '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

    // let html = '' +
    //     '<div class="col-sm-6 col-lg-4 col-12">' +
    //     '<b-card ' +
    //     'overlay ' +
    //     'img-src="../img/milk-coffee-pic.jpg" ' +
    //     'text-variant="white" ' +
    //     'title="' + coffee.name + '"' +
    //     '>' +
    //     '<b-card-text>' + coffee.roast + '</b-card-text>' +
    //     '</b-card>' +
    //     '</div>';

    return html;
}

// Creating full coffee table
function renderCoffees(coffees) {
    let html = '';
    for(let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// Updates what coffees are shown on coffee table
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let coffeeName = coffeeSearch.value;
    let filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if ((selectedRoast === 'all' || coffee.roast === selectedRoast) && coffee.name.toLowerCase().includes(coffeeName.toLowerCase())) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

function addCoffee(e) {
    e.preventDefault();
    let id = coffees.length + 1;
    let name = addCoffeeName.value;
    let roast = addRoastType.value;
    coffees.push({id, name, roast});

    tbody.innerHTML = renderCoffees(coffees);

    localStorage.coffees = JSON.stringify(coffees);
}

// Coffee names and types to populate coffee list
// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide

// initialzing coffees array. if local storage is empty, sets default coffees array
let coffees = [];
try {
    coffees = JSON.parse(localStorage.coffees);
} catch (error) {
    coffees = [
        {id: 1, name: 'Light City', roast: 'light'},
        {id: 2, name: 'Half City', roast: 'light'},
        {id: 3, name: 'Cinnamon', roast: 'light'},
        {id: 4, name: 'City', roast: 'medium'},
        {id: 5, name: 'American', roast: 'medium'},
        {id: 6, name: 'Breakfast', roast: 'medium'},
        {id: 7, name: 'High', roast: 'dark'},
        {id: 8, name: 'Continental', roast: 'dark'},
        {id: 9, name: 'New Orleans', roast: 'dark'},
        {id: 10, name: 'European', roast: 'dark'},
        {id: 11, name: 'Espresso', roast: 'dark'},
        {id: 12, name: 'Viennese', roast: 'dark'},
        {id: 13, name: 'Italian', roast: 'dark'},
        {id: 14, name: 'French', roast: 'dark'},
    ];
}


let tbody = document.querySelector('#coffeeDisplay');
// let submitButton = document.querySelector('#submitBtn');
let roastSelection = document.querySelector('#roast-selection');
let coffeeSearch = document.querySelector('#coffee-name');
let addRoastType = document.querySelector('#add-roast-selection');
let addCoffeeName = document.querySelector('#add-coffee-name');
let addButton = document.querySelector('#add-coffee-btn');

tbody.innerHTML = renderCoffees(coffees);

// submitButton.addEventListener('click', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);
coffeeSearch.addEventListener('keyup', updateCoffees);
addButton.addEventListener('click', addCoffee);
