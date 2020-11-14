import { Injectable } from '@angular/core';
import swal from 'sweetalert';
import { URL_SERVICIOS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  
  
  uploadFile(file: File, tipo:string, id: string ) {

    // console.log(tipo); //recibe bien el tipo
    return new Promise((resolve,reject) => {

      
          let formData = new FormData(); // es el payload que yo quiero mandar subir // Para crear la data que quiero enviar al back
          let xhr = new XMLHttpRequest(); //inicializamos la petición ajax
      
          formData.append('imagen', file, file.name) // 'imagen' es el nombre que le doy en el backend
      
          xhr.onreadystatechange = function() { // esto es la configuracion de la petición ajax, de como va a funcionar
            if ( xhr.readyState ===4 ) { // el 4 es un estado de la subida, podría jugar con ellos para hacer un loading
              if (xhr.status === 200 ) {
                swal('Imagen Subida', 'success');
                resolve(JSON.parse(xhr.response));
              } else {
                swal('Subida Fallida', 'wrong');
                reject(xhr.response)
              }
            }
          };


          let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id; //url a donde quiero hacer la petición

          xhr.open('PUT',url, true ); // el true dice si quiero que sea asincrono

          xhr.send(formData);



    })

  }




  //**************************************************************************************************
  //                                     Subir foto con fetch actualizado a angular 8                                                           
  //**************************************************************************************************
  
  // async actualizarFoto(
  //   archivo: File,
  //   tipo: 'usuarios'|'medicos'|'hospitales',
  //   id: string
  // ) {

  //   try {

  //     const url = `${ base_url }/upload/${ tipo }/${ id }`;
  //     const formData = new FormData();
  //     formData.append('imagen', archivo);

  //     const resp = await fetch( url, {
  //       method: 'PUT',
  //       headers: {
  //         'x-token': localStorage.getItem('token') || ''
  //       },
  //       body: formData
  //     });

  //     const data = await resp.json();

  //     if ( data.ok ) {
  //       return data.nombreArchivo;
  //     } else {
  //       console.log(data.msg);
  //       return false;
  //     }
      
  //   } catch (error) {
  //     console.log(error);
  //     return false;    
  //   }

  // }




}
