// Déclaration des variables
var player1 = []
var player2 = []
var nameList = ["Dirsogrë", "Themelë", "Tadtel", "Rochmith", "Aërhûn", "Shebhir", "Aëthim", "Nanlenlon", "Rauaër", "Erhar", "Ilrod", "Iennan", "Harnag", "Vîngarrim", "Minbel", "Caldilrë", "Sîrum", "Luingad", "Loeodh", "Berdulië", "Gurdae", "Athbret", "Lamdundîr", "Athien", "Cuilim", "Tadum", "Ionoth", "Iaodh", "Galunië", "Cuifal", "Sadruïn", "Taethûdîr", "Lammîl", "Ergroron", "Sogbeth", "Mithrena", "ûrloerë", "Firrhaa", "Lhoelrim", "Iashelnir", "Ganpel", "Etheälië", "Thirdin", "Idhber", "Bretcau", "Amvîn", "Garleb", "Danduinil", "Mirmal", "Sënrau", "Lanrhyn", "Melduir", "Himduilë", "Calath", "Dothliathaë", "Theglam", "Moelaënir", "Bethvel", "Oeggae", "Belrha", "Mîlrhyn", "Ruïnteith", "Nîntuma", "Lathdul", "Gweeg", "Saeûr", "Cyrmeldîr", "Henmel", "Cenmae", "Lathdellon", "Nordan", "Faubar", "Geldothrë", "Fincau", "Lebna"]
var playerTurn = Math.round(Math.random()+1);
var combatRunning = true;
var defender = null;
var attacker = null;
var hist = ["","","","",""];



function welcome(){
  alert("Bienvenue dans ce petit jeux, vous allez devoir vous battre contre l'ordinateur\n");
}

//------ FONCTIONS UTILITAIRES ------
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
  } else if (data === "pv"){
    return player[1];
  } else if (data === "weapon"){
    return player[2];
  } else if (data === "dmg"){
    return player[3];
  } else if (data === "armor"){
    return player[4];
  } else if (data === "def"){
    return player[5];
  }else if (data === "activeDef"){
    return player[6];
  }else {
    console.log("input incorrect");
  }
}

function pushData(data, value, player){
  if (player === 1) {
    var player = player1;
  } else if (player === 2) {
    var player = player2;
  }

  if (data === "name"){
    player[0] = value;
    return;
  } else if (data === "pv"){
    player[1] = value;
    return;
  } else if (data === "weapon"){
    player[2] = value;
    return;
  } else if (data === "dmg"){
    player[3] = value;
    return;
  } else if (data === "armor"){
    player[4] = value;
    return;
  } else if (data === "def"){
    player[5] = value;
    return;
  } else if (data === "activeDef"){
    player[6] = value;
    return;
  }else {
    console.log("input incorrect");
  }
}

//création de variable d'aisance pour rentre l'écriture plus compréhensible
function whoAttack (){
   if (playerTurn === 1) {
        attacker = 1;
        defender = 2;
  } else {
        attacker = 2;
        defender = 1;
  }
}


//------ FONCTIONS D'INITIALISATION ------
function initPlayer(playerNumber){
  //Loterie du loot, initialisation des armes/armures aléatoires
  var playerClass = Math.round((Math.random()*2)+1);
  if (playerClass === 1){
    var pv = 250;
    var weapon = "EPEE";
    var dmg = 15;
    var armor = "ACIER";
    var def = 17;
  } else if (playerClass === 2){
    var pv = 200;
    var weapon = "LANCE";
    var dmg = 20;
    var armor = "CUIR";
    var def = 15;
  } else if (playerClass === 3){
    var pv = 175;
    var weapon = "BAGUETTE DE FEU";
    var dmg = 25;
    var armor = "TISSU";
    var def = 10;
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
    player1.push(name,pv,weapon,dmg,armor,def,0);
  }
  //Si on initialise le joueur 2 (CPU)
  else if (playerNumber === 2){
    var name = nameList[Math.round(Math.random()*(nameList.length-1))];
    player2.push(name,pv,weapon,dmg,armor,def,0);
  }
  
  //Si les deux joueurs sont complets alors on affiche son équipement au joueur
  if (player1.length>5 && player2.length>5){
    console.log(player1[0] + " votre " + returnData("weapon", 1) + " et votre armure de " + returnData("armor", 1) + " vous on été attribués pour ce combat.");
  }
}

//Fonction d'attaque simple pv = pv-dmg
function attack(action) {
  whoAttack ();
//attaque normale
  if (action === 1){
    console.log("ICI");
    var modifier = 1;
  }
//attaque chargée
  if (action === 2){
    var modifier = 2.3; 
  }
//vive attaque *0.8 
  if (action === 3){
    var modifier = 0.8;
  }
//contre attaque && attaque bouclier *0.6
  if (action === 4){
    var modifier = 0.6;
  }
  var pvAfterHit = returnData("pv", defender) - ((returnData("dmg", attacker)*modifier) - returnData("activeDef", defender));
  console.log(pvAfterHit);
  pushData("pv", pvAfterHit, defender);
}

//Cette fonction détermine la valeur du bouclier actif
function defend(action){
  whoAttack ();
  //Defense normale
    if (action === 1){
      var modifier = 1;
    } 
  // Attaque bouclier 
    if (action === 2){
      var modifier = 0.4;
    }
    var def = returnData("def", defender) * modifier;
    pushData("activeDef", def, defender);

    //Reset
    if (action === 0){
      pushData("activeDef", 0, defender);
    }
}

//Fonction d'affichage soit en alert soit en prompt
function display(type){
  if (type === "prompt"){
  var history4 = hist[3] + playerTurn;
  var history3 = hist[2];
  var history2 = hist[1];
  var history1 = hist[0];
  var activeLine = "Tu frappes et mets " + returnData("dmg",1); 
  var line3 = "________________________________________________";
  var line2 = returnData("name",1) + "  PV :" + returnData("pv",1) + "                |               " + returnData("name",2) + "  " +returnData("pv",2) + " PV";
  var line1 = "ATK :" + returnData("dmg",1) +" | DEF :" + returnData("def",1) +"               |               " +returnData("def",2) + " DEF | "+returnData("dmg",2) + " ATK";
  return prompt( history4+ "\n" + history3+ "\n" + history2+ "\n" + history1+"\n"+ line3+ "\n" + activeLine + "\n"+ line3+ "\n" + line2+ "\n" + line1);
  } else if (type === "alert"){
      var history4 = hist[3] + playerTurn;
      var history3 = hist[2];
      var history2 = hist[1];
      var history1 = hist[0];
      var activeLine = "Tu frappes et mets " + returnData("dmg",1); 
      var line3 = "________________________________________________";
      var line2 = "PV :" + returnData("pv",1) +"                                 |                                " +returnData("pv",2) + " PV";
      var line1 = "ATK :" + returnData("dmg",1) +" | DEF :" + returnData("def",1) +"               |               " +returnData("def",2) + " DEF | "+returnData("dmg",2) + " ATK";
      return alert( history4+ "\n" + history3+ "\n" + history2+ "\n" + history1+"\n"+ line3+ "\n" + activeLine + "\n"+ line3+ "\n" + line2+ "\n" + line1);
  } else if (type === "debug"){
    console.log("Player1 : " + returnData("pv",1) + " | " + "Player2 : " + returnData("pv",2));
  }
}

function turnManager(){
  //si l'humain joue
  if (playerTurn === 1){
    var input = Number(display("prompt")); 
      if (input >= 1 && input <= 4) {
        attack(input);
      } 
    playerTurn = 2;
  } 
  // Sinon l'ordi joue
  if (playerTurn === 2 ) {
    attack(1);
    display("debug");
    playerTurn = 1;
  }
  //check de l'arret du combat
  if (input === "e" || returnData("pv",1) <= 0 ||returnData("pv",2) <= 0){
    //Pour arréter le combat
   combatRunning = false;
   return;
 }
}


//------ BOUCLE PRINCIPALE ------
initPlayer(1);
initPlayer(2);

console.log(playerTurn);
console.log(player1);
console.log(player2);
while(combatRunning === true){
  turnManager();
}

