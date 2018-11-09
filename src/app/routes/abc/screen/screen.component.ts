import {Component, SystemJsNgModuleLoader} from '@angular/core';
import {provideRoutes} from '@angular/router';

@Component({
    selector: 'app-demo-screen',
    template: `
        <zj-screen></zj-screen>
    `,
    styles: [`
        :host {
            height: 800px;
        }
    `],
    providers: [
        SystemJsNgModuleLoader,
        provideRoutes([
            {loadChildren: 'app/routes/lazy/nml-lazy.module#NMLLazyModule'}
        ])
    ]
})
export class DemoScreenComponent {


}
