//-----TABLE OF CONTENTS-----
//->"read more" button on the main page
//->fetching data & creating cards & table
//->display cards function for the main page
//->display table function for the street-festivals.html page


//-----END OF TABLE OF CONTENTS-----

//----->"read more" button on the main page
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
//----->fetching data & creating cards & table
//#region
let festivalData = data; 

displayCards();
displayTable();
//#endregion
//----->display cards function for the main page
//#region

function displayCards () {
    let cardContainer = document.getElementById("card-container");

    //validating if user on the main page
    if (cardContainer != null) {
        //generating cards
        for (let i = 0; i < 3; i++) {
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body")
        let cardTitle = document.createElement("h5");
        cardTitle.setAttribute("class", "card-title");
        cardTitle.innerText = festivalData[0]["index"][i]["bezeichnung"]
        let cardText = document.createElement("p");
        cardText.setAttribute("class", "card-text");
        let linkLocation = festivalData[0]["index"][i]["www"];
        let eventLink = document.createElement("a");
        eventLink.setAttribute("href", linkLocation);
        eventLink.innerHTML=linkLocation;
        cardText.innerText = `${festivalData[0]["index"][i]["strasse"]}, on ${festivalData[0]["index"][i]["von"]}, more info on `;

        cardText.appendChild(eventLink);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(cardBody);
        cardContainer.appendChild(card);
        };
    };
};

//#endregion
//----->display table function for the street-festivals.html page
//#region

function displayTable () {
    // locating table header and table body
    let tableHeader = document.getElementById("table-header");
    let tableBody = document.getElementById("table-body");

    //validating if user on the festival page
    if (tableBody != null) {
        //creating table contents from the data
        for (let n = 0; n < festivalData[0]["index"].length; n++) {
            let tr = document.createElement("tr");

            let td1 = document.createElement("td");
            td1.innerHTML = festivalData[0]["index"][n]["rss_titel"];
            let td2 = document.createElement("td");
            td2.innerHTML = festivalData[0]["index"][n]["von"];
            let td3 = document.createElement("td");
            td3.innerHTML = festivalData[0]["index"][n]["bezirk"];

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tableBody.appendChild(tr);
        }; 
    }; 
}; 


//#endregion
//