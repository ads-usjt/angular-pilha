import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss']
})
export class ClienteListaComponent {

  clientes = [
    {
      nome: 'Hamilton',
      fone: '11999999999',
      email: 'hamilton@usjt.br'
    },
    {
      nome: 'Arthur',
      fone: '24999998888',
      email: 'arthur@usjt.br'
    }
  ]

}
