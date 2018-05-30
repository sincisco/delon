import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgxEchartsModule} from 'ngx-echarts';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {AngularSplitModule} from 'angular-split';
import {ScreenComponent} from './screen.component';
import {CardAlternativesComponent} from './components/card-alternatives.component';
import {TurnOverComponent} from './components/turn-over.component';
import {EchartsGraphComponent} from './components/echarts-graph.component';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ViewInfoComponent} from './components/view-info.component';
import {ViewDetailComponent} from './components/view-detail.component';
import {ViewRankComponent} from './components/view-rank.component';
import {ZjCarouselModule} from '../carousel';
import {SCREENSERVICE} from './config';
import {ToggleFullscreenDirective} from './components/toggle-fullscreen.directive';

const COMPONENTS = [
    ScreenComponent,
    CardAlternativesComponent,
    TurnOverComponent,
    EchartsGraphComponent,
    ViewInfoComponent,
    ViewDetailComponent,
    ViewRankComponent
];

@NgModule({
    imports: [
        CommonModule,
        NgxEchartsModule,
        NgZorroAntdModule,
        PerfectScrollbarModule,
        ZjCarouselModule,
        AngularSplitModule
    ],
    declarations: [
        ToggleFullscreenDirective,
        ...COMPONENTS,
    ],
    entryComponents: [
        ...COMPONENTS
    ],
    exports: [
        ScreenComponent
    ]
})
export class ZjScreenModule {
    static forRoot(ClassForScreenService): ModuleWithProviders {
        return {
            ngModule: ZjScreenModule,
            providers: [
                {provide: SCREENSERVICE, useClass: ClassForScreenService},
            ]
        };
    }
}
