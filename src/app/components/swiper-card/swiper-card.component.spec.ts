import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { SwiperCardComponent } from './swiper-card.component';

describe('SwiperCardComponent', () => {
  let component: SwiperCardComponent;
  let fixture: ComponentFixture<SwiperCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SwiperCardComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start automatic slide transition', fakeAsync(() => {
    spyOn(component, 'nextSlide').and.callThrough();
    component.ngOnInit();
    tick(5000);
    expect(component.nextSlide).toHaveBeenCalled();
    component.ngOnDestroy();
  }));

  it('should stop automatic slide transition on destroy', fakeAsync(() => {
    spyOn(window, 'clearInterval').and.callThrough();
    component.ngOnInit();
    component.ngOnDestroy();
    expect(window.clearInterval).toHaveBeenCalledWith(component.intervalId);
  }));

  it('should navigate to the next slide', fakeAsync(() => {
    component.showSlide = jasmine.createSpy();
    component.nextSlide();
    expect(component.showSlide).toHaveBeenCalledWith(1);
  }));

  it('should navigate to the previous slide', fakeAsync(() => {
    component.showSlide = jasmine.createSpy();
    component.previousSlide();
    expect(component.showSlide).toHaveBeenCalledWith(-1);
  }));

  it('should show the correct slide', fakeAsync(() => {
    const slidesElement = fixture.debugElement.query(By.css('.slides')).nativeElement;
    const dotsElement = fixture.debugElement.queryAll(By.css('.dot'));

    component.showSlide(2);
    fixture.detectChanges();
    tick(); // wait for the changes to be applied

    expect(component.currentSlideIndex).toBe(2);
    expect(slidesElement.style.transform).toBe('translateX(-200%)');
    dotsElement.forEach((dot, index) => {
      if (index === 2) {
        expect(dot.nativeElement.classList).toContain('active');
      } else {
        expect(dot.nativeElement.classList).not.toContain('active');
      }
    });
  }));

  it('should go to the specified slide when a dot is clicked', fakeAsync(() => {
    component.goToSlide = jasmine.createSpy();
    const dotElements = fixture.debugElement.queryAll(By.css('.dot'));
    dotElements[3].nativeElement.click();
    expect(component.goToSlide).toHaveBeenCalledWith(3);
  }));
});
