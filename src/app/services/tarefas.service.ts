import { Injectable } from "@angular/core";
import { map, retry } from "rxjs/operators";
import { LoggingService } from "../logging.service";
import { HttpClient } from "@angular/common/http";
import { Tarefa } from "../tarefas/tarefa";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class TarefasService {
  constructor(private loggin: LoggingService, private http: HttpClient) {}
  tarefas: [] = [];
  usuarios: [] = [];

  carregaTudo() {
    this.carregaTarefas();
    this.carregaUsuarios();
  }
  carregaUsuarios() {
    this.http
      .get(`${environment.apiUrl}/api/users`)
      .pipe(
        retry(5),
        map((responseData) => {
          return responseData;
        })
      )
      .subscribe(
        (resposta) => {
          this.usuarios = <[]>resposta;
        },
        (error) => {
          console.log(error);
        },
        () => {}
      );
  }
  carregaTarefas() {
    this.http
      .get(
        `${environment.apiUrl}/api/tarefas?_expand=user&_sort=id&_order=desc`
      )
      .pipe(
        retry(5),
        map((responseData) => {
          return responseData;
        })
      )
      .subscribe(
        (resposta) => {
          this.tarefas = <[]>resposta;
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log("Completa");
        }
      );
    /*subscribe(tarefas => {
      this.tarefas = tarefas;
    }, error => {
      console.log(error)
    },
                  () => {
      console.log('Carregado com sucesso!')
    }) */
  }
  createTarefa(tarefa: Tarefa) {
    this.http.post(`${environment.apiUrl}/api/tarefas`, tarefa).subscribe(
      (response) => {
        console.log(response);
        this.carregaTarefas();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteTarefa(id: number) {
    this.http.delete(`${environment.apiUrl}/api/tarefas/` + id).subscribe(
      (response) => {
        this.carregaTarefas();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  editTarefa(tarefa: Tarefa | any) {
    this.http
      .patch(`${environment.apiUrl}/api/tarefas/` + tarefa.id, tarefa)
      .subscribe(
        (response) => {
          this.carregaTarefas();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
