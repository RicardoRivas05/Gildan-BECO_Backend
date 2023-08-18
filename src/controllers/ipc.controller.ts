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
import {ipc} from '../models/ipc.model';
import {ipcRepository} from '../repositories/ipc.repository';

@authenticate('admin', 'owner')
export class ipcController {
  constructor(
    @repository(ipcRepository)
    public ipcRepository: ipcRepository,
  ) {}

  @post('/ipc')
  @response(200, {
    description: 'ipc model instance',
    content: {'application/json': {schema: getModelSchemaRef(ipc)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ipc, {
            title: 'Newipc',
            exclude: ['id'],
          }),
        },
      },
    })
    ipc: Omit<ipc, 'id'>,
  ): Promise<ipc> {
    return this.ipcRepository.create(ipc);
  }

  @get('/ipc/count')
  @response(200, {
    description: 'ipc model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(ipc) where?: Where<ipc>): Promise<Count> {
    return this.ipcRepository.count(where);
  }

  @get('/ipc')
  @response(200, {
    description: 'Array of ipc model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ipc, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(ipc) filter?: Filter<ipc>): Promise<ipc[]> {
    return this.ipcRepository.find(filter);
  }

  @patch('/ipc')
  @response(200, {
    description: 'ipc PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ipc, {partial: true}),
        },
      },
    })
    ipc: ipc,
    @param.where(ipc) where?: Where<ipc>,
  ): Promise<Count> {
    return this.ipcRepository.updateAll(ipc, where);
  }

  @get('/ipc/{id}')
  @response(200, {
    description: 'ipc model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ipc, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ipc, {exclude: 'where'}) filter?: FilterExcludingWhere<ipc>,
  ): Promise<ipc> {
    return this.ipcRepository.findById(id, filter);
  }

  @patch('/ipc/{id}')
  @response(204, {
    description: 'ipc PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ipc, {partial: true}),
        },
      },
    })
    ipc: ipc,
  ): Promise<void> {
    await this.ipcRepository.updateById(id, ipc);
  }

  @put('/ipc/{id}')
  @response(204, {
    description: 'ipc PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ipc: ipc,
  ): Promise<void> {
    await this.ipcRepository.replaceById(id, ipc);
  }

  @del('/ipc/{id}')
  @response(204, {
    description: 'ipc DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ipcRepository.deleteById(id);
  }

  @get('/get-ipc/{id}')
  async Getipc(@param.path.number('id') id: number): Promise<any> {
    let datos = await this.dataipc(id);
    console.log('-------------------------', id);
    console.log('datos', datos);
    return datos;
  }

  async dataipc(id: number) {
    return await this.ipcRepository.dataSource.execute(
      `${viewOf.Get_ipc} Where estado = ${id}`,
    );
  }
}
