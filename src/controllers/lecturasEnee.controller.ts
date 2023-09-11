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
import {lecturasEnee} from '../models/lecturasEnee.model';
import {lecturasEneeRepository} from '../repositories/lecturasEnee.repository';

@authenticate('admin', 'owner')
export class lecturasEneeController {
  constructor(
    @repository(lecturasEneeRepository)
    public lecturasEneeRepository: lecturasEneeRepository,
  ) { }

  @post('/lecturasEnee')
  @response(200, {
    description: 'lecturasEnee model instance',
    content: {'application/json': {schema: getModelSchemaRef(lecturasEnee)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(lecturasEnee, {
            title: 'NewlecturasEnee',
            exclude: ['id'],
          }),
        },
      },
    })
    lecturasEnee: Omit<lecturasEnee, 'id'>,
  ): Promise<lecturasEnee> {
    return this.lecturasEneeRepository.create(lecturasEnee);
  }

  @get('/lecturasEnee/count')
  @response(200, {
    description: 'lecturasEnee model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(lecturasEnee) where?: Where<lecturasEnee>): Promise<Count> {
    return this.lecturasEneeRepository.count(where);
  }

  @get('/lecturasEnee')
  @response(200, {
    description: 'Array of lecturasEnee model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(lecturasEnee, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(lecturasEnee) filter?: Filter<lecturasEnee>): Promise<lecturasEnee[]> {
    return this.lecturasEneeRepository.find(filter);
  }

  @patch('/lecturasEnee')
  @response(200, {
    description: 'lecturasEnee PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(lecturasEnee, {partial: true}),
        },
      },
    })
    lecturasEnee: lecturasEnee,
    @param.where(lecturasEnee) where?: Where<lecturasEnee>,
  ): Promise<Count> {
    return this.lecturasEneeRepository.updateAll(lecturasEnee, where);
  }

  @get('/lecturasEnee/{id}')
  @response(200, {
    description: 'lecturasEnee model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(lecturasEnee, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(lecturasEnee, {exclude: 'where'}) filter?: FilterExcludingWhere<lecturasEnee>,
  ): Promise<lecturasEnee> {
    return this.lecturasEneeRepository.findById(id, filter);
  }

  @patch('/lecturasEnee/{id}')
  @response(204, {
    description: 'lecturasEnee PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(lecturasEnee, {partial: true}),
        },
      },
    })
    lecturasEnee: lecturasEnee,
  ): Promise<void> {
    await this.lecturasEneeRepository.updateById(id, lecturasEnee);
  }

  @put('/lecturasEnee/{id}')
  @response(204, {
    description: 'lecturasEnee PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() lecturasEnee: lecturasEnee,
  ): Promise<void> {
    await this.lecturasEneeRepository.replaceById(id, lecturasEnee);
  }

  @del('/lecturasEnee/{id}')
  @response(204, {
    description: 'lecturasEnee DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.lecturasEneeRepository.deleteById(id);
  }

  @get('/get-lecturasEnee/{id}')
  async GetlecturasEnee(@param.path.number('id') id: number): Promise<any> {
    let datos = await this.datalecturasEnee(id);
    // console.log('-------------------------', id);
    // console.log('datos', datos);
    return datos;
  }

  async datalecturasEnee(id: number) {
    return await this.lecturasEneeRepository.dataSource.execute(
      `${viewOf.getLecurasEnee} Where estado = ${id}`,
    );
  }
}
