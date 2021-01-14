'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

// adding this part here instead of the bottom is absolutely okay

var container = document.getElementById('content-area');

var footerRow;

var table = document.createElement('table');
container.appendChild(table);

//// function to help for shortcutting 

function addingElement(tag, container, textInside){
    var item = document.createElement(tag);
    container.appendChild(item);

    if (textInside){
        item.textContent = textInside;
    }
    return item;
}

function Branch(location, min, max, avg) {
    this.location = location;
    this.min = min;
    this.max = max;
    this.avg = avg;
    this.cookiesArray = [];
    this.dailyCookieSales = 0;

    this.amountOfCookiesPerHourFunction();
}

// adding functioins for random generating


Branch.prototype.generateRandom = function () {
    var range = this.max - this.min;

    var randomNumber = Math.ceil(Math.random() * range + this.min);

    return randomNumber;
}

Branch.prototype.amountOfCookiesPerHourFunction = function () {
    for (var i = 0; i < hours.length; i++) {

        var amountOfCookiesCeil = Math.ceil(this.generateRandom() * this.avg);

        this.cookiesArray.push(amountOfCookiesCeil);
        this.dailyCookieSales += amountOfCookiesCeil;

    }
    // console.log(this.dailyCookieSales);
};

Branch.prototype.renderOneRow = function(table){
    var branchRow = addingElement ('tr', table);
    addingElement('td', branchRow, this.location);

    for(var i =0 ; i < this.cookiesArray.length; i++){
        var hourlySale = this.cookiesArray[i];
        addingElement('td', branchRow, hourlySale);
    }
    addingElement('td', branchRow, this.dailyCookieSales);
};

function mainRow(){
    var oneHourRow = addingElement('tr', table)
    addingElement('th', oneHourRow);

    for (var i=0 ; i < hours.length; i++) {
        addingElement('th', oneHourRow, hours[i]);
    }
    addingElement('th', oneHourRow, 'Daily Location Totals');
}

/// Footer function 
function addingFooterRow() {
    var tr = document.createElement('tr');
    footerRow = tr;
    table.appendChild(tr);
    var td = document.createElement('td');
    tr.appendChild(td);
    td.textContent = 'Totals';
    var totalOftotals = 0;

    for(var hourIndex = 0; hourIndex < hours.length; hourIndex++){
        td = document.createElement('td');
        tr.appendChild(td);
        
        var hourSalesSum = 0;
        for (var branchIndex = 0; branchIndex < branches.length; branchIndex++){
            var branch = branches[branchIndex];
            hourSalesSum += branch.cookiesArray[hourIndex];
        }

        td.textContent = hourSalesSum;
        totalOftotals += hourSalesSum;
    }
    td = document.createElement('td');
    tr.appendChild(td);
    td.textContent = totalOftotals;
}

var branches = [];
branches.push(new Branch('Seattle', 23, 65, 6.5));
branches.push(new Branch('Dubai', 11, 38, 3.7));
branches.push(new Branch('Seattle', 23, 65, 6.5));
branches.push(new Branch('Tokyo', 3, 24, 1.2));
branches.push(new Branch('Paris', 20, 38, 2.3));
branches.push(new Branch('Lima', 2, 16, 4.6));

mainRow();

for(var i = 0; i <branches.length; i++) {
    var currentShop = branches[i];
    currentShop.renderOneRow(table);
}

addingFooterRow();

function submitHandler(event) {
    event.preventDefault();

 // you can listen to many kind of eventss
 // the defaullt is to move to another page so stop i from this we will do this command
    var location = event.target.location.value; // name from the form not the constructor
    var min = parseInt(event.target.minimum.value); // parse to change the string into number
    var max = parseInt(event.target.maximum.value);
    var avg = parseFloat(event.target.avarage.value);

    var newBranch = new Branch(location, min, max, avg);

    // to add it to our shops
    branches.push(newBranch);

    table.removeChild(footerRow);
    newBranch.renderOneRow(table);
    addingFooterRow();

}
var branchForm = document.getElementById('addShopForm');
branchForm.addEventListener('submit', submitHandler);
