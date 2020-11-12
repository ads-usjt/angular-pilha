import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Cliente } from './cliente.model';

@Injectable({ providedIn: 'root' })
export class ClienteService {

  private clientes: Array<Cliente> = [];

  private listaClientesAtualizada = new Subject<Cliente[]>();

  constructor(

    private httpClient: HttpClient,
    private router: Router

  ){}

  removerCliente(id: string): void {

    this.httpClient.delete<{ message: string, cliente: any }>(`http://localhost:3000/api/clientes/${id}`)
      .subscribe( dados => {
        console.log(dados);
        this.clientes = this.clientes.filter( cliente => cliente.id !== id );
        this.listaClientesAtualizada.next([ ...this.clientes ]);
      });

  }

  getClientes(): void {

    this.httpClient.get<{ mensagem: string, clientes: Array<any> }>(
      'http://localhost:3000/api/clientes'
    )
      .pipe( map( dados => dados.clientes.map( cliente => {
          return {
            id: cliente._id, ...cliente
          }
        })
      ))
      .subscribe( clientes => {
        this.clientes = clientes;
        this.listaClientesAtualizada.next([ ...this.clientes ]);
      });

  }

  getCliente(id: string){
    return this.httpClient.get<{ cliente: any }>(`http://localhost:3000/api/clientes/${id}`);
  }

  atualizarCliente(id: string, nome: string, fone: string, email: string){

    const cliente: Cliente = { id, nome, fone, email };

    this.httpClient.put<{ message: string, cliente: any }>(
      `http://localhost:3000/api/clientes/${id}`,
      cliente
    ).subscribe( dados => {
      console.log( dados );

      const copia = [...this.clientes];
      const indice = copia.findIndex( cli => cli.id === cliente.id );

      copia[ indice ]= cliente;

      this.clientes = copia;
      this.listaClientesAtualizada.next([ ...this.clientes ]);
      this.router.navigate(['/']);
    });

  }

  adicionarCliente( nome: string, fone: string, email: string ): void{

    const cliente: Cliente = { nome, fone, email }

    this.httpClient.post<{ message: string, cliente: any }>(
      'http://localhost:3000/api/clientes',
      cliente
    )
      .pipe( map( dados => {
          const { message, cliente } = dados;
          return {
            message,
            cliente: { id: cliente._id, ...cliente }
          }
      }))
      .subscribe( dados => {
        console.log( dados );
        this.clientes.push( dados.cliente );
        this.listaClientesAtualizada.next([ ...this.clientes ]);
        this.router.navigate(['/']);
      });

  }

  getListaCientesAtualizadaObservable(): Observable<Cliente[]> {

    return this.listaClientesAtualizada.asObservable();

  }
}