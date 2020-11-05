import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Subscription, Observable } from 'rxjs';
@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss'],
})
export class ClienteListaComponent implements OnInit, OnDestroy {
  constructor(public clienteService: ClienteService) { }

  clientes: Array<Cliente> = [];
  private clientesSubscription: Subscription;

  ngOnInit(): void {
    this.clienteService.getClientes();

    let clientesObservable: Observable<Cliente[]> = this.clienteService.getListaCientesAtualizadaObservable();

    this.clientesSubscription = clientesObservable.subscribe((clientes: Array<Cliente>) => {
      this.clientes = clientes;
    });
  }

  onDelete(id: string){
    this.clienteService.removerCliente(id);
  }

  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe();
  }

}