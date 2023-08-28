import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GestionEdboDataSource} from '../datasources';
import {horasPunta, horasPuntaRelations} from '../models/horasPunta.model';
export class horasPuntaRepository extends DefaultCrudRepository<
  horasPunta,
  typeof horasPunta.prototype.id,
  horasPuntaRelations
> {
  constructor(
    @inject('datasources.GestionEDBO') dataSource: GestionEdboDataSource,
  ) {
    super(horasPunta, dataSource);
  }
}
