// Create Global innate_list array
const innate_list = {
  "Attack": ["+1", "+2", "+3", "+4", "+5"], 
  "Crit. Power": ["+25", "+50", "+75"], 
  "Crit. Chance": ["+1", "+2", "+3"], 
  "Speed": ["+1", "+2", "+3", "+4"]
};


// Add function to show the innate enchantment dropdown menu upon click
function showInnateDropdown() {
    let wep_name = document.querySelector(".dropbtn").innerText;
    if (!wep_name.includes("Galaxy") && !wep_name.includes("Infinity")) {
        document.getElementById("myinnate").classList.toggle("show");
    }
}

// Add event to close the innate dropdown menu if user clicks off of it
window.addEventListener("click", function(event) {
    if (!event.target.matches('.innatebtn')) {
        var dropdowns = document.getElementsByClassName("innate-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
});

// Add event to change dropdown name into what is chosen
function changeInnatedrop(elem) {
    var dropdown = elem.closest(".innatedropdown");
    var btn = dropdown.querySelector(".innatebtn");

    // Since we are only allowed one innate selection. They should be reset each time we choose.
    // Otherwise, innate selections will start to stack.
    innate_attack = 0;
    innate_crit_power = 0;
    innate_crit_chance = 0;
    innate_speed = 0;
    
    if (elem.getAttribute("class") == "innate-content_div1") {
        btn.innerText = elem.innerText;
    } else {
        // Somehow innatetext1 is appearing AFTER innatetext2. Probably to do with appendChild 
        var innate_type = elem.parentNode.nextSibling.innerText; 
        btn.innerText = innate_type + ": " + elem.innerText;

        // Assign innate values to our innate global variables for results section
        if (innate_type == 'Attack') {
          innate_attack = parseInt(elem.innerText);
        } else if (innate_type == 'Crit. Power') {
          innate_crit_power = parseInt(elem.innerText);
        } else if (innate_type == 'Crit. Chance') {
          innate_crit_chance = parseInt(elem.innerText);
        } else {
          innate_speed = parseInt(elem.innerText);
        }
    }

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
};


// Add functions to loop DOM and create elements based on innate_list values
function addContentInnateAttack () {
  const innateContentDiv2 = document.getElementById("attack");
  const innatetext1 = document.createElement('div');
  innatetext1.className = "innatetext1";

  const p1 = document.createElement('p');
  p1.innerText = Object.keys(innate_list)[0];

  const innatetext2 = document.createElement('div');
  innatetext2.className = "innatetext2";

  for (let i = 0; i < innate_list["Attack"].length; i++) {
    const div1 = document.createElement('div');
    div1.onclick = function() {
      changeInnatedrop(this);
    }
    const p2 = document.createElement('p');
    p2.innerText = innate_list["Attack"][i];

    div1.appendChild(p2);
    innatetext2.appendChild(div1);
  } 

  innatetext1.appendChild(p1);
  innateContentDiv2.appendChild(innatetext2);
  innateContentDiv2.appendChild(innatetext1);
}

function addContentInnateCritPower () {
  const innateContentDiv2 = document.getElementById("critPower");
  const innatetext1 = document.createElement('div');
  innatetext1.className = "innatetext1";

  const p1 = document.createElement('p');
  p1.innerText = Object.keys(innate_list)[1];

  const innatetext2 = document.createElement('div');
  innatetext2.className = "innatetext2";

  for (let i = 0; i < innate_list["Crit. Power"].length; i++) {
    const div1 = document.createElement('div');
    div1.onclick = function() {
      changeInnatedrop(this);
    }
    const p2 = document.createElement('p');
    p2.innerText = innate_list["Crit. Power"][i];

    div1.appendChild(p2);
    innatetext2.appendChild(div1);
  }

  innatetext1.appendChild(p1);
  innateContentDiv2.appendChild(innatetext2);
  innateContentDiv2.appendChild(innatetext1);
}

function addContentInnateCritChance () {
  const innateContentDiv2 = document.getElementById("critChance");
  const innatetext1 = document.createElement('div');
  innatetext1.className = "innatetext1";

  const p1 = document.createElement('p');
  p1.innerText = Object.keys(innate_list)[2];

  const innatetext2 = document.createElement('div');
  innatetext2.className = "innatetext2";

  for (let i = 0; i < innate_list["Crit. Chance"].length; i++) {
    const div1 = document.createElement('div');
    div1.onclick = function() {
      changeInnatedrop(this);
    }
    const p2 = document.createElement('p');
    p2.innerText = innate_list["Crit. Chance"][i];

    div1.appendChild(p2);
    innatetext2.appendChild(div1);
  }

  innatetext1.appendChild(p1);
  innateContentDiv2.appendChild(innatetext2);
  innateContentDiv2.appendChild(innatetext1);
}

function addContentInnateSpeed () {
  const innateContentDiv2 = document.getElementById("speed");
  const innatetext1 = document.createElement('div');
  innatetext1.className = "innatetext1";

  const p1 = document.createElement('p');
  p1.innerText = Object.keys(innate_list)[3];

  const innatetext2 = document.createElement('div');
  innatetext2.className = "innatetext2";

  for (let i = 0; i < innate_list["Speed"].length; i++) {
    const div1 = document.createElement('div');
    div1.onclick = function() {
      changeInnatedrop(this);
    }
    const p2 = document.createElement('p');
    p2.innerText = innate_list["Speed"][i];

    div1.appendChild(p2);
    innatetext2.appendChild(div1);
  }

  innatetext1.appendChild(p1);
  innateContentDiv2.appendChild(innatetext2);
  innateContentDiv2.appendChild(innatetext1);
}

// Call the addContent functions after document has loaded
if (document.readyState !== 'loading') {
  addContentInnateAttack();
  addContentInnateCritPower();
  addContentInnateCritChance();
  addContentInnateSpeed();
} else {
  document.addEventListener("DOMContentLoaded", function() {
    addContentInnateAttack();
    addContentInnateCritPower();
    addContentInnateCritChance();
    addContentInnateSpeed();
  })
};
