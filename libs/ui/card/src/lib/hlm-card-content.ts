import { Directive } from '@angular/core';
import { classes } from '@ui/utils';

@Directive({
	selector: '[hlmCardContent]',
})
export class HlmCardContent {
	constructor() {
		classes(() => 'px-6');
	}
}
