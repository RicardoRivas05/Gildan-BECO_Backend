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
import {variablesContratos} from '../models/variablesContratos.model';
import {variablesContratosRepository} from '../repositories/variablesContratos.repository';

@authenticate('admin', 'owner')
export class variablesContratosController {
  constructor(
    @repository(variablesContratosRepository)
    public variablesContratosRepository: variablesContratosRepository,
  ) { }

  @post('/variablesContratos')
  @response(200, {
    description: 'variablesContratos model instance',
    content: {'application/json': {schema: getModelSchemaRef(variablesContratos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(variablesContratos, {
            title: 'NewvariablesContratos',
            exclude: ['id'],
          }),
        },
      },
    })
    variablesContratos: Omit<variablesContratos, 'id'>,
  ): Promise<variablesContratos> {
    return this.variablesContratosRepository.create(variablesContratos);
  }

  @get('/variablesContratos/count')
  @response(200, {
    description: 'variablesContratos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(variablesContratos) where?: Where<variablesContratos>): Promise<Count> {
    return this.variablesContratosRepository.count(where);
  }

  @get('/variablesContratos')
  @response(200, {
    description: 'Array of variablesContratos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(variablesContratos, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(variablesContratos) filter?: Filter<variablesContratos>): Promise<variablesContratos[]> {
    return this.variablesContratosRepository.find(filter);
  }

  @patch('/variablesContratos')
  @response(200, {
    description: 'variablesContratos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(variablesContratos, {partial: true}),
        },
      },
    })
    variablesContratos: variablesContratos,
    @param.where(variablesContratos) where?: Where<variablesContratos>,
  ): Promise<Count> {
    return this.variablesContratosRepository.updateAll(variablesContratos, where);
  }

  @get('/variablesContratos/{id}')
  @response(200, {
    description: 'variablesContratos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(variablesContratos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(variablesContratos, {exclude: 'where'}) filter?: FilterExcludingWhere<variablesContratos>,
  ): Promise<variablesContratos> {
    return this.variablesContratosRepository.findById(id, filter);
  }

  @patch('/variablesContratos/{id}')
  @response(204, {
    description: 'variablesContratos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(variablesContratos, {partial: true}),
        },
      },
    })
    variablesContratos: variablesContratos,
  ): Promise<void> {
    await this.variablesContratosRepository.updateById(id, variablesContratos);
  }

  @put('/variablesContratos/{id}')
  @response(204, {
    description: 'variablesContratos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() variablesContratos: variablesContratos,
  ): Promise<void> {
    await this.variablesContratosRepository.replaceById(id, variablesContratos);
  }

  @del('/variablesContratos/{id}')
  @response(204, {
    description: 'variablesContratos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.variablesContratosRepository.deleteById(id);
  }

  @get('/get-variablesContratos/{id}')
  async GetvariablesContratos(@param.path.number('id') id: number): Promise<any> {
    let datos = await this.datavariablesContratos(id);
    // console.log('-------------------------', id);
    // console.log('datos', datos);
    return datos;
  }

  async datavariablesContratos(id: number) {
    return await this.variablesContratosRepository.dataSource.execute(
      `${viewOf.getVariablesContratos} Where estado = ${id}`,
    );
  }
}
