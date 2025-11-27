
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { users, deleteUser } from '../../../../shared/users';
import { User } from '../../../../domain/users/entities/user.interface';
import { UserRemovableRepository } from '../../../../domain/users/repositories/user-removable-repository';
import { ResponseDto } from '../../response.dto';
import { IMessage } from '../../interfaces/message.interface';
import { IMetaData } from '../../interfaces/metadata.interface';


@Injectable({
  providedIn: 'root',
})
export class UserRemovableImplRepository extends UserRemovableRepository {
  private users: User[] = users;
  constructor(private http: HttpClient) {
    super();
  }

  override deleteUser(id: number): Observable<ResponseDto<User>> {
    const message: IMessage = {
      codigo: "001",
      mensaje: "satisfactorio",
      tipo: "eliminación"
    }
    let meta: IMetaData = {
      mensajes: [
        message
      ],
      totalRegistros: this.users.length - 1,
      idTransaccion: "1",
      numeroPaginaSiguiente: "1",
      numeroTotalPaginas: "1"
    }
    const user = this.users.find(x=>x.id == id) as User;
    this.users = this.users.filter(user => user.id !== id);
    this.users = deleteUser(this.users);
    let responseDto = new ResponseDto(meta, user);
    return of(responseDto);
  }
}
