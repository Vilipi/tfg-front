import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardInfoPopUpComponent } from './board-info-popup.component';


describe('PopupComponent', () => {
  let component: BoardInfoPopUpComponent;
  let fixture: ComponentFixture<BoardInfoPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardInfoPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardInfoPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
