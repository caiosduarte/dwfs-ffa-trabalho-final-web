import { User } from "../_models";
import { Usuario } from "./usuario";

export class Tarefa {
  id: number;
  titulo: string;
  done: boolean;
  createdAt: string;
  userId?: number;
  user?: Usuario;
  constructor(id = null, titulo = "", done = false, userId = null) {
    let createdAt: any = new Date();
    this.id = id;
    this.titulo = titulo;
    this.done = done;
    this.createdAt =
      createdAt.getUTCDate() +
      "/" +
      (createdAt.getUTCMonth() + 1) +
      "/" +
      createdAt.getUTCFullYear();
    this.userId = userId;
  }
}
