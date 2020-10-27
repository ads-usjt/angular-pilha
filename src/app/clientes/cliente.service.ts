import { Injectable } from '@angular/core';
import { Cliente } from './cliente.model';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientes: Array<Cliente> = [];

  constructor() { }

  private listaClientesAtualizada = new Subject<Cliente[]>();

  getClientes(): Array<Cliente> {
    return [...this.clientes];
  }

  adicionarCliente(nome: string, fone: string, email: string): void{
    const cliente: Cliente = {
      nome,
      fone,
      email,
    }
    this.clientes.push(cliente);
    this.listaClientesAtualizada.next([...this.clientes]);
  }

  getListaCientesAtualizadaObservable(){
    return this.listaClientesAtualizada.asObservable();
  }
}