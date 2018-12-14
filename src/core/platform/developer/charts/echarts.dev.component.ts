import {
    AfterViewInit,
    Component, ContentChild,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CHARTTYPEMAPPING} from './charts.config';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import * as _ from 'lodash';

import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/clouds';
import 'brace/mode/json';
import {CHARTDEVSERVICE} from './config';
import {ReuseTabService} from '@delon/abc';
import {NgxEchartsDirective} from 'ngx-echarts';
import {FormGroupDirective} from '@angular/forms';
import {ZjEchartsDevContentDirective} from './zj-echarts-dev-content.directive';

@Component({
    selector: 'zj-echarts-dev',
    templateUrl: './echarts.dev.html',
    styles: [`
        :host {
            height: 100%;
            width: 100%;
            position: relative;
            background-color: #eeeeee;
        }
    `]
})
export class EchartsDevComponent implements OnInit, AfterViewInit {

    @Input() chartType;
    @Output() onSaveSuccess = new EventEmitter();
    @Input() chartId;
    @ContentChild(ZjEchartsDevContentDirective) content: ZjEchartsDevContentDirective;

    divSize: any = {};  // 记录绘制Echarts图表容器的宽高
    remoteJsonDataLoaded = false;
    payload;    // JSOn 数据

    aceConfig = {
        text: '',
        mode: 'javascript',
        theme: 'clouds',
        readOnly: false,
        textChanged: (text) => {
            this.aceConfig.text = text;
        },
        options: {
            printMargin: false
        }
    };



    public data: any;

    @ViewChild('aceJson') aceJson$: ElementRef;

    @ViewChild(NgxEchartsDirective) echarts: NgxEchartsDirective;

    constructor(@Inject(CHARTDEVSERVICE) private chartService,
                private nzModal: NzModalSubject,
                private route: ActivatedRoute,
                private message: NzMessageService) {
    }

    ngOnInit() {
        this.payload = CHARTTYPEMAPPING[this.chartType].payload;
        this.aceConfig.text = CHARTTYPEMAPPING[this.chartType].text;
        this.preview();

        this.content.jsonData.subscribe(data => {
            this.payload = data;
            this.remoteJsonDataLoaded = true;
        });
    }

    preview() {
        const legend = this.payload.legend,
            dimensionList = this.payload.dimensionList,
            measureList = this.payload.measureList,
            that = this;
        try {
            eval(this.aceConfig.text);

            if (this.remoteJsonDataLoaded) {
                this.content.optionData.emit(this.aceConfig.text);
            }
        } catch (e) {
            this.content.optionData.emit(false);
            console.log(e);
            console.log(e.message);
            console.log(e.name);
            this.message.error(e.message);
        }
    }

    get _payload() {
        return JSON.stringify(this.payload, null, '  ');
    }



    onDragEnd(resize: boolean = false, e: { gutterNum: number, sizes: Array<number> }) {
        console.log(e);
        console.log('sizesArray', e.sizes);

        if (resize || e.gutterNum === 3) {
            this.bindEChartsContainerSize();
            this.echarts['_chart'].resize();
        }

    }

    ngAfterViewInit(): void {
        setTimeout(() => this.bindEChartsContainerSize(), 500);
    }


    bindEChartsContainerSize() {
        /**
         * 由于NgxEchartsDirective指令的el属性是private类型，所以直接引用会有编译错误
         */
        setTimeout(() => {
            this.divSize.height = this.echarts['el'].nativeElement.offsetHeight;
            this.divSize.width = this.echarts['el'].nativeElement.offsetWidth;
        }, 50);

    }


}
