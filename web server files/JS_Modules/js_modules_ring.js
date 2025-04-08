// change display:none to display:block upon clicking the ring dropdown button 
function showringdrop1() {
    document.getElementById("ring1").classList.toggle("show");
}

function showringdrop2() {
    document.getElementById("ring2").classList.toggle("show");
}

function showringdrop3() {
    document.getElementById("ring3").classList.toggle("show");
}

function showringdrop4() {
    document.getElementById("ring4").classList.toggle("show");
}


// Add event so if user clicks off the ring buttons, the gem dropdown menu will close.
window.addEventListener("click", function(event) {
    if (!event.target.matches('.ringbtn')) {
        var dropdowns = document.getElementsByClassName("ring-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
});


// Add event so that clicking the ring button itself will hide all other active ring dropdowns
document.getElementsByClassName("ringdrop1")[0].firstElementChild.addEventListener("click", removeRingdrop1);
function removeRingdrop1() {
    document.getElementById("ring2").classList.remove("show");
    document.getElementById("ring3").classList.remove("show");
    document.getElementById("ring4").classList.remove("show");
}

document.getElementsByClassName("ringdrop2")[0].firstElementChild.addEventListener("click", removeRingdrop2);
function removeRingdrop2() {
    document.getElementById("ring1").classList.remove("show");
    document.getElementById("ring3").classList.remove("show");
    document.getElementById("ring4").classList.remove("show");
}

document.getElementsByClassName("ringdrop3")[0].firstElementChild.addEventListener("click", removeRingdrop3);
function removeRingdrop3() {
    document.getElementById("ring1").classList.remove("show");
    document.getElementById("ring2").classList.remove("show");
    document.getElementById("ring4").classList.remove("show");
}

document.getElementsByClassName("ringdrop4")[0].firstElementChild.addEventListener("click", removeRingdrop4);
function removeRingdrop4() {
    document.getElementById("ring1").classList.remove("show");
    document.getElementById("ring2").classList.remove("show");
    document.getElementById("ring3").classList.remove("show");
}


// Add events to change the gem button to be the image of whatever gem is chosen from the dropdown
function changeRingdrop1(elem) {
    var dropdown = elem.closest(".ringdrop1");
    var btn = dropdown.querySelector(".ringbtn");
    var img = elem.firstElementChild.firstElementChild.src;
    btn.style.backgroundImage = "url("+img+")";
}

function changeRingdrop2(elem) {
    var dropdown = elem.closest(".ringdrop2");
    var btn = dropdown.querySelector(".ringbtn");
    var img = elem.firstElementChild.firstElementChild.src;
    btn.style.backgroundImage = "url("+img+")";
}

function changeRingdrop3(elem) {
    var dropdown = elem.closest(".ringdrop3");
    var btn = dropdown.querySelector(".ringbtn");
    var img = elem.firstElementChild.firstElementChild.src;
    btn.style.backgroundImage = "url("+img+")";
}

function changeRingdrop4(elem) {
    var dropdown = elem.closest(".ringdrop4");
    var btn = dropdown.querySelector(".ringbtn");
    var img = elem.firstElementChild.firstElementChild.src;
    btn.style.backgroundImage = "url("+img+")";
}