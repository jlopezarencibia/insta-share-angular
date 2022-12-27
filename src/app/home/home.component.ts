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

    async fileChanged(files: FileList) {
        for (let i = 0; i < files.length; i++) {
            const fileToUpload = files.item(i);
            // const formData = new FormData();
            // formData.append('UserId', `${this.appSession.userId.toString()}`);
            // formData.append('File', fileToUpload);
            // const formData = [new StringStringValuesKeyValuePair({
            //     key: 'UserId', value: [`${this.appSession.userId.toString()}`]
            // })];
            const formFile: FileParameter = {
                fileName: fileToUpload.name,
                data: fileToUpload
            };
            const result = await firstValueFrom(this.userFileService.uploadFile(this.appSession.userId, formFile));
            console.log(result);
            console.log('uploaded');
            // this.http.post('https://localhost:44311/api/services/app/UserFile/UploadFile',
            //     formData).subscribe((response) => console.log(response), error => console.log(error));
        }
    }
}
