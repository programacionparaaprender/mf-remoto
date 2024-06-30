import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap, finalize } from 'rxjs/operators';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()
export class ServicioPrueba {
    private _modificado:string;
    constructor() { 
        this._modificado = 'Modificado';
    }
    set modificado(value: string){
        this._modificado = value;
    }
    get modificado() {
        return this._modificado;
    }
}