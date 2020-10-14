# LeicesterApi

Api del equipo Leicester , del cual se obtienen los datos de los partidos y puntos a traves de una cron todos los dias a las 23 hs de la pagina oficial del equipo : https://www.lcfc.com/.

Los calls que se pueden hacer son los siguientes : 

GET Resultado del último partido

GET Resultado de un partido en particular (Se pueda buscar por fecha o por id)

GET Últimos 50 partidos

GET Partidos por intervalo de fecha

GET para obtener los puntos que tiene Leicester por un rango de fechas

Login y creacion de usuario con JWT 

POST para agregar un partido a mano

Requisitos previos 


Base de datos mongodb 

Npm 

Configurar las variables de entorno : 

-JWTKEY

-DB_NAME

-DB_USER

-DB_PASSWORD

Luego se debe clonar el proyecto ; Instalar los paquetes con npm : npm install en la carpeta que clonamos 

Por ultimo Ejecutamos 

npm run start para iniciar el servidor 
