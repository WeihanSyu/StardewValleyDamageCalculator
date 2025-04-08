function showskilldrop1() {
    document.getElementById("skill1").classList.toggle("show");
}

window.addEventListener("click", function(event) {
    if (!event.target.matches('.skillbtn1')) {
        var dropdowns = document.getElementsByClassName("skill-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
});

function changeSkilldrop1(elem) {
    var btn = document.querySelector(".skillbtn1")
    btn.inner
}