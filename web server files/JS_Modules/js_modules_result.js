// Declare every single global variable needed for default damage calculation functions
// i.e. when var = 0

// For dmg_bonus
let ruby_level = 0;
let ruby_ring_amount = 0;
let innate_attack = 0;
let fighter = 0;
let brute = 0;

// For chd_bonus
let chd_min = 0;
let chd_max = 0;
let jade_level = 0;
let jade_ring_amount = 0;
let innate_crit_power = 0;
let desperado = 0;

// For chc_bonus
let chc = 0;
let aqua_level = 0;
let aqua_ring_amount = 0;
let innate_crit_chance = 0;
let luck = 0;
let scout = 0;
let blessing_fangs = 0;
let blessing_luck = 0;

// For speed
let action_per_second = 0;
let emerald_level = 0;
let emerald_ring_amount = 0;
let innate_speed = 0;
let blessing_speed = 0;

// Final
let damage_per_second = 0;


// Function to calculate base_damage range. Must be called at every single user choice button.
function dmg_bonus(min, max) {
    minDamage = min;
    maxDamage = max;
    
    minDamage += innate_attack * 3;
    maxDamage += innate_attack * 3;

    for (let i = 0; i < ruby_level; i++) {
        minDamage += minDamage * 0.10;
        maxDamage += maxDamage * 0.10;
    }

    minDamage += minDamage * ruby_ring_amount / 10;
    maxDamage += maxDamage * ruby_ring_amount / 10;

    if (fighter == 1 && brute == 1) {
        minDamage += minDamage * 0.25;
        maxDamage += maxDamage * 0.25;
    } else if (fighter == 1 && brute == 0) {
        minDamage += minDamage * 0.10;
        maxDamage += maxDamage * 0.10;
    }
}

function chd_bonus(min, max, crit_power) {
    chd_min = min * (3 + (crit_power + jade_level * 5) / 50);
    chd_max = max * (3 + (crit_power + jade_level * 5) / 50);

    chd_min = chd_min * (1 + jade_ring_amount/10 + innate_crit_power/50);
    chd_max = chd_max * (1 + jade_ring_amount/10 + innate_crit_power/50);

    if (desperado == 1) {
        chd_min = chd_min * 2;
        chd_max = chd_max * 2;
    }
}

function chc_bonus(wep, crit_chance) {
    chc = crit_chance + (0.046 * aqua_level);

    if (wep == 'dagger') {
        chc = (chc + 0.005) * 1.12;
    }

    chc = chc * ( ((aqua_ring_amount/10) + (innate_crit_chance*2/100)) + 1 );

    if (blessing_fangs == 1) {
        chc += 0.1;
    }

    if (scout == 1) {
        chc = chc * 1.5;
    }

    chc += (luck + blessing_luck) * chc / 40;

    if (chc > 1) {
        chc = 1;
    }
}

function attack_speed(wep, speed) {
    var action = 0;

    if (wep == 'dagger') {
        action = 125;
    } else if (wep == 'sword') {
        action = 400;
    } else if (wep == 'club') {
        action = 720;
    }

    action += speed * -40;
    action += blessing_speed * 0.5 * -40;

    var level_speed = [2, 3, 2];
    for (let i = 0; i < emerald_level; i++) {
        action += level_speed[i] * -40;
    }

    action += innate_speed * -40;

    action += action * emerald_ring_amount/10 * -1;

    // Add in soft cap
    if (wep == 'dagger' && action < 125) {
        action = 125;
    } else if ((wep == 'sword' || wep == 'club') && action < 240) {
        action = 240
    } 

    action_per_second = 1000 / action;
}

function dps_calc(min, max, crit_chance, crit_min, crit_max, action_s) {
    final_damage_min = ( (chd_min - minDamage) * chc ) + minDamage;
    final_damage_max = ( (chd_max - maxDamage) * chc ) + maxDamage;
    damage_per_second = (final_damage_min + final_damage_max) / 2 * action_per_second; 
}