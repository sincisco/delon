import {Observable} from 'rxjs/Observable';
import {InjectionToken} from '@angular/core';

export interface DashboardService {
    getPageDefById: (params) => Observable<any>;
    updatePageDefById: (params) => Observable<any>;
    getChartsDef: (params) => Observable<any>;
    getOptionAndDataById: (params) => Observable<any>;
}

export const DASHBOARDSERVICE = new InjectionToken<DashboardService>('DashboardService');
