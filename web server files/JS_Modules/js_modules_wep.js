/* When the user clicks on the Main Dropdown button,
toggle between hiding and showing the dropdown content */
function showMainDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}
  
// Close the dropdown menus if the user clicks outside of it
window.addEventListener("click", function(event) {
  if (!event.target.matches('.dropbtn, .dropbtn_2')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
});


/* 
1. Change main dropdown name to whatever weapon the user clicks
2. Store variables for the damage range so we can use it in the final DPS calculation
3. Change Base Dmg text in Results section to correspond to the chosen weapon
4. Change stat bar size based on user selected boosts
*/
function changeDropdownName(elem) {
  // Change the dropdownbtn text to the weapon of choice
  var dropdown = elem.closest(".dropdown");
  var btn = dropdown.querySelector(".dropbtn");
  btn.innerText = elem.querySelector(".dropdown-content_text1").innerText;

  // If a Galaxy or Infinity weapon is selected, we need to clear the innate enchantments section.
  let innatebtn = document.querySelector(".innatebtn");
  innatebtn.classList.remove("disable_click");
  innatebtn.classList.remove("opacity");
  if (btn.innerText.includes("Galaxy") || btn.innerText.includes("Infinity")) {
    innate_attack = 0;
    innate_crit_power = 0;
    innate_crit_chance = 0;
    innate_speed = 0;

    innatebtn.innerText = 'No Enchantment';
    innatebtn.classList.add("disable_click");
    innatebtn.classList.add("opacity");
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


// Declare Global Variables that will be used in multiple functions below
let x = document.getElementById("daggerBtn");
let y = document.getElementById("swordBtn");
let z = document.getElementById("clubBtn");
// Only need the first class so index = [0]
let a = document.getElementsByClassName("dropdown-content_dagger")[0]; 
let b = document.getElementsByClassName("dropdown-content_sword")[0];
let c = document.getElementsByClassName("dropdown-content_club")[0];

/* Highlight and SHOW Sub Dropdown Weapon Type for the current
weapon type displayed EVERY time we click the MAIN dropdown. */
function highlightMain() {
  let weapon = document.querySelector(".dropbtn").innerText;
  if (dagger_list[0].includes(weapon)) {
    if (!x.classList.contains('focus')) {
      x.classList.toggle('focus');
      y.classList.remove('focus');
      z.classList.remove('focus');
    }
    if (!a.classList.contains('show')) {
      a.classList.toggle('show');
      b.classList.remove('show');
      c.classList.remove('show');
    }
  } else if (sword_list[0].includes(weapon)) {
    if (!y.classList.contains('focus')) {
      y.classList.toggle('focus');
      x.classList.remove('focus');
      z.classList.remove('focus');
    }
    if (!b.classList.contains('show')) {
      b.classList.toggle('show');
      a.classList.remove('show');
      c.classList.remove('show');
    }
  } else if (club_list[0].includes(weapon)) {
    if (!z.classList.contains('focus')) {
      z.classList.toggle('focus');
      y.classList.remove('focus');
      x.classList.remove('focus');
    }
    if (!c.classList.contains('show')) {
      c.classList.toggle('show');
      b.classList.remove('show');
      a.classList.remove('show');
    }
  }
}

/* Change Sub Dropdown highlight to whatever is clicked,
and show Sub Dropdown contents at the same time. */
document.getElementById('daggerBtn').addEventListener("click", highlightDagger);
function highlightDagger() {
  if (!x.classList.contains('focus')) {
    x.classList.toggle('focus');
    y.classList.remove('focus');
    z.classList.remove('focus');
  }
  if (!a.classList.contains('show')) {
    a.classList.toggle('show');
    b.classList.remove('show');
    c.classList.remove('show');
  }
}

document.getElementById('swordBtn').addEventListener("click", highlightSword);
function highlightSword() {
  if (!y.classList.contains('focus')) {
    y.classList.toggle('focus');
    x.classList.remove('focus');
    z.classList.remove('focus');
  }
  if (!b.classList.contains('show')) {
    b.classList.toggle('show');
    a.classList.remove('show');
    c.classList.remove('show');
  }
}

document.getElementById('clubBtn').addEventListener("click", highlightClub);
function highlightClub() {
  if (!z.classList.contains('focus')) {
    z.classList.toggle('focus');
    y.classList.remove('focus');
    x.classList.remove('focus');
  }
  if (!c.classList.contains('show')) {
    c.classList.toggle('show');
    b.classList.remove('show');
    a.classList.remove('show');
  }
}



/*
if (document.querySelector(".dropbtn").innerText.includes("Rusty Sword")) {
  alert("Yes it does");
} else {
  alert("nope");
}
*/

