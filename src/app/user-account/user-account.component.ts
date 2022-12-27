import {Component, Injector, OnInit} from '@angular/core';
import {AppComponentBase} from '@shared/app-component-base';
import {UserLoginInfoDto, UserServiceProxy} from '@shared/service-proxies/service-proxies';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

@Component({
    selector: 'app-user-account',
    templateUrl: './user-account.component.html',
    styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent extends AppComponentBase implements OnInit {

    loading = true;
    currentUser: UserLoginInfoDto;
    userInformationForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        surname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email])
    });
    userPasswordForm: FormGroup = new FormGroup({
        oldPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required]),
        newPasswordConfirm: new FormControl('', [Validators.required])
    }, {validators: this.sameValidator()});

    constructor(injector: Injector, private userManager: UserServiceProxy) {
        super(injector);
    }

    async ngOnInit() {
        this.currentUser = this.appSession.user;
        this.loading = false;
    }

    sameValidator(): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const value = group.get('newPassword').value;
            const valueToCompare = group.get('newPasswordConfirm').value;
            return value === valueToCompare ? null : {notSame: true};
        };
    }
}
