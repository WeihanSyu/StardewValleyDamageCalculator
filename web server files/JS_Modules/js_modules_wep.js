// Place the JSON weapon info that we got from our SQL Server table into a JS object, then into array
const dagger_obj = JSON.parse('[{"name":"Infinity Dagger","type":1,"minDamage":50,"maxDamage":70,"critChance":0.0599999986588954900,"critPower":0,"speed":1},{"name":"Dragontooth Shiv","type":1,"minDamage":40,"maxDamage":50,"critChance":0.0500000007450580600,"critPower":100,"speed":0},{"name":"Dwarf Dagger","type":1,"minDamage":32,"maxDamage":38,"critChance":0.0299999993294477460,"critPower":0,"speed":1},{"name":"Galaxy Dagger","type":1,"minDamage":30,"maxDamage":40,"critChance":0.0199999995529651640,"critPower":0,"speed":1},{"name":"Elliott\'s Pencil","type":1,"minDamage":24,"maxDamage":30,"critChance":0.0599999986588954900,"critPower":0,"speed":0},{"name":"Abby\'s Planchette","type":1,"minDamage":24,"maxDamage":30,"critChance":0.0599999986588954900,"critPower":0,"speed":0},{"name":"Wicked Kris","type":1,"minDamage":24,"maxDamage":30,"critChance":0.0599999986588954900,"critPower":0,"speed":0},{"name":"Iridium Needle","type":1,"minDamage":20,"maxDamage":35,"critChance":0.1000000014901161200,"critPower":200,"speed":0},{"name":"Broken Trident","type":1,"minDamage":15,"maxDamage":26,"critChance":0.0199999995529651640,"critPower":0,"speed":0},{"name":"Shadow Dagger","type":1,"minDamage":10,"maxDamage":20,"critChance":0.0399999991059303300,"critPower":0,"speed":0},{"name":"Burglar\'s Shank","type":1,"minDamage":7,"maxDamage":12,"critChance":0.0399999991059303300,"critPower":25,"speed":0},{"name":"Crystal Dagger","type":1,"minDamage":4,"maxDamage":10,"critChance":0.0299999993294477460,"critPower":50,"speed":0},{"name":"Elf Blade","type":1,"minDamage":3,"maxDamage":5,"critChance":0.0399999991059303300,"critPower":0,"speed":0},{"name":"Iron Dirk","type":1,"minDamage":2,"maxDamage":4,"critChance":0.0299999993294477460,"critPower":0,"speed":0},{"name":"Wind Spire","type":1,"minDamage":1,"maxDamage":5,"critChance":0.0199999995529651640,"critPower":10,"speed":0},{"name":"Carving Knife","type":1,"minDamage":1,"maxDamage":3,"critChance":0.0399999991059303300,"critPower":0,"speed":0}]');
const sword_obj = JSON.parse('[{"name":"Infinity Blade","type":0,"minDamage":80,"maxDamage":100,"critChance":0.0199999995529651640,"critPower":0,"speed":4},{"name":"Dragontooth Cutlass","type":0,"minDamage":75,"maxDamage":90,"critChance":0.0199999995529651640,"critPower":50,"speed":0},{"name":"Dwarf Sword","type":0,"minDamage":65,"maxDamage":75,"critChance":0.0199999995529651640,"critPower":0,"speed":2},{"name":"Galaxy Sword","type":0,"minDamage":60,"maxDamage":80,"critChance":0.0199999995529651640,"critPower":0,"speed":4},{"name":"Lava Katana","type":0,"minDamage":55,"maxDamage":64,"critChance":0.0149999996647238730,"critPower":25,"speed":0},{"name":"Leah\'s Whittler","type":0,"minDamage":30,"maxDamage":45,"critChance":0.0199999995529651640,"critPower":10,"speed":-1},{"name":"Haley\'s Iron","type":0,"minDamage":30,"maxDamage":45,"critChance":0.0199999995529651640,"critPower":10,"speed":-1},{"name":"Obsidian Edge","type":0,"minDamage":30,"maxDamage":45,"critChance":0.0199999995529651640,"critPower":10,"speed":-1},{"name":"Dark Sword","type":0,"minDamage":30,"maxDamage":45,"critChance":0.0399999991059303300,"critPower":0,"speed":-5},{"name":"Steel Falchion","type":0,"minDamage":28,"maxDamage":46,"critChance":0.0199999995529651640,"critPower":20,"speed":4},{"name":"Tempered Broadsword","type":0,"minDamage":29,"maxDamage":44,"critChance":0.0199999995529651640,"critPower":0,"speed":-3},{"name":"Yeti Tooth","type":0,"minDamage":26,"maxDamage":42,"critChance":0.0199999995529651640,"critPower":10,"speed":0},{"name":"Ossified Blade","type":0,"minDamage":26,"maxDamage":42,"critChance":0.0199999995529651640,"critPower":0,"speed":-2},{"name":"Neptune\'s Glaive","type":3,"minDamage":18,"maxDamage":35,"critChance":0.0199999995529651640,"critPower":0,"speed":-1},{"name":"Claymore","type":3,"minDamage":20,"maxDamage":32,"critChance":0.0199999995529651640,"critPower":0,"speed":-4},{"name":"Templar\'s Blade","type":3,"minDamage":22,"maxDamage":29,"critChance":0.0000000000000000000,"critPower":0,"speed":0},{"name":"Bone Sword","type":0,"minDamage":20,"maxDamage":30,"critChance":0.0199999995529651640,"critPower":0,"speed":4},{"name":"Insect Head","type":0,"minDamage":20,"maxDamage":30,"critChance":0.0399999991059303300,"critPower":0,"speed":2},{"name":"Holy Blade","type":0,"minDamage":20,"maxDamage":27,"critChance":0.0199999995529651640,"critPower":0,"speed":4},{"name":"Rapier","type":0,"minDamage":15,"maxDamage":25,"critChance":0.0199999995529651640,"critPower":0,"speed":0},{"name":"Meowmere","type":0,"minDamage":20,"maxDamage":20,"critChance":0.0199999995529651640,"critPower":0,"speed":4},{"name":"Iridium Scythe","type":0,"minDamage":20,"maxDamage":20,"critChance":0.0199999995529651640,"critPower":0,"speed":0},{"name":"Iron Edge","type":3,"minDamage":12,"maxDamage":25,"critChance":0.0199999995529651640,"critPower":0,"speed":-2},{"name":"Forest Sword","type":0,"minDamage":8,"maxDamage":18,"critChance":0.0199999995529651640,"critPower":0,"speed":2},{"name":"Cutlass","type":0,"minDamage":9,"maxDamage":17,"critChance":0.0199999995529651640,"critPower":0,"speed":2},{"name":"Golden Scythe","type":0,"minDamage":13,"maxDamage":13,"critChance":0.0199999995529651640,"critPower":0,"speed":0},{"name":"Pirate\'s Sword","type":3,"minDamage":8,"maxDamage":14,"critChance":0.0199999995529651640,"critPower":0,"speed":2},{"name":"Silver Saber","type":0,"minDamage":8,"maxDamage":15,"critChance":0.0199999995529651640,"critPower":0,"speed":0},{"name":"Steel Smallsword","type":0,"minDamage":4,"maxDamage":8,"critChance":0.0199999995529651640,"critPower":0,"speed":2},{"name":"Wooden Blade","type":0,"minDamage":3,"maxDamage":7,"critChance":0.0199999995529651640,"critPower":0,"speed":0},{"name":"Rusty Sword","type":3,"minDamage":2,"maxDamage":5,"critChance":0.0199999995529651640,"critPower":0,"speed":0},{"name":"Scythe","type":0,"minDamage":1,"maxDamage":3,"critChance":0.0199999995529651640,"critPower":0,"speed":0}]');
const club_obj = JSON.parse('[{"name":"Infinity Gavel","type":2,"minDamage":100,"maxDamage":120,"critChance":0.0199999995529651640,"critPower":0,"speed":2},{"name":"Dragontooth Club","type":2,"minDamage":80,"maxDamage":100,"critChance":0.0199999995529651640,"critPower":50,"speed":0},{"name":"Dwarf Hammer","type":2,"minDamage":75,"maxDamage":85,"critChance":0.0199999995529651640,"critPower":0,"speed":0},{"name":"Galaxy Hammer","type":2,"minDamage":70,"maxDamage":90,"critChance":0.0199999995529651640,"critPower":0,"speed":2},{"name":"Sam\'s Old Guitar","type":2,"minDamage":40,"maxDamage":55,"critChance":0.0199999995529651640,"critPower":0,"speed":-2},{"name":"Alex\'s Bat","type":2,"minDamage":40,"maxDamage":55,"critChance":0.0199999995529651640,"critPower":0,"speed":-2},{"name":"The Slammer","type":2,"minDamage":40,"maxDamage":55,"critChance":0.0199999995529651640,"critPower":0,"speed":-2},{"name":"Maru\'s Wrench","type":2,"minDamage":40,"maxDamage":55,"critChance":0.0199999995529651640,"critPower":0,"speed":-2},{"name":"Harvey\'s Mallet","type":2,"minDamage":40,"maxDamage":55,"critChance":0.0199999995529651640,"critPower":0,"speed":-2},{"name":"Penny\'s Fryer","type":2,"minDamage":40,"maxDamage":55,"critChance":0.0199999995529651640,"critPower":0,"speed":-2},{"name":"Seb\'s Lost Mace","type":2,"minDamage":40,"maxDamage":55,"critChance":0.0199999995529651640,"critPower":0,"speed":-2},{"name":"Kudgel","type":2,"minDamage":27,"maxDamage":40,"critChance":0.0199999995529651640,"critPower":50,"speed":-1},{"name":"Lead Rod","type":2,"minDamage":18,"maxDamage":27,"critChance":0.0199999995529651640,"critPower":0,"speed":-4},{"name":"Wood Mallet","type":2,"minDamage":15,"maxDamage":24,"critChance":0.0199999995529651640,"critPower":0,"speed":2},{"name":"Wood Club","type":2,"minDamage":9,"maxDamage":16,"critChance":0.0199999995529651640,"critPower":0,"speed":0},{"name":"Femur","type":2,"minDamage":6,"maxDamage":11,"critChance":0.0199999995529651640,"critPower":0,"speed":2}]');

const dagger_list = [[],[],[],[],[],[],[],[]];
const sword_list = [[],[],[],[],[],[],[],[]];
const club_list = [[],[],[],[],[],[],[],[]];

for (let i = 0; i < dagger_obj.length; i++) {
  dagger_list[0][i] = dagger_obj[i]["name"];
  dagger_list[1][i] = dagger_obj[i]["type"];
  dagger_list[2][i] = dagger_obj[i]["minDamage"];
  dagger_list[3][i] = dagger_obj[i]["maxDamage"];
  dagger_list[4][i] = dagger_obj[i]["critChance"];
  dagger_list[5][i] = dagger_obj[i]["critPower"];
  dagger_list[6][i] = dagger_obj[i]["speed"];
};

for (let i = 0; i < sword_obj.length; i++) {
  sword_list[0][i] = sword_obj[i]["name"];
  sword_list[1][i] = sword_obj[i]["type"];
  sword_list[2][i] = sword_obj[i]["minDamage"];
  sword_list[3][i] = sword_obj[i]["maxDamage"];
  sword_list[4][i] = sword_obj[i]["critChance"];
  sword_list[5][i] = sword_obj[i]["critPower"];
  sword_list[6][i] = sword_obj[i]["speed"];
};

for (let i = 0; i < club_obj.length; i++) {
  club_list[0][i] = club_obj[i]["name"];
  club_list[1][i] = club_obj[i]["type"];
  club_list[2][i] = club_obj[i]["minDamage"];
  club_list[3][i] = club_obj[i]["maxDamage"];
  club_list[4][i] = club_obj[i]["critChance"];
  club_list[5][i] = club_obj[i]["critPower"];
  club_list[6][i] = club_obj[i]["speed"];
};

// Fill in default_dps
const all_weapons = [dagger_list, sword_list, club_list];
for (let i = 0; i < 3; i++) {
    if (i == 0) {
        var len = dagger_list.length;
    } else if (i == 1) {
        var len = sword_list.length;
    } else {
        var len = club_list.length;
    }
    for (let j = 0; j < len; j++) {
        var minDamage = all_weapons[i][2][j];
        var maxDamage = all_weapons[i][3][j];
        var critC = all_weapons[i][4][j];
        var critP = all_weapons[i][5][j];
        var speed = all_weapons[i][6][j];
        var crit_min = minDamage * (3 + critP/50);
        var crit_max = maxDamage * (3 + critP/50);
        var final_damage_min = ( (crit_min - minDamage) * critC ) + minDamage;
        var final_damage_max = ( (crit_max - maxDamage) * critC ) + maxDamage;

        if (i == 0) {
            var aps = 1000 / (125 + (speed * -40));
            if (aps > 8) {
                aps = 8;
            }
            dagger_list[7][j] = (final_damage_min + final_damage_max) / 2 * aps; 
        } else if (i == 1) {
            aps = 1000 / (400 + (speed * -40));
            sword_list[7][j] = (final_damage_min + final_damage_max) / 2 * aps; 
        } else {
            aps = 1000 / (720 + (speed * -40));
            club_list[7][j] = (final_damage_min + final_damage_max) / 2 * aps; 
        }
    }
};



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


// Add functions to loop DOM and create div elements based on weapon_list values
function addContentDagger() {
  const dropDagger = document.querySelector(".dropdown-content_dagger");
  for (let i = 0; i < dagger_list[0].length; i++) {
    const dropContentTextDiv = document.createElement('div');
    dropContentTextDiv.className = "dropdown-content_text_div";
    dropContentTextDiv.onclick = function () {
      changeDropdownName(this);
    }

    const dropContentText1 = document.createElement('p');
    dropContentText1.className = "dropdown-content_text1";
    dropContentText1.innerText = dagger_list[0][i];
    dropContentTextDiv.appendChild(dropContentText1);

    const dropContentText2 = document.createElement('p');
    dropContentText2.className = "dropdown-content_text2";
    dropContentText2.innerText = dagger_list[2][i] + '-' + dagger_list[3][i];
    dropContentText1.insertAdjacentElement("afterend", dropContentText2);

    dropDagger.appendChild(dropContentTextDiv);
  }
}

function addContentSword() {
  const dropSword = document.querySelector(".dropdown-content_sword");
  for (let i = 0; i < sword_list[0].length; i++) {
    const dropContentTextDiv = document.createElement('div');
    dropContentTextDiv.className = "dropdown-content_text_div";
    dropContentTextDiv.onclick = function () {
      changeDropdownName(this);
    }

    const dropContentText1 = document.createElement('p');
    dropContentText1.className = "dropdown-content_text1";
    dropContentText1.innerText = sword_list[0][i];
    dropContentTextDiv.appendChild(dropContentText1);

    const dropContentText2 = document.createElement('p');
    dropContentText2.className = "dropdown-content_text2";
    dropContentText2.innerText = sword_list[2][i] + '-' + sword_list[3][i];
    dropContentText1.insertAdjacentElement("afterend", dropContentText2);

    dropSword.appendChild(dropContentTextDiv);
  }
}

function addContentClub() {
  const dropClub = document.querySelector(".dropdown-content_club");
  for (let i = 0; i < club_list[0].length; i++) {
    const dropContentTextDiv = document.createElement('div');
    dropContentTextDiv.className = "dropdown-content_text_div";
    dropContentTextDiv.onclick = function () {
      changeDropdownName(this);
    }

    const dropContentText1 = document.createElement('p');
    dropContentText1.className = "dropdown-content_text1";
    dropContentText1.innerText = club_list[0][i];
    dropContentTextDiv.appendChild(dropContentText1);

    const dropContentText2 = document.createElement('p');
    dropContentText2.className = "dropdown-content_text2";
    dropContentText2.innerText = club_list[2][i] + '-' + club_list[3][i];
    dropContentText1.insertAdjacentElement("afterend", dropContentText2);

    dropClub.appendChild(dropContentTextDiv);
  }
}

// Call the addContent functions after document has loaded
if (document.readyState !== 'loading') {
  addContentDagger();
  addContentSword();
  addContentClub();
} else {
  document.addEventListener("DOMContentLoaded", function() {
    addContentDagger();
    addContentSword();
    addContentClub();
  })
}


