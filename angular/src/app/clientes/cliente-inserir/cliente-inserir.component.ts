import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  public cliente: Cliente;
  estaCarregando: boolean = false;
  public form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      nome: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      fone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.modo = 'editar';
        this.id = paramMap.get('id');
        this.estaCarregando = true;
        this.clienteService.getCliente(this.id).subscribe(({ cliente }) => {
          this.cliente = {
            id : cliente._id,
            nome: cliente.nome,
            fone: cliente.fone,
            email: cliente.email
          };

          this.form.setValue({
            nome: this.cliente.nome,
            fone: this.cliente.fone,
            email: this.cliente.email
          });

          this.estaCarregando = false;
        });
      } else {
        this.modo= 'criar';
        this.id = null;
      }
    });

  }

  onAdicionarCliente() {

    if (this.form.invalid) return;

    this.estaCarregando = true;

    if(this.modo === 'criar'){
      this.clienteService.adicionarCliente(
          this.form.value.nome,
          this.form.value.fone,
          this.form.value.email
      );
    } else {
      this.clienteService.atualizarCliente(
          this.id,
          this.form.value.nome,
          this.form.value.fone,
          this.form.value.email,
      );
    }

    this.form.reset();
    this.estaCarregando = false;

  }
}