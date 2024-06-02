// app.module.ts
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { loggingInterceptor } from '../logging.interceptor';

@NgModule({
    imports: [HttpClientModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: loggingInterceptor,
            multi: true
        }
    ]
})
export class AppModule { }
