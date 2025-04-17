// Declare global variables that we will re-use often
let ringdrop1 = document.querySelector(".ringdrop1");
let ringdrop2 = document.querySelector(".ringdrop2");
let ringdrop3 = document.querySelector(".ringdrop3");
let ringdrop4 = document.querySelector(".ringdrop4");

let ringbtn1 = ringdrop1.querySelector(".ringbtn");
let ringbtn2 = ringdrop2.querySelector(".ringbtn");
let ringbtn3 = ringdrop3.querySelector(".ringbtn");
let ringbtn4 = ringdrop4.querySelector(".ringbtn");

// Create Global ring_list object
const ring_list = {
    "Iridium Band": "Damage: +10%",
    "Ruby Ring": "Damage: +10%",
    "Aquamarine Ring": "Crit Chance: +10%",
    "Jade Ring": "Crit Damage: +10%",
    "Emerald Ring": "Speed: +10%",
    "Lucky Ring": "Luck: +1"
};

/* 
1. change display:none to display:block upon clicking the ring dropdown button 
2. Disable click events for the ring div of a duplicate ring in each hand.
*/
function showringdrop1() {
    var other_ring = getComputedStyle(ringbtn2).getPropertyValue('background-image');

    // Search through class ring-content_div and disable the div with the same background
    var ring_content_div = ringdrop1.getElementsByClassName("ring-content_div");
    for (i = 1; i < ring_content_div.length; i++) {
        // First, remove "disable_click" or else they will start stacking on multiple divs
        ring_content_div[i].classList.remove("disable_click");
        ring_content_div[i].classList.remove("opacity");

        var raw_text = (ring_content_div[i].firstElementChild.nextElementSibling.innerText).trim();
        var ring = (raw_text.split(" "))[0];
        if (other_ring.includes(ring)) {
            ring_content_div[i].classList.add("disable_click");
            ring_content_div[i].classList.add("opacity");
        }
    }

    document.getElementById("ring1").classList.toggle("show");
}

function showringdrop2() {
    var other_ring = getComputedStyle(ringbtn1).getPropertyValue('background-image');
    var ring_content_div = ringdrop2.getElementsByClassName("ring-content_div");
    for (i = 1; i < ring_content_div.length; i++) {
        ring_content_div[i].classList.remove("disable_click");
        ring_content_div[i].classList.remove("opacity");
        var raw_text = (ring_content_div[i].firstElementChild.nextElementSibling.innerText).trim();
        var ring = (raw_text.split(" "))[0];
        if (other_ring.includes(ring)) {
            ring_content_div[i].classList.add("disable_click");
            ring_content_div[i].classList.add("opacity");
        }
    }
    document.getElementById("ring2").classList.toggle("show");
}  

function showringdrop3() {
    var other_ring = getComputedStyle(ringbtn4).getPropertyValue('background-image');
    var ring_content_div = ringdrop3.getElementsByClassName("ring-content_div");
    for (i = 1; i < ring_content_div.length; i++) {
        ring_content_div[i].classList.remove("disable_click");
        ring_content_div[i].classList.remove("opacity");
        var raw_text = (ring_content_div[i].firstElementChild.nextElementSibling.innerText).trim();
        var ring = (raw_text.split(" "))[0];
        if (other_ring.includes(ring)) {
            ring_content_div[i].classList.add("disable_click");
            ring_content_div[i].classList.add("opacity");
        }
    }
    document.getElementById("ring3").classList.toggle("show");
}

function showringdrop4() {
    var other_ring = getComputedStyle(ringbtn3).getPropertyValue('background-image');
    var ring_content_div = ringdrop4.getElementsByClassName("ring-content_div");
    for (i = 1; i < ring_content_div.length; i++) {
        ring_content_div[i].classList.remove("disable_click");
        ring_content_div[i].classList.remove("opacity");
        var raw_text = (ring_content_div[i].firstElementChild.nextElementSibling.innerText).trim();
        var ring = (raw_text.split(" "))[0];
        if (other_ring.includes(ring)) {
            ring_content_div[i].classList.add("disable_click");
            ring_content_div[i].classList.add("opacity");
        }
    }
    document.getElementById("ring4").classList.toggle("show");
}


// Add event so if user clicks off the ring buttons, the gem dropdown menu will close.
window.addEventListener("click", function(event) {
    if (!event.target.matches('.ringbtn')) {
        var dropdowns = document.getElementsByClassName("ring-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
});


// Add event so that clicking the ring button itself will hide all other active ring dropdowns
document.getElementsByClassName("ringdrop1")[0].firstElementChild.addEventListener("click", removeRingdrop1);
function removeRingdrop1() {
    document.getElementById("ring2").classList.remove("show");
    document.getElementById("ring3").classList.remove("show");
    document.getElementById("ring4").classList.remove("show");
}

document.getElementsByClassName("ringdrop2")[0].firstElementChild.addEventListener("click", removeRingdrop2);
function removeRingdrop2() {
    document.getElementById("ring1").classList.remove("show");
    document.getElementById("ring3").classList.remove("show");
    document.getElementById("ring4").classList.remove("show");
}

document.getElementsByClassName("ringdrop3")[0].firstElementChild.addEventListener("click", removeRingdrop3);
function removeRingdrop3() {
    document.getElementById("ring1").classList.remove("show");
    document.getElementById("ring2").classList.remove("show");
    document.getElementById("ring4").classList.remove("show");
}

document.getElementsByClassName("ringdrop4")[0].firstElementChild.addEventListener("click", removeRingdrop4);
function removeRingdrop4() {
    document.getElementById("ring1").classList.remove("show");
    document.getElementById("ring2").classList.remove("show");
    document.getElementById("ring3").classList.remove("show");
}


// Add events to change the gem button to be the image of whatever gem is chosen from the dropdown


function changeRingdrop1(elem) {
    var img = elem.firstElementChild.firstElementChild.src;
    var btn = ringbtn1;

    // Increment or decrement the gem forging level for each gem based on what user clicks
    if ( (elem.innerText.includes("Ruby") || elem.innerText.includes("Iridium")) && 
        (!btn.style.backgroundImage.includes("Ruby") && !btn.style.backgroundImage.includes("Iridium")) ) {
        ruby_ring_amount += 1;
    } else if ( (!elem.innerText.includes("Ruby") && !elem.innerText.includes("Iridium")) && 
        (btn.style.backgroundImage.includes("Ruby") || btn.style.backgroundImage.includes("Iridium")) ) {
        ruby_ring_amount -= 1;
    }

    if (elem.innerText.includes("Jade") && !btn.style.backgroundImage.includes("Jade")) {
        jade_ring_amount += 1;
    } else if (!elem.innerText.includes("Jade") && btn.style.backgroundImage.includes("Jade")){
        jade_ring_amount -= 1;
    }

    if (elem.innerText.includes("Aqua") && !btn.style.backgroundImage.includes("Aqua")) {
        aqua_ring_amount += 1;
    } else if (!elem.innerText.includes("Aqua") && btn.style.backgroundImage.includes("Aqua")){
        aqua_ring_amount -= 1;
    }

    if (elem.innerText.includes("Emerald") && !btn.style.backgroundImage.includes("Emerald")) {
        emerald_ring_amount += 1;
    } else if (!elem.innerText.includes("Emerald") && btn.style.backgroundImage.includes("Emerald")){
        emerald_ring_amount -= 1;
    }

    ringbtn1.style.backgroundImage = "url("+img+")";

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
    var attack_bar_increase = Math.min((bar_width * (new_dmg_avg / base_dmg_avg)), 100);
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
    var critdmg_bar_increase = Math.min((bar_width * (new_crit_damage_avg / base_crit_damage_avg)),100);
    critdmg_bar.style.setProperty('width', critdmg_bar_increase + '%');

    // Call our chc_bonus function to apply any changes to crit chance
    chc_bonus(wep_type, current_crit_chance);
    
    // Recalculate crit chance bar size 
    var critchance_bar = document.getElementsByClassName("stat_bar")[2];
    var critchance_bar_increase = Math.min((bar_width * (chc / current_crit_chance)),100);
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
    var dps_bar_increase = Math.min((bar_width * (damage_per_second / default_dps)), 100);
    dps_bar.style.setProperty('width', dps_bar_increase + '%');

    damage_per_second = Math.round((damage_per_second + Number.EPSILON) * 10) / 10;
    var results_dps = document.getElementsByClassName("stat_text")[4];
    results_dps.innerText = "Dps (Dmg/s): " + damage_per_second;
}

function changeRingdrop2(elem) {
    var img = elem.firstElementChild.firstElementChild.src;
    var btn = ringbtn2;

    if ( (elem.innerText.includes("Ruby") || elem.innerText.includes("Iridium")) && 
        (!btn.style.backgroundImage.includes("Ruby") && !btn.style.backgroundImage.includes("Iridium")) ) {
        ruby_ring_amount += 1;
    } else if ( (!elem.innerText.includes("Ruby") && !elem.innerText.includes("Iridium")) && 
        (btn.style.backgroundImage.includes("Ruby") || btn.style.backgroundImage.includes("Iridium")) ) {
        ruby_ring_amount -= 1;
    }

    if (elem.innerText.includes("Jade") && !btn.style.backgroundImage.includes("Jade")) {
        jade_ring_amount += 1;
    } else if (!elem.innerText.includes("Jade") && btn.style.backgroundImage.includes("Jade")){
        jade_ring_amount -= 1;
    }

    if (elem.innerText.includes("Aqua") && !btn.style.backgroundImage.includes("Aqua")) {
        aqua_ring_amount += 1;
    } else if (!elem.innerText.includes("Aqua") && btn.style.backgroundImage.includes("Aqua")){
        aqua_ring_amount -= 1;
    }

    if (elem.innerText.includes("Emerald") && !btn.style.backgroundImage.includes("Emerald")) {
        emerald_ring_amount += 1;
    } else if (!elem.innerText.includes("Emerald") && btn.style.backgroundImage.includes("Emerald")){
        emerald_ring_amount -= 1;
    }

    ringbtn2.style.backgroundImage = "url("+img+")";

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
    var attack_bar_increase = Math.min((bar_width * (new_dmg_avg / base_dmg_avg)),100);
    attack_bar.style.setProperty('width', attack_bar_increase + '%');

    // Crit Damage section
    chd_bonus(minDamage, maxDamage, current_crit_power);
    chd_min_round = Math.round((chd_min + Number.EPSILON) * 10) / 10;
    chd_max_round = Math.round((chd_max + Number.EPSILON) * 10) / 10;
    var new_crit_damage_avg = (chd_min + chd_max) / 2;

    var results_crit_dmg = document.getElementsByClassName("stat_text")[1];
    results_crit_dmg.innerText = "Crit. Dmg: " + chd_min_round + "-" + chd_max_round;

    var critdmg_bar = document.getElementsByClassName("stat_bar")[1];
    var critdmg_bar_increase = Math.min((bar_width * (new_crit_damage_avg / base_crit_damage_avg)),100);
    critdmg_bar.style.setProperty('width', critdmg_bar_increase + '%');

    // Crit Chance section
    chc_bonus(wep_type, current_crit_chance);
    var critchance_bar = document.getElementsByClassName("stat_bar")[2];
    var critchance_bar_increase = Math.min((bar_width * (chc / current_crit_chance)),100);
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
    var dps_bar_increase = Math.min((bar_width * (damage_per_second / default_dps)), 100);
    dps_bar.style.setProperty('width', dps_bar_increase + '%');

    damage_per_second = Math.round((damage_per_second + Number.EPSILON) * 10) / 10;
    var results_dps = document.getElementsByClassName("stat_text")[4];
    results_dps.innerText = "Dps (Dmg/s): " + damage_per_second;
}

function changeRingdrop3(elem) {
    var img = elem.firstElementChild.firstElementChild.src;
    var btn = ringbtn3;

    if ( (elem.innerText.includes("Ruby") || elem.innerText.includes("Iridium")) && 
        (!btn.style.backgroundImage.includes("Ruby") && !btn.style.backgroundImage.includes("Iridium")) ) {
        ruby_ring_amount += 1;
    } else if ( (!elem.innerText.includes("Ruby") && !elem.innerText.includes("Iridium")) && 
        (btn.style.backgroundImage.includes("Ruby") || btn.style.backgroundImage.includes("Iridium")) ) {
        ruby_ring_amount -= 1;
    }

    if (elem.innerText.includes("Jade") && !btn.style.backgroundImage.includes("Jade")) {
        jade_ring_amount += 1;
    } else if (!elem.innerText.includes("Jade") && btn.style.backgroundImage.includes("Jade")){
        jade_ring_amount -= 1;
    }

    if (elem.innerText.includes("Aqua") && !btn.style.backgroundImage.includes("Aqua")) {
        aqua_ring_amount += 1;
    } else if (!elem.innerText.includes("Aqua") && btn.style.backgroundImage.includes("Aqua")){
        aqua_ring_amount -= 1;
    }

    if (elem.innerText.includes("Emerald") && !btn.style.backgroundImage.includes("Emerald")) {
        emerald_ring_amount += 1;
    } else if (!elem.innerText.includes("Emerald") && btn.style.backgroundImage.includes("Emerald")){
        emerald_ring_amount -= 1;
    }

    ringbtn3.style.backgroundImage = "url("+img+")";

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
    var attack_bar_increase = Math.min((bar_width * (new_dmg_avg / base_dmg_avg)),100);
    attack_bar.style.setProperty('width', attack_bar_increase + '%');

    // Crit Damage section
    chd_bonus(minDamage, maxDamage, current_crit_power);
    chd_min_round = Math.round((chd_min + Number.EPSILON) * 10) / 10;
    chd_max_round = Math.round((chd_max + Number.EPSILON) * 10) / 10;
    var new_crit_damage_avg = (chd_min + chd_max) / 2;

    var results_crit_dmg = document.getElementsByClassName("stat_text")[1];
    results_crit_dmg.innerText = "Crit. Dmg: " + chd_min_round + "-" + chd_max_round;

    var critdmg_bar = document.getElementsByClassName("stat_bar")[1];
    var critdmg_bar_increase = Math.min((bar_width * (new_crit_damage_avg / base_crit_damage_avg)),100);
    critdmg_bar.style.setProperty('width', critdmg_bar_increase + '%');

    // Crit Chance section
    chc_bonus(wep_type, current_crit_chance);
    var critchance_bar = document.getElementsByClassName("stat_bar")[2];
    var critchance_bar_increase = Math.min((bar_width * (chc / current_crit_chance)),100);
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
    var dps_bar_increase = Math.min((bar_width * (damage_per_second / default_dps)), 100);
    dps_bar.style.setProperty('width', dps_bar_increase + '%');

    damage_per_second = Math.round((damage_per_second + Number.EPSILON) * 10) / 10;
    var results_dps = document.getElementsByClassName("stat_text")[4];
    results_dps.innerText = "Dps (Dmg/s): " + damage_per_second;
}

function changeRingdrop4(elem) {
    var img = elem.firstElementChild.firstElementChild.src;
    var btn = ringbtn4;

    if ( (elem.innerText.includes("Ruby") || elem.innerText.includes("Iridium")) && 
        (!btn.style.backgroundImage.includes("Ruby") && !btn.style.backgroundImage.includes("Iridium")) ) {
        ruby_ring_amount += 1;
    } else if ( (!elem.innerText.includes("Ruby") && !elem.innerText.includes("Iridium")) && 
        (btn.style.backgroundImage.includes("Ruby") || btn.style.backgroundImage.includes("Iridium")) ) {
        ruby_ring_amount -= 1;
    }

    if (elem.innerText.includes("Jade") && !btn.style.backgroundImage.includes("Jade")) {
        jade_ring_amount += 1;
    } else if (!elem.innerText.includes("Jade") && btn.style.backgroundImage.includes("Jade")){
        jade_ring_amount -= 1;
    }

    if (elem.innerText.includes("Aqua") && !btn.style.backgroundImage.includes("Aqua")) {
        aqua_ring_amount += 1;
    } else if (!elem.innerText.includes("Aqua") && btn.style.backgroundImage.includes("Aqua")){
        aqua_ring_amount -= 1;
    }

    if (elem.innerText.includes("Emerald") && !btn.style.backgroundImage.includes("Emerald")) {
        emerald_ring_amount += 1;
    } else if (!elem.innerText.includes("Emerald") && btn.style.backgroundImage.includes("Emerald")){
        emerald_ring_amount -= 1;
    }

    ringbtn4.style.backgroundImage = "url("+img+")";

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
    var attack_bar_increase = Math.min((bar_width * (new_dmg_avg / base_dmg_avg)),100);
    attack_bar.style.setProperty('width', attack_bar_increase + '%');

    // Crit Damage section
    chd_bonus(minDamage, maxDamage, current_crit_power);
    chd_min_round = Math.round((chd_min + Number.EPSILON) * 10) / 10;
    chd_max_round = Math.round((chd_max + Number.EPSILON) * 10) / 10;
    var new_crit_damage_avg = (chd_min + chd_max) / 2;

    var results_crit_dmg = document.getElementsByClassName("stat_text")[1];
    results_crit_dmg.innerText = "Crit. Dmg: " + chd_min_round + "-" + chd_max_round;

    var critdmg_bar = document.getElementsByClassName("stat_bar")[1];
    var critdmg_bar_increase = Math.min((bar_width * (new_crit_damage_avg / base_crit_damage_avg)),100);
    critdmg_bar.style.setProperty('width', critdmg_bar_increase + '%');

    // Crit Chance section
    chc_bonus(wep_type, current_crit_chance);
    var critchance_bar = document.getElementsByClassName("stat_bar")[2];
    var critchance_bar_increase = Math.min((bar_width * (chc / current_crit_chance)),100);
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
    var dps_bar_increase = Math.min((bar_width * (damage_per_second / default_dps)), 100);
    dps_bar.style.setProperty('width', dps_bar_increase + '%');

    damage_per_second = Math.round((damage_per_second + Number.EPSILON) * 10) / 10;
    var results_dps = document.getElementsByClassName("stat_text")[4];
    results_dps.innerText = "Dps (Dmg/s): " + damage_per_second;
}



// Add functions to loop DOM and create elements based on gem_list values
function addContentRing1() {
    const ringContentDiv0 = document.getElementById("ring1").firstElementChild;
    for (let i = Object.keys(ring_list).length - 1; i >=0;  i--) {
        const ringContentDiv = document.createElement('div');
        ringContentDiv.className = "ring-content_div";
        ringContentDiv.onclick = function () {
            changeRingdrop1(this);
        }

        const ringpic = document.createElement('div');
        ringpic.className = "ringpic";

        const img = document.createElement('img');
        let ring_text = "../../images/rings/" + Object.keys(ring_list)[i] + ".png";
        img.src = ring_text;

        const ringtext1 = document.createElement('div');
        ringtext1.className = "ringtext1";

        const p1 = document.createElement('p');
        p1.innerText = Object.keys(ring_list)[i];

        const ringtext2 = document.createElement('div');
        ringtext2.className = "ringtext2";

        const p2 = document.createElement('p');
        p2.innerText = ring_list[Object.keys(ring_list)[i]];

        ringContentDiv.appendChild(ringpic);
        ringpic.appendChild(img);
        ringpic.insertAdjacentElement("afterend", ringtext1);
        ringtext1.appendChild(p1);
        ringtext1.insertAdjacentElement("afterend", ringtext2);
        ringtext2.appendChild(p2);
        
        ringContentDiv0.insertAdjacentElement("afterend", ringContentDiv);
    }
};

function addContentRing2() {
    const ringContentDiv0 = document.getElementById("ring2").firstElementChild;
    for (let i = Object.keys(ring_list).length - 1; i >=0;  i--) {
        const ringContentDiv = document.createElement('div');
        ringContentDiv.className = "ring-content_div";
        ringContentDiv.onclick = function () {
            changeRingdrop2(this);
        }
        const ringpic = document.createElement('div');
        ringpic.className = "ringpic";
        const img = document.createElement('img');
        let ring_text = "../../images/rings/" + Object.keys(ring_list)[i] + ".png";
        img.src = ring_text;
        const ringtext1 = document.createElement('div');
        ringtext1.className = "ringtext1";
        const p1 = document.createElement('p');
        p1.innerText = Object.keys(ring_list)[i];
        const ringtext2 = document.createElement('div');
        ringtext2.className = "ringtext2";
        const p2 = document.createElement('p');
        p2.innerText = ring_list[Object.keys(ring_list)[i]];
        ringContentDiv.appendChild(ringpic);
        ringpic.appendChild(img);
        ringpic.insertAdjacentElement("afterend", ringtext1);
        ringtext1.appendChild(p1);
        ringtext1.insertAdjacentElement("afterend", ringtext2);
        ringtext2.appendChild(p2);
        ringContentDiv0.insertAdjacentElement("afterend", ringContentDiv);
    }
};

function addContentRing3() {
    const ringContentDiv0 = document.getElementById("ring3").firstElementChild;
    for (let i = Object.keys(ring_list).length - 1; i >=0;  i--) {
        const ringContentDiv = document.createElement('div');
        ringContentDiv.className = "ring-content_div";
        ringContentDiv.onclick = function () {
            changeRingdrop3(this);
        }
        const ringpic = document.createElement('div');
        ringpic.className = "ringpic";
        const img = document.createElement('img');
        let ring_text = "../../images/rings/" + Object.keys(ring_list)[i] + ".png";
        img.src = ring_text;
        const ringtext1 = document.createElement('div');
        ringtext1.className = "ringtext1";
        const p1 = document.createElement('p');
        p1.innerText = Object.keys(ring_list)[i];
        const ringtext2 = document.createElement('div');
        ringtext2.className = "ringtext2";
        const p2 = document.createElement('p');
        p2.innerText = ring_list[Object.keys(ring_list)[i]];
        ringContentDiv.appendChild(ringpic);
        ringpic.appendChild(img);
        ringpic.insertAdjacentElement("afterend", ringtext1);
        ringtext1.appendChild(p1);
        ringtext1.insertAdjacentElement("afterend", ringtext2);
        ringtext2.appendChild(p2);
        ringContentDiv0.insertAdjacentElement("afterend", ringContentDiv);
    }
};

function addContentRing4() {
    const ringContentDiv0 = document.getElementById("ring4").firstElementChild;
    for (let i = Object.keys(ring_list).length - 1; i >=0;  i--) {
        const ringContentDiv = document.createElement('div');
        ringContentDiv.className = "ring-content_div";
        ringContentDiv.onclick = function () {
            changeRingdrop4(this);
        }
        const ringpic = document.createElement('div');
        ringpic.className = "ringpic";
        const img = document.createElement('img');
        let ring_text = "../../images/rings/" + Object.keys(ring_list)[i] + ".png";
        img.src = ring_text;
        const ringtext1 = document.createElement('div');
        ringtext1.className = "ringtext1";
        const p1 = document.createElement('p');
        p1.innerText = Object.keys(ring_list)[i];
        const ringtext2 = document.createElement('div');
        ringtext2.className = "ringtext2";
        const p2 = document.createElement('p');
        p2.innerText = ring_list[Object.keys(ring_list)[i]];
        ringContentDiv.appendChild(ringpic);
        ringpic.appendChild(img);
        ringpic.insertAdjacentElement("afterend", ringtext1);
        ringtext1.appendChild(p1);
        ringtext1.insertAdjacentElement("afterend", ringtext2);
        ringtext2.appendChild(p2);
        ringContentDiv0.insertAdjacentElement("afterend", ringContentDiv);
    }
};

// Call the addContent functions after document has loaded
if (document.readyState !== 'loading') {
    addContentRing1();
    addContentRing2();
    addContentRing3();
    addContentRing4();
} else {
    document.addEventListener("DOMContentLoaded", function() {
        addContentRing1();
        addContentRing2();
        addContentRing3();
        addContentRing4();
    })
};