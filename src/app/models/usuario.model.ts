import { URL_SERVICIOS } from '../config/config';

const base_url = URL_SERVICIOS;

export class  Usuario {

    constructor (
        public nombre: string,
        public email:string,
        public password: string,
        public number?: Number,
        public img?: string, // ? para ponerlo como opcional. Si pongo este aquí, a partir de este, los de abajo 
        public role?: string, // a fuerza tienen que ser opcionales
        public google?: boolean,
        public _id?:string,
        public symptoms?: String
     ) { }

     get imagenUrl() {
        
        if ( this.img.includes('https') ) {
            return this.img;
        }
        
        if ( this.img ) {
            return `${ base_url }/uploads/usuarios/${ this.img }`;
        } else {
            return `${ base_url }/uploads/usuarios/no-image`;
        }
    }
}

//  creamos un modelo de datos que sea igual al de la DDBB 