import { Client, Collection, ApplicationCommandDataResolvable } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { Command, Event, RegisterCommandOptions } from '../Interfaces/intex';
import { readdirSync } from 'fs';

class Bot extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public config = process.env;
  public aliases: Collection<string, Command> = new Collection();

  public constructor() {
    super({
      intents:["GUILDS"],
      partials: ['CHANNEL', 'GUILD_MEMBER', 'USER', 'MESSAGE'],
    })
  }

  async importFile(filePath: string) {
    return (await import(filePath)?.slash)
  }

  async registerCommands({ commands, guildId }: RegisterCommandOptions) {
    if(guildId){
      this.guilds.cache.get(guildId)?.commands.set(commands);
      console.log('Registrei comando em certo servidor');
    } else {
      this.application?.commands.set(commands);
      console.log('Registrei comandos globalmente');
    }
  }


}

export default Bot;