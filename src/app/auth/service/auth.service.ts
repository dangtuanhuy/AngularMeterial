import { Subject } from 'rxjs/Subject';
import { User } from './../model/user.model';
import { AuthData } from './../model/auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    /**
     *
     */
    constructor(private router: Router) {
    }
    private user: User;
    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccessFully();
    }
    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccessFully();
    }
    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }
    getUser() {
        return { ...this.user };
    }
    isAuth() {
        return this.user !== null;
    }
    private authSuccessFully() {
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}
