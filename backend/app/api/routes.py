from fastapi import FastAPI
from models.espn.league import LeagueRequest, LeagueResponse, Team
from espn_api.football import League
from sleeper_api.football.league import get_rosters

app = FastAPI()


@app.post("/api/espn/league", response_model=LeagueResponse)
def get_espn_league(leagueInfo: LeagueRequest):
    league = League(
        league_id=leagueInfo.leagueId, 
        year=leagueInfo.year, 
        espn_s2=leagueInfo.espnS2, 
        swid=leagueInfo.swid
    )
    return LeagueResponse(
        league=[
            Team(
                team_name=team.team_name,
                roster=[player.name for player in team.roster]
            )
            for team in league.teams
        ]
    )


@app.post("/api/sleeper/league")
def get_sleeper_league(leagueId: str):
    return get_rosters(leagueId)