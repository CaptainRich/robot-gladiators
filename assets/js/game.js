

// Obtain/define the main game variables.
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// Report player data to the console
console.log(playerName + ",", " Attack = " + playerAttack + ",", " Health = " + playerHealth + " Money = " + playerMoney );

// Define the enemy robot's data
//var enemyName = "Roborto";
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// Report the enemy's data to the console
//console.log(enemyName + "(enemy),", " Attack = " + enemyAttack + ",", " Health = " + enemyHealth);


///////////////////////////////////////////////////////////////////
var fight = function (enemyName) {

    // Repeat and execute as long as the enemy robots are alive and our robot is also alive.
    while (enemyHealth > 0 && playerHealth > 0) {

        // Ask the player if the fight should be skipped.
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?  Enter 'FIGHT' or 'SKIP' to choose.");

        if (promptFight === "skip" || promptFight === "SKIP") {
            // Confirm the player wants to skip the fight.
            var confirmSkip = window.confirm("Are you sure you want to skip the fight?");

            // If "yes/true", leave the fight.
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight.  Goodbye!");
                playerMoney -= 10;    // deduct money from the player for skipping
                console.log("playerMoney", playerMoney);
                break;                                  // quit fighting this robot
            }
        }

        // If the player selected fight, then fight.
        if (promptFight === "fight" || promptFight === "FIGHT") {

            // Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealButh' variable.  Log the resultBut to the console for verification.

            enemyHealth = enemyHealth - playerAttack;
            console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");


            // Check the enemy's health.

            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");

                // Award player's robot for defeating an enemy
                playerMoney += 20;
                break;                   // exit enemy robot fight if it dies
            }
            else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

            // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth" variable.  Log the result to the console for verification.

            playerHealth = playerHealth - enemyAttack;
            console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining and " + playerMoney + " money remaining.");

            // Check our player's health.

            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
                break;          // exit the fight on death
            }
            else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }


        } else {
            window.alert("Illegal response, please pick a valid option and try again!");
        }
    }
};

///////////////////////////////////////////////////////////////////////////////////
// Invoke the "Fight" function from a loop (over the enemy robot names)

for( var i = 0; i < enemyNames.length; i++) {


    if( playerHealth > 0 ){
        window.alert( "Welcome to Robot Gladiators: Round " + (i+1) );
    }
    else {
        window.alert( "You have lost your robot in battle! The game is over!");
        break;
    }

    // Select the next enemy robot to fight
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;                  // reset the enemy robot's health

    // Pass the enemy robot's name to the fight function
    fight( pickedEnemyName );
}
