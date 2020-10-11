import { Component, OnInit } from "@angular/core";
import axios from "axios";
import { Consulta } from "./consulta";
import { LoggingService } from "../logging.service";
import { ConsultaService } from "../services/consulta.service";
import { environment } from "../../environments/environment";
@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"],
  providers: [LoggingService],
})
export class ServerComponent implements OnInit {
  historico = [];
  server_url = `${environment.apiUrl}/status`;
  mostrar_resposta = false;
  consultaServer = {
    serverStatus: false,
    recolhido: false,
    recolhendo: false,
    error: "",
    resposta: "",
  };
  constructor(
    private logginService: LoggingService,
    public consultaService: ConsultaService
  ) {}
  onDeleteConsulta(event) {
    this.logginService.addToLog("Deletado historico de consulta!", false);
    // this.historico.splice(event.index, 1)
    this.consultaService.removeHistorico(event.index);
  }
  verificaServidor() {
    this.consultaService.getConsulta(this.server_url);
  }
  ngOnInit() {}
}
