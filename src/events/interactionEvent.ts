import { Interaction } from 'discord.js'
import joinCommandAutocomplete from '../commands/join/autocomplete'
import joinCommandExecute from '../commands/join/execute'
import playCommandExecute from '../commands/play/execute'
import playCommandEnd from '../commands/play/game/end'
import playCommandPlay from '../commands/play/game/play'
import playCommandStart from '../commands/play/game/start'
import playInviteMessage from '../commands/play/inviteMessage'
import testCommandExecute from '../commands/test/execute'
import GameClient from '../structures/Client'


export default async function(client: GameClient, interaction: Interaction) {
  if (interaction.isButton() && interaction.inCachedGuild() && interaction.customId.startsWith('refresh'))  playInviteMessage(client, interaction)
  else if (interaction.isAutocomplete()) await joinCommandAutocomplete(client, interaction)
  else if (interaction.isButton() && interaction.customId.startsWith('start')) await playCommandStart(client, interaction)
  else if (interaction.isButton() && interaction.customId.startsWith('play')) await playCommandPlay(client, interaction)
  else if (interaction.isButton() && interaction.customId.startsWith('end')) await playCommandEnd(client, interaction)
  else if (interaction.isChatInputCommand() && interaction.inCachedGuild() && interaction.command?.name == 'play') await playCommandExecute(client, interaction)
  else if (interaction.isChatInputCommand() && interaction.command?.name == 'join') await joinCommandExecute(client, interaction)
  else if (interaction.isChatInputCommand() && interaction.inCachedGuild() && interaction.command?.name == 'test') testCommandExecute(client, interaction)
}