import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { ModalService } from 'src/app/resusableComp/modal-upload/modal.service';
import swal from 'sweetalert';
import { getWeekYearWithOptions } from 'date-fns/fp';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts: Post[] = [];
  sincePost = 0;
  totalPosts: number = 0;
  categorias: [] = [];

  

  constructor(public postService: PostService, public modalService: ModalService) {
    this.getPosts();
    // console.log(this.posts);
   }

  ngOnInit() {
    this.modalService.notificacion.subscribe(() => this.getPosts());
    this.postService.getCategoria().subscribe( (resp:any) => this.categorias = resp  )
  }

  getPosts() {

    //this.loading = true;

    this.postService.getPosts(this.sincePost).subscribe((data:any) => {

      this.totalPosts = this.postService.totalPosts;
      this.posts = data;
      //this.loading = false;
      // console.log(data);
    });
  };

  searchPost(value: string) {
    // console.log(value);


    if ( value.length <= 0  ) {
      this.getPosts() 
      return;
    }

    this.postService.searchPost(value).subscribe( (findPost:any) => {
      if ( findPost.tabla ) {
        this.posts = findPost.tabla;
      }
     
    })
  };

  page(value:number) {
    let since = this.sincePost + value;

    if( since >= this.totalPosts) {
      return; //esto quiere decir que se sale
    };

    if ( since < 0 ) {
      return;
    };

    this.sincePost += value;
    this.getPosts();
  };

  postByCategoria(categoria) {
  //   for (let post of this.posts) {
  //   console.log (post.categoria);
  //   console.log(categoria);

  //   if ( post.categoria === categoria) {
  //     this.posts.unshift(post)
  //     return
  //   }

    
  // }
  }


}
