from fastapi import FastAPI
from models.espn.league import LeagueRequest, LeagueResponse, Team
from espn_api.football import League
from sleeper_api.football.league import get_rosters
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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