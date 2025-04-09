function showskilldrop1() {
    document.getElementById("skill1").classList.toggle("show");
}

/* Add function to show skillbtn2 hidden dropdown. Of course we can only show this
   if skillbtn1 has already been picked */
function showskilldrop2() {
  let btn1 = document.querySelector(".skillbtn1");
  if (btn1.innerText == '') {
    document.getElementById("skill2").classList.toggle("show");
  }
}


// Add events to close the skillbtns when we click elsewhere
window.addEventListener("click", function(event) {
  if (!event.target.matches('.skillbtn1')) {
    var dropdown = document.getElementById("skill1");
    if (dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
  }
});

window.addEventListener("click", function(event) {
  if (!event.target.matches('.skillbtn2')) {
    var dropdown = document.getElementById("skill2");
    if (dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
    } 
});


function changeSkilldrop1(elem) {
    var btn = document.querySelector(".skillbtn1");
    btn.innerText = '';
    var img = elem.firstElementChild.firstElementChild.src;
    btn.style.backgroundImage = "url("+img+")";

    // At the same time that we select a Level 5 skill, 
    // we make the Level 10 skill available by changing the class
    document.querySelector(".skillbtn2_empty").classList.add("skillbtn2");
    document.getElementById("skill2").classList.add("skill-content-height");

    // Only show Level 10 skills corresponding to the chosen Level 5 skill
    // If we had multiple Level 10 skills, then we would use getElementsByClassName
    var skill2 = document.getElementById("skill2");
    var skill2_div = skill2.querySelector(".skill-content_div");
    var skill2_img = skill2_div.firstElementChild.firstElementChild;
    var skill2_text1 = skill2_div.querySelector(".skilltext1").firstElementChild;
    var skill2_text2 = skill2_div.querySelector(".skilltext2").firstElementChild;
    var btn2 = document.querySelector(".skillbtn2");

    if (img.includes("Fighter") && !btn2.style.backgroundImage.includes("Brute")) {
      btn2.style.backgroundImage = 'None';
    } else if (img.includes("Scout") && !btn2.style.backgroundImage.includes("Desperado")) {
      btn2.style.backgroundImage = 'None';
    }

    if (img.includes("Fighter")) {
      skill2_img.src = "../images/skills/Brute.png";
      skill2_text1.innerText = 'Brute';
      skill2_text2.innerText = 'Deal 15% more damage';
    } else if (img.includes("Scout")) {
      skill2_img.src = "../images/skills/Desperado.png";
      skill2_text1.innerText = 'Desperado';
      skill2_text2.innerText = 'Critical strike damage increased by 50%';
    }
      
}

function resetSkilldrop1() {
  var btn = document.querySelector(".skillbtn1");
  btn.style.backgroundImage = 'None';
  btn.innerText = 'Level 5';

  // If we reset the Level 5 skill, then we have to turn off the Level 10 skill as well
  var btn2 = document.querySelector(".skillbtn2");
  btn2.style.backgroundImage ='None';
  btn2.classList.remove("skillbtn2");
  btn2.innerText = 'Level 10';
  document.getElementById("skill2").classList.remove("skill-content-height");
}

function changeSkilldrop2(elem) {
  var btn = document.querySelector(".skillbtn2");
  btn.innerText = '';
  var img = elem.firstElementChild.firstElementChild.src;
  btn.style.backgroundImage = "url("+img+")";
}

function resetSkilldrop2() {
  var btn = document.querySelector(".skillbtn2");
  btn.style.backgroundImage = 'None';
  btn.innerText = 'Level 10';
}