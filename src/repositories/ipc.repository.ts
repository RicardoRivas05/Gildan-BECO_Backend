import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GestionEdboDataSource} from '../datasources';
import {ipc, ipcRelations} from '../models/ipc.model';
export class ipcRepository extends DefaultCrudRepository<
  ipc,
  typeof ipc.prototype.id,
  ipcRelations
> {
  constructor(
    @inject('datasources.GestionEDBO') dataSource: GestionEdboDataSource,
  ) {
    super(ipc, dataSource);
  }
}
