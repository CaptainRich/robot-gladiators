

// Obtain/define the main game variables.
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// Report player data to the console
console.log(playerName + ",", " Attack = " + playerAttack + ",", " Health = " + playerHealth + " Money = " + playerMoney );

// Define the enemy robot's data
var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

// Report the enemy's data to the console
console.log(enemyName + "(enemy),", " Attack = " + enemyAttack + ",", " Health = " + enemyHealth);


///////////////////////////////////////////////////////////////////
var fight = function () {
    // Alert users they are starting a round
    window.alert("Welcome to Robot Gladiators!");

    // Ask the player if the fight should be skipped.
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?  Enter 'FIGHT' or 'SKIP' to choose.");

    // If the player selected fight, then fight.
    if (promptFight === "fight" || promptFight === "FIGHT") {

        // Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealButh' variable.  Log the resultBut to the console for verification.

        enemyHealth = enemyHealth - playerAttack;
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");


        // Check the enemy's health.

        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth" variable.  Log the result to the console for verification.

        playerHealth = playerHealth - enemyAttack;
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining and " + playerMoney + " money remaining.");

        // Check the enemy's health.

        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }

    // If the player selected "skip"    
    } else if( promptFight === "skip" ||  promptFight === "SKIP" ){
        // Confirm the player wants to skip the fight.
        var confirmSkip = window.confirm( "Are you sure you want to skip the fight?" );

        // If "yes/true", leave the fight.
        if( confirmSkip) {
            window.alert( playerName + " has decided to skip this fight.  Goodbye!" );
            playerMoney -= 2;    // deduct money from the player for skipping
        }

        // If the player doesn't skip, ask the quetion again by running "fight()" again
        else{
            fight();
        }
    } else {
        window.alert( "Illegal response, please pick a valid option and try again!" );
    }

};

fight();