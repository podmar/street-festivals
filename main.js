//-----TABLE OF CONTENTS-----
//-> read more button on the main page
//-> controller function: fetching data, creating cards, table & filters
//-> create event link function
//-> display cards function for the index.html page
//-> display select options for the filters on street-festivals.html page
//-> filter by neighbourhood select
//-> filter by month input
//-> unified filter function (currently not in use)
//-> add event listeners to the inputs
//-> display table function for the street-festivals.html page
//-> search for a festival function
//-> adding event listeners to the search field
//-> XXX



//-----END OF TABLE OF CONTENTS-----

//-----> read more button on the main page
//#region

//function to expand the text on the main page
function expandTextAndPic () {
    let paragraph = document.getElementById("index-description");
    paragraph.removeAttribute("class");

    let coverPic = document.getElementById("cover-pic");
    coverPic.setAttribute("style", "height: 22em; width: 55em; object-fit: cover");
};

//function to hide the text on the main page
function collapseTextAndPic () {    
    let paragraph = document.getElementById("index-description");
    paragraph.setAttribute("class", "d-none");

    let coverPic = document.getElementById("cover-pic");
    coverPic.setAttribute("style", "height: 16em; width: 55em; object-fit: cover");
}; 

//creating a function to run while clicking the button
function buttonClickAction () {
    let readMoreButton = document.getElementById("read-more-button");
    if (readMoreButton.innerHTML == "read more...") {
        expandTextAndPic();
        readMoreButton.innerHTML = "read less...";
    } else {
        collapseTextAndPic();
        readMoreButton.innerHTML = "read more...";
    }
};

//#endregion
//-----> controller function: fetching data, creating cards, table & filters, enabling search by input
//#region
let url = "https://www.berlin.de/sen/web/service/maerkte-feste/strassen-volksfeste/index.php/index/all.json?q="

fetch(url)
    .then(response => response.json())
    .then(data => {
        let festivalData = data.index; 
        // console.log(festivalData);
        displayCards(festivalData);
        displayTable(festivalData);
        displayOptions(festivalData);
        addEventListeners(festivalData);
        })
    .catch((err) => console.log(err)); 

    searchByInput();
    
//#endregion

//-----> create event link function
//#region
function createEventLink (festivalData, i) {
    let eventLink = document.createElement("a");
    let linkLocation = festivalData[i]["www"];
    // console.log(linkLocation);
    eventLink.setAttribute("href", linkLocation);
    eventLink.classList.add("text-decoration-none", "text-reset");
    eventLink.innerHTML = festivalData[i]["bezeichnung"];
    return eventLink;
};
//#endregion
//-----> display cards function for the index.html page
//#region

function displayCards (festivalData) {
    let cardContainer = document.getElementById("card-container");

    //validating if user on the main page
    if (cardContainer != null) {
        //hide the spinner with d-none, as I want the content to be displayed at the top of the page.
        const spinner = document.getElementById("spinner");
        spinner.classList.add("d-none");
        //generating cards
        for (let i = 0; i < 6; i++) {

        let cardBox = document.createElement("div");
        cardBox.classList.add("col-lg-4", "col-md-6", "p-2", "container");
        
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("style", "height: 10rem");

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        let cardTitle = document.createElement("h5");
        cardTitle.setAttribute("class", "card-title");

        let eventLink = createEventLink(festivalData, i);
        
        let cardText = document.createElement("p");
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
//-----> display select options for the filters on street-festivals.html page
//#region

function displayOptions (festivalData) {
    //locating the select container for the options
    let select = document.getElementById("neighbourhoodSelect");

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
//-----> filter by neighbourhood select
//#region

function filterByNeighbourhood (festivalData) {
    let neighbourhood = document.getElementById("neighbourhoodSelect").value;
    let filteredByNeighbourhood = festivalData.filter(festival => 
        festival.bezirk === neighbourhood || neighbourhood === "all");
    displayTable(filteredByNeighbourhood);
    return filteredByNeighbourhood;
};

//#endregion
//-----> filter by month input
//#region

function filterByMonth (festivalData) {
    let pickedMonth = document.getElementById("monthInput").value;
    let filteredByMonth = festivalData.filter(festival => new Date(festival.von).getMonth() === new Date(pickedMonth).getMonth() || pickedMonth === "");
    displayTable(filteredByMonth);
    //console.log(filteredByMonth);
    return filteredByMonth;
};

//#endregion
//-----> unified filter function (currently not in use)
//#region

// function filterThemAll(festivalData) {
//     if (document.getElementById("monthInput").value === "") {
//         filterByNeighbourhood(festivalData);
//     } else if (document.getElementById("neighbourhoodSelect").value === "all") {
//         filterByMonth(festivalData);
//     } else {
//         filterByNeighbourhood(filterByMonth(festivalData))
//     };
// };

//#endregion
//-----> add event listeners to the inputs
//#region

function addEventListeners (festivalData) {
    //validating if user on the festival page
    if (document.getElementById("table-header") != null) {
        document.getElementById("neighbourhoodSelect")
            .addEventListener("change", function event () {
                if (document.getElementById("monthInput").value === "") {
                    filterByNeighbourhood(festivalData); 
                } else {
                    filterByNeighbourhood(filterByMonth(festivalData))
                };
            });
        document.getElementById("monthInput")
            .addEventListener("change", function event () {
                if (document.getElementById("neighbourhoodSelect").value === "all") {
                    filterByMonth(festivalData);
                } else {
                    filterByMonth(filterByNeighbourhood(festivalData));
                };
            });
    };
};

//#endregion
//-----> display table function for the street-festivals.html page
//#region

function displayTable (festivalData) {
    // locating table header and table body
    let tableHeader = document.getElementById("table-header");
    let tableBody = document.getElementById("table-body");

    //validating if user on the festival page
    if (tableBody != null) {
        //hide the spinner with d-none, as I want the content to be displayed at the top of the page.
        const spinner = document.getElementById("spinner");
        spinner.classList.add("d-none");
        //display table
        const contentToDisplay = document.getElementById("content-to-display");
        contentToDisplay.classList.remove("invisible");
        //setting the table content to empty - needed while updating filters
        clearDOM();
        //creating table contents from the data
        for (let n = 0; n < festivalData.length; n++) {
            let tr = document.createElement("tr");

            let td1 = document.createElement("td");
            let eventLink = createEventLink(festivalData, n);
            // td1.innerHTML = festivalData[n]["bezeichnung"];

            let td2 = document.createElement("td");
            let date = new Date(festivalData[n]["von"]).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
            td2.innerHTML = date;

            let td3 = document.createElement("td");
            td3.innerHTML = festivalData[n]["bezirk"];

            let td4 = document.createElement("td");
            let festivalDetailButton = document.createElement("button");
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
}; 

//#endregion
//-----> search for a festival function
//#region

const searchFestival = async (searchTerm) => {
    //url created correctly, for Sommer 3 results in index
    const searchUrl = url+searchTerm;

    try {
    const response = await fetch(searchUrl);
    const searchData = await response.json();
    const searchList = searchData.index;
    displayTable(searchList);
    } catch (error) {
        console.log(`Could not load your results for ${searchTerm}, an error orrcured: ${error}`);
    }
};

// searchFestival("Frühling");

//#endregion
//-----> adding event listeners to the search field
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
//-----> XXX
//#region

function clearDOM () {

    //clear the search field
    if (document.getElementById("search-input") != null) {
        document.getElementById("search-input").value = "";
    };
    if (document.getElementById("table-body") != null) {
        document.getElementById("table-body").innerHTML = "";
    }; 
};

function clearSearchFields () {
    if (document.getElementById("neighbourhoodSelect") != null) {
        document.getElementById("neighbourhoodSelect").value = "";
        document.getElementById("monthInput").value = "";
    }; 

};

//#endregion
