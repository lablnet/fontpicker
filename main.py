import json
from script.fonts import prepare_url, get_fonts_from_gapi, parse_fonts, create_json
import json

url = "https://www.googleapis.com/webfonts/v1/webfonts?key=:KEY"

if __name__ == "__main__":
    url = prepare_url(url)
    fonts = get_fonts_from_gapi(url)
    if fonts:
        fonts = parse_fonts(fonts)
        create_json(fonts, './src/fonts.json')
        # print(json.dumps(fonts, indent=4))
    else:
        print("Error")
