import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../providers.service';
import { Categoria } from '../interfaces/categoria';
import { Lugar } from '../interfaces/lugar';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-addlugar',
  templateUrl: './addlugar.page.html',
  styleUrls: ['./addlugar.page.scss'],
})
export class AddlugarPage implements OnInit {

  lugares: Lugar[] = [];
  categorias: Categoria[] = [];

  constructor(private providersService: ProvidersService, private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });
    
    await loading.present();
    this.providersService.getAllLugares()
    .subscribe(async (lugares) => {
      console.log(lugares);
      this.lugares = lugares;
      await loading.dismiss();
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      //this.ngOnInit();
    }, 2000);
  }

  async openAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Nuevo Lugar!',
      inputs: [
        {
          name: 'nombre_lugar',
          type: 'text',
          placeholder: 'ingresa el nombre del lugar',
        },
        {
          name: 'categoria',
          type: 'text',
          value: '5ef32da121d5fb6188bc05dd',
        },
        {
          name: 'descripcion',
          type: 'text',
          placeholder: 'ingresa informacion del lugar',
        },
        {
          name: 'lat',
          type: 'text',
          placeholder: 'ingresa latitud',
        },
        {
          name: 'lng',
          type: 'text',
          placeholder: 'ingresa longitud',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Crear',
          handler: (data) => {
            this.createLugar(data.categoria, data.nombre_lugar, data.descripcion, data.lat, data.lng, data.img);
          }
        }
      ]
    });
    await alert.present();
  }


  createLugar(categoria: string, nombre_lugar: string, descripcion: string, lat: string, lng: string, img: string) {
    const lugar = {
      categoria,
      nombre_lugar,
      descripcion,
      lat,
      lng,
      img,
      completed: true
    };
    this.providersService.createLugar(lugar)
    .subscribe((newLugar) => {
      this.lugares.unshift(newLugar);
    });
  }

  deleteLugar(_id: string, index: number) {
    this.providersService.deleteLugar(_id)
    .subscribe(() => {
      this.providersService.getAllLugares();
      this.presentToast('el lugar fue eliminado correctamente');
      this.lugares.splice(index);
      
      
      
    });
    
  }


  
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    await toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
      duration: 2000
    });
    await loading.present();
    return loading;
  }


}
