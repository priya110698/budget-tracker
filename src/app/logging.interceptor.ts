import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class loggingInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Your logic here (e.g., add headers, handle errors, etc.)
        // return next.handle(request.clone({ setHeaders: { 'Access-Control-Allow-Origin': '*' } }));
        return next.handle(request.clone({ setHeaders: { 
            "Access-Control-Allow-Origin": "http://budget-tracker-app-v1.s3-website-ap-southeast-1.amazonaws.com" ,
            // "Access-Control-Allow-Origin": "*" ,

        } }));
        // Set("Access-Control-Allow-Origin", req.Header.Get("Origin")
    }
}
