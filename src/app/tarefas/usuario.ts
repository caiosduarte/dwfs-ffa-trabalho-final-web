import { Tarefa } from "./tarefa";

export class Usuario {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  tarefas?: Tarefa[];
}
