function showGemDropdown1() {
    document.getElementById("myGems1").classList.toggle("show");
}

/*
The problem with having ID the SAME IN EACH SEPARATE DROPDOWN is that 
even if I click the SECOND gembtn to open the dropdown, the page still sees the 
first gemdropdown open which means the INSIDE CONTENTS are ALL from the first
dropdown. 
INCLUDING THE FUNCTIONS.
So if I click the <p>gems</p>. The onclick function that triggers will be the
for the first dropdown meaning the first gembtn will get changed. Not the second
*/

function showGemDropdown2() {
    document.getElementById("myGems2").classList.toggle("show");
}

function showGemDropdown3() {
    document.getElementById("myGems3").classList.toggle("show");
}


// Add event so if user clicks off the gem buttons, the gem dropdown menu will close.
window.addEventListener("click", function(event) {
    if (!event.target.matches('.gembtn')) {
        var dropdowns = document.getElementsByClassName("gem-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
});


// Add event so that clicking the gem button itself will hide all other active gem dropdowns
document.getElementsByClassName("gemdropdown1")[0].firstElementChild.addEventListener("click", removeGemdrop2_3);
function removeGemdrop2_3() {
    document.getElementById("myGems2").classList.remove("show");
    document.getElementById("myGems3").classList.remove("show");
}

document.getElementsByClassName("gemdropdown2")[0].firstElementChild.addEventListener("click", removeGemdrop1_3);
function removeGemdrop1_3() {
    document.getElementById("myGems1").classList.remove("show");
    document.getElementById("myGems3").classList.remove("show");
}

document.getElementsByClassName("gemdropdown3")[0].firstElementChild.addEventListener("click", removeGemdrop1_2);
function removeGemdrop1_2() {
    document.getElementById("myGems1").classList.remove("show");
    document.getElementById("myGems2").classList.remove("show");
}


/* 
1. Add events to change the gem button to be the image of whatever gem is chosen from the dropdown
2. Store chosen stats into global variables so that we can use them in DPS calculation later
3. Add the stats to results section based on what is chosen
4. Change stat bar size based on user selected boosts
*/
function changeGemdrop1(elem) {
    var dropdown = elem.closest(".gemdropdown1");
    var btn = dropdown.querySelector(".gembtn");
    var img = elem.firstElementChild.firstElementChild.src;

    if (elem.innerText.includes("Ruby") && !btn.style.backgroundImage.includes("Ruby")) {
        ruby_level += 1;
    } else if (!elem.innerText.includes("Ruby") && btn.style.backgroundImage.includes("Ruby")){
        ruby_level -= 1;
    }

    if (elem.innerText.includes("Jade") && !btn.style.backgroundImage.includes("Jade")) {
        jade_level += 1;
    } else if (!elem.innerText.includes("Jade") && btn.style.backgroundImage.includes("Jade")){
        jade_level -= 1;
    }

    if (elem.innerText.includes("Aqua") && !btn.style.backgroundImage.includes("Aqua")) {
        aqua_level += 1;
    } else if (!elem.innerText.includes("Aqua") && btn.style.backgroundImage.includes("Aqua")){
        aqua_level -= 1;
    }

    if (elem.innerText.includes("Emerald") && !btn.style.backgroundImage.includes("Emerald")) {
        emerald_level += 1;
    } else if (!elem.innerText.includes("Emerald") && btn.style.backgroundImage.includes("Emerald")){
        emerald_level -= 1;
    }

    btn.style.backgroundImage = "url("+img+")";
    
    let current_wep = document.querySelector(".dropbtn").innerText;
    let current_minDamage = 0;
    let current_maxDamage = 0;

    if (dagger_list[0].includes(current_wep)) {
        let index = dagger_list[0].indexOf(current_wep);
        current_minDamage = dagger_list[2][index];
        current_maxDamage = dagger_list[3][index];
    } else if (sword_list[0].includes(current_wep)) {
        let index = sword_list[0].indexOf(current_wep);
        current_minDamage = sword_list[2][index];
        current_maxDamage = sword_list[3][index];
    } else if (club_list[0].includes(current_wep)) {
        let index = club_list[0].indexOf(current_wep);
        current_minDamage = sword_list[2][index];
        current_maxDamage = sword_list[3][index];
    }

    current_minDamage = parseInt(current_minDamage);
    current_maxDamage = parseInt(current_maxDamage);
    var base_dmg_avg = (current_minDamage + current_maxDamage) / 2;

    dmg_bonus(current_minDamage, current_maxDamage);
    minDamage = Math.round((minDamage + Number.EPSILON) * 10) / 10;
    maxDamage = Math.round((maxDamage + Number.EPSILON) * 10) / 10;
    var new_dmg_avg = (minDamage + maxDamage) / 2;

    var results_base_dmg = document.getElementsByClassName("stat_text")[0];
    results_base_dmg.innerText = "Base Dmg: " + minDamage + "-" + maxDamage;

    var attack_bar = document.getElementsByClassName("stat_bar")[0];
    var attack_bar_width = 5;
    var attack_bar_increase = attack_bar_width * (new_dmg_avg / base_dmg_avg);
    attack_bar.style.setProperty('width', attack_bar_increase + '%');
}

function changeGemdrop2(elem) {
    var dropdown = elem.closest(".gemdropdown2");
    var btn = dropdown.querySelector(".gembtn");
    var img = elem.firstElementChild.firstElementChild.src;

    if (elem.innerText.includes("Ruby") && !btn.style.backgroundImage.includes("Ruby")) {
        ruby_level += 1;
    } else if (!elem.innerText.includes("Ruby") && btn.style.backgroundImage.includes("Ruby")){
        ruby_level -= 1;
    }

    if (elem.innerText.includes("Jade") && !btn.style.backgroundImage.includes("Jade")) {
        jade_level += 1;
    } else if (!elem.innerText.includes("Jade") && btn.style.backgroundImage.includes("Jade")){
        jade_level -= 1;
    }

    if (elem.innerText.includes("Aqua") && !btn.style.backgroundImage.includes("Aqua")) {
        aqua_level += 1;
    } else if (!elem.innerText.includes("Aqua") && btn.style.backgroundImage.includes("Aqua")){
        aqua_level -= 1;
    }

    if (elem.innerText.includes("Emerald") && !btn.style.backgroundImage.includes("Emerald")) {
        emerald_level += 1;
    } else if (!elem.innerText.includes("Emerald") && btn.style.backgroundImage.includes("Emerald")){
        emerald_level -= 1;
    }

    btn.style.backgroundImage = "url("+img+")";

    let current_wep = document.querySelector(".dropbtn").innerText;
    let current_minDamage = 0;
    let current_maxDamage = 0;

    if (dagger_list[0].includes(current_wep)) {
        let index = dagger_list[0].indexOf(current_wep);
        current_minDamage = dagger_list[2][index];
        current_maxDamage = dagger_list[3][index];
    } else if (sword_list[0].includes(current_wep)) {
        let index = sword_list[0].indexOf(current_wep);
        current_minDamage = sword_list[2][index];
        current_maxDamage = sword_list[3][index];
    } else if (club_list[0].includes(current_wep)) {
        let index = club_list[0].indexOf(current_wep);
        current_minDamage = sword_list[2][index];
        current_maxDamage = sword_list[3][index];
    }

    current_minDamage = parseInt(current_minDamage);
    current_maxDamage = parseInt(current_maxDamage);
    var base_dmg_avg = (current_minDamage + current_maxDamage) / 2;

    dmg_bonus(current_minDamage, current_maxDamage);
    minDamage = Math.round((minDamage + Number.EPSILON) * 10) / 10;
    maxDamage = Math.round((maxDamage + Number.EPSILON) * 10) / 10;
    var new_dmg_avg = (minDamage + maxDamage) / 2;

    var results_base_dmg = document.getElementsByClassName("stat_text")[0];
    results_base_dmg.innerText = "Base Dmg: " + minDamage + "-" + maxDamage;

    var attack_bar = document.getElementsByClassName("stat_bar")[0];
    var attack_bar_width = 5;
    var attack_bar_increase = attack_bar_width * (new_dmg_avg / base_dmg_avg);
    attack_bar.style.setProperty('width', attack_bar_increase + '%');
}

function changeGemdrop3(elem) {
    var dropdown = elem.closest(".gemdropdown3");
    var btn = dropdown.querySelector(".gembtn");
    var img = elem.firstElementChild.firstElementChild.src;

    if (elem.innerText.includes("Ruby") && !btn.style.backgroundImage.includes("Ruby")) {
        ruby_level += 1;
    } else if (!elem.innerText.includes("Ruby") && btn.style.backgroundImage.includes("Ruby")){
        ruby_level -= 1;
    }

    if (elem.innerText.includes("Jade") && !btn.style.backgroundImage.includes("Jade")) {
        jade_level += 1;
    } else if (!elem.innerText.includes("Jade") && btn.style.backgroundImage.includes("Jade")){
        jade_level -= 1;
    }

    if (elem.innerText.includes("Aqua") && !btn.style.backgroundImage.includes("Aqua")) {
        aqua_level += 1;
    } else if (!elem.innerText.includes("Aqua") && btn.style.backgroundImage.includes("Aqua")){
        aqua_level -= 1;
    }

    if (elem.innerText.includes("Emerald") && !btn.style.backgroundImage.includes("Emerald")) {
        emerald_level += 1;
    } else if (!elem.innerText.includes("Emerald") && btn.style.backgroundImage.includes("Emerald")){
        emerald_level -= 1;
    }

    btn.style.backgroundImage = "url("+img+")";

    let current_wep = document.querySelector(".dropbtn").innerText;
    let current_minDamage = 0;
    let current_maxDamage = 0;

    if (dagger_list[0].includes(current_wep)) {
        let index = dagger_list[0].indexOf(current_wep);
        current_minDamage = dagger_list[2][index];
        current_maxDamage = dagger_list[3][index];
    } else if (sword_list[0].includes(current_wep)) {
        let index = sword_list[0].indexOf(current_wep);
        current_minDamage = sword_list[2][index];
        current_maxDamage = sword_list[3][index];
    } else if (club_list[0].includes(current_wep)) {
        let index = club_list[0].indexOf(current_wep);
        current_minDamage = sword_list[2][index];
        current_maxDamage = sword_list[3][index];
    }

    current_minDamage = parseInt(current_minDamage);
    current_maxDamage = parseInt(current_maxDamage);
    var base_dmg_avg = (current_minDamage + current_maxDamage) / 2;

    dmg_bonus(current_minDamage, current_maxDamage);
    minDamage = Math.round((minDamage + Number.EPSILON) * 10) / 10;
    maxDamage = Math.round((maxDamage + Number.EPSILON) * 10) / 10;
    var new_dmg_avg = (minDamage + maxDamage) / 2;

    var results_base_dmg = document.getElementsByClassName("stat_text")[0];
    results_base_dmg.innerText = "Base Dmg: " + minDamage + "-" + maxDamage;

    var attack_bar = document.getElementsByClassName("stat_bar")[0];
    var attack_bar_width = 5;
    var attack_bar_increase = attack_bar_width * (new_dmg_avg / base_dmg_avg);
    attack_bar.style.setProperty('width', attack_bar_increase + '%');
}


/* 
ID values of DOM elements must be UNIQUE within a single document.
Thus, we can ONLY call getElementById using 'document.getElementById'. 
*/

/*
if (document.getElementById("myGems1").previousElementSibling.style.backgroundImage == "url(../images/Emerald.png)") {
    $gem_list["Emerald"] = "Speed: +3";
}
Changes to PHP array values in Javascript will only reflect if used within Javascript.
The PHP array within our HTML page will not change, they are separate so 
when we call our array in a PHP loop, the original values are still shown
*/


// add event on click gembtn dropdown to change Emerald into +3 speed boost if a single emerald has already been chosen
window.addEventListener("click", function(event) {
    if (event.target.matches('.gembtn')) {
        let i;
        let counter = 0;
        for (i = 1; i < 4; i++) {
            let gem_choice = document.getElementById("myGems"+i.toString()).previousElementSibling;
            let style = window.getComputedStyle(gem_choice, false);
            let bi = style.backgroundImage;

            if (bi.includes("Emerald")) {
                counter++;
            }
        }
        // counter will tell us how many emeralds have been chosen thus far.
        
        let current_style = window.getComputedStyle(event.target, false);
        let current_bi = current_style.backgroundImage;
        let current_id = event.target.nextElementSibling.getAttribute("id");
        let xpath_gem = '//div[@id="' + current_id + '"]//p[contains(text(), "Emerald")]/parent::*/following-sibling::*/child::*';
        let matchingElement = document.evaluate(xpath_gem, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!current_bi.includes("Emerald") && counter == 1) {
            matchingElement.innerText = "Speed: +3";
        } else if (current_bi.includes("Emerald") && counter == 2) {
            matchingElement.innerText = "Speed: +3";
        } else {
            matchingElement.innerText = "Speed: + 2";
        }
      }
});






