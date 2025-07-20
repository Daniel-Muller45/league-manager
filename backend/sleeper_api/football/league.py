import requests as req

def get_rosters(leagueId: str):
    url = f"https://api.sleeper.app/v1/league/{leagueId}/rosters"
    response = req.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to retrieve rosters for league {leagueId}: {response.status_code}")


print(get_rosters('1122923583736557568'))