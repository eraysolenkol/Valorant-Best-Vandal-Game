$(document).ready(function() {
    loadPage();
});


const API_SKINS_ENDPOINT = "https://bestvandal.herokuapp.com/v1/api/skins";

var skins = [];


// Gets all of the vandal skins from the api and stores them in skins array
async function getAllVandalSkins() {
	let data = await get(API_SKINS_ENDPOINT);
	for (let i=0; i<data.length; i++) {
		if (data[i].displayIcon && data[i].displayName.toLowerCase().includes('vandal')) {
			skins.push(new Skin(data[i].uuid, data[i].displayName, data[i].displayIcon, data[i].points));
		}
	}
}

// Loads the page with skins array
async function loadPage() {
    await getAllVandalSkins();
    for (let i = 0; i < skins.length; i++) {

        let div = document.createElement('div');
        div.setAttribute('class','leaderboard-item');
        let numberDiv = document.createElement('div');
        numberDiv.setAttribute('class','number');
        let imageDiv = document.createElement('div');
        imageDiv.setAttribute('class','img');
        let displayNameDiv = document.createElement('div');
        displayNameDiv.setAttribute('class','displayName');
        let pointsDiv = document.createElement('div');
        pointsDiv.setAttribute('class','points');
    
        let numberP = document.createElement('p');
        let numberText = document.createTextNode(`#${i+1}`);
        numberP.appendChild(numberText);
        numberDiv.append(numberP);
    
        let image = document.createElement('img');
        image.setAttribute('src',skins[i].displayIcon);
        imageDiv.appendChild(image);
    
        let displayP = document.createElement('p');
        let displayText = document.createTextNode(skins[i].displayName);
        displayP.appendChild(displayText);
        displayNameDiv.append(displayP);
    
        let pointsP = document.createElement('p');
        let pointsText = document.createTextNode(skins[i].points);
        pointsP.appendChild(pointsText);
        pointsDiv.append(pointsP);
    
        div.appendChild(numberDiv);
        div.appendChild(imageDiv);
        div.appendChild(displayNameDiv);
        div.appendChild(pointsDiv);
    
        document.getElementById('items').appendChild(div);
        document.getElementById('items').appendChild(document.createElement('br'));
    }
}

