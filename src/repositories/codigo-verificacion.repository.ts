import {inject} from '@loopback/core/dist';
import {DefaultCrudRepository} from '@loopback/repository';
import {GestionEdboDataSource} from '../datasources';
import {CodigoVerificacion, CodigoVerificacionRelations} from '../models/codigo-verificacion.model';

export class CodigoVerificacionRepository extends DefaultCrudRepository<
  CodigoVerificacion,
  typeof CodigoVerificacion.prototype.id,
  CodigoVerificacionRelations
> {
  constructor(
    @inject('datasources.GestionEDBO') dataSource: GestionEdboDataSource,
  ) {
    super(CodigoVerificacion, dataSource);
  }
}
