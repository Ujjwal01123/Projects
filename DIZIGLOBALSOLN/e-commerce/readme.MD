# E-commerce Platform

## \* routes used for Product :

POST '/products'
GET '/products:/:id'
PUT '/products/:id'
DELETE '/products/:id'

## \* User authentication :

POST '/users/register'
POST '/users/login'
JWT based authentication

## \* routes used for cart :

POST '/carts'
GET '/carts:/:id'
PUT '/carts/:id'
DELETE '/carts/:id'

## \* routes used for order :

POST '/orders'
GET 'orders:/id'

## \* Common Url for this e-commerce

http://localhost:8000/api/v1/products
---->so /api/v1 is common then we use it by using environment variable
