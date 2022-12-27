import {Component, Injector, ChangeDetectionStrategy} from '@angular/core';
import {AppComponentBase} from '@shared/app-component-base';
import {appModuleAnimation} from '@shared/animations/routerTransition';
import {FileParameter, UserFileServiceProxy} from '@shared/service-proxies/service-proxies';
import {firstValueFrom} from '@node_modules/rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
    templateUrl: './home.component.html',
    animations: [appModuleAnimation()],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends AppComponentBase {
    constructor(
        injector: Injector,
        private readonly userFileService: UserFileServiceProxy,
        private readonly http: HttpClient) {
        super(injector);
    }

}
