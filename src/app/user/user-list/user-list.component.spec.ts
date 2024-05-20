import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { By } from '@angular/platform-browser';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  let store: { [key: string]: string } = {};

beforeAll(() => {
    spyOn(localStorage, 'getItem').and.callFake((key) => store[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key, value) => store[key] = value);
    spyOn(localStorage, 'removeItem').and.callFake((key) => delete store[key]);
    spyOn(localStorage, 'clear').and.callFake(() => store = {});
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableModule, ButtonModule],
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users from localStorage', () => {
    const users = [{ name: 'John Doe', dob: '1990-01-01', gender: 'male' }, { name: 'Jane Doe', dob: '1995-01-01', gender: 'female' }];
    localStorage.setItem('users', JSON.stringify(users));
  
    component.loadUsers();
    expect(component.users.length).toBe(2);
  });
  

  it('should navigate to register page on button click', () => {
    fixture.detectChanges(); 
    const button = fixture.debugElement.query(By.css('.btn-primary'));
    if (button) {
      button.triggerEventHandler('click', null);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/register']);
    } else {
      fail('Button not found');
    }
  });
  

  it('should delete user', () => {
    const user = component.users[0];
    component.deleteUser(user);
    expect(component.users.length).toBe(0);
  });
  

  it('should handle an empty user list', () => {
    localStorage.setItem('users', JSON.stringify([]));
    component.loadUsers();
    expect(component.users.length).toBe(0);
    expect(component.filteredUsers.length).toBe(0);
  });

  it('should handle gender filter with no matches', () => {
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { value: 'nonexistent-gender' } });
    component.applyGenderFilter(event);
    expect(component.filteredUsers.length).toBe(0);
  });  
  it('should clear gender filter', () => {
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { value: '' } });
    component.applyGenderFilter(event);
    expect(component.filteredUsers.length).toBe(component.users.length);
  });
});
