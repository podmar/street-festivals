//-----TABLE OF CONTENTS-----
//I CONTROLLER
//-> controller function: fetching data, creating cards, table & filters, enabling dynamic search by input

//II INDEX PAGE
//-> read more button on the index page
//-> create event link function
//-> display cards function for the index.html page

//III STREET-FESTIVALS PAGE
//-> display select options for the filters on street-festivals.html page
//-> functions to filter by neighbourhood / month + controller
//-> add event listeners to the filter inputs
//-> display table function for the street-festivals.html page and a function for no results notification

//IV DYNAMIC SEARCH
//-> dynamic search for a festival function (controller & fetch)
//-> adding event listeners to the search field
//-> see all results functionality for the dynamic search (page reload)
//-> search and filter clearing functions


//-----END OF TABLE OF CONTENTS-----

//I CONTROLLER
//-> controller function: fetching data, creating cards, table & filters, enabling dynamic search by input
//#region
let url = "https://www.berlin.de/sen/web/service/maerkte-feste/strassen-volksfeste/index.php/index/all.json?q="

fetch(url)
    .then(response => response.json())

    // .then(response => {
    //     response.json();
    //     console.log(response)})

    .then(data => {
        // console.log(data);
        let festivalData = data.index; 
        displayCards(festivalData);
        displayTable(festivalData);
        displayOptions(festivalData);
        addEventListeners(festivalData);
        searchByInput();
        })
    .catch((err) => console.log(err)); 

//#endregion

//II INDEX PAGE
//-> read more button on the index page
//#region

//function to expand the text on the main page
function expandTextAndPic () {
    const paragraph = document.getElementById("index-description");
    paragraph.removeAttribute("class");

    const coverPic = document.getElementById("cover-pic");
    coverPic.setAttribute("style", "height: 22em; width: 55em; object-fit: cover");
};

//function to hide the text on the main page
function collapseTextAndPic () {    
    const paragraph = document.getElementById("index-description");
    paragraph.setAttribute("class", "d-none");

    const coverPic = document.getElementById("cover-pic");
    coverPic.setAttribute("style", "height: 16em; width: 55em; object-fit: cover");
}; 

//creating a function to run while clicking the button
function buttonClickAction () {
    const readMoreButton = document.getElementById("read-more-button");
    if (readMoreButton.innerHTML == "read more...") {
        expandTextAndPic();
        readMoreButton.innerHTML = "read less...";
    } else {
        collapseTextAndPic();
        readMoreButton.innerHTML = "read more...";
    }
};

//#endregion
//-> create event link function
//#region
function createEventLink (festivalData, i) {
    const eventLink = document.createElement("a");
    const linkLocation = festivalData[i]["www"];
    // console.log(linkLocation);
    eventLink.setAttribute("href", linkLocation);
    eventLink.classList.add("text-decoration-none", "text-reset");
    eventLink.innerHTML = festivalData[i]["bezeichnung"];
    return eventLink;
};
//#endregion
//-> display cards function for the index.html page
//#region

function displayCards (festivalData) {
    const cardContainer = document.getElementById("card-container");

    //validating if user on the main page
    if (cardContainer != null) {
        //hide the spinner with d-none, as I want the content to be displayed at the top of the page.
        const spinner = document.getElementById("spinner");
        spinner.classList.add("d-none");
        //generating cards
        for (let i = 0; i < 6; i++) {

        const cardBox = document.createElement("div");
        cardBox.classList.add("col-lg-4", "col-md-6", "p-2", "container");
        
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("style", "height: 10rem");

        const cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.setAttribute("class", "card-title");

        const eventLink = createEventLink(festivalData, i);
        
        const cardText = document.createElement("p");
        cardText.setAttribute("class", "card-text");
        cardText.innerText = `${festivalData[i]["strasse"]} on ${festivalData[i]["von"]} until ${festivalData[i]["bis"]}.`;
        
        cardTitle.appendChild(eventLink);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(cardBody);
        cardBox.appendChild(card);
        cardContainer.appendChild(cardBox);
        };
    };
};

//#endregion

//III STREET-FESTIVALS PAGE
//-> display select options for the filters on street-festivals.html page
//#region

function displayOptions (festivalData) {
    //locating the select container for the options
    const select = document.getElementById("neighbourhoodSelect");

    // console.log(select != null);

    //validating if user on the festival page
    if (select != null) {
        //creating options
        let neighbourhoods = [];
        festivalData.forEach(festival => {
            if (!neighbourhoods.includes(festival.bezirk)) {
                neighbourhoods.push(festival.bezirk);
                let option = document.createElement("option");
                option.innerText = festival.bezirk;
                option.value = festival.bezirk;

                select.appendChild(option);
            }; 
        });
    };
};
//#endregion
//-> functions to filter by neighbourhood / month + controller
//#region

//-> filter by neighbourhood select
function filterByNeighbourhood (festivalData) {
    const neighbourhood = document.getElementById("neighbourhoodSelect").value;
    let filteredByNeighbourhood = festivalData.filter(festival => 
        festival.bezirk === neighbourhood || neighbourhood === "all");
    displayTable(filteredByNeighbourhood);
    return filteredByNeighbourhood;
};

//-> filter by month input
function filterByMonth (festivalData) {
    const pickedMonth = document.getElementById("monthInput").value;
    let filteredByMonth = festivalData.filter(festival => new Date(festival.von).getMonth() === new Date(pickedMonth).getMonth() || pickedMonth === "");
    displayTable(filteredByMonth);
    return filteredByMonth;
};

//-> filter controller function 
function filterThemAll(festivalData) {
    const month = document.getElementById("monthInput").value;
    const neighbourhood = document.getElementById("neighbourhoodSelect").value;

    if (!month) {
        filterByNeighbourhood(festivalData);
    } else if (neighbourhood === "all") {
        filterByMonth(festivalData);
    } else {
        filterByNeighbourhood(filterByMonth(festivalData))
    };
};

//#endregion
//-> add event listeners to the filter inputs
//#region

//-> with a main filter controller function
function addEventListeners (festivalData) {
    //validating if user on the festival page
    if (document.getElementById("table-header") != null) {
        document.getElementById("neighbourhoodSelect")
            .addEventListener("change", filterThemAll(festivalData));
        document.getElementById("monthInput")
            .addEventListener("change", filterThemAll(festivalData));
    };
};

//-> without a main filter controller function
// function addEventListeners (festivalData) {
//     //validating if user on the festival page
//     if (document.getElementById("table-header") != null) {
//         document.getElementById("neighbourhoodSelect")
//             .addEventListener("change", function event () {
//                 if (document.getElementById("monthInput").value === "") {
//                     filterByNeighbourhood(festivalData); 
//                 } else {
//                     filterByNeighbourhood(filterByMonth(festivalData))
//                 };
//             });
//         document.getElementById("monthInput")
//             .addEventListener("change", function event () {
//                 if (document.getElementById("neighbourhoodSelect").value === "all") {
//                     filterByMonth(festivalData);
//                 } else {
//                     filterByMonth(filterByNeighbourhood(festivalData));
//                 };
//             });

//#endregion
//-> display table function for the street-festivals.html page and a function for no results notification
//#region

function displayTable (festivalData) {
    // locating the table body
    const tableBody = document.getElementById("table-body");

    //validating if user on the festival page
    if (tableBody != null) {
        //hide the spinner with d-none, as I want the content to be displayed at the top of the page.
        const spinner = document.getElementById("spinner");
        spinner.classList.add("d-none");
        //display table
        const contentToDisplay = document.getElementById("content-to-display");
        contentToDisplay.classList.remove("invisible");
        //setting the table content to empty - needed while updating filters
        clearDynamicSearch();
        //creating table contents from the data
        for (let n = 0; n < festivalData.length; n++) {
            const tr = document.createElement("tr");

            const td1 = document.createElement("td");
            const eventLink = createEventLink(festivalData, n);
            // td1.innerHTML = festivalData[n]["bezeichnung"];

            const td2 = document.createElement("td");
            const date = new Date(festivalData[n]["von"]).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
            td2.innerHTML = date;

            const td3 = document.createElement("td");
            td3.innerHTML = festivalData[n]["bezirk"];

            const td4 = document.createElement("td");
            const festivalDetailButton = document.createElement("button");
            // let festivalDetailButton = createFestivalDetailButton(festivalData[n]["bezeichnung"]);

            tr.appendChild(td1);
            td1.appendChild(eventLink);
            tr.appendChild(td2);
            tr.appendChild(td3);
            td4.appendChild(festivalDetailButton);
            tr.appendChild(td4);
            tableBody.appendChild(tr);
        }; 
    }; 
    let numberOfResults = tableBody.childElementCount;
    displayNoResultsNotification(numberOfResults);
}; 
//-> function for no results notification
function displayNoResultsNotification (numberOfResults) {
        const tableHeader = document.getElementById("table-header");
        const tableBody = document.getElementById("table-body");
        const notification = document.getElementById("no-results-notification");
        
        if (!numberOfResults) {
            notification.classList.remove("d-none");
            tableHeader.classList.add("d-none");
        } else {
            tableHeader.classList.remove("d-none");
            notification.classList.add("d-none");
        };
};

//#endregion

//IV DYNAMIC SEARCH
//-> dynamic search for a festival function (controller & fetch)
//#region
const searchFestival = async (searchTerm) => {
    const searchUrl = url+searchTerm;

    try {
    const response = await fetch(searchUrl);
    const searchData = await response.json();
    const searchList = searchData.index;
    clearFilters();
    displayOptions(searchList);
    addEventListeners(searchList);
    displayTable(searchList);
    addAllResultsButton();
    } catch (error) {
        console.log(`Could not load your results for ${searchTerm}, an error orrcured: ${error}`);
    }
};

//#endregion
//-> adding event listeners to the search field
//#region
function searchByInput () {
    const searchInput = document.getElementById("search-input");
    let searchTerm = "";

    //recording input
    searchInput.addEventListener("change", (event) => {
        searchTerm = event.target.value;
    });

    //fetching data according to search word after uses presses enter
    searchInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            searchFestival(searchTerm);
        };
    });
};

//#endregion
//-> see all results functionality for the dynamic search (page reload)
//#region
function addAllResultsButton () {
    const button = document.querySelector("#all-results-button");

    const refreshPage = () => {
    location.reload();
    }; 

    button.addEventListener('click', refreshPage)
    button.classList.remove("d-none")
};

//#endregion
//-> search and filter clearing functions
//#region
//clear the search fields
function clearDynamicSearch () {

    if (document.getElementById("search-input") != null) {
        document.getElementById("search-input").value = "";
    };
    if (document.getElementById("table-body") != null) {
        document.getElementById("table-body").innerHTML = "";
    }; 
};

//clearing the filter input fields and values
function clearFilters () {
    const neighbourhoodSelect = document.getElementById("neighbourhoodSelect")

    if (neighbourhoodSelect != null) {
        neighbourhoodSelect.innerHTML = "";
        const allOption = document.createElement("option");
        allOption.value = "all";
        allOption.innerText = "All";
        neighbourhoodSelect.appendChild(allOption);

        document.getElementById("monthInput").value = "";
    }; 
};

//#endregion
