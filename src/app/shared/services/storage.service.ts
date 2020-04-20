import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {
    static getItem(key) {
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
    }


    static setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static removeItem(key) {
        localStorage.removeItem(key);
    }

    static clearAll() {
        localStorage.clear();
    }


    static setUserToken(token, tokenType) {
        localStorage.setItem('token', token);
        localStorage.setItem('tokenType', tokenType);
    }

    static getToken(): string {
        return localStorage.getItem('accessToken');
    }

    constructor() {
    }

    public setUser(user) {
        localStorage.setItem('user', user);
    }
}
