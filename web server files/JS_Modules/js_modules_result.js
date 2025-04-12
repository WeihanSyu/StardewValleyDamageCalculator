// Declare every single global variable to be used in results calculation here

// For dmg_bonus
let minDamage = 0
let maxDamage = 0;
let ruby_level = 0;
let ruby_ring_amount = 0;
let innate_attack = 0;
let fighter = 0;
let brute = 0;

// For chd_bonus
let crit_power = 0;
let jade_level = 0;
let jade_ring_amount = 0;
let innate_crit_power = 0;
let desperado = 0;

// For chc_bonus
let crit_chance = 0;
let aqua_level = 0;
let aqua_ring_amount = 0;
let innate_crit_chance = 0;
let luck = 0;
let scout = 0;
let blessing_fangs = 0;
let blessing_luck = 0;

// For speed
let speed = 0;
let emerald_level = 0;
let emerald_ring_amount = 0;
let innate_speed = 0;


// Function to calculate base_damage range. Must be called at every single user choice button.
function dmg_bonus(min, max) {
    minDamage = min
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


