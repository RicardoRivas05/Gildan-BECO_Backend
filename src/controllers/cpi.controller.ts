import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {viewOf} from '../core/library/views.library';
import {cpi} from '../models/cpi.model';
import {cpiRepository} from '../repositories';

@authenticate('admin', 'owner')
export class cpiController {
  constructor(
    @repository(cpiRepository)
    public cpiRepository: cpiRepository,
  ) {}

  @post('/cpi')
  @response(200, {
    description: 'cpi model instance',
    content: {'application/json': {schema: getModelSchemaRef(cpi)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(cpi, {
            title: 'Newcpi',
            exclude: ['id'],
          }),
        },
      },
    })
    cpi: Omit<cpi, 'id'>,
  ): Promise<cpi> {
    return this.cpiRepository.create(cpi);
  }

  @get('/cpi/count')
  @response(200, {
    description: 'cpi model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(cpi) where?: Where<cpi>): Promise<Count> {
    return this.cpiRepository.count(where);
  }

  @get('/cpi')
  @response(200, {
    description: 'Array of cpi model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(cpi, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(cpi) filter?: Filter<cpi>): Promise<cpi[]> {
    return this.cpiRepository.find(filter);
  }

  @patch('/cpi')
  @response(200, {
    description: 'cpi PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(cpi, {partial: true}),
        },
      },
    })
    cpi: cpi,
    @param.where(cpi) where?: Where<cpi>,
  ): Promise<Count> {
    return this.cpiRepository.updateAll(cpi, where);
  }

  @get('/cpi/{id}')
  @response(200, {
    description: 'cpi model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(cpi, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(cpi, {exclude: 'where'}) filter?: FilterExcludingWhere<cpi>,
  ): Promise<cpi> {
    return this.cpiRepository.findById(id, filter);
  }

  @patch('/cpi/{id}')
  @response(204, {
    description: 'cpi PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(cpi, {partial: true}),
        },
      },
    })
    cpi: cpi,
  ): Promise<void> {
    await this.cpiRepository.updateById(id, cpi);
  }

  @put('/cpi/{id}')
  @response(204, {
    description: 'cpi PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cpi: cpi,
  ): Promise<void> {
    await this.cpiRepository.replaceById(id, cpi);
  }

  @del('/cpi/{id}')
  @response(204, {
    description: 'cpi DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cpiRepository.deleteById(id);
  }

  @get('/get-cpi/{id}')
  async Getcpi(@param.path.number('id') id: number): Promise<any> {
    let datos = await this.datacpi(id);
    console.log('-------------------------', id);
    console.log('datos', datos);
    return datos;
  }

  async datacpi(id: number) {
    return await this.cpiRepository.dataSource.execute(
      `${viewOf.Get_CPI} Where estado = ${id}`,
    );
  }
}
