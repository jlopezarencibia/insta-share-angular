import {Component, Injector} from '@angular/core';
import {AbpSessionService} from 'abp-ng2-module';
import {AppComponentBase} from '@shared/app-component-base';
import {accountModuleAnimation} from '@shared/animations/routerTransition';
import {AppAuthService} from '@shared/auth/app-auth.service';
import {Router} from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    animations: [accountModuleAnimation()]
})
export class LoginComponent extends AppComponentBase {
    submitting = false;

    constructor(
        injector: Injector,
        public authService: AppAuthService,
        private _sessionService: AbpSessionService,
        private router: Router
    ) {
        super(injector);
    }

    get multiTenancySideIsTeanant(): boolean {
        return this._sessionService.tenantId > 0;
    }

    get isSelfRegistrationAllowed(): boolean {
        if (!this._sessionService.tenantId) {
            return false;
        }

        return true;
    }

    login(): void {
        this.submitting = true;
        this.authService.authenticate(() => {
            this.submitting = false;
            this.router.navigate(['/app/files']).then();
        });
    }
}
