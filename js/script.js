// Déclaration des variables
var player1 = []
var player2 = []
var nameList = ["Dirsogrë", "Themelë", "Tadtel", "Rochmith", "Aërhûn", "Shebhir", "Aëthim", "Nanlenlon", "Rauaër", "Erhar", "Ilrod", "Iennan", "Harnag", "Vîngarrim", "Minbel", "Caldilrë", "Sîrum", "Luingad", "Loeodh", "Berdulië", "Gurdae", "Athbret", "Lamdundîr", "Athien", "Cuilim", "Tadum", "Ionoth", "Iaodh", "Galunië", "Cuifal", "Sadruïn", "Taethûdîr", "Lammîl", "Ergroron", "Sogbeth", "Mithrena", "ûrloerë", "Firrhaa", "Lhoelrim", "Iashelnir", "Ganpel", "Etheälië", "Thirdin", "Idhber", "Bretcau", "Amvîn", "Garleb", "Danduinil", "Mirmal", "Sënrau", "Lanrhyn", "Melduir", "Himduilë", "Calath", "Dothliathaë", "Theglam", "Moelaënir", "Bethvel", "Oeggae", "Belrha", "Mîlrhyn", "Ruïnteith", "Nîntuma", "Lathdul", "Gweeg", "Saeûr", "Cyrmeldîr", "Henmel", "Cenmae", "Lathdellon", "Nordan", "Faubar", "Geldothrë", "Fincau", "Lebna"]
var playerTurn = Math.round(Math.random()+1)
function welcome(){
  alert("Bienvenue dans ce petit jeux, vous allez devoir vous battre contre l'ordinateur\n");
}


function initPlayer(playerNumber){
  //Loterie du loot, initialisation des armes/armures aléatoires
  var playerClass = Math.round((Math.random()*2)+1);
  if (playerClass === 1){
    var weapon = "EPEE";
    var dmg = 15;
    var armor = "ACIER";
    var pv = 250;
  } else if (playerClass === 2){
    var weapon = "LANCE";
    var dmg = 20;
    var armor = "CUIR";
    var pv = 200;
  } else if (playerClass === 3){
    var weapon = "BAGUETTE DE FEU";
    var dmg = 25;
    var armor = "TISSU";
    var pv = 175;
  } else {
    console.log("T'as fait de la merde avec initPlayer" + playerClass);
  }

  //Si on initialise le joureur 1 (Humain)
  if (playerNumber === 1) {
    var name = "Arnaud"// IMPORTANT DE OUF !!!!!!!!!!!!!!!!!!!!A remettre en fin de dev prompt("Quel est le nom du joueur?");
    //Tant que le nom est vide on redemande au joueur
    while(name === "") {
    name = prompt("Choisissez votre nom :");
    }
    player1.push(name,weapon,armor,dmg,pv);
  }
  //Si on initialise le joueur 2 (CPU)
  else if (playerNumber === 2){
    var name = nameList[Math.round(Math.random()*(nameList.length-1))];
    player2.push(name,weapon,armor,dmg,pv);
  }
  
  if (player1.length>4 && player2.length>4){
    console.log(player1);
    console.log(player2);
    console.log(player1[0] + " votre " + player1[1] + " et votre armure de " + player2[2] + " vous on été attribués pour ce combat.");
  }
}

//Fonction qui  récupère les données dans les tableaux 
//en fonction d'un string(name,weapon,armor,dmg,pv) et du numéro de joueur (1,2).
function returnData(data, player){
  if (player === 1) {
    var player = player1;
  } else if (player === 2) {
    var player = player2;
  }

  if (data === "name"){
    return player[0];
  } else if (data === "weapon"){
    return player[1];
  } else if (data === "armor"){
    return player[2];
  } else if (data === "dmg"){
    return player[3];
  } else if (data === "pv"){
    return player[4];
  } else {
    console.log("input incorrect");
  }
}

initPlayer(1);
initPlayer(2);
console.log (returnData("weapon",1));
console.log (returnData("weapon",2));

