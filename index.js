const { fifaData } = require('./fifa.js')

// Sample Data
// ===========
// "Year": 2014,
// "Datetime": "13 Jul 2014 - 16:00",
// "Stage": "Final",
// "Stadium": "Estadio do Maracana",
// "City": "Rio De Janeiro",
// "Home Team Name": "Germany",
// "Home Team Goals": 1,
// "Away Team Goals": 0,
// "Away Team Name": "Argentina",
// "Win conditions": "Germany win after extra time",
// "Attendance": 74738,
// "Half-time Home Goals": 0,
// "Half-time Away Goals": 0,
// "Referee": "Nicola RIZZOLI (ITA)",
// "Assistant 1": "Renato FAVERANI (ITA)",
// "Assistant 2": "Andrea STEFANI (ITA)",
// "RoundID": 255959,
// "MatchID": 300186501,
// "Home Team Initials": "GER",
// "Away Team Initials": "ARG"

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/
let worldCup2014 = fifaData.filter(match => match.Year === 2014 && match.Stage === "Final");

//(a) Home Team name for 2014 world cup final
console.log(worldCup2014[0]["Home Team Name"]);

//(b) Away Team name for 2014 world cup final
console.log(worldCup2014[0]["Away Team Name"]);

//(c) Home Team goals for 2014 world cup final
console.log(worldCup2014[0]["Home Team Goals"]);

//(d) Away Team goals for 2014 world cup final
console.log(worldCup2014[0]["Away Team Goals"]);

//(e) Winner of 2014 world cup final */
console.log(worldCup2014[0]["Win Conditions"]);


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(array) {
    return array.filter(match => match.Stage === "Final");
 }

console.log(`task 2`);
console.log(getFinals(fifaData));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(array, callback) {
    return callback(array).map(match => match["Year"]);
}

console.log(`task 3`);
console.log(getYears(fifaData, getFinals));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(array, callback) {
    return callback(array).map(match => 
        match["Home Team Goals"] > match["Away Team Goals"] ? 
        match["Home Team Name"] : 
        match["Away Team Name"]
    );
}

console.log(`task 4`)
console.log(getWinners(fifaData, getFinals));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(array, getFinalsCB, getYearsCB, getWinnersCB) {
    const finals = getFinalsCB(array);
    const years = getYearsCB(finals, getFinalsCB);
    const winners = getWinnersCB(finals, getFinalsCB);
    return finals.map((item, index) => `In ${years[index]}, ${winners[index]} won the world cup!`);
}

console.log(`task 5`)
console.log(getWinnersByYear(fifaData, getFinals, getYears, getWinners));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function `getAverageGoals` to do the following: 
 1. Receive a callback function as a parameter that will take `getFinals` (from task 2) as an argument; ensure you pass in `fifaData` as its argument
 
 💡 HINT: Example of invocation: `getAverageGoals(getFinals(fifaData));`

 2. Calculate the AVERAGE number of the TOTAL home team goals AND TOTAL away team goals scored PER MATCH

 3. Round to the second decimal place and return the value
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
*/

function getAverageGoals(array) {
    return (array.reduce((prev, curr) => prev + curr["Home Team Goals"] + curr["Away Team Goals"], 0) / array.length).toFixed(2);
}

console.log(`task 6`)
console.log(getAverageGoals(getFinals(fifaData)));



/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {

    return data.map(match => 
        match["Home Team Goals"] > match["Away Team Goals"] ? 
        match["Home Team Initials"] : 
        match["Away Team Initials"]
    ).filter(initial => initial === teamInitials).reduce((prev, curr) => curr ? prev + 1 : curr, 0);

}

console.log(`stretch 1`);
console.log(getCountryWins(getFinals(fifaData), "GER"));

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
    let highestAverage = 0;
    let highestTeam;
    let teamStats = [];
    const homeTeams = data.map(match => { return {
            "Team Name": match["Home Team Name"],
            "Team Goals": match["Home Team Goals"],
        }
    });
    const awayTeams = data.map(match => { return {
            "Team Name": match["Away Team Name"],
            "Team Goals": match["Away Team Goals"],
        }
    })
    homeTeams.forEach(match => { teamStats.push(match) });
    awayTeams.forEach(match => { teamStats.push(match) });

    teamStats.forEach(appearance => {
        const filtered = teamStats.filter(team => team["Team Name"] === appearance["Team Name"]);
        const appearances = filtered.length;
        const goals = filtered.reduce((prev, curr) => prev + curr["Team Goals"], 0);
        const average = (goals / appearances).toFixed(2);

        if (average > highestAverage) {
            highestAverage = average;
            highestTeam = appearance["Team Name"];
        }
    })

    return `${highestTeam} has the best offense, with ${highestAverage} goals per appearance`;
    // console.log(teamStats);
    
}

console.log(`stretch 2`);
console.log(getGoals(getFinals(fifaData)));

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {

    let worstAverage = 0;
    let worstDefense;
    let teamStats = [];
    const homeTeams = data.map(match => { return {
            "Team Name": match["Home Team Name"],
            "Goals Against": match["Away Team Goals"],
        }
    });
    const awayTeams = data.map(match => { return {
            "Team Name": match["Away Team Name"],
            "Goals Against": match["Home Team Goals"],
        }
    })
    homeTeams.forEach(match => { teamStats.push(match) });
    awayTeams.forEach(match => { teamStats.push(match) });

    teamStats.forEach(appearance => {
        const filtered = teamStats.filter(team => team["Team Name"] === appearance["Team Name"]);
        const appearances = filtered.length;
        const goalsAgainst = filtered.reduce((prev, curr) => prev + curr["Goals Against"], 0);
        const average = (goalsAgainst / appearances).toFixed(2);
    
        if (average > worstAverage) {
            worstAverage = average;
            worstDefense = appearance["Team Name"];
        }
    });

    return `${worstDefense} has the worst defense, with ${worstAverage} goals against per appearance`;

}

console.log(`stretch 3`);
console.log(badDefense(getFinals(fifaData)));

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
