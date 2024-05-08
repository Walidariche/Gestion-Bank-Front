import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {NotAuthorizedComponent} from "../not-authorized/not-authorized.component";

@Injectable({
  providedIn:'root'
})

export class authorizationGuard implements CanActivate{

  constructor(private  authService:AuthService,private router:Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.roles.includes("ADMIN")){

        return true;

      }else{
   this.router.navigateByUrl("/admin/notAuthorized");
        return false;
      }

  }
}
