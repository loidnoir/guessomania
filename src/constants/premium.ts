const premiumLimits = {
  free: {
    duplication: true,
    gamesPerDay: 5,
    maxWords: 15,
    maxPlayers: 2,
    maxTeams: 2,
    maxOngoing: 1,
    customTeam: false,
    customInvite: false,
    statistics: false,
    playCommandCooldown: 30_000,
    joinCommandCooldown: 15_000
  },
  basic: {
    duplication: false,
    gamesPerDay: 30,
    maxWords: 500,
    maxPlayers: 6,
    maxTeams: 4,
    maxOngoing: 5,
    customTeam: true,
    customInvite: true,
    statistics: false,
    playCommandCooldown: 15_000,
    joinCommandCooldown: 10_000
  },
  ultra: {
    duplication: false,
    gamesPerDay: 500,
    maxWords: 500,
    maxPlayers: 8,
    maxTeams: 6,
    maxOngoing: 500,
    customTeam: true,
    customInvite: true,
    statistics: true,
    playCommandCooldown: 3_000,
    joinCommandCooldown: 3_000
  }
}

export default premiumLimits