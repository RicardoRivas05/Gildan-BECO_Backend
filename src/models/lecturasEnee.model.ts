import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mssql: {schema: 'dbo', table: 'LecturasEnee'}},
})
export class lecturasEnee extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: 1,
    mssql: {
      columnName: 'id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  id: number;

  @property({
    type: 'string',
    length: 50,
    mssql: {
      columnName: 'fechaInicial',
      dataType: 'Date',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  fechaInicial?: Date;

  @property({
    type: 'string',
    length: 50,
    mssql: {
      columnName: 'fechaFinal',
      dataType: 'Date',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  fechaFinal?: Date;

  @property({
    type: 'string',
    mssql: {
      columnName: 'tipoMedidorId',
      dataType: 'int',
      dataPrecision: 10,
      dataScale: 2,
      nullable: 'YES',
    },
  })
  tipoMedidor?: number;

  @property({
    type: 'string',
    mssql: {
      columnName: 'puntaInicial',
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 3,
      nullable: 'YES',
    },
  })
  puntaInicial?: number;

  @property({
    type: 'string',
    mssql: {
      columnName: 'puntaFinal',
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 3,
      nullable: 'YES',
    },
  })
  puntaFinal?: number;

  @property({
    type: 'string',
    mssql: {
      columnName: 'restoInicial',
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 3,
      nullable: 'YES',
    },
  })
  restoInicial?: number;

  @property({
    type: 'string',
    mssql: {
      columnName: 'restoFinal',
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 3,
      nullable: 'YES',
    },
  })
  restoFinal?: number;


  @property({
    type: 'boolean',
    required: false,
    mssql: {
      columnName: 'estado',
      dataType: 'bit',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  estado: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<lecturasEnee>) {
    super(data);
  }
}

export interface lecturasEneeRelations {
  // describe navigational properties here
}

export type lecturasEneeWithRelations = lecturasEnee & lecturasEneeRelations;
