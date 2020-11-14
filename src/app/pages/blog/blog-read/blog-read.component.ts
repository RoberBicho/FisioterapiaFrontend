import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-blog-read',
  templateUrl: './blog-read.component.html',
  styleUrls: ['./blog-read.component.scss']
})
export class BlogReadComponent implements OnInit {


  post: Post = new Post('','' , '', '', '','','',);
  role: string;

  constructor(public activatedRoute: ActivatedRoute, public postService: PostService, public route: Router, public userService: UsuarioService) {

    this.activatedRoute.params.subscribe(params => { //Esto es para acceder a los parametros de la url 

      let id = params['id'] // como sabemos que es id? por que en el routing.module pusimos "":id"

      if ( id !== 'nuevo') {
        this.cargarPost(id)
      }
    })

    this.role = this.userService.usuario.role;
   }

  ngOnInit() {
  }

  cargarPost(id :string) {
    this.postService.cargarPost(id).subscribe( post => {
      this.post = post ;
      console.log(this.post)
  })
};

deletePost(_id:any) {


  swal({
    title: "Está seguro?",
    text: "Una vez borrada tendrá que volver a crearlo!",
    icon: "warning",
    buttons: ["Cancelar", "Borra cita"],
    dangerMode: true,
  })
  .then((willDelete) => {
   
    if ( willDelete) {
      this.postService.deletePost(_id).subscribe( (deletedPost) => {

        // console.log(_id);
        // console.log(deletedPost);
        this.route.navigate(['/blog']);
      })
    } 

  });

}

}
