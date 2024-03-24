import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageBoardsComponent } from './manage-boards.component';


describe('BoardUserComponent', () => {
  let component: ManageBoardsComponent;
  let fixture: ComponentFixture<ManageBoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBoardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
