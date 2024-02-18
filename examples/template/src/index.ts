import { App } from '@cdfzo/kh'

new App()
  .useLocales('en-US', 'de-DE')

  .get('api/users', 'users#index')
  .get('api/users/*', 'users#show')
  .get('api/users/new', 'users#new')
  .get('api/users/*/edit', 'users#edit')
  .post('api/users', 'users#create')
  .put('api/users/*', 'users#update')
  .delete('api/users/*', 'users#destroy')
  .get('error', 'home#error')

  .listen(3000)
