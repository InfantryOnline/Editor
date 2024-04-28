import { Component, Input } from '@angular/core';
import { LioTabContext } from '../../../workspace/tab-context';

@Component({
    selector: 'app-lio-tab',
    templateUrl: './lio-tab.component.html',
    styleUrl: './lio-tab.component.scss'
})
export class LioTabComponent {
    @Input() context: LioTabContext | null = null;

    constructor() {
        console.log(this.context);
    }
}
