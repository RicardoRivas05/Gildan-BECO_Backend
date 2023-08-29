import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mssql: {schema: 'dbo', table: 'CPI'}},
})
export class cpi extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: 1,
    mssql: {
      columnName: 'ID',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  ID: number;

  @property({
    type: 'string',
    length: 50,
    mssql: {
      columnName: 'fechaInicial',
      dataType: 'date',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  fechaInicial?: string;

  @property({
    type: 'string',
    length: 50,
    mssql: {
      columnName: 'fechaFinal',
      dataType: 'date',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  fechaFinal?: string;

  @property({
    type: 'string',
    mssql: {
      columnName: 'Value',
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 3,
      nullable: 'YES',
    },
  })
  Value?: number;

  @property({
    type: 'string',
    mssql: {
      columnName: 'ValorUltimoMes',
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 3,
      nullable: 'YES',
    },
  })
  ValorUltimoMes?: number;

  @property({
    type: 'string',
    mssql: {
      columnName: 'ValorInicial',
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 3,
      nullable: 'YES',
    },
  })
  ValorInicial?: number;

  @property({
    type: 'string',
    mssql: {
      columnName: 'RelacionInflacion',
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 6,
      nullable: 'YES',
    },
  })
  RelacionInflacion?: number;

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

  constructor(data?: Partial<cpi>) {
    super(data);
  }
}

export interface cpiRelations {
  // describe navigational properties here
}

export type cpiWithRelations = cpi & cpiRelations;
