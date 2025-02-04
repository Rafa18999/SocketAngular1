import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/servicio-chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.css'],
})

/*
export class ChatComponent implements OnInit, OnDestroy {
  mensajes: any[] = []; // Array para mensajes recibidos
  mensaje: string = ''; // Mensaje a enviar
  username: string = ''; // Nick personalizado por el usuario
  color: string = this.getRandomColor(); // Color único para el usuario
  conectado: boolean = false;


  constructor(public chatService: ChatService) {}


  ngOnInit(): void {
    this.chatService.getMessages().subscribe((mensaje) => {
      console.log('Nuevo mensaje recibido:', mensaje); // Depuración
      this.mensajes.push(mensaje); // Actualiza el array de mensajes
      console.log('Mensajes actuales:', this.mensajes); // Verifica los mensajes actualizados
    });
  }
 


  ngOnDestroy(): void {
    this.chatService.desconectar(); // Desconectar al destruir el componente
  }


  // Enviar mensaje
  enviarMensaje() {
    const nuevoMensaje = {
      autor: this.username || 'Usuario Anónimo',
      username: this.username || 'Usuario Anónimo',
      color: this.color,
      contenido: this.mensaje,
    };
    this.chatService.sendMessage(nuevoMensaje);
    this.mensaje = ''; // Limpiar el campo de entrada
  }


  // Obtener un color aleatorio para el usuario
  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  conectar() {
    this.chatService.conectar(); // Establecer conexión WebSocket
    this.chatService.getMensajesGuardados().subscribe(
      (mensajes) => {
        this.mensajes = mensajes; // Cargar los mensajes previos desde la base de datos
        console.log('Mensajes cargados desde la base de datos:', this.mensajes);
        this.conectado = true; // Cambiar el estado a conectado
      },
      (error) => {
        console.error('Error al cargar mensajes guardados:', error);
      }
    );
  }
  desconectar() {
    this.chatService.desconectar();
    this.conectado = false; // Cambiar el estado a desconectado
  }
}*/

export class ChatComponent implements OnInit, OnDestroy {
  mensajes: any[] = [];
  mensaje: string = '';
  username: string = '';
  color: string;
  conectado: boolean = false;
  imagenSeleccionada: File | null = null;

  constructor(public chatService: ChatService) {
    this.color = this.getRandomColor(); // Llamada al método después de su definición
  }

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((mensaje) => {
      this.mensajes.push(mensaje);
    });
  }

  ngOnDestroy(): void {
    this.chatService.desconectar();
  }

  enviarMensaje() {
    if (this.imagenSeleccionada) {
      this.chatService.sendImage(this.imagenSeleccionada).subscribe((response) => {
        const imagenUrlCompleta = `http://localhost:8080${response.url}`;
  
        const nuevoMensaje = {
          autor: this.username || 'Usuario Anónimo',
          username: this.username || 'Usuario Anónimo',
          color: this.color,
          contenido: this.mensaje,
          imagen: imagenUrlCompleta // URL completa
        };
  
        this.chatService.sendMessage(nuevoMensaje);
        this.mensaje = '';
        this.imagenSeleccionada = null;
      });
    }
  }

  // ✅ Añadir el método conectar()
  conectar() {
    this.chatService.conectar();
    this.chatService.getMensajesGuardados().subscribe(
      (mensajes) => {
        this.mensajes = mensajes;
        this.conectado = true; // ✅ Actualizamos el estado de conexión
      },
      (error) => {
        console.error('Error al cargar mensajes guardados:', error);
      }
    );
  }

  // ✅ Añadir el método desconectar()
  desconectar() {
    this.chatService.desconectar();
    this.conectado = false; // ✅ Actualizamos el estado de conexión
  }

  seleccionarImagen(event: any) {
    this.imagenSeleccionada = event.target.files[0];
  }

  // 🔹 MÉTODO CORRECTAMENTE DEFINIDO
  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
