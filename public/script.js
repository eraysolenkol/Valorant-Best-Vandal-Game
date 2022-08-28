$(document).ready(function() {
    start();
});


// Starts the game again with cleaning the page
document.getElementById('again').addEventListener("click", () => {
    document.getElementById('count').innerHTML = "(2/40)";
    document.getElementById('skins').style.display = "block";
    document.getElementById('winnerScreen').style.display = "none";
    loadPage();
});


// Directs the page to leaderboard 
document.getElementById('leaderboard').addEventListener("click", () => {
    location.href = "/leaderboard";
});


const shuffleArray = (arr) => {
    for (var i = arr.length - 1; i > 0; i--) {
        let random = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[random]] = [arr[random], arr[i]];
    }
    return arr;
}


const API_ALL_SKINS_ENDPOINT = 'https://valorant-api.com/v1/weapons/skins';

var skins = [];


// Gets all of the vandal skins from the api and stores them in skins array
async function getAllVandalSkins() {
	let result = await get(API_ALL_SKINS_ENDPOINT);
	let data = result.data;
	for (let i=0; i<data.length; i++) {
		if (data[i].displayIcon && data[i].displayName.toLowerCase().includes('vandal')) {
			skins.push(new Skin(data[i].uuid, data[i].displayName, data[i].displayIcon, 0));
		}
	}
}


// Loads the images of skins
function loadSkins(firstSkin, secondSkin) {
    document.getElementById('skin1').setAttribute('src',skins[firstSkin].displayIcon);
    document.getElementById('skin1Name').innerHTML = skins[firstSkin].displayName;
	document.getElementById('skin2').setAttribute('src',skins[secondSkin].displayIcon);
    document.getElementById('skin2Name').innerHTML = skins[secondSkin].displayName;
}


// Loads the page with skins array
function loadPage() {
    skins = shuffleArray(skins);
    let firstSkin = 0;
    let secondSkin = 1;
    let count = 0;
    loadSkins(firstSkin,secondSkin);
    document.getElementById('skin1').addEventListener("click" ,(event) => {
        count++;
        document.getElementById('count').innerHTML = `(${(count+2)}/40)`;
        if (secondSkin <= firstSkin) {
            secondSkin = firstSkin + 1;
        } else {
            secondSkin++;
        }
        if (count < 39) {
            loadSkins(firstSkin,secondSkin);
        }
        
        if (count == 39) {
            document.getElementById('skins').style.display = "none";
            document.getElementById('winnerScreen').style.display = "block";
            document.getElementById('winner').setAttribute('src',skins[firstSkin].displayIcon);
            document.getElementById('winnerName').innerHTML = skins[firstSkin].displayName;
            post("/v1/api/update",{"uuid":skins[firstSkin].uuid});
        }
    });
    document.getElementById('skin2').addEventListener("click" ,(event) => {
        count++;
        document.getElementById('count').innerHTML = `(${(count+2)}/40)`;
        if (firstSkin <= secondSkin) {
            firstSkin = secondSkin + 1;
        } else {
            firstSkin++;
        }
        if (count < 39) {
            loadSkins(firstSkin,secondSkin);
        }
        if (count == 39) {
            document.getElementById('skins').style.display = "none";
            document.getElementById('winnerScreen').style.display = "block";
            document.getElementById('winner').setAttribute('src',skins[secondSkin].displayIcon);
            document.getElementById('winnerName').innerHTML = skins[secondSkin].displayName;
            post("/v1/api/update",{"uuid":skins[secondSkin].uuid});
        }
    });
}


// Starts the game
async function start() {
    await getAllVandalSkins();
    loadPage();
}
