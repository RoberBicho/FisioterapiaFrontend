import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { ModalService } from 'src/app/resusableComp/modal-upload/modal.service';
import swal from 'sweetalert';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';


@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {


  post: Post = new Post('','','','','','','');
  categorias: [] = [];
  uploadFile: File;
  imagenTemp: any;
  open: Boolean = true

  constructor(public postService: PostService,  public modalService: ModalService, public route: Router, public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.postService.getCategoria().subscribe( (resp:any) => {
      // console.log(resp);
      this.categorias = resp
    })

    this.post.idAuthor = this.usuarioService.usuario._id


  }

  submit() {

  //**************************************************************************************************
  //                                     Esto sería vanilla.js(js puro)                                                           
  //**************************************************************************************************
  
    console.log(this.post);
    return new Promise((resolve,reject) => {

      let formData = new FormData();
      formData.append('title', this.post.title);
      formData.append('intro', this.post.intro);
      formData.append('contenido', this.post.contenido);
      formData.append('categoria', this.post.categoria);
      formData.append('comentarios', this.post.comentarios);
      formData.append('date', this.post.date);
      formData.append('imagen', this.post.img, this.post.img.name);
      formData.append('idAuthor',this.post.idAuthor );


      let xhr = new XMLHttpRequest(); //inicializamos la petición ajax

      // let url = URL_SERVICIOS + '/post'
      let url = URL_SERVICIOS + '/post/postImg'

      xhr.open('POST',url, true ); // el true dice si quiero que sea asincrono

      xhr.onreadystatechange = function() { 
        
        // esto es la configuracion de la petición ajax, de como va a funcionar

        console.log(xhr.readyState);
        console.log(xhr.status); // Me da los tipos de resultados de la petición, podría hacer los loader
        if ( xhr.readyState === 4 ) { // el 4 es un estado de la subida, podría jugar con ellos para hacer un loading
           if (xhr.status === 200 || xhr.status === 200  ) {
             swal('Post Subido Correctamente', 'success');
             resolve(JSON.parse(xhr.response));
           } else {
           swal('Subida Fallida', 'wrong');
             reject(xhr.response)
           }
         }
      };

      xhr.send(formData);

    })
  
  }
    // this.postService.postPost(this.post).subscribe( (data:any) => {
    //   console.log(data);
    // })
    

  // }



  subirImg() {
    this.open = true
  }

  

  selectImage(file: File) {

    // console.log('File',file);

    if( !file ) {
      this.uploadFile = null;
      return;
    }

    if ( file.type.indexOf('image') <0 ) {
      swal('Sólo imagenes')
    }

    this.uploadFile = file;


    let reader = new FileReader(); //esto es javascript puro
    let urlImagenTemp =  reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
      this.post.img = this.uploadFile;
    }


  }

  closeSelectImg() {
    this.imagenTemp = null;
    this.uploadFile = null;
    this.open = false

    console.log(this.imagenTemp, this.uploadFile, this.open);
  }

  saveImg() {
    this.open = false;
    // console.log(this.post);
  }


  

}
