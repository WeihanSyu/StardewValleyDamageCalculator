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
    } else if (btn_property.getPropertyValue('--bg-image').includes('Speed')) {
        elem.classList.toggle("blessing_opacity");
        btn_fang.classList.remove("blessing_opacity");
        btn_luck.classList.remove("blessing_opacity");
        blessing_text.innerText = 'Blessing of Speed:\nSpeed +0.5';
    } else if (btn_property.getPropertyValue('--bg-image').includes('Luck')) {
        elem.classList.toggle("blessing_opacity");
        btn_speed.classList.remove("blessing_opacity");
        btn_fang.classList.remove("blessing_opacity");
        blessing_text.innerText = 'Blessing of Luck:\nLuck +1';
    }

    if (btn_property.getPropertyValue('--bg-image-opacity') == 0.5) {
        blessing_text.innerText = 'Select a Blessing';
        // Increase font-size back to default if no blessing is chosen
        blessing_text.style.setProperty('font-size', '20px');
    }
}