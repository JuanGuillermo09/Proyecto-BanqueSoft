import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import { TipoDeEventoService } from '../../admi/services/tipo-de-evento/tipo-de-evento.service';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { SideBarComponent } from "../../shared/side-bar/side-bar.component";


@Component({
  selector: 'app-cotizacion',
  standalone: true,
  imports: [RouterModule, CommonModule, SideBarComponent, HttpClientModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cotizacion.component.html',
  styleUrl: './cotizacion.component.scss',
  providers: [TipoDeEventoService, ServiciosService],
})
export class CotizacionComponent implements OnInit {

  horaActual = new Date();

  resultadosCotiza: any;

  resultadoTipo: any;

  TipoActivo: any;

  Cotizacion: any

  adicional: any;

  Obligatorio: any;

  totalAproximado: number = 0;  // Para almacenar el total acumulado

  selectedItems: any[] = []; // Propiedad para almacenar los servicios seleccionados


  form: FormGroup; // Declarar el FormGroup

  constructor(private tipodeeventoservice: TipoDeEventoService,
    private serviciosservice: ServiciosService,
    private fb: FormBuilder,) {

    this.form = this.fb.group({
      Cod_tipo_evento: [''], // Asegúrate de tener esto en tu formulario
      // Otros campos aquí...
    });

  }
  ngOnInit(): void {

    this.tipodeeventoservice.getAllTipoDeEvento().subscribe((data) => {
      console.log(data);
      this.resultadoTipo = data;

      this.TipoActivo = this.resultadoTipo.filter((prove: any) => prove.Estado === 1)
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

  }

  // Método para limpiar los campos del formulario
  limpiarCampos() {
    this.form.reset(); // Resetea el formulario
    this.form.get('Cod_tipo_evento')?.setValue(''); // Limpia explícitamente el campo de tipo de evento
    this.selectedItems = []; // Limpia la lista de elementos seleccionados
    this.totalAproximado = 0; // Resetea el total aproximado

  }


  agendarCita() {
    // Lógica para agendar cita
    console.log("Agendar cita clicado.");
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


  logoUrl: string = '../assets/Imagen/BanqueSoft.png'; // URL del logo de tu empresa

  // Método para generar el PDF

  generarPDF() {
    // Verificar si se ha seleccionado un tipo de evento y al menos una descripción obligatoria
    if (this.form.get('Cod_tipo_evento')?.invalid || this.selectedItems.length === 0) {
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
      doc.text('Cotización de Servicios', 20, imgHeight + 20); // Separar del texto (ajusta según el tamaño de la imagen)

      // Añadir la fecha y hora formateadas al PDF
      const formattedDate = `${this.horaActual.getDate()} - ${this.horaActual.getMonth() + 1} - ${this.horaActual.getFullYear()}`;
      doc.text(`Fecha: ${formattedDate}`, 20, imgHeight + 30); // Ajustar posición

      // Agregar el tipo de evento seleccionado al PDF
      const tipoEvento = this.form.get('Cod_tipo_evento')?.value;
      const tipoEventoTexto = tipoEvento ? tipoEvento : 'No especificado';
      doc.text(`Tipo de Evento: ${tipoEventoTexto}`, 20, imgHeight + 40); // Ajustar posición

      // Agregar los servicios seleccionados al PDF
      this.selectedItems.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.Nombre}  - Precio: $${item.valor}`, 20, imgHeight + 60 + (10 * index));
      });

      // Mostrar el total
      doc.setFontSize(16);
      doc.text(`Total Aproximado: $${this.totalAproximado}`, 20, imgHeight + 60 + (10 * this.selectedItems.length));
      doc.save('cotizacion.pdf');
    };
  }



}
