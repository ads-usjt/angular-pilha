import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Cliente } from '../cliente.model';
@Component({
  selector: 'app-cliente-inserir',
  templateUrl: './cliente-inserir.component.html',
  styleUrls: ['./cliente-inserir.component.scss'],
})
export class ClienteInserirComponent implements OnInit {
  constructor(public clienteService: ClienteService, public route: ActivatedRoute){}

  modo: string = 'criar';
  id: string;
  cliente: Cliente;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.modo = 'editar';
        this.id = paramMap.get('id');
        this.clienteService.getCliente(this.id).subscribe(({ cliente }) => {
          this.cliente = {
            id : cliente._id,
            nome: cliente.nome,
            fone: cliente.fone,
            email: cliente.email
          }
        });
      } else {
        this.modo= 'criar';
        this.id = null;
      }
    });
  }

  onAdicionarCliente(form: NgForm) {
    if (form.invalid) return;
    if(this.modo === 'criar'){
      this.clienteService.adicionarCliente(
          form.value.nome,
          form.value.fone,
          form.value.email
      );
    } else {
      this.clienteService.atualizarCliente(
          this.id,
          form.value.nome,
          form.value.fone,
          form.value.email,
      );
    }
    form.resetForm();
  }
}