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
* Clonar el codigo del servidor e instalar sus dependencias
````
git clone https://github.com/Alex9808/99minutos-fullstack-interview-test.git -b dev git-api
cd git-api
yarn
````
* Inicializar el ORM para un correcto funcionamiento de la DB
````
yarn prisma generate
````
* Iniciar el servidor del servicio api esto iniciara una instancia del servidor en ``http://localhost:5000``
````
yarn start
````
* Ingresar a http://localhost:5000

## Iniciar el cliente en desarrollo (Opcional)
* Instalar las dependencias para el cliente con el comando 
````
cd client
yarn
````
* Iniciar el servidor del cliente usando el siguiente comando
````
yarn startClient 
````
Ingresar a ``http://localhost:3000`` y escribir una url de cualquier repositorio o seleccionando uno de los ya preestablecidos.

 ### Notas
 * En dado caso de que el puerto para el servicio API este en uso puede cambiarlo en el archivo ``git-api/bin/www`` ubicando la variable ``port``. Si este se a modificar tambien debe modificar el campo ``proxy`` en ``client/package.json``.
 * Para inspeccionar un nuevo repositorio se necesita detener el servidor y eliminar la carpeta ``tmp``.
 * El codigo fuente del cliente tambien se puede encontrar en https://github.com/Alex9808/git-client.git
 * Al momento de crear un Pull Request puede ser por dos situaciones: 
    * Se quiere hacer una operacion de Merge de una branch remota a una remota o a una local.
    * El autor por defecto del repositorio no se encuentra (se tiene que ingresar los datos del autor)
 * La funcion Merge solo funciona con branchs locales.
 * El funcionamiento de este proyecto ha sido probado en 3 equipos diferentes y solo en 2 funciono, en el equipo que no funciono se debio a fallas en el ORM por iniciarse en un entorno emulado y con permisos de administrador.  