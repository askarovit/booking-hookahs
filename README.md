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

### **To run test task  you need:**
Go to the root of the project and execute the command :

``` sh
$ docker-compose up --build -d
```
------------

###To Seed database (MySQL) you need to:
``` sh
$ docker exec -it backend-container sh
$  npm run seed:mysql
```

------------


### REST API:
##### *base url* -  http://localhost:9996/api/

#### Bar
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

#### Hookah
***Get list of hookahs:***
```
GET   http://localhost:9996/api/hookahs
```
***Create a new Hookah:***
```
POST: http://localhost:9996/api/hookahs
req body:
{
	title: <string>,
	amountTube: <number>,
	barId: <number>
}
```
***Delete Hookah by title and amount tubes:***
```
DELETE:  http://localhost:9996/api/hookahs
req body:
{
	title: <string>,
	amountTube: <number>
}
```

#### Order Hookah:

***Get list of customers who made order:***
```
GET   http://localhost:9996/api/orders/customers
```

***Get list of hookahs which  :***
```
GET   http://localhost:9996/api/orders/available-hookahs
req query:
{
	from: <Date>,
	to: <Date>,
	amountPeople: <number>
}
```
***Make order  :***
```
POST   http://localhost:9996/api/orders/make
req body:
{
	amountPeople: <number>,
	customer: <string>,
	date: <Date>
}
```