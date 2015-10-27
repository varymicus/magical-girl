function slidePanel(id) {
    var panel = document.getElementById(id);
    if(panel.className == "infocus") {
        panel.className = "nodisplay";
    } else {
        panel.className = "infocus";
    }
}

function roll(dice, sides) {
    var results = [];
    for (var i=0; i<dice; i++) {
        results[i] = Math.floor(Math.random()*sides)+1;
    }
    return results;
}

//TODO: refactor this to avoid hardcoding
function rollall() {
    var rolls = roll(12, 20);
    var age_result = rolls[0];
    document.getElementById("age_roll").innerHTML = rolls[0];
    document.getElementById("age_result").innerHTML = calc_age(rolls[0]);
    
    document.getElementById("body_roll").innerHTML = rolls[1];
    document.getElementById("specialization_roll").innerHTML = rolls[2];
    document.getElementById("weapon_roll").innerHTML = rolls[3];
    document.getElementById("outfit_roll").innerHTML = rolls[4];
    document.getElementById("power_roll").innerHTML = rolls[5];
    document.getElementById("perk_roll_1").innerHTML = rolls[6];
    document.getElementById("perk_roll_2").innerHTML = rolls[7];
    document.getElementById("perk_roll_3").innerHTML = rolls[8];
    document.getElementById("perk_roll_4").innerHTML = rolls[9];
    document.getElementById("perk_roll_5").innerHTML = rolls[10];
    document.getElementById("corruption_roll").innerHTML = rolls[11];
}

// Treat 1 - 10 as is, and 11 - 20 as 1 - 10. Age = 6 + roll.
function calc_age(roll) {
    var result = 0;
    result = (roll - 1) % 10; // convert [1,10] and [11,20] to [0,9]
    result = result + 7; // convert [0,9] to [7,16]
    return result;
}

//TODO: prevent double-buying
function age_bronze() {
    if(spend("bronze")) {
        var minus = document.getElementById("age_minus");
        var plus = document.getElementById("age_plus");
        minus.disabled = false;
        minus.className = "infocus";
        plus.disabled = false;
        plus.className = "infocus";
    }
}

//TODO: test and change button calls
function age_mod(variance) {
    var minus = document.getElementById("age_minus");
    var plus = document.getElementById("age_plus");
    var age = document.getElementById("age_result");
    var new_age = 0;
    new_age = age.innerHTML;
    new_age += variance;
    minus.disabled = (new_age <= min);
    plus.disabled = (new_age >= max);
    if(new_age >= min && new_age <= max) {
        age_tracker.innerHTML = age;
    }
}

//decreases age by 1, disables - button, enables + button
function age_minus() {
    var minus = document.getElementById("age_minus");
    var plus = document.getElementById("age_plus");
    var age_tracker = document.getElementById("age_result");
    age = age_tracker.innerHTML;
    age--;
    age_tracker.innerHTML = age;
    
    minus.disabled = true;
    if(age >= age_min
    plus.disabled = false;
}

//increases age by 1, disables + button, enables - button
function age_plus() {
    var minus = document.getElementById("age_minus");
    var plus = document.getElementById("age_plus");
    var age_tracker = document.getElementById("age_result");
    age = age_tracker.innerHTML;
    age++;
    age_tracker.innerHTML = age;
    
    minus.disabled = false;
    plus.disabled = true;
}



function spend(coinType) {
    var counter = null;
    var coins = 0;
    switch (coinType) {
    case "bronze":
        counter = document.getElementById("bronze_coins");
        break;
    case "silver":
        counter = document.getElementById("silver_coins");
        break;
    case "gold":
        counter = document.getElementById("gold_coins");
        break;
    }
    coins = counter.innerHTML;
    if (coins > 0) {
        coins--;
        counter.innerHTML = coins;
        return true;
    } else {
        return false;
    }
}


// function getCost(row) {
    // for (var i = 0; i < row.cells.length; i++) {
        // if(row.cells[i].className == "cost_col") {
            // return parseInt(row.cells[i].innerHTML);
        // }
    // }
    // return 0;
// }

// function getBonus(row) {
    // for (var i = 0; i < row.cells.length; i++) {
        // if(row.cells[i].className == "bonus_col") {
            // return parseInt(row.cells[i].innerHTML);
        // }
    // }
    // return 0;
// }

// function buy(tableName, rowNum, method, noclear) {
    // var summary = document.getElementById("summary");
    // var wallet = document.getElementById("counter");
    // var points = parseInt(wallet.innerHTML);
    // var options = document.getElementById(tableName).getElementsByTagName("tr");
    // var cost = getCost(options[rowNum]);
    // var bonus = getBonus(options[rowNum]);
    
    // if(points >= cost) {
        // if(noclear != 1) {
            // //refund other purchases in same chain
            // for (var i = 0; i < options.length; i++) {
                // points = refund(tableName, i);
            // }
        // }    
        
        // //purchase option
        // if(method == "roll") {
            // options[rowNum].className = "rolled";
            // points = points + bonus;
        // } else {
            // if(tableName == "artifact") {
                // points = points + bonus;
            // }
            // options[rowNum].className = "purchased";
        // }
        // points = points - cost;
        // summary.innerHTML = summary.innerHTML + tableName + " " + rowNum.toString() + "|"; //update summary
    // }
    
    // wallet.innerHTML = points.toString(); //update counter
    // return points;
// }

// function refund(tableName, rowNum) {
    // var summary = document.getElementById("summary");
    // var wallet = document.getElementById("counter");
    // var points = parseInt(wallet.innerHTML);
    // var row = document.getElementById(tableName).getElementsByTagName("tr")[rowNum];
    // if(is_taken(tableName, rowNum)) {
        // points = points + getCost(row);
        
        // //update summary
        // var sumText = summary.innerHTML;
        // var key = tableName + " " + rowNum;
        // var key_start = sumText.indexOf(key);
        // //grab everything before and after the refunded choice
        // summary.innerHTML = sumText.slice(0, key_start) + sumText.slice(key_start + key.length + 1);
    // }
    // row.className = "";
    // wallet.innerHTML = points.toString();
    
    // return points;
// }

// function roll_choice(tableName) {
    // var confirmed = window.confirm("Are you sure you want to take a random option? This may not be reversible.");
    // if(confirmed === true) {
        // var choice = roll(1,12) - 1;
        // while(is_taken(tableName, choice)) {
            // choice = roll(1,12) - 1;
        // }
        // buy(tableName,choice,"roll",1);
    // }
// }

// function gen_summary() {
    // //tableName rowNum|
    // var sumText = document.getElementById("summary").innerHTML;
    // var outText = "";
    // var str_tok = sumText.split("|");
    // var cur_tok = "";
    // var row;
    // var baubles = 100;
    // for (var i=0; i<str_tok.length-1; i++) {    
        // cur_tok = str_tok[i].split(" ");
        // row = document.getElementById(cur_tok[0]).getElementsByTagName("tr")[cur_tok[1]];
        // baubles = baubles - getCost(row);
        // if(row.className == "rolled") {
            // baubles = baubles + getBonus(row);
            // outText = outText + "[" + baubles + "] " + "Rolled: ";
        // } else {
            // outText = outText + "[" + baubles + "] ";
        // }
        // for (var j=0; j<row.cells.length; j++) {
            // if(row.cells[j].className == "name_col") {
                // outText = outText + row.cells[j].innerHTML + "<br>";
            // }
        // }
    // }
    
    // document.getElementById("p_summary").innerHTML = outText;
// }

// function is_taken(tableName, rowNum) {
    // var row = document.getElementById(tableName).getElementsByTagName("tr")[rowNum];
    // return (row.className == "purchased" || row.className == "rolled");
    
// }