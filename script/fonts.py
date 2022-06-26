import requests
import json
from typing import Union
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()


def prepare_url(url: str) -> str:
    """ Prepare url for Google Fonts API.
    :param url: Google Fonts API url.
    :return: Prepared url.
    :throw: None.
    :rtype: str.
    :Example:
    >>> prepare_url(url)
    """
    return url.replace(':KEY', os.getenv('GOOGLE_API_KEY'))


def get_fonts_from_gapi(url: str) -> Union[dict, None]:
    """ Get fonts from Google Fonts API.
    :param url: Google Fonts API url.
    :return: Dictionary with fonts if successful, None otherwise.
    :throw: None.
    :rtype: dict or None.
    :Example:
    >>> get_fonts(url)
    """
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = json.loads(response.text)
            return data["items"]
        else:
            return None
    except Exception as e:
        return None


def parse_fonts(fonts: dict) -> dict:
    """ Parse fonts from Google Fonts API.
    :param fonts: Dictionary with fonts.
    :return: Dictionary with parsed fonts.
    :throw: None.
    :rtype: dict.
    :Example:
    >>> parse_fonts(fonts)
    """
    data = {
        "languages": [],
        "fonts": [],
        "categories": []
    }
    for font in fonts:
        languages = font['subsets']
        category = font['category']
        for lang in languages:
            lang = lang.replace('-', ' ')
            lang = ' '.join(word.capitalize() for word in lang.split())

            if lang not in data['languages']:
                data['languages'].append(lang)
        if category not in data['categories']:
            data['categories'].append(category)
        data['fonts'].append(
            {
                # remove space with +.
                'family': font['family'].replace(' ', '+'),
                'variants': font['variants'],
                'files': font['files'],
                'lastModified': font['lastModified']
            }
        )
    return data


def create_json(data: dict, path: str = 'fonts.json') -> None:
    """ Create json file with fonts.
    :param data: Dictionary with fonts.
    :return: None.
    :throw: None.
    :rtype: None.
    :Example:
    >>> create_json(data)
    """
    with open(path, 'w') as f:
        json.dump(data, f, indent=4)
