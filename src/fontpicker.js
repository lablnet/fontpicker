// load json data from a file
var fonts = require('./fonts.json');


function create_model() {
    let fontList = ""
    for (let i = 0; i < fonts.fonts.length; i++) {
        fontList += `
        <li class="font-picker-model-body-content-list-item font-select" id="font-select" data-font-name="${fonts.fonts[i].family}" data-index="${i}">
            <span class="font-picker-model-body-content-list-item-text">${fonts.fonts[i].family.replace(/\+/g, " ")} <i>With ${fonts.fonts[i].variants.length == 0 ? 1 : fonts.fonts[i].variants.length} styles, <b>${fonts.fonts[i].category}</b></i></span>            
            <div class="font-variants">
            ${fonts.fonts[i].variants.map(function (variant) {
            if (variant.endsWith('i')) return
            return `<span class="font-variants-list button-${i}" data-font-name="${fonts.fonts[i].family}" data-font-style="${variant}">${variant}</span>`
        }).join('')}
            <div class="font-button">
                <button class="choose">Select</button>
            </div>
        </div>
        </li>
        `;
    }

    let div = document.createElement('div');
    div.className = 'font-picker-model';
    div.innerHTML = `
    <div class="font-picker-model-content">
        <div class="font-picker-model-header">
            <div class="font-picker-model-header-close">
                <span class="font-picker-model-header-close-text">&times;</span>
            </div>
            <h2 class="font-picker-model-header-title-text">Font Picker</h2>

        </div>
        <div class="font-picker-model-body">
            <div class="font-picker-model-body-content">
                <p class="preview">The quick brown fox jumps over the lazy dog.</p>
                <div class="font-picker-model-body-content-title">
                    <span class="font-picker-model-body-content-title-text">Fonts</span>
                </div>
                <div class="font-picker-model-body-content-list">
                    ${fontList}
                </div>
            </div>
        </div>
        </div>
        `;
    return div;
}

function fontpicker(selecter) {
    let data = {
        fontFamily: "",
        fontWeight: 400,
        fontStyle: false,
        link: "",
    }
    selecter.appendChild(create_model());
    let fontSelect = document.getElementsByClassName("font-select");
    for (var i = 0; i < fontSelect.length; i++) {
        let buttons = document.getElementsByClassName(`button-${i}`);
        for (let j = 0; j < buttons.length; j++) {
            buttons[j].addEventListener('click', function (e) {
                let weight = this.getAttribute('data-font-style');
                // check if it's italic.
                let preview = document.getElementsByClassName('preview')[0];
                if (weight === 'italic') {
                    preview.style.fontStyle = 'italic';
                    data.fontStyle = "italic";
                } else {
                    preview.style.fontWeight = weight;
                    data.fontStyle = "normal";
                    data.fontWeight = weight;
                }
                for (let k = 0; k < buttons.length; k++) {
                    let weight = buttons[k].getAttribute('data-font-style');
                    if (weight != 'italic') {
                        buttons[k].style.backgroundColor = "#eee"
                        buttons[k].style.color = "#555"
                    }
                }
                buttons[j].style.backgroundColor = "#000"
                buttons[j].style.color = "#fff"
            })
        }

        fontSelect[i].addEventListener('mouseover', function (e) {
            let font = fonts.fonts[this.getAttribute('data-index')];
            data.fontFamily = font.family.replace(/\+/g, " ")
            let variants = '400,';
            variants += font.variants.map((variant => {
                if (variant == 'italic') return;
                return variant;
            }))
            let fontLink = document.createElement('link');
            fontLink.rel = 'stylesheet';
            fontLink.href = `https://fonts.googleapis.com/css?family=${font.family}:${variants}&amp;display=swap`;
            fontLink.type = 'text/css';
            document.head.appendChild(fontLink);
            // apply that font to the preview text.
            let preview = document.getElementsByClassName('preview')[0];
            preview.style.fontFamily = `'${data.fontFamily}'`;
            preview.style.fontStyle = 'normal';
            console.log(data, "clicked")
        });
    }
}

export {
    fontpicker
}
