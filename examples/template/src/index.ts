import { App } from '@cdfzo/kh'

new App()
  .useLocales('en-US', 'de-DE')

  .get('/api/users', 'users#index')
  .get('/api/users/:id', 'users#show')
  .get('/api/users/new', 'users#new')
  .get('/api/users/:id/edit', 'users#edit')
  .post('/api/users', 'users#create')
  .put('/api/users/:id', 'users#update')
  .delete('/api/users/:id', 'users#destroy')
  .get('/error', 'home#error')

  .listen(3000)
