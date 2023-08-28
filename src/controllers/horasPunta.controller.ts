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
import {horasPunta} from '../models/horasPunta.model';
import {horasPuntaRepository} from '../repositories/horasPunta.repository';

@authenticate('admin', 'owner')
export class horasPuntaController {
  constructor(
    @repository(horasPuntaRepository)
    public horasPuntaRepository: horasPuntaRepository,
  ) { }

  @post('/horasPunta')
  @response(200, {
    description: 'horasPunta model instance',
    content: {'application/json': {schema: getModelSchemaRef(horasPunta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(horasPunta, {
            title: 'NewhorasPunta',
            exclude: ['id'],
          }),
        },
      },
    })
    horasPunta: Omit<horasPunta, 'id'>,
  ): Promise<horasPunta> {
    return this.horasPuntaRepository.create(horasPunta);
  }

  @get('/horasPunta/count')
  @response(200, {
    description: 'horasPunta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(horasPunta) where?: Where<horasPunta>): Promise<Count> {
    return this.horasPuntaRepository.count(where);
  }

  @get('/horasPunta')
  @response(200, {
    description: 'Array of horasPunta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(horasPunta, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(horasPunta) filter?: Filter<horasPunta>): Promise<horasPunta[]> {
    return this.horasPuntaRepository.find(filter);
  }

  @patch('/horasPunta')
  @response(200, {
    description: 'horasPunta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(horasPunta, {partial: true}),
        },
      },
    })
    horasPunta: horasPunta,
    @param.where(horasPunta) where?: Where<horasPunta>,
  ): Promise<Count> {
    return this.horasPuntaRepository.updateAll(horasPunta, where);
  }

  @get('/horasPunta/{id}')
  @response(200, {
    description: 'horasPunta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(horasPunta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(horasPunta, {exclude: 'where'}) filter?: FilterExcludingWhere<horasPunta>,
  ): Promise<horasPunta> {
    return this.horasPuntaRepository.findById(id, filter);
  }

  @patch('/horasPunta/{id}')
  @response(204, {
    description: 'horasPunta PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(horasPunta, {partial: true}),
        },
      },
    })
    horasPunta: horasPunta,
  ): Promise<void> {
    await this.horasPuntaRepository.updateById(id, horasPunta);
  }

  @put('/horasPunta/{id}')
  @response(204, {
    description: 'horasPunta PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() horasPunta: horasPunta,
  ): Promise<void> {
    await this.horasPuntaRepository.replaceById(id, horasPunta);
  }

  @del('/horasPunta/{id}')
  @response(204, {
    description: 'horasPunta DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.horasPuntaRepository.deleteById(id);
  }

  @get('/get-horasPunta/{id}')
  async GethorasPunta(@param.path.number('id') id: number): Promise<any> {
    let datos = await this.datahorasPunta(id);
    // console.log('-------------------------', id);
    // console.log('datos', datos);
    return datos;
  }

  async datahorasPunta(id: number) {
    return await this.horasPuntaRepository.dataSource.execute(
      `${viewOf.getHorasPunta} Where Estado = ${id}`,
    );
  }
}
