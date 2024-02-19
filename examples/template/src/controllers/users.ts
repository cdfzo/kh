import { App } from '@cdfzo/kh'

export default class {
  // GET /api/users
  index = () => {
    return '#index'
  }

  show = ({ params }: App) => {
    return `#show(${params.id})`
  }

  // GET /api/users/new
  new = () => {
    return '#new'
  }

  // GET /api/users/:id/edit
  edit = ({ params }: App) => {
    return `#edit(${params.id})`
  }

  // POST /api/users
  create = () => {
    return '#create'
  }

  // PUT /api/users/:id
  update = ({ params }: App) => {
    return `#update(${params.id})`
  }

  // DELETE /api/users/:id
  destroy = ({ params }: App) => {
    return `#destroy(${params.id})`
  }
}
