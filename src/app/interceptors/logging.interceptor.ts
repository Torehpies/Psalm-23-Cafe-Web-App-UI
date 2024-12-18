import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const loggingInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>, 
    next: HttpHandlerFn
)=> {
    console.log(req.url);
    return next(req);
  }