import {Component} from '@angular/core';

@Component({
    selector: 'app-demo-screen',
    template: `
        <zj-screen [headImg]="headImage"></zj-screen>
    `,
    styles: [`
        :host {
            height: 800px;
        }
    `]
})
export class DemoScreenComponent {

    headImage = 'data:image/png;base64,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';
}
