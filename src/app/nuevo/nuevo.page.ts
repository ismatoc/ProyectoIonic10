import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../providers.service';
import { Categoria } from '../interfaces/categoria';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.page.html',
  styleUrls: ['./nuevo.page.scss'],
})
export class NuevoPage implements OnInit {


  categorias: Categoria[] = [];

  constructor(private providersService: ProvidersService, private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });
    
    await loading.present();
    this.providersService.getAllCategorias()
    .subscribe(async (categorias) => {
      console.log(categorias);
      this.categorias = categorias;
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
      header: 'Nueva categoria!',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'ingrese la categoria'
        },
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
            this.createCategoria(data.title);
          }
        }
      ]
    });
    await alert.present();
  }


  createCategoria(descripcion: string) {
    const categoria = {
      userId: '1',
      descripcion,
      completed: true
    };
    this.providersService.createCategoria(categoria)
    .subscribe((newCategoria) => {
      this.categorias.unshift(newCategoria);
    });
  }

  deleteCategoria(_id: string, index: number) {
    this.providersService.deleteCategoria(_id)
    .subscribe(() => {
      this.providersService.getAllCategorias();
      this.presentToast('la categoria fue eliminada correctamente');
      this.categorias.splice(index);
      
      
      
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
