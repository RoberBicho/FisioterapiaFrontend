import { Component, OnInit, EventEmitter } from '@angular/core';
import swal from 'sweetalert';
import { UploadFileService } from '../../services/upload-file.service';
import { ModalService } from './modal.service';
@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.scss']
})
export class ModalUploadComponent implements OnInit {

  uploadFile: File;

  imagenTemp: any;

  EmiterImgTemp = new EventEmitter<any>();

  constructor(public uploadService: UploadFileService,public modalService:ModalService) { }

  ngOnInit() {
  }

  selectImage(file: File) {

    //console.log(file);

    if( !file ) {
      this.uploadFile = null;
      return;
    }

    if ( file.type.indexOf('image') <0 ) {
      swal('Sólo imagenes')
    }

    this.uploadFile = file;
    // console.log(this.uploadFile);


    let reader = new FileReader(); //esto es javascript puro
    let urlImagenTemp =  reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
      this.EmiterImgTemp.emit(this.imagenTemp)
    }

  }


  cerrarModal() {
    this.imagenTemp = null;
    this.uploadFile = null;

    this.modalService.ocultarModal();
  }

  subirImagen() {

    // Emitir si es post lo de selected image y después que la función de upload lo haga desde blog-edit

    this.uploadService.uploadFile(this.uploadFile, this.modalService.tipo, this.modalService.id)
      .then(resp => {
        // emito para todos aquellos que me estén escuchando 
        this.modalService.notificacion.emit(resp);
        this.modalService.ocultarModal();
      })
      .catch(resp => {
        console.log('Error en la carga')
      })

  }

}
