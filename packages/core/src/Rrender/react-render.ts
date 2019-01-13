import { commandRegistry } from '../commands';
import { enhancerRegistry } from '../enhancers';
import { ReactCore, ReactRenderParams } from '../framework';
import { probeRegistry } from '../probes';
import { reactionRegistry } from '../reactions';

export function reactRender(reactRenderParams: ReactRenderParams) {
  console.log('got here');
  const reactCore = new ReactCore(
    probeRegistry,
    enhancerRegistry,
    reactionRegistry,
    commandRegistry,
  );
  (window as any).r = reactCore;

  return reactCore.render(reactRenderParams);
}
