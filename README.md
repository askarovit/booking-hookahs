## ** Test Task ** .


### Used:
- Node JS
- Typescript
- MySQL
- Docker
- Hapi/joi
- Jest
- eslint
------------

**To run test task  you need:**
Go to the root of the project and execute the command :

``` sh
$ docker-compose up --build -d
```

#### REST API:
##### *base url* -  http://localhost:9996/api/

***Get list of bars:***
```
GET   http://localhost:9996/api/ /bars
```
***Create a new bar:***
```
POST: http://localhost:9996/api/bars
req body:
{ title: <string> }
```
***Delete bar by title:***
```
DELETE:  http://localhost:9996/api/bars
req body:
{ title: <string> }
```