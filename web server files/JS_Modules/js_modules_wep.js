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

// Change main dropdown name to whatever weapon the user clicks
function changeDropdownName(elem) {
  var dropdown = elem.closest(".dropdown");
  var btn = dropdown.querySelector(".dropbtn");
  var btnValue = elem.innerText;
  btn.innerText = btnValue;
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

