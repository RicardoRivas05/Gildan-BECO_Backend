import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mssql: {schema: 'dbo', table: 'variablesContrato'}},
})
export class variablesContratos extends Entity {
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
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  fechaFinal?: string;

  @property({
    type: 'string',
    length: 50,
    mssql: {
      columnName: 'nombreContrato',
      dataType: 'varchar',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  nombreContrato?: string;

  @property({
    type: 'string',
    length: 50,
    mssql: {
      columnName: 'cpcf',
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 4,
      nullable: 'YES',
    },
  })
  cpcf?: number;

  @property({
    type: 'string',
    mssql: {
      columnName: 'cfc',
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 4,
      nullable: 'YES',
    },
  })
  cfc?: number;

  @property({
    type: 'string',
    mssql: {
      columnName: 'fdr',
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 5,
      nullable: 'YES',
    },
  })
  fdr?: number;

  @property({
    type: 'string',
    mssql: {
      columnName: 'cpomD',
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 6,
      nullable: 'YES',
    },
  })
  cpomD?: number;

  @property({
    type: 'string',
    mssql: {
      columnName: 'cpomL',
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 6,
      nullable: 'YES',
    },
  })
  cpomL?: number;

  @property({
    type: 'string',
    mssql: {
      columnName: 'cvci',
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 9,
      nullable: 'YES',
    },
  })
  cvci?: number;

  @property({
    type: 'string',
    mssql: {
      columnName: 'cvco1',
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 9,
      nullable: 'YES',
    },
  })
  cvco1?: number;

  @property({
    type: 'string',
    mssql: {
      columnName: 'cvco2',
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 9,
      nullable: 'YES',
    },
  })
  cvco2?: number;

  @property({
    type: 'string',
    mssql: {
      columnName: 'otrosCargos',
      dataType: 'decimal',
      dataPrecision: 10,
      dataScale: 9,
      nullable: 'YES',
    },
  })
  otrosCargos?: number;


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

  constructor(data?: Partial<variablesContratos>) {
    super(data);
  }
}

export interface variablesContratosRelations {
  // describe navigational properties here
}

export type variablesContratosWithRelations = variablesContratos & variablesContratosRelations;
