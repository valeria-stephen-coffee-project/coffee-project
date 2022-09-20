"use strict"

// Creating table row with each coffee in coffees array
function renderCoffee(coffee) {
    let html = '' +
        '<div class="col-sm-6 col-lg-4 col-12 px-2">' +
        '<div class="card text-variant bg-transparent border-0 mx-5 my-4 ';

    // Adding roast specific classes to html string
    if(coffee.roast == 'light') {
        html += 'light-roast-bg';
    } else if(coffee.roast == 'medium') {
        html += 'medium-roast-bg';
    } else {
        html += 'dark-roast-bg';
    }

    // Finishing html string
    html += '">' +
        '<div class="card-body">' +
        '<h2 class="card-title text-center text-shadow">' + coffee.name + '</h2>' +
        '<div class="card-subtitle text-center text-shadow">' + coffee.roast + '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return html;
}

// Creating full coffee table
function renderCoffees(coffees) {
    let html = '';

    // Iterating through coffees array and rendering each coffee individually, adding string to our full html string
    for(let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// Updates what coffees are shown on coffee table
function updateCoffees(e) {
    e.preventDefault();
    let selectedRoast = roastSelection.value;
    let coffeeName = coffeeSearch.value;
    let filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if ((selectedRoast === 'all' || coffee.roast === selectedRoast) && coffee.name.toLowerCase().includes(coffeeName.toLowerCase())) {
            filteredCoffees.push(coffee);
        }
    });

    // Renders filtered coffees array and replaces the tbody html with new content
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// Adds coffee to coffees array and updates both local storage and renders coffees
function addCoffee(e) {
    e.preventDefault();

    // Setting variables for new coffee to go into the coffees array
    let id = coffees.length + 1;
    let name = addCoffeeName.value;
    let roast = addRoastType.value;
    coffees.push({id, name, roast});

    // Resets add coffee text box to empty
    addCoffeeName.value = "";

    // Renders coffees array on page with new coffee
    tbody.innerHTML = renderCoffees(coffees);

    // Saves updated coffees array to local storage
    localStorage.coffees = JSON.stringify(coffees);

    // Calls updateCoffees when adding new coffee to keep filters in place
    updateCoffees(e);
}

// Checks to see if user types enter in add coffee text box
function checkIfEnter(e) {
    e.preventDefault();
    if(e.keyCode == 13) {
        addCoffee(e);
    }
}

// initializing coffees array. if local storage is empty, sets default coffees array
let coffees = [];
try {
    coffees = JSON.parse(localStorage.coffees);
} catch (error) {
    // Coffee names and types to populate coffee list
    // from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
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

// Setting js variables attached to certain html elements on the page
let tbody = document.querySelector('#coffeeDisplay');
let roastSelection = document.querySelector('#roast-selection');
let coffeeSearch = document.querySelector('#coffee-name');
let addRoastType = document.querySelector('#add-roast-selection');
let addCoffeeName = document.querySelector('#add-coffee-name');
let addButton = document.querySelector('#add-coffee-btn');

// Event Listeners
roastSelection.addEventListener('change', updateCoffees);
coffeeSearch.addEventListener('keyup', updateCoffees);
addCoffeeName.addEventListener('keyup', checkIfEnter);
addButton.addEventListener('click', addCoffee);

// First rendering of coffees array onto the html form
tbody.innerHTML = renderCoffees(coffees);

// Line of code to clear the local storage if it gets out of hand
// WARNING: ONLY UNCOMMENT LINE BELOW IF YOU WANT THE COFFEES ARRAY BACK TO DEFAULT
// localStorage.clear();