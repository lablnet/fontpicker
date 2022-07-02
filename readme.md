[![pages-build-deployment](https://github.com/lablnet/fontpicker/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/lablnet/fontpicker/actions/workflows/pages/pages-build-deployment)

# fontpicker

A standalone font picker for the web. A package to quickly choose fonts from Google Web Fonts and preview a font from Google's large range of free fonts, and optionally select a font weight and font style (normal or italics).

## Features
- [x] Quickly preview and select any Google font family.
- [x] Optionally choose font weight and font style.
- [ ] Find fonts by name, language and category (serif, sans-serif, display, handwriting, monospace).

More features will be added in later release.


## Installations
#### Using npm

```sh
npm i @lablnet/fontpicker
```
```js
import fontpicker from '@lablnet/fontpicker';

let picker = document.getElementById("picker");
fontpicker(picker, (data) => {
    let paragraph = document.getElementById("paragraph");
    paragraph.style.fontFamily = data.fontFamily;
})
```

## Contribution  
You're welcome to contribute to this project.  
You should follow contribution guideline [Contribution guideline](https://github.com/lablnet/Data_Structure/blob/main/CONTRIBUTING.md)  
  

## License
- GPLv3
