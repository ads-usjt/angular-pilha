import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  clientes = []
  onClienteAdicionado(cliente){
    this.clientes= [...this.clientes, cliente]
  }
}