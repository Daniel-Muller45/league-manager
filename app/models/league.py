from pydantic import BaseModel
from typing import List

class LeagueRequest(BaseModel):
    leagueId: int
    year: int
    espnS2: str
    swid: str

class Team(BaseModel):
    team_name: str
    roster: List[str]


class LeagueResponse(BaseModel):
    league: List[Team]
