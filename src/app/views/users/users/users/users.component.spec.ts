import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { UserListUseCase } from '../../../../application/users/usecases/user-list.usecase';
import { CreateUserUseCase } from '../../../../application/users/usecases/create-user.usecase';
import { UpdateUserUseCase } from '../../../../application/users/usecases/update-user.usecase';
import { DeleteUserUseCase } from '../../../../application/users/usecases/delete-user.usecase';
import { User } from '../../../../domain/users/entities/user.interface';
import { of } from 'rxjs';

// Interface para ResponseDto (asumiendo la estructura basada en el error)
interface ResponseDto<T> {
  dates: T;
  meta: any; // Ajusta este tipo según tu implementación real
}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  
  let userListUseCase: jasmine.SpyObj<UserListUseCase>;
  let createUserUseCase: jasmine.SpyObj<CreateUserUseCase>;
  let updateUserUseCase: jasmine.SpyObj<UpdateUserUseCase>;
  let deleteUserUseCase: jasmine.SpyObj<DeleteUserUseCase>;

  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  // Mock de ResponseDto con la estructura correcta
  const mockUserResponse: ResponseDto<User[]> = {
    dates: mockUsers,
    meta: {
      total: mockUsers.length,
      page: 1,
      limit: 10,
      // ... otras propiedades meta que tengas
    }
  };

  const mockEmptyResponse: ResponseDto<User[]> = {
    dates: [],
    meta: {
      total: 0,
      page: 1,
      limit: 10
    }
  };

  const mockSuccessResponse: ResponseDto<any> = {
    dates: undefined,
    meta: {
      success: true,
      message: 'Operation completed successfully'
    }
  };

  beforeEach(async () => {
    const userListSpy = jasmine.createSpyObj('UserListUseCase', ['execute']);
    const createUserSpy = jasmine.createSpyObj('CreateUserUseCase', ['execute']);
    const updateUserSpy = jasmine.createSpyObj('UpdateUserUseCase', ['execute']);
    const deleteUserSpy = jasmine.createSpyObj('DeleteUserUseCase', ['execute']);

    await TestBed.configureTestingModule({
      imports: [UsersComponent],
      providers: [
        { provide: UserListUseCase, useValue: userListSpy },
        { provide: CreateUserUseCase, useValue: createUserSpy },
        { provide: UpdateUserUseCase, useValue: updateUserSpy },
        { provide: DeleteUserUseCase, useValue: deleteUserSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;

    userListUseCase = TestBed.inject(UserListUseCase) as jasmine.SpyObj<UserListUseCase>;
    createUserUseCase = TestBed.inject(CreateUserUseCase) as jasmine.SpyObj<CreateUserUseCase>;
    updateUserUseCase = TestBed.inject(UpdateUserUseCase) as jasmine.SpyObj<UpdateUserUseCase>;
    deleteUserUseCase = TestBed.inject(DeleteUserUseCase) as jasmine.SpyObj<DeleteUserUseCase>;

    // Configurar los mocks con la estructura ResponseDto correcta
    userListUseCase.execute.and.returnValue(of(mockUserResponse));
    createUserUseCase.execute.and.returnValue(of(mockSuccessResponse));
    updateUserUseCase.execute.and.returnValue(of(mockSuccessResponse));
    deleteUserUseCase.execute.and.returnValue(of(mockSuccessResponse));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load users on init', async () => {
    fixture.detectChanges(); // Esto dispara ngOnInit
    await fixture.whenStable();
    
    expect(userListUseCase.execute).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
  });

  it('should handle empty users response', async () => {
    userListUseCase.execute.and.returnValue(of(mockEmptyResponse));
    fixture.detectChanges();
    await fixture.whenStable();
    
    expect(component.users).toEqual([]);
  });

  it('should create user when saveUser is called and not editing', async () => {
    fixture.detectChanges();
    component.newUser = { id: 0, name: 'New User', email: 'new@test.com' };
    
    await component.saveUser();
    
    expect(createUserUseCase.execute).toHaveBeenCalledWith({
      id: 0,
      name: 'New User',
      email: 'new@test.com'
    });
    expect(userListUseCase.execute).toHaveBeenCalled();
  });

  it('should update user when saveUser is called and editing', async () => {
    fixture.detectChanges();
    component.newUser = { id: 1, name: 'Updated User', email: 'updated@test.com' };
    component.editing = true;
    
    await component.saveUser();
    
    expect(updateUserUseCase.execute).toHaveBeenCalledWith({
      id: 1,
      name: 'Updated User', 
      email: 'updated@test.com'
    });
    expect(userListUseCase.execute).toHaveBeenCalled();
  });

  it('should delete user when deleteUser is called', async () => {
    fixture.detectChanges();
    const userId = 1;
    
    await component.deleteUser(userId);
    
    expect(deleteUserUseCase.execute).toHaveBeenCalledWith(userId);
    expect(userListUseCase.execute).toHaveBeenCalled();
  });

  it('should reset form when resetForm is called', () => {
    component.newUser = { id: 1, name: 'Test User', email: 'test@test.com' };
    component.editing = true;
    
    component.resetForm();
    
    expect(component.newUser).toEqual({ id: 0, name: '', email: '' });
    expect(component.editing).toBeFalse();
  });

  it('should edit user correctly', () => {
    const userToEdit: User = { id: 1, name: 'John Doe', email: 'john@example.com' };
    
    component.editUser(userToEdit);
    
    expect(component.newUser).toEqual(userToEdit);
    expect(component.editing).toBeTrue();
  });

  describe('getUsers method', () => {
    it('should return users array from response', async () => {
      const users = await component.getUsers();
      
      expect(userListUseCase.execute).toHaveBeenCalled();
      expect(users).toEqual(mockUsers);
    });

    it('should handle empty array response', async () => {
      userListUseCase.execute.and.returnValue(of(mockEmptyResponse));
      
      const users = await component.getUsers();
      
      expect(users).toEqual([]);
    });
  });
});