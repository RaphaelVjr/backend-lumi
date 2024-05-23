
# Extração e Exibição de dados de Fatura de Luz

Projeto designado a extrair dados dos extratos das faturas de luz, organizá-los e aplicar regras para exibição dos mesmos em gráficos onde podemos distinguir a comparação dos valores.

## Critérios de aceite

Exiba as principais variáveis da fatura de energia elétrica ao longo do tempo.
Variáveis a serem exibidas:

      - ✅ Consumo de Energia Elétrica (kWh) – somatório das variáveis ‘Energia Elétrica kWh’ + ‘Energia SCEEE s/ICMS kWh’
 
      - ✅ Energia Compensada (kWh) – variável **Energia Compensada GD I kWh**.

      - ✅ Valor Total sem GD (R$) – somatório dos valores faturados de ‘Energia Elétrica R$’,
 
      - ✅ Energia SCEEE s/ICMS R$’, ‘Contribuição Iluminação Pública Municipal R$’ Economia GD (R$) – corresponde à ‘Energia Compensada GD I R$’

      - ✅ Os valores devem ser expressos em gráficos, com a possibilidade de filtrar pelo ‘No DO CLIENTE’.





## Tecnologias Utilizadas

Dillinger uses a number of open source projects to work properly:

- [AngularJS] - HTML enhanced for web apps!
- [Ace Editor] - awesome web-based text editor
- [markdown-it] - Markdown parser done right. Fast and easy to extend.
- [Twitter Bootstrap] - great UI boilerplate for modern web apps
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [Gulp] - the streaming build system
- [Breakdance](https://breakdance.github.io/breakdance/) - HTML
to Markdown converter
- [jQuery] - duh

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.
## Installation

Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd dillinger
npm i
node app
```

For production environments...

```sh
npm install --production
NODE_ENV=production node app
```
## Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.

First Tab:

```sh
node app
```

Second Tab:

```sh
gulp watch
```

(optional) Third:

```sh
karma test
```

## API Documentation

All the routes and their methods.

```http
  post '/submit_ratings', to: 'ratings#submit'
  get '/users', to: 'users#index'
  post '/movies', to: 'movies#create'
  post '/users',   to: 'users#create'
  post 'import_movies', to: 'movies#import'  
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
```



## Running Tests

To run tests in the repository using Rspec you need to:

```bash
  bundle exec rspec
```


## Stacks

**Front-end ([Repo]):** [React], [Kendo UI] (Click to know more).

**Back-end:** [Ruby On Rails], [Redis] and [Sidekiq] (Click to know more).




[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [React]: <https://nodejs.org/en>
   [Kendo UI]: <https://www.telerik.com/kendo-react-ui/components/getting-started/>
   [Repo]: <https://github.com/RaphaelVjr/Frontend-React-Challenge>
   [Ruby On Rails]: <https://rubyonrails.org/>
   [Redis]: <https://redis.io/docs/install/install-redis/>
   [Sidekiq]: <https://github.com/sidekiq/sidekiq/wiki/Getting-Started>
