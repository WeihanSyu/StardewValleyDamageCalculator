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
    if (elem.getAttribute("class") == "innate-content_div1") {
        btn.innerText = elem.innerText;
    } else {
        var innate_type = elem.parentNode.previousSibling.previousSibling.innerText;
        btn.innerText = innate_type + ": " + elem.innerText;
    }
};

