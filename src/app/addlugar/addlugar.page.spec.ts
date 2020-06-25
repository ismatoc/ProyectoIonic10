import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddlugarPage } from './addlugar.page';

describe('AddlugarPage', () => {
  let component: AddlugarPage;
  let fixture: ComponentFixture<AddlugarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlugarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddlugarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
