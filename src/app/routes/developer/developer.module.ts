import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {ChartsComponent} from "./charts/charts.component";
import {DemoEchartsDevComponent} from "./charts/echarts-dev.component";
import {NgJsonEditorModule} from "ang-jsoneditor";
import {DemoPanelDevComponent} from "./panel/panel-dev.component";
import {DemoPanelsComponent} from "./panel/panels.component";
import {ZjDeveloperRootModule} from "@delon/platform/developer";


const routes: Routes = [
    {path: 'charts', component: ChartsComponent},
    {path: 'charts/:id', component: DemoEchartsDevComponent},
    {path: 'panels', component: DemoPanelsComponent},
    {path: 'panels/:id', component: DemoPanelDevComponent},
];

@NgModule({
    imports: [
        SharedModule,
        ZjDeveloperRootModule,
        NgJsonEditorModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ChartsComponent,
        DemoEchartsDevComponent,
        DemoPanelDevComponent,
        DemoPanelsComponent
    ],
    exports: [
        RouterModule
    ],
    entryComponents: []
})
export class DeveloperModule {
}
