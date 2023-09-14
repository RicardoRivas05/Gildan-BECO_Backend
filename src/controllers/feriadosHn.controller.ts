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
import {feriadosHn} from '../models/feriadosHn.model';
import {feriadosHnRepository} from '../repositories/feriadosHn.repository';

@authenticate('admin', 'owner')
export class feriadosHnController {
  constructor(
    @repository(feriadosHnRepository)
    public feriadosHnRepository: feriadosHnRepository,
  ) { }

  @post('/feriadosHn')
  @response(200, {
    description: 'feriadosHn model instance',
    content: {'application/json': {schema: getModelSchemaRef(feriadosHn)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(feriadosHn, {
            title: 'NewferiadosHn',
            exclude: ['id'],
          }),
        },
      },
    })
    feriadosHn: Omit<feriadosHn, 'id'>,
  ): Promise<feriadosHn> {
    return this.feriadosHnRepository.create(feriadosHn);
  }

  @get('/feriadosHn/count')
  @response(200, {
    description: 'feriadosHn model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(feriadosHn) where?: Where<feriadosHn>): Promise<Count> {
    return this.feriadosHnRepository.count(where);
  }

  @get('/feriadosHn')
  @response(200, {
    description: 'Array of feriadosHn model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(feriadosHn, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(feriadosHn) filter?: Filter<feriadosHn>): Promise<feriadosHn[]> {
    return this.feriadosHnRepository.find(filter);
  }

  @patch('/feriadosHn')
  @response(200, {
    description: 'feriadosHn PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(feriadosHn, {partial: true}),
        },
      },
    })
    feriadosHn: feriadosHn,
    @param.where(feriadosHn) where?: Where<feriadosHn>,
  ): Promise<Count> {
    return this.feriadosHnRepository.updateAll(feriadosHn, where);
  }

  @get('/feriadosHn/{id}')
  @response(200, {
    description: 'feriadosHn model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(feriadosHn, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(feriadosHn, {exclude: 'where'}) filter?: FilterExcludingWhere<feriadosHn>,
  ): Promise<feriadosHn> {
    return this.feriadosHnRepository.findById(id, filter);
  }

  @patch('/feriadosHn/{id}')
  @response(204, {
    description: 'feriadosHn PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(feriadosHn, {partial: true}),
        },
      },
    })
    feriadosHn: feriadosHn,
  ): Promise<void> {
    await this.feriadosHnRepository.updateById(id, feriadosHn);
  }

  @put('/feriadosHn/{id}')
  @response(204, {
    description: 'feriadosHn PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() feriadosHn: feriadosHn,
  ): Promise<void> {
    await this.feriadosHnRepository.replaceById(id, feriadosHn);
  }

  @del('/feriadosHn/{id}')
  @response(204, {
    description: 'feriadosHn DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.feriadosHnRepository.deleteById(id);
  }

  @get('/get-feriadosHn/{id}')
  async GetferiadosHn(@param.path.number('id') id: number): Promise<any> {
    let datos = await this.dataferiadosHn(id);
    // console.log('-------------------------', id);
    // console.log('datos', datos);
    return datos;
  }

  async dataferiadosHn(id: number) {
    return await this.feriadosHnRepository.dataSource.execute(
      `${viewOf.getFeriadosHn} Where estado = ${id}`,
    );
  }
}
