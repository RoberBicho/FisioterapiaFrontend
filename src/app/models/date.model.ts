export class  DateCita {

    constructor (
        public nombre: string,
        public date: Date,
        public zone?: String,
        //public symptoms?:String,
        public userId?: String,
        public observations?: string,
        public _id?:string,
     ) {


    }
}