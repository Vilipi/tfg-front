import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewBoardPopUpComponent } from './newboard-popup.component';


describe('PopupComponent', () => {
  let component: NewBoardPopUpComponent;
  let fixture: ComponentFixture<NewBoardPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBoardPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBoardPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
