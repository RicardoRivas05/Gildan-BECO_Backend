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
import {euro} from '../models/euro.model';
import {euroRepository} from '../repositories/euro.repository';

@authenticate('admin', 'owner')
export class euroController {
  constructor(
    @repository(euroRepository)
    public euroRepository: euroRepository,
  ) {}

  @post('/euro')
  @response(200, {
    description: 'euro model instance',
    content: {'application/json': {schema: getModelSchemaRef(euro)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(euro, {
            title: 'Neweuro',
            exclude: ['id'],
          }),
        },
      },
    })
    euro: Omit<euro, 'id'>,
  ): Promise<euro> {
    return this.euroRepository.create(euro);
  }

  @get('/euro/count')
  @response(200, {
    description: 'euro model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(euro) where?: Where<euro>): Promise<Count> {
    return this.euroRepository.count(where);
  }

  @get('/euro')
  @response(200, {
    description: 'Array of euro model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(euro, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(euro) filter?: Filter<euro>): Promise<euro[]> {
    return this.euroRepository.find(filter);
  }

  @patch('/euro')
  @response(200, {
    description: 'euro PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(euro, {partial: true}),
        },
      },
    })
    euro: euro,
    @param.where(euro) where?: Where<euro>,
  ): Promise<Count> {
    return this.euroRepository.updateAll(euro, where);
  }

  @get('/euro/{id}')
  @response(200, {
    description: 'euro model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(euro, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(euro, {exclude: 'where'}) filter?: FilterExcludingWhere<euro>,
  ): Promise<euro> {
    return this.euroRepository.findById(id, filter);
  }

  @patch('/euro/{id}')
  @response(204, {
    description: 'euro PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(euro, {partial: true}),
        },
      },
    })
    euro: euro,
  ): Promise<void> {
    await this.euroRepository.updateById(id, euro);
  }

  @put('/euro/{id}')
  @response(204, {
    description: 'euro PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() euro: euro,
  ): Promise<void> {
    await this.euroRepository.replaceById(id, euro);
  }

  @del('/euro/{id}')
  @response(204, {
    description: 'euro DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.euroRepository.deleteById(id);
  }

  @get('/get-euro/{id}')
  async Geteuro(@param.path.number('id') id: number): Promise<any> {
    let datos = await this.dataeuro(id);
    // console.log('-------------------------', id);
    // console.log('datos', datos);
    return datos;
  }

  async dataeuro(id: number) {
    return await this.euroRepository.dataSource.execute(
      `${viewOf.getEuroData} Where estado = ${id}`,
    );
  }
}
