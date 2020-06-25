import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ProvidersService } from '../providers.service';
import { HttpClientModule } from '@angular/common/http';
import { Categoria } from '../interfaces/categoria';

import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  valor = null;
  Items:any;
  categorias: Categoria[] = [];

  public origen;
  public origen2;

  constructor(
    private router: Router, private menu: MenuController, public proveedor: ProvidersService, private geolocation: Geolocation, private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    this.loadInfo();
    this.geolocationNative();
    
  }

  async ngOnInit() {
    await this.proveedor.getAllCategorias()
    .subscribe(async (categorias) => {
      console.log(categorias);
      this.categorias = categorias;
    });
  }


  async geolocationNative(){
    this.geolocation.getCurrentPosition().then((geposition: Geoposition) => {
      
      this.origen = geposition.coords.latitude;
      this.origen2 = geposition.coords.longitude;
      console.log(this.origen);
     });
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.loadInfo();
    }, 2000);
  }

  async loadInfo() {
    this.proveedor.loadInfo().then(data=>{
      this.Items=data;
      //console.log(this.Items);
    }).catch(data=>{
      //console.log(data);
    })
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  pushSegunda() {
    //this.router.navigate(['/detalle', this.valor])
    this.router.navigateByUrl(`/detalle/${this.valor}`);
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
