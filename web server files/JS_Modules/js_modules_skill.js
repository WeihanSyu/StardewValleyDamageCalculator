function showskilldrop1() {
    document.getElementById("skill1").classList.toggle("show");
}

/* 
Add function to show skillbtn2 hidden dropdown. Of course we can only show this
if skillbtn1 has already been picked 
*/
function showskilldrop2() {
  let btn1 = document.querySelector(".skillbtn1");
  if (btn1.innerText == '') {
    document.getElementById("skill2").classList.toggle("show");
  }
}


// Add events to close the skillbtns when we click elsewhere
window.addEventListener("click", function(event) {
  if (!event.target.matches('.skillbtn1')) {
    var dropdown = document.getElementById("skill1");
    if (dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
  }
});

window.addEventListener("click", function(event) {
  if (!event.target.matches('.skillbtn2')) {
    var dropdown = document.getElementById("skill2");
    if (dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
    } 
});


function changeSkilldrop1(elem) {
    var btn = document.querySelector(".skillbtn1");
    btn.innerText = '';
    var img = elem.firstElementChild.firstElementChild.src;
    btn.style.backgroundImage = "url("+img+")";

    // At the same time that we select a Level 5 skill, 
    // we make the Level 10 skill available to click by adding a class to it.
    document.querySelector(".skillbtn2_empty").classList.add("skillbtn2");
    document.getElementById("skill2").classList.add("skill-content-height");

    // Only show Level 10 skills corresponding to the chosen Level 5 skill
    // If we had multiple Level 10 skills, then we would use getElementsByClassName
    var skill2 = document.getElementById("skill2");
    var skill2_div = skill2.querySelector(".skill-content_div");
    var skill2_img = skill2_div.firstElementChild.firstElementChild;
    var skill2_text1 = skill2_div.querySelector(".skilltext1").firstElementChild;
    var skill2_text2 = skill2_div.querySelector(".skilltext2").firstElementChild;
    var btn2 = document.querySelector(".skillbtn2");

    if (img.includes("Fighter") && !btn2.style.backgroundImage.includes("Brute")) {
      btn2.style.backgroundImage = 'None';
      btn2.innerText = 'Level 10';
      // Changing the level 5 skill deletes the level 10 skill if it corresponds to a different level 5 skill
      // So set the level 10 skill to zero
      desperado = 0;
    } else if (img.includes("Scout") && !btn2.style.backgroundImage.includes("Desperado")) {
      btn2.style.backgroundImage = 'None';
      btn2.innerText = 'Level 10';
      brute = 0;
    }

    if (img.includes("Fighter")) {
      skill2_img.src = "../images/skills/Brute.png";
      skill2_text1.innerText = 'Brute';
      skill2_text2.innerText = 'Deal 15% more damage';
    } else if (img.includes("Scout")) {
      skill2_img.src = "../images/skills/Desperado.png";
      skill2_text1.innerText = 'Desperado';
      skill2_text2.innerText = 'Critical strike damage increased by 50%';
    }
      
    // Modify global variables fighter and scout
    if (elem.innerText.includes("Fighter")) {
      fighter = 1;
      scout = 0;
    } else if (elem.innerText.includes("Scout")) {
      scout = 1;
      fighter = 0;
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

    // Attack speed section
    attack_speed(wep_type, current_speed);

    // Dps section
    dps_calc();
    var dps_bar = document.getElementsByClassName("stat_bar")[3];
    var dps_bar_increase = bar_width * (damage_per_second / default_dps);
    dps_bar.style.setProperty('width', dps_bar_increase + '%');

    damage_per_second = Math.round((damage_per_second + Number.EPSILON) * 10) / 10;
    var results_dps = document.getElementsByClassName("stat_text")[4];
    results_dps.innerText = "Dps (Dmg/s): " + damage_per_second;
}

function resetSkilldrop1() {
  var btn = document.querySelector(".skillbtn1");
  btn.style.backgroundImage = 'None';
  btn.innerText = 'Level 5';

  // If we reset the Level 5 skill, then we have to turn off the Level 10 skill as well
  var btn2 = document.querySelector(".skillbtn2_empty");
  btn2.style.backgroundImage = 'None';
  btn2.classList.remove("skillbtn2");
  btn2.innerText = 'Level 10';
  document.getElementById("skill2").classList.remove("skill-content-height");

  // If no skills are chosen, then set these global variables to zero
  fighter = 0;
  brute = 0;
  scout = 0;
  desperado = 0;

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

  // Dps section
  dps_calc();
  var dps_bar = document.getElementsByClassName("stat_bar")[3];
  var dps_bar_increase = bar_width * (damage_per_second / default_dps);
  dps_bar.style.setProperty('width', dps_bar_increase + '%');

  damage_per_second = Math.round((damage_per_second + Number.EPSILON) * 10) / 10;
  var results_dps = document.getElementsByClassName("stat_text")[4];
  results_dps.innerText = "Dps (Dmg/s): " + damage_per_second;
}

function changeSkilldrop2(elem) {
  var btn = document.querySelector(".skillbtn2");
  btn.innerText = '';
  var img = elem.firstElementChild.firstElementChild.src;
  btn.style.backgroundImage = "url("+img+")";

  // Modify global variables brute and desperado
  if (elem.innerText.includes("Brute")) {
    brute = 1;
    desperado = 0;
  } else if (elem.innerText.includes("Desperado")) {
    desperado = 1;
    brute = 0;
  } 

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

  // Dps section
  dps_calc();
  var dps_bar = document.getElementsByClassName("stat_bar")[3];
  var dps_bar_increase = bar_width * (damage_per_second / default_dps);
  dps_bar.style.setProperty('width', dps_bar_increase + '%');

  damage_per_second = Math.round((damage_per_second + Number.EPSILON) * 10) / 10;
  var results_dps = document.getElementsByClassName("stat_text")[4];
  results_dps.innerText = "Dps (Dmg/s): " + damage_per_second;
}

function resetSkilldrop2() {
  var btn = document.querySelector(".skillbtn2");
  btn.style.backgroundImage = 'None';
  btn.innerText = 'Level 10';

  brute = 0;
  desperado = 0;

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

  // Dps section
  dps_calc();
  var dps_bar = document.getElementsByClassName("stat_bar")[3];
  var dps_bar_increase = bar_width * (damage_per_second / default_dps);
  dps_bar.style.setProperty('width', dps_bar_increase + '%');

  damage_per_second = Math.round((damage_per_second + Number.EPSILON) * 10) / 10;
  var results_dps = document.getElementsByClassName("stat_text")[4];
  results_dps.innerText = "Dps (Dmg/s): " + damage_per_second;
}