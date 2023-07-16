import { ChatInputCommandInteraction, bold, time } from 'discord.js'
import premiumLimits from '../../constants/premium'
import generateErrorEmoji from '../../helpers/generateErrorEmoji'
import generateId from '../../helpers/generateId'
import GameClient from '../../structures/Client'
import Premium, { PremiumTier } from '../../structures/Premium'
import Game from '../../structures/game/Game'
import { GameTopics } from '../../structures/game/types'
import playInviteMessage from './inviteMessage'

export default async function playCommandExecute(client: GameClient, interaction: ChatInputCommandInteraction<'cached'>) {
  const id = generateId(client, interaction.options.getString('code', false))
  const premiumTier = await Premium.getTier(client, interaction.guildId)
  const maxTeams = interaction.options.getNumber('teams', true)
  const maxWords = premiumLimits[premiumTier].maxWords

  if (!id) {
    await interaction.reply({ content: `The invite code is currently in use. ${generateErrorEmoji()}`, ephemeral: true })
    return
  }

  const errorStatus = await handleCooldown(client, interaction, premiumTier)
    || await handleErrors(client, interaction)
    || await handlePremiumTopic(client, interaction, premiumTier)
    || await handlePremiumOngoing(client, interaction, premiumTier)
    || await handlePremiumGames(client, interaction, premiumTier)
    || await handlePremiumTeams(client, interaction, premiumTier)

  if (errorStatus) return

  client.games.set(id, new Game(id, {
    hostId: interaction.user.id,
    guildId: interaction.guildId,
    channelId: interaction.channelId,
    maxTeams,
    maxWords,
    winScore: interaction.options.getInteger('score', false),
    topic: (interaction.options.getString('topic', false) as GameTopics),
    time: interaction.options.getInteger('time', false),
  }))

  await playInviteMessage(client, interaction, id, maxTeams)
}

async function handleErrors(client: GameClient, interaction: ChatInputCommandInteraction<'cached'>) {
  if (client.games.some(game => game.hostId == interaction.user.id)) {
    await interaction.reply({ content: 'You are already hosting a game', ephemeral: true })
    return true
  }

  return false
}

async function handleCooldown(client: GameClient, interaction: ChatInputCommandInteraction<'cached'>, premiumTier: PremiumTier) {
  const cooldownData = client.cooldown.get(`play-${interaction.guildId}-${interaction.user.id}`)

  if (!cooldownData) {
    client.cooldown.set(`play-${interaction.guildId}-${interaction.user.id}`, new Date(Date.now() + premiumLimits[premiumTier].cooldown))
    return false
  }

  else {
    if (cooldownData.getTime() < Date.now()) {
      client.cooldown.set(`play-${interaction.guildId}-${interaction.user.id}`, new Date(Date.now() + premiumLimits[premiumTier].cooldown))
      return false
    }
  }

  await interaction.reply({ content: `You are on cooldown. You can create a game ${time(cooldownData.getTime())}`, ephemeral: true })
  return true
}

async function handlePremiumTopic(client: GameClient, interaction: ChatInputCommandInteraction<'cached'>, premiumTier: PremiumTier) {
  const topic = interaction.options.getString('topic', false) as GameTopics

  if (topic) {

    if (premiumTier == 'free') {
      await interaction.reply({ content: `With ${bold(premiumTier)} tier you can play only with free words pack.`, ephemeral: true })
      return true
    }

    if (topic == 'animal' || topic == 'anime' || topic == 'programming') {
      if (premiumTier == 'basic') {
        await interaction.reply({ content: `Special words pack are available with higher tiers than ${bold(premiumTier)}` })
      }
    }
  }

  return false
}

async function handlePremiumOngoing(client: GameClient, interaction: ChatInputCommandInteraction<'cached'>, premiumTier: PremiumTier) {
  const games = client.games.filter(game => game.guildId == interaction.guildId)

  if (games.size != 0) {
    if (premiumTier == 'free' && games.size + 1 > premiumLimits.free.maxOngoing) {
      await interaction.reply({ content: `With ${bold(premiumTier)} tier server can have ${bold(premiumLimits.free.maxOngoing.toString())} game at a time.`, ephemeral: true })
      return true
    }

    else if (premiumTier == 'basic' && games.size + 1 > premiumLimits.basic.maxOngoing) {
      await interaction.reply({ content: `With ${bold(premiumTier)} tier server can have ${bold(premiumLimits.basic.maxOngoing.toString())} games at a time.`, ephemeral: true })
      return true
    }

    else if (premiumTier == 'ultra' && games.size + 1 > premiumLimits.ultra.maxOngoing) {
      await interaction.reply({ content: `With ${bold(premiumTier)} tier server can have ${bold(premiumLimits.ultra.maxOngoing.toString())} games at a time.`, ephemeral: true })
      return true
    }
  }

  return false
}

async function handlePremiumGames(client: GameClient, interaction: ChatInputCommandInteraction<'cached'>, premiumTier: PremiumTier) {
  const data = client.gamesPerDay.get(interaction.guildId)

  if (data) {
    const activeGames = data.filter(game => game.getTime() > Date.now()) ?? []
    client.gamesPerDay.set(interaction.guildId, [new Date(Date.now() + 86_400_000), ...activeGames])
  }

  else {
    client.gamesPerDay.set(interaction.guildId, [new Date(Date.now() + 86_400_000)])
  }

  const count = client.gamesPerDay.get(interaction.guildId)?.length ?? 0

  if (premiumTier == 'free' && count > premiumLimits.free.gamesPerDay) {
    await interaction.reply({ content: `With ${bold(premiumTier)} tier server can have ${bold(premiumLimits.free.gamesPerDay.toString())} games per day.`, ephemeral: true })
    return true
  }

  else if (premiumTier == 'basic' && count > premiumLimits.basic.gamesPerDay) {
    await interaction.reply({ content: `With ${bold(premiumTier)} tier server can have ${bold(premiumLimits.basic.gamesPerDay.toString())} games per day.`, ephemeral: true })
    return true
  }

  else if (premiumTier == 'ultra' && count > premiumLimits.ultra.gamesPerDay) {
    await interaction.reply({ content: `With ${bold(premiumTier)} tier server can have ${bold(premiumLimits.ultra.gamesPerDay.toString())} games per day.`, ephemeral: true })
    return true
  }

  return false
}

async function handlePremiumTeams(client: GameClient, interaction: ChatInputCommandInteraction<'cached'>, premiumTier: PremiumTier) {
  const maxTeam = interaction.options.getNumber('teams', true)

  if (premiumTier == 'free' && maxTeam > premiumLimits.free.maxTeams) {
    await interaction.reply({ content: `With ${bold(premiumTier)} tier servers can only have ${bold(premiumLimits.free.maxTeams.toString())} teams.`, ephemeral: true })
    return true
  }

  else if (premiumTier == 'basic' && maxTeam > premiumLimits.basic.maxTeams) {
    await interaction.reply({ content: `With ${bold(premiumTier)} tier servers can have ${bold(premiumLimits.basic.maxTeams.toString())} teams.`, ephemeral: true })
    return true
  }

  else if (premiumTier == 'ultra' && maxTeam > premiumLimits.ultra.maxTeams) {
    await interaction.reply({ content: `With ${bold(premiumTier)} tier servers can have ${bold(premiumLimits.ultra.maxTeams.toString())} teams.`, ephemeral: true })
    return true
  }

  return false
}