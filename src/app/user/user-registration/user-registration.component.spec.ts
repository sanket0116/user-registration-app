import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistrationComponent } from './user-registration.component';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form fields', () => {
    expect(component.userForm.value).toEqual({
      name: '',
      dob: '',
      gender: '',
      fatherName: '',
      subject: ''
    });
  });

  it('should be invalid when form is empty', () => {
    expect(component.userForm.invalid).toBeTrue();
  });

  it('should validate name field as required', () => {
    const nameControl = component.userForm.get('name');
    nameControl?.setValue('');
    expect(nameControl?.hasError('required')).toBeTrue();
  });

  it('should validate dob field as required', () => {
    const dobControl = component.userForm.get('dob');
    dobControl?.setValue('');
    expect(dobControl?.hasError('required')).toBeTrue();
  });

  it('should validate gender field as required', () => {
    const genderControl = component.userForm.get('gender');
    genderControl?.setValue('');
    expect(genderControl?.hasError('required')).toBeTrue();
  });

  it('should validate fatherName field as required', () => {
    const fatherNameControl = component.userForm.get('fatherName');
    fatherNameControl?.setValue('');
    expect(fatherNameControl?.hasError('required')).toBeTrue();
  });

  it('should validate subject field as required', () => {
    const subjectControl = component.userForm.get('subject');
    subjectControl?.setValue('');
    expect(subjectControl?.hasError('required')).toBeTrue();
  });

  it('should not submit form if required fields are empty', () => {
    component.onSubmit();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should submit form and navigate to user list page when form is valid', () => {
    component.userForm.setValue({
      name: 'Test User',
      dob: '1990-01-01',
      gender: 'male',
      fatherName: 'Test Father',
      subject: 'Test Subject'
    });
    component.onSubmit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/user-list']);
  });
  

  it('should display validation error messages when required fields are empty', () => {
    component.onSubmit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const nameError = compiled.querySelector('#name + .invalid-feedback');
    const dobError = compiled.querySelector('#dob + .invalid-feedback');
    const genderError = compiled.querySelector('#gender + .invalid-feedback');
    const fatherNameError = compiled.querySelector('#fatherName + .invalid-feedback');
    const subjectError = compiled.querySelector('#subject + .invalid-feedback');

    expect(nameError?.textContent).toContain('Name is required');
    expect(dobError?.textContent).toContain('Date of Birth is required');
    expect(genderError?.textContent).toContain('Gender is required');
    expect(fatherNameError?.textContent).toContain('Father\'s Name is required');
    expect(subjectError?.textContent).toContain('Subject is required');
  });
});
