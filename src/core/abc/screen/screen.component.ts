import {Component, Inject, Injector, Input, OnInit} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CardAlternativesComponent} from './components/card-alternatives.component';

import * as _ from 'lodash';
import {EchartsGraphComponent} from './components/echarts-graph.component';
import {panelAdapt} from './componentTypeUtil';
import {SCREENSERVICE} from './config';


@Component({
    selector: 'zijin-screen',
    templateUrl: './screen.html',
    styleUrls: ['./screen.less']
})
export class ScreenComponent implements OnInit {

    splitConf = null;
    setting = false;
    openSetting = false;
    fullScreen = false;
    alternatives = []; // 图表选择项

    lCards = [];
    rCards = [];
    cCards = [];
    carouselCards = [];

    constructor(private injector: Injector,
                private modal: NzModalService,
                @Inject(SCREENSERVICE) private screenService,
                private message: NzMessageService) {
    }

    ngOnInit() {

        this.screenService.getScreenDef().subscribe(screenConfig => {
            // 获取布局settings
            this.splitConf = screenConfig.layout;

            // 获取Components
            this.lCards = panelAdapt(screenConfig.lCards, this.injector);
            this.rCards = panelAdapt(screenConfig.rCards, this.injector);
            this.cCards = panelAdapt(screenConfig.cCards, this.injector);
        });

        this.carouselCards = [
            {
                data: {id: '6303db6b-bd84-466c-afeb-036dba27b8ec'},
                component: EchartsGraphComponent,
            },
            {
                data: {id: '6303db6b-bd84-466c-afeb-036dba27b8ec'},
                component: EchartsGraphComponent,
            }
        ];

        this.screenService.getSelfDefCharts()
            .subscribe((data) => {
                this.alternatives = panelAdapt(data['retList'], this.injector);
            });
    }

    cardModal(card) {
        this.modal.open({
            content: CardAlternativesComponent,
            footer: false,
            componentParams: {
                alts: this.alternatives
            }
        }).subscribe(value => {
            if (value.id) {
                if (this.lCards.indexOf(card) !== -1) {
                    this.lCards[this.lCards.indexOf(card)] = value;
                } else if (this.rCards.indexOf(card) !== -1) {
                    this.rCards[this.rCards.indexOf(card)] = value;
                } else if (this.cCards.indexOf(card) !== -1) {
                    this.cCards[this.cCards.indexOf(card)] = value;
                }
            }
        });
    }


    openSettings() {
        this.openSetting = true;
        setTimeout(() => {
            this.splitConf.disabled = false;
            this.setting = true;
            this.openSetting = false;
        }, 50);
    }

    saveSettings() {
        this.openSetting = false;

        this.setting = false;
        this.splitConf.disabled = true;

        // const params = {
        //     layout: this.splitConf,
        //     lCards: this.transform(this.lCards),
        //     rCards: this.transform(this.rCards),
        //     cCards: this.transform(this.cCards),
        //     // carouselCards: this.carouselCards
        // };
        //
        // console.log(params);
        //
        // this.screenService.updateScreenDef(params)
        //     .subscribe(data => {
        //         this.setting = false;
        //         this.splitConf.disabled = true;
        //         localStorage.setItem('screenDef', JSON.stringify(params));
        //         console.log(data);
        //     }, err => {
        //         this.message.error(err.body.retMsg);
        //     });


    }

    onDragEnd(columnindex: number, e: { gutterNum: number, sizes: Array<number> }) {
        console.log('columnindex', columnindex);
        console.log('sizesArray', e.sizes);
        if (columnindex === -1) { // Column dragged
            // Set size for all visible columns
            this.splitConf.lColumn.size = e.sizes[0];
            this.splitConf.cColumn.size = e.sizes[1];
            this.splitConf.rColumn.size = e.sizes[2];
            // this.splitConf.columns.filter(c => c.visible === true).forEach((column, index) => column.size = e.sizes[index]);
        } else if (columnindex === 1) { // Row dragged
            // Set size for all visible rows from specified column
            this.splitConf.lColumn.rows.filter(r => r.visible === true).forEach((row, index) => row.size = e.sizes[index]);
        } else if (columnindex === 2) {
            this.splitConf.cColumn.rows.filter(r => r.visible === true).forEach((row, index) => row.size = e.sizes[index]);
        } else if (columnindex === 3) {
            this.splitConf.rColumn.rows.filter(r => r.visible === true).forEach((row, index) => row.size = e.sizes[index]);

        }

    }

    transform(arr: Array<any>) {
        return _.transform(arr, (result, item: any) => {
            if (item.type >= 10) {
                result.push({
                    id: item.id,
                    type: item.type,
                    chart_option: item.chart_option
                });
            } else {
                result.push({
                    id: item.id,
                    type: item.type,
                });
            }
        }, []);
    }

    trackByFn(index) {
        return index;
    }
}