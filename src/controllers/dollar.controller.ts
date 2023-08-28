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
import {dollar} from '../models/dollar.model';
import {dollarRepository} from '../repositories/dollar.repository';

@authenticate('admin', 'owner')
export class dollarController {
  constructor(
    @repository(dollarRepository)
    public dollarRepository: dollarRepository,
  ) { }

  @post('/dollar')
  @response(200, {
    description: 'dollar model instance',
    content: {'application/json': {schema: getModelSchemaRef(dollar)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(dollar, {
            title: 'Newdollar',
            exclude: ['id'],
          }),
        },
      },
    })
    dollar: Omit<dollar, 'id'>,
  ): Promise<dollar> {
    return this.dollarRepository.create(dollar);
  }

  @get('/dollar/count')
  @response(200, {
    description: 'dollar model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(dollar) where?: Where<dollar>): Promise<Count> {
    return this.dollarRepository.count(where);
  }

  @get('/dollar')
  @response(200, {
    description: 'Array of dollar model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(dollar, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(dollar) filter?: Filter<dollar>): Promise<dollar[]> {
    return this.dollarRepository.find(filter);
  }

  @patch('/dollar')
  @response(200, {
    description: 'dollar PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(dollar, {partial: true}),
        },
      },
    })
    dollar: dollar,
    @param.where(dollar) where?: Where<dollar>,
  ): Promise<Count> {
    return this.dollarRepository.updateAll(dollar, where);
  }

  @get('/dollar/{id}')
  @response(200, {
    description: 'dollar model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(dollar, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(dollar, {exclude: 'where'}) filter?: FilterExcludingWhere<dollar>,
  ): Promise<dollar> {
    return this.dollarRepository.findById(id, filter);
  }

  @patch('/dollar/{id}')
  @response(204, {
    description: 'dollar PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(dollar, {partial: true}),
        },
      },
    })
    dollar: dollar,
  ): Promise<void> {
    await this.dollarRepository.updateById(id, dollar);
  }

  @put('/dollar/{id}')
  @response(204, {
    description: 'dollar PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() dollar: dollar,
  ): Promise<void> {
    await this.dollarRepository.replaceById(id, dollar);
  }

  @del('/dollar/{id}')
  @response(204, {
    description: 'dollar DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.dollarRepository.deleteById(id);
  }

  @get('/get-dollar/{id}')
  async Getdollar(@param.path.number('id') id: number): Promise<any> {
    let datos = await this.datadollar(id);
    // console.log('-------------------------', id);
    // console.log('datos', datos);
    return datos;
  }

  async datadollar(id: number) {
    return await this.dollarRepository.dataSource.execute(
      `${viewOf.getDollarData} Where estado = ${id}`,
    );
  }
}
