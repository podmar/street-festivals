//-----TABLE OF CONTENTS-----
//----->"read more" button on the main page
//----->Table with data on the street-festivals.html page



//-----END OF TABLE OF CONTENTS-----
// fetching data from the data file
let festivalData = data; 

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
//----->Table on the street-festivals.html page
//#region

// locating table header and table body
let tableHeader = document.getElementById("table-header");
let tableBody = document.getElementById("table-body");

//creating table headers
let th1 = doc

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

//#endregion
//