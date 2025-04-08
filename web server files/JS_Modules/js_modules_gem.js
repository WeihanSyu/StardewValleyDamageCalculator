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


// Add events to change the gem button to be the image of whatever gem is chosen from the dropdown
function changeGemdrop1(elem) {
    var dropdown = elem.closest(".gemdropdown1");
    var btn = dropdown.querySelector(".gembtn");
    var img = elem.firstElementChild.firstElementChild.src;
    btn.style.backgroundImage = "url("+img+")";
}

function changeGemdrop2(elem) {
    var dropdown = elem.closest(".gemdropdown2");
    var btn = dropdown.querySelector(".gembtn");
    var img = elem.firstElementChild.firstElementChild.src;
    btn.style.backgroundImage = "url("+img+")";
}

function changeGemdrop3(elem) {
    var dropdown = elem.closest(".gemdropdown3");
    var btn = dropdown.querySelector(".gembtn");
    var img = elem.firstElementChild.firstElementChild.src;
    btn.style.backgroundImage = "url("+img+")";
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






