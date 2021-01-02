# GIT HISTORY API Service
Pequeño API Rest Service para visualizar: 
* Branches
* Commits
* Pull Requests
* Authors

de un repositorio git.

## Requerimientos
* Node >= 12.16.2 (https://nodejs.org/es/)
* Yarn >= 1.22.4 (https://yarnpkg.com/)
* Git >= 2.24.0 (https://git-scm.com/)

## Instrucciones para la ejecucion
* Clonar el codigo cliente de la web-app e instalar las dependencias
````
git clone https://github.com/Alex9808/git-client.git
cd git-clone
yarn
````
* En el direcorio donde se creo la carpeta ``git-client`` clonar el codigo del servidor e instalar sus dependencias
````
git clone https://github.com/Alex9808/99minutos-fullstack-interview-test.git git-api
cd git-api
yarn
````
* Iniciar el servidor del servicio api esto iniciara una instancia del servidor en ``http://localhost:5000``
````
yarn start
````
* Iniciar el servidor del cliente ubicandonos dentro del directorio del codigo fuente del cliente (git-client) usando el siguiente comando
````
yarn startClient 
````
Ingresar a ``http://localhost:3000`` y escribir una url de cualquier repositorio o seleccionando uno de los ya preestablecidos.

### Notas
* En dado caso de que el puerto para el servicio API este en uso puede cambiarlo en el archivo ``git-api/bin/www`` ubicando la variable ``port``. Si este se llega a modificar tambien debe modificar el campo ``proxy`` en ``git-client/package.json``.
 