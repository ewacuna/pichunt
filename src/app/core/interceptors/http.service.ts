import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {from, lastValueFrom, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const skipIntercept: boolean = req.headers.get('skip') === 'true';

    if (skipIntercept) {
      req = req.clone({
        headers: req.headers.delete('skip'),
      });
      return next.handle(req);
    }

    return from(this.handle(req, next));
  }

  private getUrl(request: HttpRequest<any>): string {
    const fullUrl: string = request.url.replace(environment.pexelsAPI, '');
    const url: string = fullUrl.replace(/^\//, '');
    return environment.pexelsAPI + `/${url}`;
  }

  private async handle(req: HttpRequest<any>, next: HttpHandler) {
    req = req.clone({
      url: this.getUrl(req),
      setHeaders: {
        'Authorization': environment.pexelsKey,
      },
    });

    return await lastValueFrom(next.handle(req));
  }
}
