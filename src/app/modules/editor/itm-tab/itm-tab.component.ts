import { Component, Input } from '@angular/core';
import { ItemTabContext } from '../../../workspace/tab-context';

@Component({
    selector: 'app-itm-tab',
    templateUrl: './itm-tab.component.html',
    styleUrl: './itm-tab.component.scss'
})

export class ItmTabComponent {
    @Input() context?: ItemTabContext;
}
