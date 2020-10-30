import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cliente } from './cliente.model';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientes: Array<Cliente> = [];

  constructor(public httpClient: HttpClient) { }

  private listaClientesAtualizada = new Subject<Cliente[]>();

  getClientes(): void {
    this.httpClient.get<{mensagem: string, clientes: Array<Cliente>}>(
      'http://localhost:3000/api/clientes'
    ).subscribe( dados => {
      this.clientes = dados.clientes;
      this.listaClientesAtualizada.next([...this.clientes]);
    });
  }

  adicionarCliente(nome: string, fone: string, email: string): void{
    const cliente: Cliente = {
      nome,
      fone,
      email,
    }
    this.httpClient.post<{mensagem: string, cliente: Cliente}>(
      'http://localhost:3000/api/clientes',
      cliente
    ).subscribe(dados => {
      console.log(dados.mensagem);
      this.clientes.push(cliente);
      this.listaClientesAtualizada.next([...this.clientes]);
    });
  }

  getListaCientesAtualizadaObservable(){
    return this.listaClientesAtualizada.asObservable();
  }
}