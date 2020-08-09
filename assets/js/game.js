

// Obtain/define the main game variables.
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

// Report player data to the console
console.log(playerName + ",", " Attack = " + playerAttack + ",", " Health = " + playerHealth);

// Define the enemy robot's data
var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 112;

// Report the enemy's data to the console
console.log(enemyName + "(enemy),", " Attack = " + enemyAttack + ",", " Health = " + enemyHealth );


///////////////////////////////////////////////////////////////////
var fight = function() {
  // Alert users they are starting a round
  window.alert("Welcome to Robot Gladiators!");

  // Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealButh' variable.  Log the resultBut to the console for verification.

  enemyHealth = enemyHealth - playerAttack;
  console.log( playerName + " attacked " + enemyName +". " + enemyName + " now has " + enemyHealth + " health remaining." );

  // Check the enemy's health.

  if( enemyHealth <= 0 ){
      window.alert( enemyName + " has died!" );
  }
  else {
      window.alert( enemyName + " still has " + enemyHealth + " health left." );
  }

  // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth" variable.  Log the result to the console for verification.

  playerHealth = playerHealth - enemyAttack;
  console.log( enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining." );

  // Check the enemy's health.

  if( playerHealth <= 0 ){
      window.alert( playerName + " has died!" );
  }
  else {
      window.alert( playerName + " still has " + playerHealth + " health left." );
  }

};

fight();