// load json data from a file
var fonts = require('./fonts.json');


function create_model() {
    let fontList = ""
    //console.log("test", fonts)
    for (var i = 0; i < fonts.fonts.length; i++) {
        //console.log(fonts.fonts[i])
        fontList += `
        <li class="font-picker-model-body-content-list-item font-select" id="font-select" data-font-name="${fonts.fonts[i].family}" data-index="${i}">
            <span class="font-picker-model-body-content-list-item-text">${fonts.fonts[i].family} <i>With ${fonts.fonts[i].variants.length} styles</i></span>
        </li>
        `;
    }
    let div = document.createElement('div');
    div.className = 'font-picker-model';
    div.innerHTML = `
        <div class="font-picker-model-header">
            <div class="font-picker-model-header-close">
                <span class="font-picker-model-header-close-text">&times;</span>
            </div>
            <h2 class="font-picker-model-header-title-text">Font Picker</h2>

        </div>
        <div class="font-picker-model-body">
            <div class="font-picker-model-body-content">
                <div class="font-picker-model-body-content-title">
                    <span class="font-picker-model-body-content-title-text">Fonts</span>
                </div>
                <div class="font-picker-model-body-content-list">
                    ${fontList}
                </div>
            </div>
        </div>
        `;
    return div;
}

function fontpicker(selecter)
{
    selecter.appendChild(create_model());
    let fontSelect = document.getElementsByClassName("font-select");
    // add event addEventListener.
    for (var i = 0; i < fontSelect.length; i++) {
        fontSelect[i].addEventListener('click', function(e) {
            let font = fonts.fonts[this.getAttribute('data-index')];
            // selecter.value = e.dataset.fontName;
            // let fontName = e.target.dataset.fontName;
            // let index = e.target.dataset.index;
            console.log( font);
            // selecter.value = fontName;
            // selecter.dispatchEvent(new Event('change'));
        });
    }
}

export {
    fontpicker
}