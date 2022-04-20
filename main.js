// console.log(data);

let festivalData = data; 

let cardContainer = document.getElementById("card-container"); 

for (let n = 0; n < festivalData[0]["index"].length; n++) {
    let card = document.createElement("div");
    card.setAttribute("id", "festival-card");
    let title = document.createElement("p");
    title.innerText = festivalData[0]["index"][n]["rss_titel"];
    // card.innerHTML = festivalData[n];
    card.appendChild(title);
    cardContainer.appendChild(card);
}; 