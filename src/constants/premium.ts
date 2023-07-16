const premiumLimits = {
  free: {
    duplication: true,
    cooldown: 30_000,
    gamesPerDay: 3,
    maxWords: 10,
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
    cooldown: 10_000,
    gamesPerDay: 10,
    maxWords: 30,
    maxPlayers: 4,
    maxTeams: 3,
    maxOngoing: 5,
    customTeam: false,
    customInvite: false,
    statistics: false,
    playCommandCooldown: 10_000,
    joinCommandCooldown: 5_000
  },
  ultra: {
    duplication: false,
    cooldown: 3_000,
    gamesPerDay: 300,
    maxWords: 500,
    maxPlayers: 25,
    maxTeams: 25,
    maxOngoing: 30,
    customTeam: true,
    customInvite: true,
    statistics: true,
    playCommandCooldown: 3_000,
    joinCommandCooldown: 3_000
  }
}

export default premiumLimits