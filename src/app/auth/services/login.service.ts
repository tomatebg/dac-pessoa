import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { Usuario, Login } from "src/app/shared";

const LS_CHAVE: string = "pessoas";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor() {}
  public get usuarioLogado(): Usuario {
    let usu = localStorage[LS_CHAVE];
    return usu ? JSON.parse(localStorage[LS_CHAVE]) : null;
  }
  public set usuarioLogado(usuario: Usuario) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }
  logout() {
    delete localStorage[LS_CHAVE];
  }

  login(login: Login): Observable<Usuario | null> {
    let usu = new Usuario(1, "Razer-Func", login.login, login.senha, "FUNC");

    if (login.login == login.senha) {
      if (login.login == "admin") {
        usu = new Usuario(1, "Razer-Admin", login.login, login.senha, "ADMIN");
      } else if (login.login == "gerente") {
        usu = new Usuario(
          1,
          "Razer-Gerente",
          login.login,
          login.senha,
          "GERENTE"
        );
      }
      return of(usu);
    } else {
      return of(null);
    }
  }
}
