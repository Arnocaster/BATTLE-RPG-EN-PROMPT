// Déclaration des variables
var player1 = []
var player2 = []
var turnToCome = []
var nameList = ["Dirsogrë", "Themelë", "Tadtel", "Rochmith", "Aërhûn", "Shebhir", "Aëthim", "Nanlenlon", "Rauaër", "Erhar", "Ilrod", "Iennan", "Harnag", "Vîngarrim", "Minbel", "Caldilrë", "Sîrum", "Luingad", "Loeodh", "Berdulië", "Gurdae", "Athbret", "Lamdundîr", "Athien", "Cuilim", "Tadum", "Ionoth", "Iaodh", "Galunië", "Cuifal", "Sadruïn", "Taethûdîr", "Lammîl", "Ergroron", "Sogbeth", "Mithrena", "ûrloerë", "Firrhaa", "Lhoelrim", "Iashelnir", "Ganpel", "Etheälië", "Thirdin", "Idhber", "Bretcau", "Amvîn", "Garleb", "Danduinil", "Mirmal", "Sënrau", "Lanrhyn", "Melduir", "Himduilë", "Calath", "Dothliathaë", "Theglam", "Moelaënir", "Bethvel", "Oeggae", "Belrha", "Mîlrhyn", "Ruïnteith", "Nîntuma", "Lathdul", "Gweeg", "Saeûr", "Cyrmeldîr", "Henmel", "Cenmae", "Lathdellon", "Nordan", "Faubar", "Geldothrë", "Fincau", "Lebna"]
var playerTurn = Math.round(Math.random() + 1);
var combatRunning = true;
var compteurTour = 1;
var defender = null;
var attacker = null;
var hist = [" ", " ", " ", " ", " "];
var currentDialog = "";
weapons = [epee,lance,baguette]
var epee = ["Normale", "Chargée", "Vive-attaque", "Defense"]
var lance = ["Normale", "Chargée", "Attaque-bouclier", "Defense"]
var baguette = ["Normale", "Chargée", "Vive-attaque", "Contre-attaque"]


function welcome() {
  alert("Bienvenue dans ce petit jeux, vous allez devoir vous battre contre l'ordinateur\n");
}

//------ FONCTIONS UTILITAIRES ------
//Fonction qui  récupère les données dans les tableaux 
//en fonction d'un string(name,weapon,armor,dmg,pv) et du numéro de joueur (1,2).
function returnData(data, player) {
  if (data !== "history") {
    if (player === 1) {
      var player = player1;
    } else if (player === 2) {
      var player = player2;
    }

    if (data === "name") {
      return player[0];
    } else if (data === "pv") {
      return player[1];
    } else if (data === "weapon") {
      return player[2];
    } else if (data === "dmg") {
      return player[3];
    } else if (data === "armor") {
      return player[4];
    } else if (data === "def") {
      return player[5];
    } else if (data === "activeDef") {
      return player[6];
    } else if (data === "jumpTurn") {
      return player[7];
    }
  } else if (data === "history") {
    return hist[player];
  } else {
    console.log("input incorrect");
  }
}

//Fonction qui envoie les données vers les tableaux player 1 et player 2
function pushData(data, value, player) {
  if (data !== "history") {
    if (player === 1) {
      var player = player1;
    } else if (player === 2) {
      var player = player2;
    }

    if (data === "name") {
      player[0] = value;
      return;
    } else if (data === "pv") {
      player[1] = value;
      return;
    } else if (data === "weapon") {
      player[2] = value;
      return;
    } else if (data === "dmg") {
      player[3] = value;
      return;
    } else if (data === "armor") {
      player[4] = value;
      return;
    } else if (data === "def") {
      player[5] = value;
      return;
    } else if (data === "activeDef") {
      player[6] = value;
      return;
    } else if (data === "jumpTurn") {
      player[7] = value;
      return;
    }
  } else if (data === "history") {
    hist[player] = value;
  } else {
    console.log("input incorrect");
  }
}


function arrayMgmt (type,array,index,value,separator = ""){
  var myString = "";
  if (index >= 0 && index <= array.length){
      switch(type){
          case "readOne" :     
              return array[index];
          case "readAll" :     
              for (var i = 0; i < array.length ;i++){
                  myString += array[i] + separator;
              }
              return myString;
          case "add" :
          
              var tempArray = [];
              var before = array.slice(0,index);
              var after = array.slice(index,array.length);

              for (var i=0 ; i < before.length; i++){
              tempArray.push(before[i]);
              }

              tempArray.push(value);

              for (var i=0 ; i < after.length; i++){
              tempArray.push(after[i])
              }
              for (var i = 0; i < array.length ;i++){
                  myString += array[i] + separator;
              }
              return tempArray
              
          case "modify" :
              array[index] = value
              return array;
          case "delete" :
              var tempArray = [];
              var before = array.slice(0,index);
              var after = array.slice(index+1,array.length);

              for (var i=0 ; i < before.length; i++){
              tempArray.push(before[i]);
              }
              for (var i=0 ; i < after.length; i++){
              tempArray.push(after[i])
              }
              for (var i = 0; i < array.length ;i++){
                  myString += array[i] + separator;
              }
              return tempArray
      }
  } else {return "cet index n'existe pas " + type + "[" + index + "]"}

}



//création de variable d'aisance pour rentre l'écriture plus compréhensible
function whoAttack() {
  if (playerTurn === 1) {
    attacker = 1;
    defender = 2;
  } else {
    attacker = 2;
    defender = 1;
  }
}

function weaponSelector(weapon) {
  if (weapon === "EPEE") {
    return epee;
  } else if (weapon === "LANCE") {
    return lance;
  } else if (weapon === "BAGUETTE DE FEU") {
    return baguette;
  }
}

//Fonction qui met à jour l'array historique
function historyUpdate() {
  hist = arrayMgmt("add",hist,0,currentDialog,null);
  hits = arrayMgmt("delete",hist,hist.length,null,null);
  /* Depreciated
    for (var i = hist.length - 1; i >= 0; i--) {
      //On 
      pushData("history", returnData("history", i), i + 1);
    }
    pushData("history", currentDialog, 0);
    */
}

//------ FONCTIONS D'INITIALISATION ------
function initPlayer(playerNumber) {
  //Loterie du loot, initialisation des armes/armures aléatoires
  var playerClass = Math.round((Math.random() * 2) + 1);
  if (playerClass === 1) {
    var pv = 250;
    var weapon = "EPEE";
    var dmg = 15;
    var armor = "ACIER";
    var def = 17;
  } else if (playerClass === 2) {
    var pv = 200;
    var weapon = "LANCE";
    var dmg = 20;
    var armor = "CUIR";
    var def = 15;
  } else if (playerClass === 3) {
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
    var name = "Arnaud" // IMPORTANT DE OUF !!!!!!!!!!!!!!!!!!!!A remettre en fin de dev prompt("Quel est le nom du joueur?");
    //Tant que le nom est vide on redemande au joueur
    while (name === "") {
      name = prompt("Choisissez votre nom :");
    }
    player1.push(name, pv, weapon, dmg, armor, def, 0, false);
  }
  //Si on initialise le joueur 2 (CPU)
  else if (playerNumber === 2) {
    var name = nameList[Math.round(Math.random() * (nameList.length - 1))];
    player2.push(name, pv, weapon, dmg, armor, def, 0, false);
  }

  //Si les deux joueurs sont complets alors on affiche son équipement au joueur
  if (player1.length > 5 && player2.length > 5) {

    hist = arrayMgmt("modify",hist,0,dialog("whoStart",playerTurn),null);
    //pushData("history", "C'est le joueur " + playerTurn + " qui commence. Que la bataille soit belle!", 0);
    console.log(player1[0] + " votre " + returnData("weapon", 1) + " et votre armure de " + returnData("armor", 1) + " vous on été attribués pour ce combat.");
  }
}



//Fonction d'affichage soit en alert soit en prompt soit en console.log
function display(type) {
  //Si
  if (returnData("activeDef",1) > 0) {
    var activeDef1 = "(+" + returnData("activeDef",1)+")"
  } else {
    var activeDef1 = "      "
  }
  if (returnData("activeDef",2) > 0) {
    var activeDef2 = "(+" + returnData("activeDef",1) + ")"; 
  } else {
    var activeDef2 = "      "
  }

  //var history4 = hist[4] 
  var history3 = hist[3] + returnData("weapon", playerTurn);
  var history2 = hist[2];
  var history1 = hist[1];
  var activeLine = hist[0];
  var line3 = "________________________________________________";
  var line2 = returnData("name", 1) + "  PV :" + returnData("pv", 1) + "                |               " + returnData("name", 2) + "  " + returnData("pv", 2) + " PV";
  var line1 = "ATK  " + returnData("dmg", 1) + " | DEF  " + returnData("def", 1) + activeDef1 + "        |         " + "ATK  " + returnData("dmg", 2) + " | DEF  " + returnData("def", 2) + activeDef2 ;
  //actionAvailable = for (var i=0; i < weaponSelector(returnData("weapon",playerTurn).length,i))

  //En fontion du parmètre on affiche soit promt, soit alert, soit debug
  if (type === "prompt") {
    //Affichage des options possible ssi prompt
    var currentWeapon = weaponSelector(returnData("weapon", playerTurn));
    var lineOptions = " "
    for (var i = 0; i < currentWeapon.length; i++) {
      lineOptions += i + 1 + ")" + currentWeapon[i] + "  ";
    }
    return prompt(history2 + "\n" + history1 + "\n" + line3 + "\n" + activeLine + "\n" + line3 + "\n" + line2 + "\n" + line1 + "\n" + lineOptions);
  } else if (type === "alert") {
    return alert(history2 + "\n" + history1 + "\n" + line3 + "\n" + activeLine + "\n" + line3 + "\n" + line2 + "\n" + line1);
  } else if (type === "debug") {
    console.log("Player1 : " + returnData("pv", 1) + " | " + "Player2 : " + returnData("pv", 2));
  }
}

//Fonction contenant tous les dialogues dynamiques.
function dialog(dialRef, data1, data2, data3, data4, data5) {
  if (dialRef === "Normale") {
    // data1 = $nomAttaquant data2 = $nomDefenseur data3 = $dmg 
    return compteurTour + "." + data1 + " frappe et inflige " + data3 + " de dégats à " + data2;
  } else if (dialRef === "Chargée") {
    return compteurTour + "." + data1 + " frappe FORT et inflige " + data3 + " de dégats à " + data2;
  } else if (dialRef === "Vive-attaque") {
    return compteurTour + "." + data1 + " surprend " + data2 + " par sa vitesse et lui inflige " + data3 + " de dégats";
  } else if (dialRef === "Contre-attaque") {
    //data1 = $nomAttaquant data2 = $nomDefenseur data3 = $dmg data4 = $activedef
    return compteurTour + "." + data2 + " esquive l'attaque de " + data1 + " et lui inflige " + data3 + " dommages";
  } else if (dialRef === "Attaque-bouclier") {
    // $nomAttaquant + frappe + $nomDefenseur + 
    return compteurTour + "." + data1 + "  frappe " + data2 + " bouclier relevé et lui inflige " + data3 + " de dégats.";
  } else if (dialRef === "Defense") {
    // $nomAttaquant + frappe + $nomDefenseur + 
    return compteurTour + "." + data1 + "  se défend, il bloquera " + data4 + " dégats au prochain tour";
  } else if (dialRef === "Fail") {
    // $nomAttaquant + frappe + $nomDefenseur + 
    return compteurTour + "." + data1 + " rate sa manoeuve! C'est l'echec total!";
  } else if (dialRef === "jumpTurn") {
    // $nomAttaquant + frappe + $nomDefenseur + 
    return compteurTour + "." + data1 + "saute son tour";
  } else if (dialRef === "whoStart") {
    return "C'est le joueur " + data1 + " qui commence. Que la bataille soit belle!"
  }
}

//Fonction d'attaque 
function playerAction(input) {
  whoAttack();
  //Choix du numéro d'attaque brut pour les attaques spéciales (action) en fonction de l'arme.
  
  if (input != "Defense") {
    //attaque normale
    if (input === "Normale") {
      var modifier = 1;
      var success = 0;
    }
    //attaque chargée
    if (input === "Chargée") {
      var modifier = 2.3;
      var success = 1;
    }
    if (input === "Chargée_hit") {
      var modifier = 2.3;
      var success = 2;
    }
    //vive attaque *0.8 
    if (input === "Vive-attaque") {
      var modifier = 0.8;
      var success = 2;
    }
    //contre attaque && attaque bouclier *0.6
    if (input === "Contre-attaque" || input === "Attaque-bouclier") {
      var modifier = 0.6;
      var success = 2;
    }

    //On jette un dé pour savoir si on réussi le coup.
    var dice = Math.round((Math.random() * 11) + 1);
    if (dice > success) {
      //Calcul des domages : dommage Arme * modifier - defense active;
      var totalDmg = (returnData("dmg", attacker) * modifier) - returnData("activeDef", defender);
      var pvAfterHit = Math.round(returnData("pv", defender) - totalDmg );
      if (pvAfterHit < 0) {pvAfterHit = 0;}
      //Mise à jour des PV chez le défendant
      pushData("pv", pvAfterHit, defender);
      //On reset la defense active
      pushData("activeDef", 0, defender);
      return [input, parseInt(totalDmg)];
    } else {
      input = "Fail";
      return [input, 0];
  }
  }
  if (input === "Defense") {
    activeDef = Math.round(returnData("def", attacker) * 1);
    pushData("activeDef", activeDef, attacker);
    return [input, 0];
  }
}

//Gestion du tour par tour
function turnManager() {
  whoAttack();
  //On récupère l'array de l'arme de l'attaquant
  atkWeapon = weaponSelector(returnData("weapon",attacker));
  /*
  //Si l'humain joue
  if (attacker === 1) {
    //On affiche le prompt
    var input = display("prompt");
    //on le transforme en nombre
    var nInput = Number(input);
    if (nInput < 1 || nInput > 4) {
      return;
    }

  } else if (attacker === 2) {
    //Il choisi une attaque au hasard -- On mettra une fonction ia ici au besoin
    var nInput = Math.round((Math.random() * 3) + 1);
    //On transforme le number en string pour la fonction historyUpdate()
    var input = nInput.toString();
    //On affiche l'écran
    display("alert");
  }
*/
//Si le joueur actif ne passe pas son tour, il joue
  if (returnData("jumpTurn",attacker) === false){
    //on affiche display("prompt") si J1, on affiche display("Alert si c'est J2")
    if (playerTurn === 1) {
      //On affiche le prompt et on récupère la saisie
      var input = display("prompt");
      //Si la saisie est un nombre compris dans l'array de l'arme  
      if (Number(input) > 0 &&  Number(input) <  atkWeapon.length){
        //input = nom de l'action dans l'array de l'arme 
        input = atkWeapon[Number(input)-1];
        console.log("Input P1" +input);
      } else {
        return;
      }
    } else if (playerTurn === 2) {
      display("alert");
      //L'ia choisi une attaque au hasard -- On mettra une fonction ia ici au besoin
      var input = Math.round((Math.random() * 3) + 1);
     //input = nom de l'action dans l'array de l'arme 
      input = atkWeapon[Number(input)-1];
      console.log("Input P2" + input)
    }

      //check de l'arret du combat
    if (input === "e" || returnData("pv", 1) <= 0 || returnData("pv", 2) <= 0) {
      //Pour arréter le combat et sortir de la boucle while
      combatRunning = false;
    return;
    }
    //sinon on continue le combat
    var dataCombat = playerAction(input);
    //Mise a jour du dialogue actif
    currentDialog = dialog(dataCombat[0], returnData("name", attacker), returnData("name", defender), dataCombat[1], returnData("activeDef", attacker));
  } else {
// Si jumpturn = true le joueur ne joue pas On affiche directement un dialogue
    currentDialog = dialog("jumpTurn", returnData("name", attacker), returnData("name", defender), dataCombat[1], returnData("activeDef", attacker));
    display("alert");
    pushData("jumpTurn",false,attacker);
  }

  
  //Mise à jour de l'historique
  compteurTour++;
  historyUpdate();

}




//------ BOUCLE PRINCIPALE ------
initPlayer(1);
initPlayer(2);

console.log(player1);
console.log(player2);
while (combatRunning === true) {
  turnManager();
}