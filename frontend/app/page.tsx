'use client';

import React, { useState } from 'react';

type Team = {
  team_name: string;
  roster: string[];
};

export default function RostersPage() {
  const [platform, setPlatform] = useState<'sleeper' | 'espn'>('espn');
  const [leagueId, setLeagueId] = useState('');
  const [year, setYear] = useState('');
  const [espnS2, setEspnS2] = useState('');
  const [swid, setSwid] = useState('');
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleESPNSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:8001/api/espn/league', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leagueId: parseInt(leagueId),
          year: parseInt(year),
          espnS2,
          swid,
        }),
      });

      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

      const data = await res.json();
      setTeams(data.league);
    } catch (err) {
      setError((err as Error).message);
      setTeams(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSleeperSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:8001/api/sleeper/league', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leagueId
        }),
      });

      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

      const data = await res.json();
      setTeams(data.league);
    } catch (err) {
      setError((err as Error).message);
      setTeams(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Get Fantasy League Rosters</h1>

      {/* Tabs */}
      <div className="flex bg-gray-800 space-x-4 mb-6 ">
        <button
          onClick={() => setPlatform('espn')}
          className={`px-4 py-2 rounded border ${
            platform === 'espn' ? 'border-blue-600' : 'border-transparent'
          }`}
        >
          ESPN
        </button>
        <button
          onClick={() => setPlatform('sleeper')}
          className={`px-4 py-2 rounded border ${
            platform === 'sleeper' ? 'border-blue-600' : 'border-transparent'
          }`}
        >
          Sleeper
        </button>
        {/* Add more platforms here */}
      </div>

      {/* Platform-specific form */}
      {platform === 'espn' && (
        <form onSubmit={handleESPNSubmit} className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="League ID"
            value={leagueId}
            onChange={(e) => setLeagueId(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="espn_s2"
            value={espnS2}
            onChange={(e) => setEspnS2(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="swid"
            value={swid}
            onChange={(e) => setSwid(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? 'Loading...' : 'Get ESPN Rosters'}
          </button>
        </form>
      )}

      {platform === 'sleeper' && (
        <form onSubmit={handleSleeperSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="League ID"
          value={leagueId}
          onChange={(e) => setLeagueId(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Loading...' : 'Get Sleeper Rosters'}
        </button>
      </form>
      )}

      {error && <p className="text-red-600">Error: {error}</p>}

      {teams && (
        <div>
          {teams.map((team, i) => (
            <div key={i} className="mb-6 p-4 border rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{team.team_name}</h2>
              <ul className="list-disc list-inside">
                {team.roster.map((player, j) => (
                  <li key={j}>{player}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
