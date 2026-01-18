import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { HlmCardImports } from '@ui/card';

@Component({
  selector: 'bt-map-popup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmCardImports],
  template: `
    <section hlmCard class="min-w-48">
      <div hlmCardHeader>
        <h3 hlmCardTitle>{{ stadium() }}</h3>
        <p hlmCardDescription>{{ team() }}</p>
      </div>
      <div hlmCardContent>
        <p class="text-muted-foreground text-sm">Class: {{ ballparkClass() }}</p>
      </div>
    </section>
  `,
})
export class BtMapPopup {
  stadium = input.required<string>();
  team = input.required<string>();
  ballparkClass = input.required<string>();
}
