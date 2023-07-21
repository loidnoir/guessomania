import contactCommandAutocomplete from '@commands/contact/autocomplete'
import contactCommandExecute from '@commands/contact/execute'
import contactModal from '@commands/contact/modal'
import helpCommandAutocomplete from '@commands/help/autocomplete'
import helpCommandExecute from '@commands/help/execute'
import joinCommandAutocomplete from '@commands/join/autocomplete'
import joinCommandExecute from '@commands/join/execute'
import playCommandExecute from '@commands/play/execute'
import playCommandEnd from '@commands/play/game/end'
import playCommandPlay from '@commands/play/game/play'
import playCommandStart from '@commands/play/game/start'
import playInviteMessage from '@commands/play/inviteMessage'
import testCommandExecute from '@commands/test/execute'
import GameClient from '@structures/Client'
import { Interaction } from 'discord.js'


export default async function(client: GameClient, interaction: Interaction) {
  if (interaction.isAutocomplete() && interaction.inCachedGuild() && interaction.command?.name == 'join') await joinCommandAutocomplete(client, interaction)
  else if (interaction.isAutocomplete() && interaction.inCachedGuild() && interaction.command?.name == 'help') await helpCommandAutocomplete(client, interaction)
  else if (interaction.isAutocomplete() && interaction.inCachedGuild() && interaction.command?.name == 'contact') await contactCommandAutocomplete(client, interaction)

  else if (interaction.isButton() && interaction.inCachedGuild() && interaction.customId.startsWith('refresh'))  playInviteMessage(client, interaction)
  else if (interaction.isButton() && interaction.inCachedGuild() && interaction.customId.startsWith('start')) await playCommandStart(client, interaction)
  else if (interaction.isButton() && interaction.inCachedGuild() && interaction.customId.startsWith('play')) await playCommandPlay(client, interaction)
  else if (interaction.isButton() && interaction.inCachedGuild() && interaction.customId.startsWith('end')) await playCommandEnd(client, interaction)

  else if (interaction.isChatInputCommand() && interaction.inCachedGuild() && interaction.command?.name == 'play') await playCommandExecute(client, interaction)
  else if (interaction.isChatInputCommand() && interaction.inCachedGuild() && interaction.command?.name == 'join') await joinCommandExecute(client, interaction)
  else if (interaction.isChatInputCommand() && interaction.inCachedGuild() && interaction.command?.name == 'help') await helpCommandExecute(client, interaction)
  else if (interaction.isChatInputCommand() && interaction.inCachedGuild() && interaction.command?.name == 'contact') await contactCommandExecute(client, interaction)
  else if (interaction.isChatInputCommand() && interaction.inCachedGuild() && interaction.command?.name == 'test') testCommandExecute(client, interaction)

  else if (interaction.isModalSubmit() && interaction.customId.startsWith('contact')) contactModal(client, interaction)
}