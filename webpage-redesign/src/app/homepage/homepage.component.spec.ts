import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroductionComponent } from './introduction/introduction.component';
import { HomepageComponent } from './homepage.component';
import { CommonModule } from '@angular/common';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageComponent, IntroductionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
