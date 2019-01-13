import { ChannelService } from './channels';
import { CommandRegistry, CommandService } from './commands';
import { EventDispatcher } from './dispatcher';
import { EnhancerRegistry, EnhancerService } from './enhancers';
import { HistoryService } from './history';
import { Plugin, PluginService } from './plugins';
import { ProbeRegistry, ProbeService } from './probes';
import { ReactionRegistry, ReactionService } from './reactions';

export interface ReactRenderParams {
  React: any;
  jsx: any;
  plugins: Plugin[];
}

export class ReactCore {
  private dispatcher: EventDispatcher;

  private probes: ProbeService;
  private enhancers: EnhancerService;
  private channels: ChannelService;
  private reactions: ReactionService;
  private commands: CommandService;
  private plugins: PluginService;
  private history: HistoryService;

  constructor(
    probeRegistry: ProbeRegistry,
    enhancerRegistry: EnhancerRegistry,
    reactionRegistry: ReactionRegistry,
    commandRegistry: CommandRegistry,
  ) {
    this.probes = new ProbeService(probeRegistry);
    this.enhancers = new EnhancerService(this.probes, enhancerRegistry);
    this.channels = new ChannelService();
    this.history = new HistoryService();
    this.reactions = new ReactionService(
      this.probes,
      this.channels,
      reactionRegistry,
      this.history,
    );
    this.dispatcher = new EventDispatcher(this.enhancers, this.reactions, this.history);
    this.commands = new CommandService(this.dispatcher, commandRegistry);
    this.plugins = new PluginService(this.commands);

    this.dispatcher.subscribeTo(this.probes.probeEvents);
  }

  public render({ React, jsx, plugins }: ReactRenderParams): Promise<any> {
    this.plugins.add(plugins);

    console.log('rendered');
    return React.render(jsx);
  }
}
