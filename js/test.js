var turnStacker = [1,1,1];
var player1 = ["P1",false];
var player2 = ["P2",false];
var turnPlayer = Math.round((Math.random()*2)+1);
console.log(turnStacker);
turnStacker.push(turnPlayer);
console.log(turnStacker);

function turnStackerUpdate(type, value, index){
  if (type === "add"){
      if (index !== 0){
        before = turnStacker.slice(0,index-1);
        turnStacker.push(before);
      }
      after = turnStacker.slice(index+1,turnStacker.length);

      turnStacker = [];
      turnStacker.push(Number(value));
      turnStacker.push(after);
      console.log("turnStaker Modifié:" + turnStacker +"(" + turnStacker.length + ")");
    }
}

for(var i = 0 ; i < 11; i++){
  if (Number(turnStacker[0]) === 1){
    console.log("Player1 joue");
    turnStackerUpdate("add",2,0);
  } else 
  if (Number(turnStacker[0]) === 2){
    console.log("Player2 joue");
    turnStackerUpdate("add",1,0);
  } 
  else {console.log("Erreur de sélection de joueur")}
}


