import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private totalRequests = 0;
  private targetUrl: String = 'http://localhost:8080/api/items'

  constructor(
    private loadingService: LoaderService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // only applied to get methods!!
    if (request.method === 'GET' && request.url === this.targetUrl) {
      console.log('caught')
      this.totalRequests++;
      this.loadingService.setLoading(true);
    }
    return next.handle(request).pipe(
      finalize(() => {
        if (request.method === 'GET' && request.url === this.targetUrl) {
          this.totalRequests--;
          if (this.totalRequests == 0) {
            this.loadingService.setLoading(false);
          }
        }
      })
    );
  }
}
