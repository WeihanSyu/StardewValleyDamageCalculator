/*
Add function on click to change the blessing text based on choice as well as 
change the opacity of the blessing icon that is chosen 
*/
function changeBlessing(elem) {
    var blessing_text = document.querySelector(".blessing_text");
    var btn_property = getComputedStyle(elem);
    var btn_fang = document.querySelector('.blessing_fangs');
    var btn_speed = document.querySelector('.blessing_speed');
    var btn_luck = document.querySelector('.blessing_luck');

    // Default font is too large for two sentences so decrease size upon clicking
    blessing_text.style.setProperty('font-size', '18px');

    if (btn_property.getPropertyValue('--bg-image').includes('Fangs')) {
        elem.classList.toggle("blessing_opacity");
        btn_speed.classList.remove("blessing_opacity");
        btn_luck.classList.remove("blessing_opacity");
        blessing_text.innerText = 'Blessing of Fangs:\nCrit. Chance +10%';
        blessing_fangs = 1;
        blessing_luck = 0;
        blessing_speed = 0;
    } else if (btn_property.getPropertyValue('--bg-image').includes('Speed')) {
        elem.classList.toggle("blessing_opacity");
        btn_fang.classList.remove("blessing_opacity");
        btn_luck.classList.remove("blessing_opacity");
        blessing_text.innerText = 'Blessing of Speed:\nSpeed +0.5';
        blessing_speed = 1;
        blessing_luck = 0;
        blessing_fangs = 0;
    } else if (btn_property.getPropertyValue('--bg-image').includes('Luck')) {
        elem.classList.toggle("blessing_opacity");
        btn_speed.classList.remove("blessing_opacity");
        btn_fang.classList.remove("blessing_opacity");
        blessing_text.innerText = 'Blessing of Luck:\nLuck +1';
        blessing_luck = 1;
        blessing_fangs = 0;
        blessing_speed = 0;
    }

    if (btn_property.getPropertyValue('--bg-image-opacity') == 0.5) {
        blessing_text.innerText = 'Select a Blessing';
        // Increase font-size back to default if no blessing is chosen
        blessing_text.style.setProperty('font-size', '20px');

        // Reset global variables if nothing is chosen
        blessing_fangs = 0;
        blessing_luck = 0;
        blessing_speed = 0;
    }

    // Get unmodified current weapon stats
    let current_wep = document.querySelector(".dropbtn").innerText;
    let wep_type = '';
    let current_crit_chance = 0;
    let current_speed = 0;

    if (dagger_list[0].includes(current_wep)) {
        let index = dagger_list[0].indexOf(current_wep);
        wep_type = 'dagger';
        current_crit_chance = dagger_list[4][index];
        current_speed = dagger_list[6][index];
    } else if (sword_list[0].includes(current_wep)) {
        let index = sword_list[0].indexOf(current_wep);
        wep_type = 'sword';
        current_crit_chance = sword_list[4][index];
        current_speed = sword_list[6][index];
    } else if (club_list[0].includes(current_wep)) {
        let index = club_list[0].indexOf(current_wep);
        wep_type = 'club';
        current_crit_chance = club_list[4][index];
        current_speed = club_list[6][index];
    }

    current_crit_chance = parseFloat(current_crit_chance);
    current_speed = parseInt(current_speed);
    var bar_width = 5;

    // Crit Chance section
    chc_bonus(wep_type, current_crit_chance);
    var critchance_bar = document.getElementsByClassName("stat_bar")[2];
    var critchance_bar_increase = bar_width * (chc / current_crit_chance);
    critchance_bar.style.setProperty('width', critchance_bar_increase + '%');

    chc = Math.round((chc * 100 + Number.EPSILON) * 10) / 10;
    var results_crit_chance = document.getElementsByClassName("stat_text")[2];
    results_crit_chance.innerText = "Crit. Chance: " + chc + "%";

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

    action_per_second = Math.round((action_per_second + Number.EPSILON) * 10) / 10;
    var results_speed = document.getElementsByClassName("stat_text")[3];
    results_speed.innerText = "Speed: " + action_per_second + " actions/s";

    // Dps section
    
}