# Sample-Node-API
Using Express 4.x.x and mongodb to create a simple API

Installation

```````
	npm install
```````

```````
	node server.js 
```````


## Open postman client to access the API

#### GET - localhost:4000/api/sample
	
*To get all records in db*

#### POST - localhost:4000/api/sample
	
*x-www-form-urlencoded as content type*
	
	``````
	{
		'user': String
	}

	``````

	To create a new record

#### PUT - localhost:4000/api/sample/id 

*id - id of the row created (get id using GET Method)*

*To update the record*

#### DELETE - localhost:4000/api/sample/id

*To remove a particular record*


