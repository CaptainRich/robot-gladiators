
// Battling Robots
// Javascript by: Richard Ay, August 2020
//                Updated: November 2021

///////////////////////////////////////////////////////////////////
var fightOrSkip = function () {

    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?  Enter 'FIGHT' or 'SKIP' to choose.");

    // Conditional Recursive Function Call, if 'promptFight' is invalid (empty or null)
    if( !promptFight ){
        window.alert( "You need to provide a valid answer! Please try again." );
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();   // make response all lower case

    if (promptFight === "skip" ) {
        // Confirm the player wants to skip the fight.
        var confirmSkip = window.confirm("Are you sure you want to skip the fight?");

        // If "yes/true", leave the fight.
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight.  Goodbye!");
            playerInfo.money = Math.max(0, playerInfo.money - 10);    // deduct money from player for skipping, limit is zero
            console.log("playerInfo.money", playerInfo.money);
            return true;                                  
        }
    }

    return false;
}

///////////////////////////////////////////////////////////////////
var fight = function (enemy) {

    // Define a random value to determine which robot fights first
    var isPlayerTurn = true;          // initialize to 'Player's robot' goes first
    var robotId      = "Player";

    randomNum = Math.random();
    if (randomNum > 0.5) {
        isPlayerTurn = false;         // Enemy goes first if random value is > 0.5
        robotId      = "Enemy";
    }

    // Report which robot starts the fight for this round
    console.log( "Random number is: " + randomNum + "; isPlayerTurn is: " + isPlayerTurn + ", " + robotId + " goes first this round." );

    // Repeat and execute as long as the enemy robots are alive and our robot is also alive.
    while (enemy.health > 0 && playerInfo.health > 0) {

        if (isPlayerTurn) {

            // Ask the player if the fight should be skipped.
            if (fightOrSkip()) {
                break;             // leave the fight
            }

            // If the player selected fight, then continue to fight.
            // Subtract the value of 'playerInfo.attack' from the value of 'enemy.health' and use that result to update the value in the 'enemy.health' variable.  Log the result to the console for verification.  We'll use a random value for the effects of 'playerInfo.attack'.

            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);     // reduce enemy's health, but the limit is zero

            console.log(playerInfo.name + " attacked " + enemy.name + " with " + damage + " damage. " + enemy.name + " now has " + enemy.health + " health remaining.");


            // Check the enemy's health.

            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                // Award player's robot for defeating an enemy
                playerInfo.money += 20;
                break;                   // exit enemy robot fight if it dies
            }
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        }
        else {
            // Player gets attacked
            // Subtract the value of 'enemy.attack' from the value of 'playerInfo.health' and use that result to update the value in the 'playerInfo.health" variable.  Log the result to the console for verification.  Here also, use a random value for the 'enemy.attack" effect.

            var damage = randomNumber(enemy.attack - 4, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);  // reduce player's health, but the limit is zero

            console.log(enemy.name + " attacked " + playerInfo.name + " with " + damage + " damage. " + playerInfo.name + " now has " + playerInfo.health + " health remaining and " + playerInfo.money + " money remaining.");

            // Check our player's health.

            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;          // exit the fight on death
            }
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }

        // Switch the order of fighters for the next round.
        isPlayerTurn = !isPlayerTurn;
    }
};

///////////////////////////////////////////////////////////////////////////////////

var startGame = function () {

    // Reset the "Player's" data on a game start/re-start
    playerInfo.reset();
    // playerInfo.health = 100;
    // playerInfo.money  = 10;
    // playerInfo.attack = 10;

    // Invoke the "Fight" function from a loop (over the enemy robot names)
    for (var i = 0; i < enemyInfo.length; i++) {   

        var round = i + 1;

        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators: Round " + round );
        }
        else {
            window.alert("You have lost your robot in battle! The game is over!");
            break;
        }

        // Select the next enemy robot to fight
        var pickedEnemyObj = enemyInfo[i];
        pickedEnemyObj.health = randomNumber(30, 50);   // reset the enemy robot's health.  This will return a random value from 30 to 50

        // Enemy attack values now defined in the objects.
        //pickedEnemyObj.Attack = randomNumber(10, 14);   // reset the enemy robot's health.  This will return a random value between 10 and 14

        // Report player data to the console for this round.
        console.log( "At the start of the round " + round + ", " + playerInfo.name + ",", " Attack = " + playerInfo.attack + ",", " Health = " + playerInfo.health + " Money = " + playerInfo.money );

        // Report the enemy's data to the console
        console.log(pickedEnemyObj.name + "(enemy),", " Attack = " + pickedEnemyObj.attack + ",", " Health = " + pickedEnemyObj.health);

        // Pass the enemy robot's name to the fight function
        fight(pickedEnemyObj);

        // Invoke the 'Shop Function' option if there are more robots to fight, and 'player' is still alive.
        if( (playerInfo.health > 0) && (i < (enemyInfo.length - 1)) ) {
            var storeConfirm = window.confirm( "The fight is over, visit the store before the next round?");

            // On an affirmative response, enter the store
            if( storeConfirm ) {
                shop();
            }
        }
    }

    // Play the game again, maybe, ask the user
    endGame();
}

///////////////////////////////////////////////////////////////////////////////////
var endGame = function() {

    // If the player is still alive, the player wins!
    if( playerInfo.health > 0 ) {
        window.alert( "Great Job, you've survived the game! You now have a score of " + playerInfo.money + "." );

        // Retrieve (or set) the high score in the browser's local storage
        var winningRobot = " ";

        var browserScore = localStorage.getItem("highscore");
        if( browserScore === null ){
            browserScore = 0;
        }
        else {   
            winningRobot = localStorage.getItem("winner");
        }

        // If the current score did not beat the earlier winner, report this to the player and take no further action.
        if( playerInfo.money <= browserScore ) {
            window.alert( "You did not beat the previous high score of " + browserScore + " posted by " + winningRobot + "." );
        }
        else {
            // Save the new winning information.
            window.alert( "Your robot is the new high scorer!");
            localStorage.setItem( "winner", playerInfo.name );
            localStorage.setItem( "highscore", playerInfo.money );
        }
    }
    else {
        window.alert( "You've lost your robot in battle, your robot was defeated." );
    }

    // Ask if another game should be played
    var playAgainConfirm = window.confirm( "Would you like to play again?" );

    if( playAgainConfirm){
        // ReStart the game
        startGame();
    }
    else {
        window.alert( "Thank you for playing Robot Gladiators!  Come back soon." );
    }
}

///////////////////////////////////////////////////////////////////////////////////
var shop = function() {

    // Ask what the 'Player' would like to do
    var shopOptionPrompt = window.prompt( "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 'REFILL', 'UPGRADE', or 'LEAVE'." );

    shopOptionPrompt = shopOptionPrompt.toLowerCase();

    // Switch based on the 'Player's' response, note the response is converted to 'lower case'.

    switch ( shopOptionPrompt )    {

        case "refill":
            playerInfo.refillHealth();
            break;

        case "upgrade":
            playerInfo.upgradeAttack();
            break;

        case "leave":
            window.alert( "Leaving the store." );
            break;                                  // don't adjust anything

        default:
            window.alert( "You didn't pick a valid option, please try again." );
            shop();
            break;
    }
}

///////////////////////////////////////////////////////////////////////////////////
var randomNumber = function( min, max ) {

    // This will yield a random value from 0-(max-min), added to min.
    var value = Math.floor( Math.random() * (max - min + 1) ) + min;  
    return value;
}

///////////////////////////////////////////////////////////////////////////////////
// Define a function to acquire a valid 'player's' name
var getPlayerName = function() {
    var name = "";

    while( name === "" || name === null ){
        name = prompt("What is your robot's name?");
    }
    return name;
}


///////////////////////////////////////////////////////////////////////////////////
// Define the 'player' and 'enemy' objects
// Obtain/define the main game variables, first a 'player' object.
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,


    // These are object (class) functions
    reset: function() {
        this.health = 100;
        this.money  = 10;
        this.attack = 10;
    },

    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 25 for 7 dollars.");
            this.health += 25;
            this.money -= 7;
        }
        else {
            window.alert("Sorry, you dont' have enough funds for this action.");
        }
    },

    upgradeAttack: function() {
        if (this.money >= 6) {
            window.alert("Upgrading player's attack by 6 for 6 dollars.");
            this.attack += 8;
            this.money -= 6;
        }
        else {
            windows.alert("Sorry, you dont' have enough funds for this action.");
        }
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////
// Define the enemy robot objects, in an array.
var enemyInfo = [
    { name: "Roborto",
      attack: randomNumber(8, 12)
    },

    { name: "Amy Android",
      attack: randomNumber(8, 12)
    },

    { name: "Robo Trumble",
      attack: randomNumber(8, 12)
    }
];

///////////////////////////////////////////////////////////////////////////////////////////////
// Start the game when the page loads

startGame();
