//-----TABLE OF CONTENTS-----
//-> read more button on the main page
//-> fetching data & creating cards & table
//-> display cards function for the main page
//-> display select options for the filters on street-festivals.html page
//-> display table function for the street-festivals.html page


//-----END OF TABLE OF CONTENTS-----

//-----> read more button on the main page
//#region

//function to expand the text on the main page
function showMoreText () {
    let paragraph = document.getElementById("index-description");
    paragraph.removeAttribute("class")
};

//function to hide the text on the main page
function hideText () {    
    let paragraph = document.getElementById("index-description");
    paragraph.setAttribute("class", "d-none");
}; 

//creating a function to run while clicking the button
function buttonClickAction () {
    let readMoreButton = document.getElementById("read-more-button");
    if (readMoreButton.innerHTML == "read more...") {
        showMoreText();
        readMoreButton.innerHTML = "read less...";
    } else {
        hideText();
        readMoreButton.innerHTML = "read more...";
    }
};

//#endregion
//-----> fetching data & creating cards & table
//#region
let url = "https://www.berlin.de/sen/web/service/maerkte-feste/strassen-volksfeste/index.php/index/all.json?q="

fetch(url)
    .then(response => response.json())
    .then(data => {
        let festivalData = data.index; 
        displayCards(festivalData);
        displayTable(festivalData);
        displayOptions(festivalData);
        addEventListeners(festivalData);
        })
    .catch((err) => console.log(err)); 

//#endregion
//-----> display cards function for the index.html page
//#region

function displayCards (festivalData) {
    let cardContainer = document.getElementById("card-container");

    //validating if user on the main page
    if (cardContainer != null) {
        //generating cards
        for (let i = 0; i < 3; i++) {

        let card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("col-4");

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        let cardTitle = document.createElement("h5");
        cardTitle.setAttribute("class", "card-title");
        cardTitle.innerText = festivalData[i]["bezeichnung"]
        
        let cardText = document.createElement("p");
        cardText.setAttribute("class", "card-text");
        
        let linkLocation = festivalData[i]["www"];
        let eventLink = document.createElement("a");
        eventLink.setAttribute("href", linkLocation);
        eventLink.innerHTML=linkLocation;
        cardText.innerText = `${festivalData[i]["strasse"]}, on ${festivalData[i]["von"]}, more info on `;

        cardText.appendChild(eventLink);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(cardBody);
        cardContainer.appendChild(card);
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

                select.appendChild(option);
            }; 
        });
    };
};

//-----> add event listeners to the inputs
//#region

function addEventListeners (festivalData) {
    document.getElementById("neighbourhoodSelect")
        .addEventListener("change", event => console.log("dropdown event"));

    document.getElementById("monthInput")
    .addEventListener("change", event => console.log("change date event"));
};

//#endregion

//#endregion
//-----> display table function for the street-festivals.html page
//#region

function displayTable (festivalData) {
    // locating table header and table body
    let tableHeader = document.getElementById("table-header");
    let tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""

    //validating if user on the festival page
    if (tableBody != null) {
        //creating table contents from the data
        for (let n = 0; n < festivalData.length; n++) {
            let tr = document.createElement("tr");

            let td1 = document.createElement("td");
            td1.innerHTML = festivalData[n]["rss_titel"];
            let td2 = document.createElement("td");
            td2.innerHTML = festivalData[n]["von"];
            let td3 = document.createElement("td");
            td3.innerHTML = festivalData[n]["bezirk"];

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tableBody.appendChild(tr);
        }; 
    }; 
}; 

//#endregion
//