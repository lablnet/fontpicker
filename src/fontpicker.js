// load json data from a file
var fonts = require('./fonts.json');
import './style.scss'

function create_model() {
    let fontList = ""
    for (let i = 0; i < fonts.fonts.length; i++) {
        fontList += `
        <li class="font-picker-model-body-content-list-item font-select" id="font-select" data-font-name="${fonts.fonts[i].family}" data-index="${i}">
            <span class="font-picker-model-body-content-list-item-text">${fonts.fonts[i].family.replace(/\+/g, " ")} <i>With ${fonts.fonts[i].variants.length == 0 ? 1 : fonts.fonts[i].variants.length} styles, <b>${fonts.fonts[i].category}</b></i></span>            
            <div class="font-variants">
            ${fonts.fonts[i].variants.map(function (variant) {
            if (variant.endsWith('i')) return
            return `<span class="font-variants-list button-${i}" data-font-name="${fonts.fonts[i].family}" data-font-style="${variant}">${variant}</span>
            `
        }).join('')}
                <div class="font-button">
                    <button class="choose" data-index="${i}">Select</button>
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

function fontpicker(selector, callback) {
    // Prepare data.
    let data = {
        fontFamily: "",
        fontWeight: 400,
        fontStyle: false,
        link: "",
    }

    // append model to body.
    document.body.appendChild(create_model());

    // Model selector.
    let model = document.getElementsByClassName('font-picker-model')[0];

    // Close button.
    var span = document.getElementsByClassName("font-picker-model-header-close")[0];

    // Event Listener on selctor to open model.
    selector.onclick = () => {
        model.style.display = "block"
    }

    // Event Listener on close element to close model.
    span.onclick = () => {
        model.style.display = "none"
    }

    // Select list of fonts.
    let fontSelect = document.getElementsByClassName("font-select");

    // Iterate over then.
    for (var i = 0; i < fontSelect.length; i++) {

        // Get buttons.
        let buttons = document.getElementsByClassName(`button-${i}`);

        // Iterate over buttons.
        for (let j = 0; j < buttons.length; j++) {

            // Add click Listener.
            buttons[j].addEventListener('click', function (e) {

                // Get font weight.

                let weight = this.getAttribute('data-font-style');

                // Get preview element.
                let preview = document.getElementsByClassName('preview')[0];

                // Check if it's italic.
                if (weight === 'italic') {
                    preview.style.fontStyle = 'italic';
                    data.fontStyle = "italic";
                } else {
                    preview.style.fontWeight = weight;
                    data.fontStyle = "normal";
                    data.fontWeight = weight;
                }

                // Unselect other buttons by changing the color.
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

        // Add mouseover Listener.
        fontSelect[i].addEventListener('mouseover', function (e) {
            // Get font index.
            let font = fonts.fonts[this.getAttribute('data-index')];

            data.fontFamily = font.family.replace(/\+/g, " ")
            let variants = '400,';

            // Prepare varients.
            variants += font.variants.map((variant => {
                if (variant == 'italic') return;
                return variant;
            }))

            // Prepare the link.
            let link = `https://fonts.googleapis.com/css?family=${font.family}:${variants}&amp;display=swap`;

            data.link = link;

            // Prepare the link tag and append to head.
            let fontLink = document.createElement('link');
            fontLink.rel = 'stylesheet';
            fontLink.href = link
            fontLink.type = 'text/css';
            document.head.appendChild(fontLink);
            // apply that font to the preview text.
            let preview = document.getElementsByClassName('preview')[0];
            preview.style.fontFamily = `'${data.fontFamily}'`;
            preview.style.fontStyle = 'normal';
        });
    }

    // Select choose buttons.
    let select = document.getElementsByClassName('choose');

    // Iterate over select buttons.
    for (let i = 0; i < select.length; i++) {

        // Add click Listener.
        select[i].addEventListener('click', function (e) {
            // Get the font and call callback function.
            let font = fonts.fonts[this.getAttribute('data-index')];
            data.fontFamily = font.family.replace(/\+/g, " ")
            span.click();
            callback(data);
        })
    }
}

export {
    fontpicker
}
