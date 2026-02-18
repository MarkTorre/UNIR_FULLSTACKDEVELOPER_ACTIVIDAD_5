import { Component,WritableSignal, signal } from '@angular/core';
import { Inews } from './../../interfaces/inews';
import { FormsModule } from '@angular/forms';

/* Nota: aunque no se haya comentado en clase he visto que tambien se pueden utilizar enums en typescript.
  Vengo del mundo de la electronica y programación de firmware, he encontrado interesante poderlo utilizar para definir
  el control de errores y los mensajes asociados. */
/* Enum  */

enum ErrorStatus{
  None = 0, /* Para el estado de inicialización del formulario. Para que no se muestren los errores de los campos vacíos hasta que no se empieze a escribir o se pulse el botón de crear una nueva noticia. */
  True = 1,
  False = 2
}

enum ErrorMessages{
  TextField = 'This field is required.',
  ImageUrl = 'Invalid image url.',
  DateTime = 'Invalid date time format.'
}

@Component({
  selector: 'app-blog',
  imports: [FormsModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements Inews {
  public readonly ErrorStatus = ErrorStatus; /* Para poder utilizar el enum en el template html. */

  id: number = 0;
  title: string = '';
  image: string = '';
  text: string = '';
  timestamp: number = 0;
  array_news: Inews[] = [];
  datetime: string = '';

  /* Propiedades para el control de errores*/
  title_error: ErrorStatus = ErrorStatus.None;
  text_error: ErrorStatus = ErrorStatus.None;
  image_error: ErrorStatus = ErrorStatus.None;
  datetime_error: ErrorStatus = ErrorStatus.None;

  title_error_msg: WritableSignal<string> = signal<string>(ErrorMessages.TextField);
  text_error_msg: WritableSignal<string> = signal<string>(ErrorMessages.TextField);
  image_error_msg: WritableSignal<string> = signal<string>(ErrorMessages.TextField);
  datetime_error_msg: WritableSignal<string> = signal<string>(ErrorMessages.TextField);

  constructor(){
    /*Init Array With two notice*/
    this.array_news.push({
      id: this.id++,
      title: "Logran eliminar por completo tumores de páncreas en ratones utilizando una triple terapia",
      image: "https://i0.wp.com/www.fernandatapia.com/wp-content/uploads/2026/02/Logran-eliminar-por-completo-tumores-de-pancreas-en-ratones-utilizando-una-triple-terapia.jpg?w=800&ssl=1",
      text: `MADRID, 18 de febrero de 2026.- Hace cinco años, el equipo de Mariano Barbacid, director del Grupo de Oncología Experimental del Centro Nacional de Investigaciones Oncológicas (CNIO), daba a conocer y publicaba en Cancer Cell los primeros datos del abordaje positivo del cáncer de páncreas en modelo de ratón, pero con limitaciones: solo la mitad de los modelos respondieron, los tumores eran pequeños y cuando eran más grandes, ninguno respondió a la terapia.`,
      timestamp: Date.now()
    });
    this.array_news.push({
      id: this.id++,
      title: `Franz Kafka, escritor: “La felicidad perfecta es creer en lo indestructible que hay dentro de ti y no aspirar a ello`,
      image: "https://images.ecestaticos.com/B0hBvCvoXGeVwqdKw-KGXdF25K4=/0x0:1362x766/996x747/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F5dc%2F4f7%2F790%2F5dc4f779005719118bf83205729d244b.jpg",
      text: `La búsqueda de la felicidad. Ese propósito que la humanidad siempre ha atisbado en el horizonte y que muchos individuos consideran inalcanzable, al menos en su plenitud. Se trata de un objetivo que ha sido el centro de numerosas conversaciones desde tiempos inmemoriales y del que grandes figuras de espectros diversos de la cultura han reflexionado en reiteradas ocasiones.`,
      timestamp: Date.now()
    });
  }

  convertDateToTimestamp(date: Date) {
    return date.getTime();
  }

  converTimestampToDateString(timestamp: number){
    return new Date(timestamp).toDateString();
  }

  validateTitle(value: string){
    this.title_error = (value === '') ? ErrorStatus.True : ErrorStatus.False;
  }

  validateText(value: string){
    this.text_error = (value === '') ? ErrorStatus.True : ErrorStatus.False;
  }

  validateImage(value: string){
    /* Biref check if its a valid url */
    const valid_http = value.startsWith('http://') || value.startsWith('https://') ? true : false;
    const valid_img = value.endsWith('.jpg') || value.endsWith('.jpeg') || value.endsWith('.png') || value.endsWith('.gif') ? true : false;

    if(value === ''){
      this.image_error =  ErrorStatus.True;
      this.image_error_msg.set(ErrorMessages.TextField);
    }else{
      if(valid_http && valid_img){
        this.image_error =  ErrorStatus.False;
      } else {
        this.image_error = ErrorStatus.True;
        this.image_error_msg.set(ErrorMessages.ImageUrl);
      }
    }
  }

  validateDatetime(value: string){
    if(value === ''){
      this.datetime_error = ErrorStatus.True;
      this.datetime_error_msg.set(ErrorMessages.DateTime);
    } else{
       this.datetime_error = ErrorStatus.False;
    }
  }

  #validateProperties(): boolean{
    if(this.title_error === ErrorStatus.None) this.title_error = ErrorStatus.True;
    if(this.image_error === ErrorStatus.None) this.image_error = ErrorStatus.True;
    if(this.text_error === ErrorStatus.None) this.text_error = ErrorStatus.True;
    if(this.datetime_error === ErrorStatus.None) this.datetime_error = ErrorStatus.True;

    if (this.title_error === ErrorStatus.True ||
        this.image_error === ErrorStatus.True ||
        this.text_error === ErrorStatus.True  ||
        this.datetime_error === ErrorStatus.True) {
      return false;
    }
    return true;
  }

  createNews() {
    /* Validamos las propiedades */
    const validate: boolean = this.#validateProperties()
    /* Validación de los datos */
    if ( validate === true) {
      const date_now = new Date(this.datetime);
      this.timestamp = this.convertDateToTimestamp(date_now);
      /* Creación del formulario si todo ok*/
      const news: Inews = {
        id: this.id++,
        title:this.title,
        image:this.image,
        text:this.text,
        timestamp:this.timestamp,
      }
      /* Añadimos la nueva noticia */
      this.array_news.push(news);
    }
  }
}
