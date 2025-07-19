import requests as req


def get_id(userName: str):
    url = f'https://api.sleeper.app/v1/user/{userName}'
    response = req.get(url)
    if response.status_code == 200:
        return response.json()['user_id']
    else:
        print(f"Failed retrieving user ID: {response.status_code}")


def get_leagues(userId, sport, season):
    url = f'https://api.sleeper.app/v1/user/{userId}/leagues/{sport}/{season}'
    response = req.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to retrieve leagues: {response.status_code}")