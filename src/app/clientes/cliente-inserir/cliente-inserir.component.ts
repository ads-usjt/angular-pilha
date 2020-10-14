import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cliente-inserir',
  templateUrl: './cliente-inserir.component.html',
  styleUrls: ['./cliente-inserir.component.scss']
})
export class ClienteInserirComponent {
  @Output()
  clienteAdicionado = new EventEmitter();

  nome: string;
  fone: string;
  email: string;

  onAdicionarCliente(){
    const cliente = {
      nome: this.nome,
      email: this.email,
      fone: this.fone,
    }
    this.clienteAdicionado.emit(cliente);
  }

}
