import { Component } from '@angular/core';
import { Inews } from './../../interfaces/inews';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-blog',
  imports: [FormsModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements Inews {
  id: number = 0;
  title: string = '';
  image: string = '';
  text: string = '';
  timestamp: number = 0;
  array_news: Inews[] = [];
  datetime: string = '';

  constructor(){
    /*Init Array With two notice*/
    this.array_news.push({
      id: this.id++,
      title: "Cientificos Identifican una red cerebral que podría revolucionar el tratamiento del Parkinson",
      image: "https://media.es.wired.com/photos/69839fb75b96bbe563fda323/master/w_2240,c_limit/Parkinson%20565784959.jpg",
      text: `Modificar la actividad de la red cerebral SCAN podría relentizar o revertir la progresión de la enfermedad de Parkinson, no solo tratar los sintomas", afirman los autores de este nuevo estudio.`,
      timestamp: Date.now()
    });
    this.array_news.push({
      id: this.id++,
      title: "Cientificos Identifican una red cerebral que podría revolucionar el tratamiento del Parkinson",
      image: "https://media.es.wired.com/photos/693f310efe6ac91463e5ae5d/16:9/w_2240,c_limit/cerebrocuantico.jpg",
      text: `Modificar la actividad de la red cerebral SCAN podría relentizar o revertir la progresión de la enfermedad de Parkinson, no solo tratar los sintomas", afirman los autores de este nuevo estudio.`,
      timestamp: Date.now()
    });
  }

  convertDateToTimestamp(date: Date) {
    return date.getTime();
  }

  converTimestampToDatetime(timestamp: number){
    return new Date(timestamp).toDateString();
  }

  createNews() {
    let validate: boolean = false;
    /* Validación de los datos */
    if (this.title && this.image && this.text && this.datetime) {
      const date_now = new Date(this.datetime);
      this.timestamp = this.convertDateToTimestamp(date_now);
      validate = true;
    }
    /* Creación del formulario si todo ok*/
    if (validate===true){
      const news: Inews = {
        id: this.id++,
        title:this.title,
        image:this.image,
        text:this.text,
        timestamp:this.timestamp,
      }
      this.array_news.push(news);
    }
  }


}
