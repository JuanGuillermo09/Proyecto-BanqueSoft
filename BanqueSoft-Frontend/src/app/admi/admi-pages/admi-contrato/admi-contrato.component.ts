import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { AdministradorService } from '../../services/administrador/administrador.service';
import { ContratoService } from '../../services/contrato/contrato.service';
import { MenajeService } from '../../services/menaje/menaje.service';
import { TipoDeEventoService } from '../../services/tipo-de-evento/tipo-de-evento.service';
import { AdmiModalContratoComponent } from './admi-modal-contrato/admi-modal-contrato.component';
import { AdmiModelContratoComponent } from './admi-model-contrato/admi-model-contrato.component';

@Component({
  selector: 'app-admi-contrato',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, MatIcon],
  templateUrl: './admi-contrato.component.html',
  styleUrl: './admi-contrato.component.css',
  providers: [TipoDeEventoService, ServiciosService, AdministradorService, ClienteService, ContratoService, MenajeService],
})
export class AdmiContratoComponent implements OnInit {
  horaActual = new Date();
  Cotizacion: any
  totalAproximado: number = 0;  // Para almacenar el total acumulado
  menaje: any;
  resultadoContrato: any;
  selectedItems: any[] = []; // Propiedad para almacenar los servicios seleccionados
  clientes: any[] = [];
  nombre: any;
  adminId: any;
  adicional: any;
  resultadosCotiza: any;
  Obligatorio: any;
  resultadoTipo: any;
  TipoActivo: any;
  Activo: any;
  ContratoForm: FormGroup;
  availableHoras = [
    '12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM'
  ];




  constructor(public dialog: MatDialog,
    private formbuilder: FormBuilder,
    private tipodeeventoservice: TipoDeEventoService,
    private serviciosservice: ServiciosService,
    private clienteservice: ClienteService,
    private contratoservice: ContratoService,
    private menajeservice: MenajeService,) {
    this.ContratoForm = this.formbuilder.group({
      Identificacion: ['', Validators.required],
      Nombre: ['', Validators.required],
      Telefono: ['', Validators.required],
      Fecha_evento: ['', Validators.required],
      Hora_evento: ['', Validators.required],
      valor_neto: [0, Validators.required],
      valor_pagar: [0, Validators.required],
      Número_invitados: [0, Validators.required],
      Forma_pago: ['', Validators.required],
      Cod_tipo_evento: [0, Validators.required],
      Cod_Menaje: [0, Validators.required],
      Cod_cliente: [null, Validators.required],
      Cod_adminitrador: [0, Validators.required],

    });



    // Escuchar cambios en los campos para realizar la comparación
    this.ContratoForm.get('Cod_Menaje')?.valueChanges.subscribe((codMenaje) => {
      if (codMenaje) {
        this.menajeservice.getMenajeById(codMenaje).subscribe((data) => {
          const cantidadMenaje = data.Cantidad;
          this.compararCantidadConInvitados(cantidadMenaje);
        });
      }
    });

    // Escucha los cambios en Número_invitados para actualizar la comparación si cambia
    this.ContratoForm.get('Número_invitados')?.valueChanges.subscribe(() => {
      const codMenaje = this.ContratoForm.get('Cod_Menaje')?.value;
      if (codMenaje) {
        this.menajeservice.getMenajeById(codMenaje).subscribe((data) => {
          this.compararCantidadConInvitados(data.Cantidad);
        });
      }
    });
  }

  // Función de comparación
  compararCantidadConInvitados(cantidadMenaje: number) {
    const numeroInvitados = Number(this.ContratoForm.get('Número_invitados')?.value);

    console.log('Comparando cantidad de menaje con número de invitados:', { cantidadMenaje, numeroInvitados });

    if (numeroInvitados > cantidadMenaje) {
      // Establece un error si no coinciden
      this.ContratoForm.setErrors({ notMatching: true });
    } else {
      // Si son iguales, asegúrate de limpiar el error
      this.ContratoForm.setErrors(null);
    }
  }

  ngOnInit(): void {


    this.contratoservice.getAllContrato().subscribe((data) => {
      console.log(data);
      this.resultadoContrato = data;
    })


    this.tipodeeventoservice.getAllTipoDeEvento().subscribe((data) => {
      console.log(data);
      this.resultadoTipo = data;

      this.TipoActivo = this.resultadoTipo.filter((prove: any) => prove.Estado === 1)
      console.log('Tipos de eventos activos:', this.TipoActivo);
    })


    this.serviciosservice.getAllServicio().subscribe((data) => {
      console.log('Datos recibidos:', data);

      this.resultadosCotiza = data;

      // Filtrar servicios activos que se pueden cotizar
      this.Cotizacion = this.resultadosCotiza.filter((QueOfre: any) => {
        return QueOfre.Estado === 1 && QueOfre.Sn_cotizar === true;
      });

      console.log('Resultados filtrados:', this.Cotizacion);

      // Filtrar los servicios que son adicionales
      this.adicional = this.Cotizacion.filter((Adi: any) => Adi.Adicionales === true);
      console.log('Servicios adicionales:', this.adicional);

      // Filtrar los servicios que son no Obligatorio
      this.Obligatorio = this.Cotizacion.filter((Ad: any) => Ad.Obligatorio === true);
      console.log('Servicios  Obligatorio:', this.Obligatorio);

    })
    // Obtener el nombre del administrador del localStorage
    this.nombre = localStorage.getItem('adminName');

    this.adminId = parseFloat(localStorage.getItem('adminId') || '0');


    this.clienteservice.getAllCliente().subscribe(data => {
      this.clientes = data; // Carga los clientes desde el servicio
      console.log('Clientes cargados:', this.clientes); // Para depuración

    })

    this.menajeservice.getAllMenaje().subscribe(data => {
      this.menaje = data;
      console.log("Menajes Cargados:", this.menaje);


      this.Activo = this.menaje.filter((menaj: any) => menaj.Estado === 1)
      console.log('Tipos de eventos activos:', this.Activo);
    })




  }





  openDialog(event: MouseEvent): void {
    event.preventDefault()
    console.log("Intentando abrir el modal..."); // Para verificar si se llama
    const dialogRef = this.dialog.open(AdmiModelContratoComponent, {
      width: '60%',
      height: '60%',
      data: this.clientes // Pasa la lista de clientes al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Modal cerrado con resultado:", result); // Para verificar el cierre
      if (result) {
        const nombreCompleto = `${result.Nombre} ${result.Apellidos}`;
        this.ContratoForm.patchValue({
          Identificacion: result.Identificacion,
          Nombre: nombreCompleto,
          Telefono: result.Telefono,
          Cod_cliente: result.Cod_cliente,
        });
      }
    });
  }







  openDialog1(event: MouseEvent): void {
    event.preventDefault()
    console.log("Intentando abrir el modal..."); // Para verificar si se llama
    const dialogRef = this.dialog.open(AdmiModalContratoComponent, {
      width: '60%',
      height: '60%',
      data: this.Activo // Pasa la lista de clientes al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Modal cerrado con resultado:", result); // Para verificar el cierre
      if (result) {
        this.ContratoForm.patchValue({
          Cod_Menaje: result.Cod_Menaje,
          Cantidad: result.Cantidad,
        });

      }
    });
  }



  // Manejar el cambio de selección en los checkboxes
  onCheckboxChange(event: any, item: any) {
    const isChecked = event.target.checked;
    const valor = Number(item.valor);  // Convertir a número

    // Si el valor no es un número válido, se asigna 0
    if (isNaN(valor)) {
      console.error('Valor inválido:', item.valor);
      return;
    }

    // Sumar o restar el valor según si el checkbox está seleccionado o no
    if (isChecked) {
      this.selectedItems.push(item); // Agregar el servicio seleccionado
      this.totalAproximado += valor;  // Sumar al total
    } else {
      // Eliminar el servicio no seleccionado
      const index = this.selectedItems.indexOf(item);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
      }
      this.totalAproximado -= valor;  // Restar del total
    }

    // Mostrar el valor total aproximado en consola para depuración
    console.log('Total Aproximado:', this.totalAproximado);
  }

  // Almacena las fechas ocupadas como objetos Date
  fechasOcupadas: string[] = [];

  // Método que se ejecuta cuando se cambia la fecha
  onFechaChange(): void {
    const fechaSeleccionada = this.ContratoForm.get('Fecha_evento')?.value;
    console.log('Fecha seleccionada:', fechaSeleccionada); // Para ver la fecha seleccionada

    if (fechaSeleccionada) {
      this.contratoservice.getAllContrato().subscribe(contratos => {
        // Reinicia las fechas ocupadas para la nueva fecha
        this.fechasOcupadas = contratos
          .filter(contrato => contrato.Fecha_evento === fechaSeleccionada) // Filtra por la fecha seleccionada
          .map(contrato => contrato.Fecha_evento); // Guarda las fechas ocupadas
        console.log('Fechas ocupadas:', this.fechasOcupadas); // Para verificar qué fechas se están guardando
      });
    }
  }

  isFechaOcupada(fecha: string): boolean {
    // Comparar directamente si la fecha existe en fechasOcupadas
    return this.fechasOcupadas.includes(fecha);
  }

  enviarDatos() {
    if (this.ContratoForm.valid) {
      // Obtener la fecha del evento del formulario
      const fechaEvento = this.ContratoForm.value.Fecha_evento;

      console.log('Datos enviados:', this.ContratoForm.value); // Para depurar qué se está enviando
      console.log('Fecha evento:', fechaEvento); // Para verificar la fecha del evento

      // Verificar si la fecha está ocupada
      if (this.isFechaOcupada(fechaEvento)) {
        Swal.fire({
          title: "Error",
          text: "No se puede guardar el contrato porque la fecha está ocupada.",
          icon: "error"
        });
        return; // Detener el proceso si la fecha está ocupada
      }

      // Preparar los datos para enviar
      const addContrato = {
        Fecha_contrato: this.horaActual.toISOString().split('T')[0], // Guardar la fecha actual en formato ISO
        Fecha_evento: fechaEvento, // Fecha seleccionada del evento
        Hora_evento: this.ContratoForm.value.Hora_evento,
        valor_neto: this.totalAproximado,
        valor_pagar: this.totalAproximado,
        Número_invitados: this.ContratoForm.value.Número_invitados,
        Forma_pago: this.ContratoForm.value.Forma_pago,
        Estado_contrato: 1,
        Cod_tipo_evento: this.ContratoForm.value.Cod_tipo_evento,
        Identificacion: this.ContratoForm.value.Identificacion,
        Cod_Menaje: this.ContratoForm.value.Cod_Menaje,
        Cod_administrador: this.adminId,
        Cod_cliente: this.ContratoForm.value.Cod_cliente,
      };

      console.log('Datos a enviar:', addContrato); // Para verificar qué datos se enviarán

      // Enviar los datos al servicio
      this.contratoservice.addContrato(addContrato).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          if (response.Cod_contrato) {
            this.resultadoContrato.push(response); // Agregar el nuevo contrato a la lista
            this.resetForm(); // Restablecer el formulario
            Swal.fire({
              text: "Se guardó exitosamente el contrato",
              icon: "success"
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "No se pudo guardar el registro.",
              icon: "error"
            });
          }
        },
        error: (err) => {
          console.error('Error al guardar:', err);
          // Manejar el error de acuerdo al código
          Swal.fire({
            title: "Error",
            text: err.error.message || "Ocurrió un error inesperado. Intenta de nuevo más tarde.",
            icon: "error"
          });
        }
      });
    } else {
      Swal.fire({
        title: "Información",
        text: "Debes completar todo el formulario.",
        icon: "info"
      });
    }
  }



  onTipoEventoChange(value: string) {
    // Convertir a número y actualizar el valor en el FormControl
    this.ContratoForm.patchValue({
      Cod_tipo_evento: +value // o parseInt(value, 10)
    });
  }

  resetForm() {
    this.ContratoForm.reset();
    this.selectedItems = []; // Limpia la lista de elementos seleccionados
    this.totalAproximado = 0; // Resetea el total aproximado
  }

  logoUrl: string = '../assets/Imagen/BanqueSoft.png'; // URL del logo de tu empresa

  generarPDF() {
    // Verificar si se ha seleccionado un tipo de evento y si el formulario es válido
    if (this.ContratoForm.get('Cod_tipo_evento')?.invalid || this.selectedItems.length === 0) {
      // Mostrar alerta de error usando SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Debe seleccionar un tipo de evento y al menos una descripción obligatoria para generar el PDF.',
      });
      return; // Evitar la generación del PDF si no pasa la validación
    }

    const doc = new jsPDF();
    doc.setFontSize(18);

    // Agregar el logo de la empresa
    const img = new Image();
    img.src = this.logoUrl; // Asigna la URL del logo
    img.onload = () => {
      const imgWidth = 120; // Ancho de la imagen
      const imgHeight = 100; // Altura de la imagen
      const pageWidth = doc.internal.pageSize.getWidth(); // Ancho de la página

      // Calcular la posición x para centrar la imagen
      const xPos = (pageWidth - imgWidth) / 2;

      // Agregar la imagen centrada
      doc.addImage(img, 'PNG', xPos, 10, imgWidth, imgHeight); // Centrar la imagen

      // Texto después de la imagen
      doc.text('Recibo de contrato', 20, imgHeight + 20); // Separar del texto (ajusta según el tamaño de la imagen)

      // Obtener y agregar los datos del formulario al PDF
      const identificacion = this.ContratoForm.get('Identificacion')?.value;
      const nombre = this.ContratoForm.get('Nombre')?.value;
      const telefono = this.ContratoForm.get('Telefono')?.value;

      // Obtener el ID del tipo de evento seleccionado
      const tipoEventoId = +this.ContratoForm.get('Cod_tipo_evento')?.value;

      const formaDePago = this.ContratoForm.get('Forma_pago')?.value;

      // Añadir el nombre del vendedor
      const nombreVendedor = this.nombre || 'No especificado';


      // Obtener el nombre del tipo de evento a partir del ID
      const tipoEventoNombre = this.TipoActivo.find((evento: any) => evento.Cod_tipo_evento === tipoEventoId)?.Nombre || 'No especificado';
      console.log('ID del tipo de evento:', tipoEventoId); // Verifica el ID
      console.log('Nombre del tipo de evento:', tipoEventoNombre); // Verifica el nombre


      const fechaEvento = this.ContratoForm.get('Fecha_evento')?.value;
      const horaEvento = this.ContratoForm.get('Hora_evento')?.value;
      // Obtener el número de invitados
      const numeroInvitados = this.ContratoForm.get('Número_invitados')?.value;
      console.log('Número de Invitados:', numeroInvitados); // Para depuración

      const formattedDate = `${this.horaActual.getDate()} - ${this.horaActual.getMonth() + 1} - ${this.horaActual.getFullYear()}`;
      doc.text(`Fecha Contrato: ${formattedDate}`, 20, imgHeight + 30); // Ajustar posición
      // Añadir la información al PDF
      doc.text(`Identificación: ${identificacion}`, 20, imgHeight + 40);
      doc.text(`Nombre: ${nombre}`, 20, imgHeight + 50);
      doc.text(`Teléfono: ${telefono}`, 20, imgHeight + 60);
      doc.text(`Tipo de Evento: ${tipoEventoNombre}`, 20, imgHeight + 70);
      doc.text(`Fecha del Evento: ${fechaEvento}`, 20, imgHeight + 80);
      doc.text(`Hora del Evento: ${horaEvento}`, 20, imgHeight + 90);
      doc.text(`Número de Invitados: ${numeroInvitados}`, 20, imgHeight + 100);
      doc.text(`Nombre de vendedor: ${nombreVendedor}`, 20, imgHeight + 110);
      doc.text(`Forma de pago: ${formaDePago}`, 20, imgHeight + 120);

      // Agregar los servicios seleccionados al PDF
      this.selectedItems.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.Nombre}  - Precio: $${item.valor}`, 20, imgHeight + 130 + (10 * index));
      });




      // Mostrar el total (si corresponde)
      doc.setFontSize(16);
      doc.text(`Total Aproximado: $${this.totalAproximado}`, 20, imgHeight + 140 + (10 * this.selectedItems.length));

      // Guardar el PDF
      doc.save('Recibo.pdf');
    };
  }


  eliminarContrato(codContrato: any): void {
    Swal.fire({
      title: "¿Seguro?",
      text: "No podrás revertirlo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.contratoservice.deleteContrato(codContrato).subscribe({
          next: () => {
            // Filtra el array para eliminar el registro con el ID dado
            this.resultadoContrato = this.resultadoContrato.filter((item: any) => item.Cod_contrato !== codContrato);
            Swal.fire({
              title: "Borrado!",
              text: "Tu archivo ha sido eliminado.",
              icon: "success"
            });
          },
          error: (err) => {
            console.error('Error al eliminar:', err);  // Añadir esto para depuración
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar el registro.",
              icon: "error"
            });
          }
        });
      }
    });
  }





  cargarContrato(): void {
    this.contratoservice.getAllContrato().subscribe({
      next: (data) => {
        this.resultadoContrato = data; // Almacena los contratos cargados
      },
      error: (err) => {
        console.error('Error al cargar Contrato:', err);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al cargar los Contratos.",
          icon: "error"
        });
      }
    });
  }


  cambiarEstado(codContrato: number, nuevoEstado: number): void {
    this.contratoservice.cambiarEstadoContrato(codContrato, nuevoEstado).subscribe({
      next: () => {
        this.cargarContrato(); // Recargar contratos después de cambiar el estado
        Swal.fire({
          title: "Éxito",
          text: `El contrato  ${nuevoEstado === 1 ? 'Se pago' : 'no pagado'} correctamente.`,
          icon: "success"
        });
      },
      error: (err) => {
        console.error('Error al cambiar el estado:', err);
        Swal.fire({
          title: "Error",
          text: "No se pudo cambiar el estado del contrato.",
          icon: "error"
        });
      }
    });
  }

}
