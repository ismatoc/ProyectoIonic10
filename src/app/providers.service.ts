import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { promise } from 'protractor';

import { Categoria } from './interfaces/categoria';
import { Lugar } from './interfaces/lugar';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private api = 'http://localhost:3000/api/categorias';
  private api_lugares = 'http://localhost:3000/api/lugares';

  constructor(public http: HttpClient) {
    
   }


   createCategoria(categoria: Categoria) {
    const path = `${this.api}`;
    return this.http.post<Categoria>(path, categoria);
  }

  getAllCategorias() {
    const path = `${this.api}`;
    return this.http.get<Categoria[]>(path);
  }

  

  deleteCategoria(_id: string) {
    const path = `${this.api}/${_id}`;
    return this.http.delete(path);
  }



  
  createLugar(lugar: Lugar) {
    const path = `${this.api_lugares}`;
    return this.http.post<Lugar>(path, lugar);
  }

  getAllLugares() {
    const path = `${this.api_lugares}`;
    return this.http.get<Lugar[]>(path);
  }

  
  deleteLugar(_id: string) {
    const path = `${this.api_lugares}/${_id}`;
    return this.http.delete(path);
  }

   loadInfo(){
     var api_url="http://localhost:3000/api/categorias";
     return new Promise(resolve => {
       this.http.get(api_url).subscribe(data => {
         resolve(data);
       }, err => {
         console.log(err);
       });
     });
   }


   lugares(){
    var api_url="http://localhost:3000/api/lugares";
    return new Promise(resolve => {
      this.http.get(api_url).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });



  }
}
