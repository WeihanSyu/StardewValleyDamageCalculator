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

  // Get the default - unmodified base damage range and store it in integer variables
  var base_dmg = elem.querySelector(".dropdown-content_text2").innerText;
  minDamage = parseInt(base_dmg.split('-')[0]);
  maxDamage = parseInt(base_dmg.split('-')[1]);
  var base_dmg_avg = (minDamage + maxDamage) / 2;

  // Call our dmg_bonus function to apply any and all changes from other sections to the base dmg
  dmg_bonus(minDamage, maxDamage);
  minDamage = Math.round((minDamage + Number.EPSILON) * 10) / 10;
  maxDamage = Math.round((maxDamage + Number.EPSILON) * 10) / 10;
  var new_dmg_avg = (minDamage + maxDamage) / 2;

  // Change the base dmg text in results section to the modified base damage from above
  var results_base_dmg = document.getElementsByClassName("stat_text")[0];
  results_base_dmg.innerText = "Base Dmg: " + minDamage + "-" + maxDamage;

  // Recalculate bar size for each new chosen weapon based on original bar size (5%)
  var attack_bar = document.getElementsByClassName("stat_bar")[0];
  var bar_width = 5;
  var bar_increase = bar_width * (new_dmg_avg / base_dmg_avg);
  attack_bar.style.setProperty('width', bar_increase + '%');

  let current_wep = document.querySelector(".dropbtn").innerText;
  let current_crit_power = 0;
  let current_crit_chance = 0;
  let current_speed = 0;

  if (dagger_list[0].includes(current_wep)) {
      let index = dagger_list[0].indexOf(current_wep);
      current_crit_power = dagger_list[5][index];
      current_crit_chance = dagger_list[4][index];
      current_speed = dagger_list[6][index];
  } else if (sword_list[0].includes(current_wep)) {
      let index = sword_list[0].indexOf(current_wep);
      current_crit_power = sword_list[5][index];
      current_crit_chance = sword_list[4][index];
      current_speed = sword_list[6][index];
  } else if (club_list[0].includes(current_wep)) {
      let index = club_list[0].indexOf(current_wep);
      current_crit_power = club_list[5][index];
      current_crit_chance = club_list[4][index];
      current_speed = club_list[6][index];
  }


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

