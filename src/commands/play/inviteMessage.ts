import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChatInputCommandInteraction, MessageActionRowComponentBuilder, bold, userMention } from 'discord.js'
import GameClient from '../../structures/Client'

export default async function playInviteMessage(client: GameClient, interaction: ChatInputCommandInteraction<'cached'> | ButtonInteraction<'cached'>, id?: string, maxTeams?: number) {
  if (!id && !maxTeams && interaction.isButton()) {
    id = interaction.customId.split('-')[1]
    maxTeams = client.games.get(id)?.teams.length
  }

  if (!id || !maxTeams) return

  const game = client.games.get(id)

  if (!game) {
    await interaction.reply({ content: 'The game does not exist.', ephemeral: true })
    return
  }

  const minPlayers = maxTeams * 2

  const buttons = [
    new ButtonBuilder()
      .setCustomId(`start-${id}`)
      .setStyle(ButtonStyle.Primary)
      .setLabel('Start the game')
      .setDisabled(game.players.length < minPlayers || game.teams.some(team => team.players.length < 2)),
    new ButtonBuilder()
      .setCustomId(`refresh-${id}`)
      .setStyle(ButtonStyle.Secondary)
      .setLabel('Refresh'),
    new ButtonBuilder()
      .setCustomId(`end-${id}`)
      .setStyle(ButtonStyle.Secondary)
      .setLabel('End the game')
  ]

  const actionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>()
    .addComponents(buttons)

  const joinedPlayers = game.players.map(player => `- ${userMention(player)} \`${game.teams.filter(team => team.players.includes(player))[0].name}\``).join('\n')

  if (interaction.isButton()) {
    await interaction.update({
      content: `# Invite code \`${id}\`\nAt least ${bold(minPlayers.toString())} players are required to start the game.\n${joinedPlayers ? `## Joined players\n${joinedPlayers}` : ''}`,
      components: [actionRow]
    })
  }

  else {
    await interaction.reply({
      content: `# Invite code \`${id}\`\nAt least ${bold(minPlayers.toString())} players are required to start the game.\n${joinedPlayers ? `## Joined players\n${joinedPlayers}` : ''}`,
      components: [actionRow],
      ephemeral: true
    })
  }
}