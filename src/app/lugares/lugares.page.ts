import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProvidersService } from '../providers.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.page.html',
  styleUrls: ['./lugares.page.scss'],
})
export class LugaresPage implements OnInit {
  argumento = null;
  Items:any;

  constructor(private activatedRoute: ActivatedRoute , public proveedor: ProvidersService) { }

  ngOnInit() {
    this.argumento = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadInfo();
  }

  async loadInfo() {
    this.proveedor.lugares().then(data=>{
      this.Items=data;
      //console.log(this.Items);
    }).catch(data=>{
      //console.log(data);
    })
  }

}
