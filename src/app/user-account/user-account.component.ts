import {Component, Injector, OnInit} from '@angular/core';
import {AppComponentBase} from '@shared/app-component-base';
import {ChangePasswordDto, UserLoginInfoDto, UserServiceProxy} from '@shared/service-proxies/service-proxies';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {firstValueFrom} from '@node_modules/rxjs';
import {AppAuthService} from '@shared/auth/app-auth.service';

@Component({
    selector: 'app-user-account',
    templateUrl: './user-account.component.html',
    styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent extends AppComponentBase implements OnInit {

    loading = true;
    loadingUserInformation = false;
    loadingUserPassword = false;

    currentUser: UserLoginInfoDto;
    userInformationForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        surname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('')
    });
    userPasswordForm: FormGroup = new FormGroup({
        oldPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required]),
        newPasswordConfirm: new FormControl('', [Validators.required])
    }, {validators: this.sameValidator()});

    constructor(
        injector: Injector,
        private userManager: UserServiceProxy,
        private authService: AppAuthService) {
        super(injector);
    }

    async ngOnInit() {
        this.currentUser = this.appSession.user;
        this.userInformationForm.get('name').setValue(this.currentUser.name);
        this.userInformationForm.get('surname').setValue(this.currentUser.surname);
        this.userInformationForm.get('email').setValue(this.currentUser.emailAddress);
        this.userInformationForm.get('username').setValue(this.currentUser.userName);
        this.userInformationForm.get('username').disable();
        this.loading = false;
    }

    sameValidator(): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const value = group.get('newPassword').value;
            const valueToCompare = group.get('newPasswordConfirm').value;
            return value === valueToCompare ? null : {notSame: true};
        };
    }

    async editUserInformation() {
        if (this.userInformationForm.valid) {
            this.loadingUserInformation = true;
            this.appSession.user.name = this.userInformationForm.get('name').value;
            this.appSession.user.surname = this.userInformationForm.get('surname').value;
            this.appSession.user.emailAddress = this.userInformationForm.get('email').value;
            await firstValueFrom(this.userManager.updateProfile(this.appSession.user))
                .then(() => this.notify.success('User profile updated!', 'Modify user profile'))
                .catch(() => this.notify.error('Something happened!', 'Modify user profile'))
                .finally(() => this.loadingUserInformation = false);

        } else {
            this.notify.warn('Some fields are missing', 'Invalid form');
        }
    }

    cancelUserInformation() {
        this.userInformationForm.get('name').setValue(this.appSession.user.name);
        this.userInformationForm.get('surname').setValue(this.appSession.user.surname);
        this.userInformationForm.get('email').setValue(this.appSession.user.emailAddress);
    }

    async changePassword() {
        if (this.userPasswordForm.valid) {
            this.loadingUserPassword = true;
            await firstValueFrom(this.userManager.changePassword(new ChangePasswordDto({
                currentPassword: this.userPasswordForm.get('oldPassword').value,
                newPassword: this.userPasswordForm.get('newPassword').value
            }))).then(() => this.notify.success('User password changed!', 'Password update'))
                .catch(() => this.notify.error('Something happened!', 'Password update'))
                .finally(() => this.loadingUserPassword = false);
        } else {
            this.notify.warn('Some fields are missing or passwords doesn\'t match', 'Invalid form');
        }

    }

    cancelChangePassword() {
        this.userPasswordForm.get('oldPassword').setValue('');
        this.userPasswordForm.get('newPassword').setValue('');
        this.userPasswordForm.get('newPasswordConfirm').setValue('');
    }

    logout() {
this.authService.logout(true);
    }
}
