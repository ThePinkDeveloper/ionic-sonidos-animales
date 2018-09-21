import { Component } from '@angular/core';
import { NavController, reorderArray } from 'ionic-angular';
import { Animal } from '../../interfaces/animales.interface';
import { ANIMALES} from '../../data/data.animales';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  protected animales:Animal[] = [];
  audio = new Audio();
  audioTiempo:any;
  ordenando:boolean = false;


  constructor(public navCtrl: NavController) {
    
    this.animales = ANIMALES.slice(0);

  }

  reproducir (animal:Animal) {

    this.audio.src = animal.audio;
    this.audio.load();
    
    if (!animal.reproduciendo) {
      this.audio.play();
      animal.reproduciendo = true;
      for (let actual of this.animales) {
        if (animal.nombre != actual.nombre) {
          actual.reproduciendo = false;
        } 
      }
    } else {
      this.audio.pause();
      this.audio.currentTime = 0;
      animal.reproduciendo = false;
    }    
    setTimeout( () => animal.reproduciendo = false, animal.duracion * 1000);
  }

  borrarAnimal(index:number) {
    this.animales.splice(index, 1);
  }

  recargarAnimales(refresher:any) {
    console.log('Comenzando refreshes.');

    setTimeout( () => {
      this.animales = ANIMALES.slice(0);
      refresher.complete();
      console.log('Refresh terminado.');
    }, 500);

  }

  reordenarAnimales(indices:any) {
    this.animales = reorderArray(this.animales, indices);
  }

}
