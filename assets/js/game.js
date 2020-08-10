



// Report player data to the console
//console.log(playerInfo.name + ",", " Attack = " + playerInfo.attack + ",", " Health = " + playerInfo.health + " Money = " + playerInfo.money );

// Define the enemy robot's data
//var enemyName = "Roborto";
//var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
//var enemyHealth = 50;
//var enemyAttack = 12;

// Report the enemy's data to the console
//console.log(enemyName + "(enemy),", " Attack = " + enemyAttack + ",", " Health = " + //enemyHealth);

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
            playerInfo.money = Math.max(0, playerInfo.money - 10);    // deduct money from the player for skipping
            console.log("playerInfo.money", playerInfo.money);
            return true;                                  
        }
    }

    return false;
}

///////////////////////////////////////////////////////////////////
var fight = function (enemy) {

    // Repeat and execute as long as the enemy robots are alive and our robot is also alive.
    while (enemy.health > 0 && playerInfo.health > 0) {

        // Ask the player if the fight should be skipped.
        if (fightOrSkip()) {
            break;             // leave the fight
        }

        // If the player selected fight, then continue to fight.

        // Subtract the value of 'playerInfo.attack' from the value of 'enemy.health' and use that result to update the value in the 'enemy.health' variable.  Log the result to the console for verification.  We'll use a random value for the effects of 'playerInfo.attack'.

        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);

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

        // Subtract the value of 'enemy.attack' from the value of 'playerInfo.health' and use that result to update the value in the 'playerInfo.health" variable.  Log the result to the console for verification.  Here also, use a random value for the 'enemy.attack" effect.

        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);

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
        pickedEnemyObj.health = randomNumber(40, 60);   // reset the enemy robot's health.  This will return a random value from 40 to 60

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

            // On an afirmative response, enter the store
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
    }
    else {
        window.alert( "You've lost your robot in battle." );
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
    var shopOptionPrompt = window.prompt( "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a selection." );

    // Switch based on the 'Player's' response

    switch ( shopOptionPrompt )    {

        case "refill":
        case "REFILL":
            playerInfo.refillHealth();
            break;

        case "upgrade":
        case "UPGRADE":
            playerInfo.upgradeAttack();
            break;

        case "leave":
        case "LEAVE":
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
            windows.alert("Sorry, you dont' have enough funds for this action.");
        }
    },

    upgradeAttack: function() {
        if (this.money >= 6) {
            window.alert("Upgrading player's attack by 6 for 6 dollars.");
            this.attack += 6;
            this.money -= 6;
        }
        else {
            windows.alert("Sorry, you dont' have enough funds for this action.");
        }
    }
};

// Define the enemy robot objects, in an array.
var enemyInfo = [
    { name: "Roborto",
      attack: randomNumber(10, 14)
    },

    { name: "Amy Android",
      attack: randomNumber(10, 14)
    },

    { name: "Robo Trumble",
      attack: randomNumber(10, 14)
    }
];


// Start the game when the page loads

startGame();
