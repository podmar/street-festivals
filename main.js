// console.log(data);

let festivalData = data; 

let cardContainer = document.getElementById("card-container"); 

for (let n = 0; n < festivalData[0]["index"].length; n++) {
    // let card = document.createElement("div");
    // card.setAttribute("id", "festival-card");
    // let title = document.createElement("p");
    // title.innerText = festivalData[0]["index"][n]["rss_titel"];
    // // card.innerHTML = festivalData[n];
    // card.appendChild(title);
    // cardContainer.appendChild(card);

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
    cardContainer.appendChild(tr);
}; 