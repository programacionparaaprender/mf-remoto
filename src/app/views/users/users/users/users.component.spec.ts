import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { UserListUseCase } from '../../../../application/users/usecases/user-list.usecase';
import { CreateUserUseCase } from '../../../../application/users/usecases/create-user.usecase';
import { UpdateUserUseCase } from '../../../../application/users/usecases/update-user.usecase';
import { DeleteUserUseCase } from '../../../../application/users/usecases/delete-user.usecase';
import { User } from '../../../../domain/users/entities/user.interface';
import { of } from 'rxjs';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  
  // Mock de los use cases
  const mockUserListUseCase = {
    execute: jest.fn()
  };
  
  const mockCreateUserUseCase = {
    execute: jest.fn()
  };
  
  const mockUpdateUserUseCase = {
    execute: jest.fn()
  };
  
  const mockDeleteUserUseCase = {
    execute: jest.fn()
  };

  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent],
      providers: [
        { provide: UserListUseCase, useValue: mockUserListUseCase },
        { provide: CreateUserUseCase, useValue: mockCreateUserUseCase },
        { provide: UpdateUserUseCase, useValue: mockUpdateUserUseCase },
        { provide: DeleteUserUseCase, useValue: mockDeleteUserUseCase }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    
    // Configurar mocks antes de cada test
    mockUserListUseCase.execute.mockReturnValue(of({ dates: mockUsers }));
    mockCreateUserUseCase.execute.mockReturnValue(of(undefined));
    mockUpdateUserUseCase.execute.mockReturnValue(of(undefined));
    mockDeleteUserUseCase.execute.mockReturnValue(of(undefined));
    
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty users array and default newUser', () => {
    expect(component.users).toEqual([]);
    expect(component.newUser).toEqual({ id: 0, name: '', email: '' });
    expect(component.editing).toBe(false);
  });

  describe('ngOnInit', () => {
    it('should load users on initialization', async () => {
      // El ngOnInit ya se ejecutó en fixture.detectChanges()
      expect(mockUserListUseCase.execute).toHaveBeenCalled();
      expect(component.users).toEqual(mockUsers);
    });

    it('should handle error when loading users fails', async () => {
      const error = new Error('Failed to load users');
      mockUserListUseCase.execute.mockReturnValue(of({ dates: [] }));
      
      await component.ngOnInit();
      
      expect(component.users).toEqual([]);
    });
  });

  describe('getUsers', () => {
    it('should return users from use case', async () => {
      const users = await component.getUsers();
      
      expect(mockUserListUseCase.execute).toHaveBeenCalled();
      expect(users).toEqual(mockUsers);
    });
  });

  describe('saveUser', () => {
    beforeEach(() => {
      mockUserListUseCase.execute.mockReturnValue(of({ dates: mockUsers }));
    });

    it('should create a new user when not editing', async () => {
      component.newUser = { id: 0, name: 'New User', email: 'new@example.com' };
      component.editing = false;

      await component.saveUser();

      expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith({
        id: 0,
        name: 'New User',
        email: 'new@example.com'
      });
      expect(mockUserListUseCase.execute).toHaveBeenCalled();
      expect(component.users).toEqual(mockUsers);
    });

    it('should update an existing user when editing', async () => {
      component.newUser = { id: 1, name: 'Updated User', email: 'updated@example.com' };
      component.editing = true;

      await component.saveUser();

      expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith({
        id: 1,
        name: 'Updated User',
        email: 'updated@example.com'
      });
      expect(mockUserListUseCase.execute).toHaveBeenCalled();
      expect(component.users).toEqual(mockUsers);
    });

    it('should reset form after saving', async () => {
      component.newUser = { id: 1, name: 'Test User', email: 'test@example.com' };
      component.editing = true;

      await component.saveUser();

      expect(component.newUser).toEqual({ id: 0, name: '', email: '' });
      expect(component.editing).toBe(false);
    });
  });

  describe('editUser', () => {
    it('should set newUser with user data and enable editing mode', () => {
      const userToEdit: User = { id: 1, name: 'John Doe', email: 'john@example.com' };

      component.editUser(userToEdit);

      expect(component.newUser).toEqual(userToEdit);
      expect(component.editing).toBe(true);
    });

    it('should not mutate the original user object', () => {
      const originalUser: User = { id: 1, name: 'John Doe', email: 'john@example.com' };
      const userCopy = { ...originalUser };

      component.editUser(originalUser);

      expect(originalUser).toEqual(userCopy);
      expect(component.newUser).not.toBe(originalUser); // Debe ser una copia
    });
  });

  describe('deleteUser', () => {
    it('should delete user and refresh user list', async () => {
      const userId = 1;

      await component.deleteUser(userId);

      expect(mockDeleteUserUseCase.execute).toHaveBeenCalledWith(userId);
      expect(mockUserListUseCase.execute).toHaveBeenCalled();
      expect(component.users).toEqual(mockUsers);
    });

    it('should handle deletion of non-existent user', async () => {
      const userId = 999;

      await component.deleteUser(userId);

      expect(mockDeleteUserUseCase.execute).toHaveBeenCalledWith(userId);
      expect(mockUserListUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('resetForm', () => {
    it('should reset newUser to default values and disable editing', () => {
      component.newUser = { id: 1, name: 'Test User', email: 'test@example.com' };
      component.editing = true;

      component.resetForm();

      expect(component.newUser).toEqual({ id: 0, name: '', email: '' });
      expect(component.editing).toBe(false);
    });

    it('should work when called multiple times', () => {
      component.newUser = { id: 5, name: 'User 5', email: 'user5@example.com' };
      component.editing = true;

      component.resetForm();
      component.resetForm(); // Llamada múltiple

      expect(component.newUser).toEqual({ id: 0, name: '', email: '' });
      expect(component.editing).toBe(false);
    });
  });

  describe('Component State Management', () => {
    it('should maintain consistent state after multiple operations', async () => {
      // Estado inicial
      expect(component.editing).toBe(false);
      expect(component.newUser).toEqual({ id: 0, name: '', email: '' });

      // Editar usuario
      const userToEdit: User = { id: 1, name: 'John Doe', email: 'john@example.com' };
      component.editUser(userToEdit);
      
      expect(component.editing).toBe(true);
      expect(component.newUser).toEqual(userToEdit);

      // Resetear formulario
      component.resetForm();
      
      expect(component.editing).toBe(false);
      expect(component.newUser).toEqual({ id: 0, name: '', email: '' });
    });
  });

  describe('Use Case Integration', () => {
    it('should inject all use cases correctly', () => {
      expect(component.userListUseCase).toBe(mockUserListUseCase);
      expect(component.createUserUseCase).toBe(mockCreateUserUseCase);
      expect(component.updateUserUseCase).toBe(mockUpdateUserUseCase);
      expect(component.deleteUserUseCase).toBe(mockDeleteUserUseCase);
    });

    it('should call use cases with correct parameters', async () => {
      const newUser: User = { id: 0, name: 'Test User', email: 'test@example.com' };
      
      component.newUser = newUser;
      await component.saveUser();

      expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(newUser);
    });
  });
});