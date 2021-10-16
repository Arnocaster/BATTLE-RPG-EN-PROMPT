// Déclaration des variables
var player1 = []
var player2 = []
var nameList = ["Dirsogrë", "Themelë", "Tadtel", "Rochmith", "Aërhûn", "Shebhir", "Aëthim", "Nanlenlon", "Rauaër", "Erhar", "Ilrod", "Iennan", "Harnag", "Vîngarrim", "Minbel", "Caldilrë", "Sîrum", "Luingad", "Loeodh", "Berdulië", "Gurdae", "Athbret", "Lamdundîr", "Athien", "Cuilim", "Tadum", "Ionoth", "Iaodh", "Galunië", "Cuifal", "Sadruïn", "Taethûdîr", "Lammîl", "Ergroron", "Sogbeth", "Mithrena", "ûrloerë", "Firrhaa", "Lhoelrim", "Iashelnir", "Ganpel", "Etheälië", "Thirdin", "Idhber", "Bretcau", "Amvîn", "Garleb", "Danduinil", "Mirmal", "Sënrau", "Lanrhyn", "Melduir", "Himduilë", "Calath", "Dothliathaë", "Theglam", "Moelaënir", "Bethvel", "Oeggae", "Belrha", "Mîlrhyn", "Ruïnteith", "Nîntuma", "Lathdul", "Gweeg", "Saeûr", "Cyrmeldîr", "Henmel", "Cenmae", "Lathdellon", "Nordan", "Faubar", "Geldothrë", "Fincau", "Lebna"]

function welcome(){
  alert("Bienvenue dans ce petit jeux, vous allez devoir vous battre contre l'ordinateur");
}

function initPlayer(playerNumber){
  //Loterie du loot, initialisation des armes/armures aléatoires
  var playerClass = Math.round(Math.random()*3);
  if (playerClass === 1){
    var weapon = "Epee";
    var armor = "Acier";
  } else if (playerClass === 2){
    var weapon = "Lance";
    var armor = "Cuir";
  } else if (playerClass === 3){
    var weapon = "Baguette de feu";
    var armor = "Tissu";
  } else {
    console.log("T'as fait de la merde avec initPlayer" + playerClass);
  }

  //Si on initialise le joureur 1 (Humain)
  if (playerNumber === 1) {
    var name = prompt("Quel est le nom du joueur?");
    //Tant que le nom est vide on redemande au joueur
    while(name === "") {
    name = prompt("Quel est le nom du joueur?");
    }
    player1.push(name,weapon,armor);
  }
  //Si on initialise le joueur 2 (CPU)
  else if (playerNumber === 2){
    name = nameList[Math.round(Math.random())*nameList.length-1];
    player2.push(name,weapon,armor);
  }
  
}

initPlayer(1);
console.log(player1)
console.log(player2)

