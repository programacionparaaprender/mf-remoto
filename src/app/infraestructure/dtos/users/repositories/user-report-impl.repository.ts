import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { users, saveUser, updateUser } from '../../../../shared/users';
import { IMessage } from '../../interfaces/message.interface';
import { ResponseDto } from '../../response.dto';
import { User } from '../../../../domain/users/entities/user.interface';
import { IMetaData } from '../../interfaces/metadata.interface';
import { UserReportRepository } from '../../../../domain/users/repositories/user-report-repository';


@Injectable({
  providedIn: 'root',
})
export class UserReportImplRepository extends UserReportRepository {
  //private users: User[] = users;
  constructor(private http: HttpClient) {
    super();
  }

  override getUser(id: number): Observable<ResponseDto<User>> {
    const user = users.find(x=>x.id == id) as User;
    const message: IMessage = {
      codigo: "001",
      mensaje: "satisfactorio",
      tipo: "lectura"
    }
    let meta: IMetaData = {
      mensajes: [
        message
      ],
      totalRegistros: 1,
      idTransaccion: "1",
      numeroPaginaSiguiente: "1",
      numeroTotalPaginas: "1"
    }
    let responseDto = new ResponseDto(meta, user);
    return of(responseDto);
  }

  override getUserList(): Observable<ResponseDto<User[]>> {
    const message: IMessage = {
      codigo: "001",
      mensaje: "satisfactorio",
      tipo: "lectura"
    }
    let meta: IMetaData = {
      mensajes: [
        message
      ],
      totalRegistros: users.length,
      idTransaccion: "1",
      numeroPaginaSiguiente: "1",
      numeroTotalPaginas: "1"
    }
    let responseDto = new ResponseDto(meta, users);
    return of(responseDto);
  }
}
