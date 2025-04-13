// Add function to show the innate enchantment dropdown menu upon click
function showInnateDropdown() {
    document.getElementById("myinnate").classList.toggle("show");
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
        var innate_type = elem.parentNode.previousSibling.previousSibling.innerText;
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

    if (dagger_list[0].includes(current_wep)) {
        let index = dagger_list[0].indexOf(current_wep);
        wep_type = 'dagger';
        current_minDamage = dagger_list[2][index];
        current_maxDamage = dagger_list[3][index];
        current_crit_power = dagger_list[5][index];
        current_crit_chance = dagger_list[4][index];
        current_speed = dagger_list[6][index];
    } else if (sword_list[0].includes(current_wep)) {
        let index = sword_list[0].indexOf(current_wep);
        wep_type = 'sword';
        current_minDamage = sword_list[2][index];
        current_maxDamage = sword_list[3][index];
        current_crit_power = sword_list[5][index];
        current_crit_chance = sword_list[4][index];
        current_speed = sword_list[6][index];
    } else if (club_list[0].includes(current_wep)) {
        let index = club_list[0].indexOf(current_wep);
        wep_type = 'club';
        current_minDamage = club_list[2][index];
        current_maxDamage = club_list[3][index];
        current_crit_power = club_list[5][index];
        current_crit_chance = club_list[4][index];
        current_speed = club_list[6][index];
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
    minDamage = Math.round((minDamage + Number.EPSILON) * 10) / 10;
    maxDamage = Math.round((maxDamage + Number.EPSILON) * 10) / 10;
    var new_dmg_avg = (minDamage + maxDamage) / 2;

    // Change the base dmg text in results section to the modified base damage from above
    var results_base_dmg = document.getElementsByClassName("stat_text")[0];
    results_base_dmg.innerText = "Base Dmg: " + minDamage + "-" + maxDamage;

    // Recalculate attack bar size for each new chosen weapon based on original bar size (5%)
    var attack_bar = document.getElementsByClassName("stat_bar")[0];
    var bar_width = 5;
    var attack_bar_increase = bar_width * (new_dmg_avg / base_dmg_avg);
    attack_bar.style.setProperty('width', attack_bar_increase + '%');

    // Call our chd_bonus function to apply any changes from other sections to the critical power
    chd_bonus(minDamage, maxDamage, current_crit_power);
    chd_min = Math.round((chd_min + Number.EPSILON) * 10) / 10;
    chd_max = Math.round((chd_max + Number.EPSILON) * 10) / 10;
    var new_crit_damage_avg = (chd_min + chd_max) / 2;

    // Change the crit dmg text in results section to the modified crit damage if any
    var results_crit_dmg = document.getElementsByClassName("stat_text")[1];
    results_crit_dmg.innerText = "Crit. Dmg: " + chd_min + "-" + chd_max;
    
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
    chc = Math.round((chc * 100 + Number.EPSILON) * 10) / 10;
    var results_crit_chance = document.getElementsByClassName("stat_text")[2];
    results_crit_chance.innerText = "Crit. Chance: " + chc + "%";

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
    action_per_second = Math.round((action_per_second + Number.EPSILON) * 10) / 10;
    var results_speed = document.getElementsByClassName("stat_text")[3];
    results_speed.innerText = "Speed: " + action_per_second + " actions/s";


};

