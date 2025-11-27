import { Injectable } from '@angular/core';
import { UseCase } from '../../../domain/usecases/usecase';
import { UserRepository } from '../../../domain/users/repositories/user.repository';
import { Observable } from 'rxjs';
import { User } from '../../../domain/users/entities/user.interface';
import { ResponseDto } from '../../../infraestructure/dtos/response.dto';
import { UserWriterImplRepository } from '../../../infraestructure/dtos/users/repositories/user-writer-impl.repository';


@Injectable({
  providedIn: 'root',
})
export class UpdateUserUseCase
  implements UseCase<User, ResponseDto<User>>
{
  constructor(private userRepository: UserWriterImplRepository) {}
  public execute(params: User): Observable<ResponseDto<User>> {
    return this.userRepository.update(params);
  }
}
