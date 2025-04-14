function showGemDropdown1() {
    document.getElementById("myGems1").classList.toggle("show");
}

/*
The problem with having ID the SAME IN EACH SEPARATE DROPDOWN is that 
even if I click the SECOND gembtn to open the dropdown, the page still sees the 
first gemdropdown open which means the INSIDE CONTENTS are ALL from the first
dropdown. 
INCLUDING THE FUNCTIONS.
So if I click the <p>gems</p>. The onclick function that triggers will be the
for the first dropdown meaning the first gembtn will get changed. Not the second
*/

function showGemDropdown2() {
    document.getElementById("myGems2").classList.toggle("show");
}

function showGemDropdown3() {
    document.getElementById("myGems3").classList.toggle("show");
}


// Add event so if user clicks off the gem buttons, the gem dropdown menu will close.
window.addEventListener("click", function(event) {
    if (!event.target.matches('.gembtn')) {
        var dropdowns = document.getElementsByClassName("gem-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
});


// Add event so that clicking the gem button itself will hide all other active gem dropdowns
document.getElementsByClassName("gemdropdown1")[0].firstElementChild.addEventListener("click", removeGemdrop2_3);
function removeGemdrop2_3() {
    document.getElementById("myGems2").classList.remove("show");
    document.getElementById("myGems3").classList.remove("show");
}

document.getElementsByClassName("gemdropdown2")[0].firstElementChild.addEventListener("click", removeGemdrop1_3);
function removeGemdrop1_3() {
    document.getElementById("myGems1").classList.remove("show");
    document.getElementById("myGems3").classList.remove("show");
}

document.getElementsByClassName("gemdropdown3")[0].firstElementChild.addEventListener("click", removeGemdrop1_2);
function removeGemdrop1_2() {
    document.getElementById("myGems1").classList.remove("show");
    document.getElementById("myGems2").classList.remove("show");
}


/* 
1. Add events to change the gem button to be the image of whatever gem is chosen from the dropdown
2. Store chosen stats into global variables so that we can use them in DPS calculation later
3. Add the stats to results section based on what is chosen
4. Change stat bar size based on user selected boosts
*/
function changeGemdrop1(elem) {
    var dropdown = elem.closest(".gemdropdown1");
    var btn = dropdown.querySelector(".gembtn");
    var img = elem.firstElementChild.firstElementChild.src;

    // Increment or decrement the gem forging level for each gem based on what user clicks
    if (elem.innerText.includes("Ruby") && !btn.style.backgroundImage.includes("Ruby")) {
        ruby_level += 1;
    } else if (!elem.innerText.includes("Ruby") && btn.style.backgroundImage.includes("Ruby")){
        ruby_level -= 1;
    }

    if (elem.innerText.includes("Jade") && !btn.style.backgroundImage.includes("Jade")) {
        jade_level += 1;
    } else if (!elem.innerText.includes("Jade") && btn.style.backgroundImage.includes("Jade")){
        jade_level -= 1;
    }

    if (elem.innerText.includes("Aqua") && !btn.style.backgroundImage.includes("Aqua")) {
        aqua_level += 1;
    } else if (!elem.innerText.includes("Aqua") && btn.style.backgroundImage.includes("Aqua")){
        aqua_level -= 1;
    }

    if (elem.innerText.includes("Emerald") && !btn.style.backgroundImage.includes("Emerald")) {
        emerald_level += 1;
    } else if (!elem.innerText.includes("Emerald") && btn.style.backgroundImage.includes("Emerald")){
        emerald_level -= 1;
    }

    // Change btn background image to the chosen gem
    btn.style.backgroundImage = "url("+img+")";
    
    // Get the default - unmodified weapon stats and store it in integer variables
    let current_wep = document.querySelector(".dropbtn").innerText;
    let wep_type = '';
    let current_minDamage = 0;
    let current_maxDamage = 0;
    let current_crit_power = 0;
    let current_crit_chance = 0;
    let current_speed = 0;
    let default_dps = 0;

    if (dagger_list[0].includes(current_wep)) {
        let index = dagger_list[0].indexOf(current_wep);
        wep_type = 'dagger';
        current_minDamage = dagger_list[2][index];
        current_maxDamage = dagger_list[3][index];
        current_crit_power = dagger_list[5][index];
        current_crit_chance = dagger_list[4][index];
        current_speed = dagger_list[6][index];
        default_dps = dagger_list[7][index];
    } else if (sword_list[0].includes(current_wep)) {
        let index = sword_list[0].indexOf(current_wep);
        wep_type = 'sword';
        current_minDamage = sword_list[2][index];
        current_maxDamage = sword_list[3][index];
        current_crit_power = sword_list[5][index];
        current_crit_chance = sword_list[4][index];
        current_speed = sword_list[6][index];
        default_dps = sword_list[7][index];
    } else if (club_list[0].includes(current_wep)) {
        let index = club_list[0].indexOf(current_wep);
        wep_type = 'club';
        current_minDamage = club_list[2][index];
        current_maxDamage = club_list[3][index];
        current_crit_power = club_list[5][index];
        current_crit_chance = club_list[4][index];
        current_speed = club_list[6][index];
        default_dps = club_list[7][index];
    }

    current_minDamage = parseInt(current_minDamage);
    current_maxDamage = parseInt(current_maxDamage);
    current_crit_power = parseInt(current_crit_power);
    current_crit_chance = parseFloat(current_crit_chance);
    current_speed = parseInt(current_speed);

    var base_dmg_avg = (current_minDamage + current_maxDamage) / 2;
    var base_crit_damage_avg = ( (current_minDamage * (3 + (current_crit_power / 50))) + (current_maxDamage * (3 + (current_crit_power / 50))) ) / 2;

    // Call our dmg_bonus function to apply any changes from other sections to the base dmg
    dmg_bonus(current_minDamage, current_maxDamage);
    minDamage_round = Math.round((minDamage + Number.EPSILON) * 10) / 10;
    maxDamage_round = Math.round((maxDamage + Number.EPSILON) * 10) / 10;
    var new_dmg_avg = (minDamage + maxDamage) / 2;

    // Change the base dmg text in results section to the modified base damage from above
    var results_base_dmg = document.getElementsByClassName("stat_text")[0];
    results_base_dmg.innerText = "Base Dmg: " + minDamage_round + "-" + maxDamage_round;

    // Recalculate attack bar size for each new chosen weapon based on original bar size (5%)
    var attack_bar = document.getElementsByClassName("stat_bar")[0];
    var bar_width = 5;
    var attack_bar_increase = bar_width * (new_dmg_avg / base_dmg_avg);
    attack_bar.style.setProperty('width', attack_bar_increase + '%');

    // Call our chd_bonus function to apply any changes from other sections to the critical power
    chd_bonus(minDamage, maxDamage, current_crit_power);
    chd_min_round = Math.round((chd_min + Number.EPSILON) * 10) / 10;
    chd_max_round = Math.round((chd_max + Number.EPSILON) * 10) / 10;
    var new_crit_damage_avg = (chd_min + chd_max) / 2;

    // Change the crit dmg text in results section to the modified crit damage if any
    var results_crit_dmg = document.getElementsByClassName("stat_text")[1];
    results_crit_dmg.innerText = "Crit. Dmg: " + chd_min_round + "-" + chd_max_round;
    
    // Recalculate crit dmg bar size
    var critdmg_bar = document.getElementsByClassName("stat_bar")[1];
    var critdmg_bar_increase = bar_width * (new_crit_damage_avg / base_crit_damage_avg);
    critdmg_bar.style.setProperty('width', critdmg_bar_increase + '%');

    // Call our chc_bonus function to apply any changes to crit chance
    chc_bonus(wep_type, current_crit_chance);
    
    // Recalculate crit chance bar size 
    var critchance_bar = document.getElementsByClassName("stat_bar")[2];
    var critchance_bar_increase = bar_width * (chc / current_crit_chance);
    critchance_bar.style.setProperty('width', critchance_bar_increase + '%');

    // Change crit chance text in results section to the modified crit chance if any
    chc_round = Math.round((chc * 100 + Number.EPSILON) * 10) / 10;
    var results_crit_chance = document.getElementsByClassName("stat_text")[2];
    results_crit_chance.innerText = "Crit. Chance: " + chc_round + "%";

    // Call our attack_speed function to apply any changes to speed
    attack_speed(wep_type, current_speed);

    // Recalculate speed bar size based off of how far it currently is from the speed cap.
    var speed_bar = document.getElementsByClassName("stat_bar_speed")[0];
    if (wep_type == 'dagger') {
        var speed_bar_increase = action_per_second / (1000/125) * 100;
        speed_bar.style.setProperty('width', speed_bar_increase + '%');
    } else if (wep_type == 'sword' || wep_type == 'club') {
        var speed_bar_increase = action_per_second / (1000/240) * 100;
        speed_bar.style.setProperty('width', speed_bar_increase + '%');
    }

    // Change speed text in results section to match any changes
    action_per_second_round = Math.round((action_per_second + Number.EPSILON) * 10) / 10;
    var results_speed = document.getElementsByClassName("stat_text")[3];
    results_speed.innerText = "Speed: " + action_per_second_round + " actions/s";

    // Dps section
    dps_calc();
    var dps_bar = document.getElementsByClassName("stat_bar")[3];
    var dps_bar_increase = bar_width * (damage_per_second / default_dps);
    dps_bar.style.setProperty('width', dps_bar_increase + '%');

    damage_per_second = Math.round((damage_per_second + Number.EPSILON) * 10) / 10;
    var results_dps = document.getElementsByClassName("stat_text")[4];
    results_dps.innerText = "Dps (Dmg/s): " + damage_per_second;
}

function changeGemdrop2(elem) {
    var dropdown = elem.closest(".gemdropdown2");
    var btn = dropdown.querySelector(".gembtn");
    var img = elem.firstElementChild.firstElementChild.src;

    if (elem.innerText.includes("Ruby") && !btn.style.backgroundImage.includes("Ruby")) {
        ruby_level += 1;
    } else if (!elem.innerText.includes("Ruby") && btn.style.backgroundImage.includes("Ruby")){
        ruby_level -= 1;
    }

    if (elem.innerText.includes("Jade") && !btn.style.backgroundImage.includes("Jade")) {
        jade_level += 1;
    } else if (!elem.innerText.includes("Jade") && btn.style.backgroundImage.includes("Jade")){
        jade_level -= 1;
    }

    if (elem.innerText.includes("Aqua") && !btn.style.backgroundImage.includes("Aqua")) {
        aqua_level += 1;
    } else if (!elem.innerText.includes("Aqua") && btn.style.backgroundImage.includes("Aqua")){
        aqua_level -= 1;
    }

    if (elem.innerText.includes("Emerald") && !btn.style.backgroundImage.includes("Emerald")) {
        emerald_level += 1;
    } else if (!elem.innerText.includes("Emerald") && btn.style.backgroundImage.includes("Emerald")){
        emerald_level -= 1;
    }

    btn.style.backgroundImage = "url("+img+")";

    let current_wep = document.querySelector(".dropbtn").innerText;
    let wep_type = '';
    let current_minDamage = 0;
    let current_maxDamage = 0;
    let current_crit_power = 0;
    let current_crit_chance = 0;
    let current_speed = 0;
    let default_dps = 0;

    if (dagger_list[0].includes(current_wep)) {
        let index = dagger_list[0].indexOf(current_wep);
        wep_type = 'dagger';
        current_minDamage = dagger_list[2][index];
        current_maxDamage = dagger_list[3][index];
        current_crit_power = dagger_list[5][index];
        current_crit_chance = dagger_list[4][index];
        current_speed = dagger_list[6][index];
        default_dps = dagger_list[7][index];
    } else if (sword_list[0].includes(current_wep)) {
        let index = sword_list[0].indexOf(current_wep);
        wep_type = 'sword';
        current_minDamage = sword_list[2][index];
        current_maxDamage = sword_list[3][index];
        current_crit_power = sword_list[5][index];
        current_crit_chance = sword_list[4][index];
        current_speed = sword_list[6][index];
        default_dps = sword_list[7][index];
    } else if (club_list[0].includes(current_wep)) {
        let index = club_list[0].indexOf(current_wep);
        wep_type = 'club';
        current_minDamage = club_list[2][index];
        current_maxDamage = club_list[3][index];
        current_crit_power = club_list[5][index];
        current_crit_chance = club_list[4][index];
        current_speed = club_list[6][index];
        default_dps = club_list[7][index];
    }

    current_minDamage = parseInt(current_minDamage);
    current_maxDamage = parseInt(current_maxDamage);
    current_crit_power = parseInt(current_crit_power);
    current_crit_chance = parseFloat(current_crit_chance);
    current_speed = parseInt(current_speed);

    var base_dmg_avg = (current_minDamage + current_maxDamage) / 2;
    var base_crit_damage_avg = ( (current_minDamage * (3 + (current_crit_power / 50))) + (current_maxDamage * (3 + (current_crit_power / 50))) ) / 2;

    // Base Damage section
    dmg_bonus(current_minDamage, current_maxDamage);
    minDamage_round = Math.round((minDamage + Number.EPSILON) * 10) / 10;
    maxDamage_round = Math.round((maxDamage + Number.EPSILON) * 10) / 10;
    var new_dmg_avg = (minDamage + maxDamage) / 2;

    var results_base_dmg = document.getElementsByClassName("stat_text")[0];
    results_base_dmg.innerText = "Base Dmg: " + minDamage_round + "-" + maxDamage_round;

    var attack_bar = document.getElementsByClassName("stat_bar")[0];
    var bar_width = 5;
    var attack_bar_increase = bar_width * (new_dmg_avg / base_dmg_avg);
    attack_bar.style.setProperty('width', attack_bar_increase + '%');

    // Crit Damage section
    chd_bonus(minDamage, maxDamage, current_crit_power);
    chd_min_round = Math.round((chd_min + Number.EPSILON) * 10) / 10;
    chd_max_round = Math.round((chd_max + Number.EPSILON) * 10) / 10;
    var new_crit_damage_avg = (chd_min + chd_max) / 2;

    var results_crit_dmg = document.getElementsByClassName("stat_text")[1];
    results_crit_dmg.innerText = "Crit. Dmg: " + chd_min_round + "-" + chd_max_round;

    var critdmg_bar = document.getElementsByClassName("stat_bar")[1];
    var critdmg_bar_increase = bar_width * (new_crit_damage_avg / base_crit_damage_avg);
    critdmg_bar.style.setProperty('width', critdmg_bar_increase + '%');

    // Crit Chance section
    chc_bonus(wep_type, current_crit_chance);
    var critchance_bar = document.getElementsByClassName("stat_bar")[2];
    var critchance_bar_increase = bar_width * (chc / current_crit_chance);
    critchance_bar.style.setProperty('width', critchance_bar_increase + '%');

    chc_round = Math.round((chc * 100 + Number.EPSILON) * 10) / 10;
    var results_crit_chance = document.getElementsByClassName("stat_text")[2];
    results_crit_chance.innerText = "Crit. Chance: " + chc_round + "%";

    // Attack speed section
    attack_speed(wep_type, current_speed);
    var speed_bar = document.getElementsByClassName("stat_bar_speed")[0];
    if (wep_type == 'dagger') {
        var speed_bar_increase = action_per_second / (1000/125) * 100;
        speed_bar.style.setProperty('width', speed_bar_increase + '%');
    } else if (wep_type == 'sword' || wep_type == 'club') {
        var speed_bar_increase = action_per_second / (1000/240) * 100;
        speed_bar.style.setProperty('width', speed_bar_increase + '%');
    }

    action_per_second_round = Math.round((action_per_second + Number.EPSILON) * 10) / 10;
    var results_speed = document.getElementsByClassName("stat_text")[3];
    results_speed.innerText = "Speed: " + action_per_second_round + " actions/s";

    // Dps section
    dps_calc();
    var dps_bar = document.getElementsByClassName("stat_bar")[3];
    var dps_bar_increase = bar_width * (damage_per_second / default_dps);
    dps_bar.style.setProperty('width', dps_bar_increase + '%');

    damage_per_second = Math.round((damage_per_second + Number.EPSILON) * 10) / 10;
    var results_dps = document.getElementsByClassName("stat_text")[4];
    results_dps.innerText = "Dps (Dmg/s): " + damage_per_second;
}

function changeGemdrop3(elem) {
    var dropdown = elem.closest(".gemdropdown3");
    var btn = dropdown.querySelector(".gembtn");
    var img = elem.firstElementChild.firstElementChild.src;

    if (elem.innerText.includes("Ruby") && !btn.style.backgroundImage.includes("Ruby")) {
        ruby_level += 1;
    } else if (!elem.innerText.includes("Ruby") && btn.style.backgroundImage.includes("Ruby")){
        ruby_level -= 1;
    }

    if (elem.innerText.includes("Jade") && !btn.style.backgroundImage.includes("Jade")) {
        jade_level += 1;
    } else if (!elem.innerText.includes("Jade") && btn.style.backgroundImage.includes("Jade")){
        jade_level -= 1;
    }

    if (elem.innerText.includes("Aqua") && !btn.style.backgroundImage.includes("Aqua")) {
        aqua_level += 1;
    } else if (!elem.innerText.includes("Aqua") && btn.style.backgroundImage.includes("Aqua")){
        aqua_level -= 1;
    }

    if (elem.innerText.includes("Emerald") && !btn.style.backgroundImage.includes("Emerald")) {
        emerald_level += 1;
    } else if (!elem.innerText.includes("Emerald") && btn.style.backgroundImage.includes("Emerald")){
        emerald_level -= 1;
    }

    btn.style.backgroundImage = "url("+img+")";

    let current_wep = document.querySelector(".dropbtn").innerText;
    let wep_type = '';
    let current_minDamage = 0;
    let current_maxDamage = 0;
    let current_crit_power = 0;
    let current_crit_chance = 0;
    let current_speed = 0;
    let default_dps = 0;

    if (dagger_list[0].includes(current_wep)) {
        let index = dagger_list[0].indexOf(current_wep);
        wep_type = 'dagger';
        current_minDamage = dagger_list[2][index];
        current_maxDamage = dagger_list[3][index];
        current_crit_power = dagger_list[5][index];
        current_crit_chance = dagger_list[4][index];
        current_speed = dagger_list[6][index];
        default_dps = dagger_list[7][index];
    } else if (sword_list[0].includes(current_wep)) {
        let index = sword_list[0].indexOf(current_wep);
        wep_type = 'sword';
        current_minDamage = sword_list[2][index];
        current_maxDamage = sword_list[3][index];
        current_crit_power = sword_list[5][index];
        current_crit_chance = sword_list[4][index];
        current_speed = sword_list[6][index];
        default_dps = sword_list[7][index];
    } else if (club_list[0].includes(current_wep)) {
        let index = club_list[0].indexOf(current_wep);
        wep_type = 'club';
        current_minDamage = club_list[2][index];
        current_maxDamage = club_list[3][index];
        current_crit_power = club_list[5][index];
        current_crit_chance = club_list[4][index];
        current_speed = club_list[6][index];
        default_dps = club_list[7][index];
    }

    current_minDamage = parseInt(current_minDamage);
    current_maxDamage = parseInt(current_maxDamage);
    current_crit_power = parseInt(current_crit_power);
    current_crit_chance = parseFloat(current_crit_chance);
    current_speed = parseInt(current_speed);

    var base_dmg_avg = (current_minDamage + current_maxDamage) / 2;
    var base_crit_damage_avg = ( (current_minDamage * (3 + (current_crit_power / 50))) + (current_maxDamage * (3 + (current_crit_power / 50))) ) / 2;

    // Base Damage section
    dmg_bonus(current_minDamage, current_maxDamage);
    minDamage_round = Math.round((minDamage + Number.EPSILON) * 10) / 10;
    maxDamage_round = Math.round((maxDamage + Number.EPSILON) * 10) / 10;
    var new_dmg_avg = (minDamage + maxDamage) / 2;

    var results_base_dmg = document.getElementsByClassName("stat_text")[0];
    results_base_dmg.innerText = "Base Dmg: " + minDamage_round + "-" + maxDamage_round;

    var attack_bar = document.getElementsByClassName("stat_bar")[0];
    var bar_width = 5;
    var attack_bar_increase = bar_width * (new_dmg_avg / base_dmg_avg);
    attack_bar.style.setProperty('width', attack_bar_increase + '%');

    // Crit Damage section
    chd_bonus(minDamage, maxDamage, current_crit_power);
    chd_min_round = Math.round((chd_min + Number.EPSILON) * 10) / 10;
    chd_max_round = Math.round((chd_max + Number.EPSILON) * 10) / 10;
    var new_crit_damage_avg = (chd_min + chd_max) / 2;

    var results_crit_dmg = document.getElementsByClassName("stat_text")[1];
    results_crit_dmg.innerText = "Crit. Dmg: " + chd_min_round + "-" + chd_max_round;

    var critdmg_bar = document.getElementsByClassName("stat_bar")[1];
    var critdmg_bar_increase = bar_width * (new_crit_damage_avg / base_crit_damage_avg);
    critdmg_bar.style.setProperty('width', critdmg_bar_increase + '%');

    // Crit Chance section
    chc_bonus(wep_type, current_crit_chance);
    var critchance_bar = document.getElementsByClassName("stat_bar")[2];
    var critchance_bar_increase = bar_width * (chc / current_crit_chance);
    critchance_bar.style.setProperty('width', critchance_bar_increase + '%');

    chc_round = Math.round((chc * 100 + Number.EPSILON) * 10) / 10;
    var results_crit_chance = document.getElementsByClassName("stat_text")[2];
    results_crit_chance.innerText = "Crit. Chance: " + chc_round + "%";

    // Attack speed section
    attack_speed(wep_type, current_speed);
    var speed_bar = document.getElementsByClassName("stat_bar_speed")[0];
    if (wep_type == 'dagger') {
        var speed_bar_increase = action_per_second / (1000/125) * 100;
        speed_bar.style.setProperty('width', speed_bar_increase + '%');
    } else if (wep_type == 'sword' || wep_type == 'club') {
        var speed_bar_increase = action_per_second / (1000/240) * 100;
        speed_bar.style.setProperty('width', speed_bar_increase + '%');
    }

    action_per_second_round = Math.round((action_per_second + Number.EPSILON) * 10) / 10;
    var results_speed = document.getElementsByClassName("stat_text")[3];
    results_speed.innerText = "Speed: " + action_per_second_round + " actions/s";

    // Dps section
    dps_calc();
    var dps_bar = document.getElementsByClassName("stat_bar")[3];
    var dps_bar_increase = bar_width * (damage_per_second / default_dps);
    dps_bar.style.setProperty('width', dps_bar_increase + '%');

    damage_per_second = Math.round((damage_per_second + Number.EPSILON) * 10) / 10;
    var results_dps = document.getElementsByClassName("stat_text")[4];
    results_dps.innerText = "Dps (Dmg/s): " + damage_per_second;
}


/* 
ID values of DOM elements must be UNIQUE within a single document.
Thus, we can ONLY call getElementById using 'document.getElementById'. 
*/

/*
if (document.getElementById("myGems1").previousElementSibling.style.backgroundImage == "url(../images/Emerald.png)") {
    $gem_list["Emerald"] = "Speed: +3";
}
Changes to PHP array values in Javascript will only reflect if used within Javascript.
The PHP array within our HTML page will not change, they are separate so 
when we call our array in a PHP loop, the original values are still shown
*/


// add event on click gembtn dropdown to change Emerald into +3 speed boost if a single emerald has already been chosen
window.addEventListener("click", function(event) {
    if (event.target.matches('.gembtn')) {
        let i;
        let counter = 0;
        for (i = 1; i < 4; i++) {
            let gem_choice = document.getElementById("myGems"+i.toString()).previousElementSibling;
            let style = window.getComputedStyle(gem_choice, false);
            let bi = style.backgroundImage;

            if (bi.includes("Emerald")) {
                counter++;
            }
        }
        // counter will tell us how many emeralds have been chosen thus far.
        
        let current_style = window.getComputedStyle(event.target, false);
        let current_bi = current_style.backgroundImage;
        let current_id = event.target.nextElementSibling.getAttribute("id");
        let xpath_gem = '//div[@id="' + current_id + '"]//p[contains(text(), "Emerald")]/parent::*/following-sibling::*/child::*';
        let matchingElement = document.evaluate(xpath_gem, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!current_bi.includes("Emerald") && counter == 1) {
            matchingElement.innerText = "Speed: +3";
        } else if (current_bi.includes("Emerald") && counter == 2) {
            matchingElement.innerText = "Speed: +3";
        } else {
            matchingElement.innerText = "Speed: + 2";
        }
      }
});






