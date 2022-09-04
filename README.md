# DOCKER NA PRATICA

Configurando WSL do Zero: Ambiente perfeito para quem usa Windows
https://www.youtube.com/watch?v=On_nwfkiSAE&t=6184s

Docker do Zero: Criando uma aplicação com Docker até o Deploy
https://www.youtube.com/watch?v=F_pgDkErFIk&t=7653s

## Listar imagens 
https://docs.docker.com/engine/reference/commandline/image_ls/
```docker
docker image ls
```

## Remove as imagens 
https://docs.docker.com/engine/reference/commandline/rmi/
```docker
docker rmi
```

//remover container
```docker
docker rm [idcontainer]
```

## Listar conteiners
https://docs.docker.com/engine/reference/commandline/ps/
```docker
docker ps
```

## Iniciar container
https://hub.docker.com/
https://docs.docker.com/engine/reference/run/
```docker
docker run -d nginx:1.19.10-alpine
```

## Iniciar container, habilitar a porta 8000 da maquina apontando para 80 do container
https://hub.docker.com/
https://docs.docker.com/engine/reference/run/
```docker
docker run -d -p 8000:80 nginx:1.19.10-alpine
```

## Pq não usar docker desktop

## Iniciar container, habilitar a porta 8000 da maquina apontando para 80 do container. Volumes, jogar os arquivos dentro do container
https://hub.docker.com/
https://docs.docker.com/engine/reference/run/
```docker
docker run -d -p 8000:80 -v /home/linuxeddie/ti/imersao-fullcycle-9/iniciando-docker/ nginx:1.19.10-alpine
```
ou
Retorna meu diretorio atual: $(pwd)
```docker
docker run -d -p 8000:80 -v $(pwd):/usr/share/nginx/html nginx:1.19.10-alpine
```

## Parar container
https://docs.docker.com/engine/reference/commandline/stop/
```docker
docker stop [idcontainer]
```

## Logs do container
https://docs.docker.com/engine/reference/commandline/logs/
```docker
docker logs [idcontainer]
```

## Executar um comando dentro do container
https://docs.docker.com/engine/reference/commandline/exec/
```docker
docker exec -it [idcontainer] /bin/sh
```

## Organizar imagem
https://docs.docker.com/engine/reference/builder/

```criar arquivo: Dockerfile
FROM node:14.17.0-slim

WORKDIR /home/node/app

CMD [ "tail", "-f", "/dev/null"]
```

Gerar imagem
```docker
docker build -t minha-imagem-node .
```

Roda imagem
```docker
docker run -d minha-imagem-node
```

Roda imagem e apontar para diretorio
```docker
docker run -d -v $(pwd):/home/node/app minha-imagem-node
```

Roda imagem e apontar para diretorio e direcionar para porta 3000
```docker
docker run -d -v $(pwd):/home/node/app -p 8000:3000 minha-imagem-node
```

Executar o container
```docker
docker exec -it [idcontainer] /bin/bash
```

Acessa o diretorio
```linux
cd /home/node/app
```

Cria projeto node
```linux
node 
```

## criar uma ambiente de produção

```criar arquivo: Dockerfile.prod
FROM node:14.17.0-slim

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "/home/node/app/index.js"]
```

Ignora arquivo ao copiar
```criar arquivo: .dockerignore

node_modules/

```

rodar projeto de produção
```docker
docker build -t minha-imagem-node-prod -f Dockerfile.prod .
```

## subir imagem no Dockerhub

cria imagem no Dockerhub
```docker
docker build -t eddiedevdocker/minha-imagem-node-prod -f Dockerfile.prod .
```

Subir imagem no dockehub
```docker
docker push eddiedevdocker/minha-imagem-node-prod   
```

Rodar imagem do dockerhub
```docker
docker run -p 8000:3000 eddiedevdocker/minha-imagem-node-prod
```   

Rodar imagem do dockerhub, depois de finalizar remove container
```docker
docker run --rm -p 8000:3000 eddiedevdocker/minha-imagem-node-prod
```   

## Subir aplicação no servidor

Googlecloud
https://cloud.google.com/

Criar uma conta

300$

Criar cartão virtual, dps remover

cloud run integrado com vscode

Pesquisar e instalar extenção vs code "Cloud code"

Selecionar projeto

Ativar api no painel cloud run

Instalar a CLI do gcloud
https://cloud.google.com/sdk/docs/install#deb

antes instalar python
sudo apt-get update
sudo apt-get upgrade  #Optional
sudo apt install python3-pip

Instalação pelo ubunto

- Deu erro 
```linux
E: Conflicting values set for option Signed-By regarding source https://packages.cloud.google.com/apt/ cloud-sdk: /usr/share/keyrings/cloud.google.gpg !=
E: The list of sources could not be read.
E: Conflicting values set for option Signed-By regarding source https://packages.cloud.google.com/apt/ cloud-sdk: /usr/share/keyrings/cloud.google.gpg !=
E: The list of sources could not be read.
```  

- Solução: 
```linux
sudo rm /usr/share/keyrings/cloud.google.gpg
sudo rm /usr/share/keyrings/cloud.google.gpg~ 
sudo rm /etc/apt/sources.list.d/google-cloud-sdk.list
```   


```linux
gcloud init
``` 

```linux
gcloud components install beta
``` 

## rodar/iniciar ambiente - formato antigo

```docker
docker build -t minha-imagem-node .
```

Roda imagem e apontar para diretorio
```docker
docker run -d --rm -v $(pwd):/home/node/app minha-imagem-node
```

## rodar/iniciar ambiente - docker compose - novo

Instalar docker compose
```LINUX
sudo apt-get install docker-compose-plugin
```

```criar arquivo: docker-compose.yaml
version: '3'

services:
  app:
    build: .
```

Ele vai subir tudo e criar container 
```docker
docker compose up
```
ou sem travar terminal
```docker
docker compose up -d
```

Listar container  
```docker
docker compose ps
```

Parar container Ctrl+c

Acessar o container
```docker
docker compose exec app node -v
```
```docker
docker compose exec app npm -v
```
```docker
docker compose exec app bash
```

Declarar porta e apontar volume

```docker-compose.yaml
version: '3'

services:
  app:
    build: .
    ports:
      - 8000:3000
    volumes:
      - .:/home/node/app
```

Acessar container
```docker
docker compose exec app bash
```

iniciar node
```node
node index.js
```

Rodar nodemon
```node
npm install nodemon
```

Adicionar em "scripts"
```Arquivo: package.json
"start": "nodemon index.js",
```
Não é possivel salvar pq a maquina esta rodando com usuario root 
Visualizar usuarios maquina
```linux
cat /etc/passwd
```
Resolução para problemas de permissão: USER node
```Dockerfile
FROM node:14.17.0-slim

USER node

WORKDIR /home/node/app

CMD [ "tail", "-f", "/dev/null"]
```
Para alterações/atualizar o Dockerfile
```LINUX
docker compose up --build -d
```

----------Não colocar o gerenciador de dependiencias(package.json) no Dockerfile----------

Rodar e instalar node_modules: RUN npm install
```Dockerfile
FROM node:14.17.0-slim

USER node

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

CMD [ "tail", "-f", "/dev/null"]
```
Para alterações/atualizar o Dockerfile
```LINUX
docker compose up --build -d
```

Manter a node_modules preservar
```docker-compose.yaml
version: '3'

services:
  app:
    build: .
    ports:
      - 8000:3000
    volumes:
      - .:/home/node/app
      - /home/node/app/node_modules
```

----------Não colocar o gerenciador de dependiencias(package.json) no Dockerfile----------

Serve para determinar o que fazer no começo do container
```Criar: start.sh
#!/bin/bash

npm install

tail -f /dev/null
```

```Dockerfile
FROM node:14.17.0-slim

USER node

WORKDIR /home/node/app

CMD [ "/home/node/app/start.sh" ]
```

Permission denied: liberar permissão
```linux
chmod +x start.sh
```

Para rodar o npm start
```start.sh
#!/bin/bash

npm install

#tail -f /dev/null

npm start
```

## image banco de dados mysql em container - container vai ser destruido

```docker-compose.yaml
version: '3'

services:
  app:
    build: .
    ports:
      - 8000:3000
    volumes:
      - .:/home/node/app

  db:
    image: mysql:5.7
    environment:
      - MYSQL_DATABASE=mydb
      - MYSQL_ROOT_PASSWORD=root
```

Para logar no banco
```Linux
mysql -uroot -proot
```

Exibir database
```mysql
show databases;
```

Manter os dados do banco salvo no volume: - ./dbdata:/var/lib/mysql
```docker-compose.yaml
version: '3'

services:
  app:
    build: .
    ports:
      - 8000:3000
    volumes:
      - .:/home/node/app

  db:
    image: mysql:5.7
    environment:
      - MYSQL_DATABASE=mydb
      - MYSQL_ROOT_PASSWORD=root
    volumes:
      - ./dbdata:/var/lib/mysql
```

Remover container - docker compose
```docker compose
docker compose down
```

Boa pratica pra n subir no git o banco de dados
```.gitignore
.dbdata
```

## Subir os container - qual subir primeiro?
- Por padrão ele sobe os containers em paralelo

Para subir o banco primeiro: depends_on:
```docker-compose.yaml
version: '3'

services:
  app:
    build: .
    ports:
      - 8000:3000
    volumes:
      - .:/home/node/app
    depends_on:
      - db

  db:
    image: mysql:5.7
    environment:
      - MYSQL_DATABASE=mydb
      - MYSQL_ROOT_PASSWORD=root
    volumes:
      - ./dbdata:/var/lib/mysql
```

## integrar banco com aplicação

lib mysql
```node
npm install mysql
```

Criar conexão com banco, docker cria uma rede compartilhada
⠿ Network iniciando-docker_default  Created
```index.js
const mysql = require('mysql')

// host: 'db' - se refere ao serviço criado no docker, rede compartilhada
const connection = mysql.createConnection({
    host: 'db', // nome do serviço
    user: 'root',
    password: 'root',
    database: 'mydb'
})
```

## garantir que vai iniciar conteiner quando porta estar disponivel

Script shell fica ouvindo uma porta

```Dockerfile
FROM node:14.17.0-slim

RUN wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \ chmod +x /usr/bin/wait-for

USER node

WORKDIR /home/node/app

CMD [ "/home/node/app/start.sh" ]

```


command: wait-for db:3306 -t 40 -- ./start.sh
```docker-compose.yaml
version: '3'

services:
  app:
    build: .
    command: wait-for db:3306 -t 40 -- ./start.sh
    ports:
      - 8000:3000
    volumes:
      - .:/home/node/app
    depends_on:
      - db

  db:
    image: mysql:5.7
    environment:
      - MYSQL_DATABASE=mydb
      - MYSQL_ROOT_PASSWORD=root
    volumes:
      - ./dbdata:/var/lib/mysql
```

Adicionar 
command: RUN apt update && apt install -y wget netcat git
```Dockerfile
FROM node:14.17.0-slim

RUN apt update && apt install -y wget netcat git

RUN wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \ chmod +x /usr/bin/wait-for

USER node

WORKDIR /home/node/app

CMD [ "/home/node/app/start.sh" ]

```

instalar extenção: Remote - Container
Buscar Ctrl+p : >remote-containers: open Folder in Container
Fazer apontamento do local dos arquivos

```.devcontainer/devcontainer.json
"name": "Iniciando com Docker Compose (Extend)",

"workspaceFolder": "/home/node/app",

"settings": {
  "terminal.integrated.defaultProfile.linux": "bash"
}
```

```.devcontainer/docker-composer.yml
volumes:
      # Update this to wherever you want VS Code to mount the folder of your project
      - .:/home/node/app:cached
```

Realizar alterações
Buscar Ctrl+p : >remote-containers: rebuild 

Sendo assim ele já fica integraco com container, dentro do app container

Como instalar extenção vs code no container?

```.devcontainer/devcontainer.json
"name": "Iniciando com Docker Compose (Extend)",

"workspaceFolder": "/home/node/app",

"settings": {
  "terminal.integrated.defaultProfile.linux": "bash"
},

"extensions": [
		"ms-azuretools.vscode-docker"
	]
```

Iniciar git
``` linux
git init
```

``` .gitignore
dbdata/
node_modules/
```
``` linux
git add .
```
``` linux
git commit -m "first commit"
```

