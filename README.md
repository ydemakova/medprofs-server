Concept
There is a Medical Professionals App, offering its vsistors to read various interesting articles in the medical sphere. The articles are provided by the best medical experts (their professinalism (education and professional background) is proved at the platform). Platform visitors can not only view the articles and doctors' profiles, but also ask for an appointment to be consulted in the special sphere. If platform users are doctors, they are privileged with the following CRUD activities, applied to their profile or / and articles: create a new one, read / edit it, delete it, view a request for an appointment, reject or accept it

Resources
In the app the following resources (with corresponding properties) are to be implemented:

User:
username
user image
email
password (salt and hash)
address
city
country
education (only if type is professional):
specialization
degree
background
type (patient or professional)
Article:
title
title image
text
tags
links
status (draft, public)
professional / doctor (as a ref)
Request (for consultation):
time and date
duration
price
requester
professional
status (pending, accepted, rejected)
In General
Resource routes for the project are divided into view Routes - React Routes and server side Routes - Express Routes (example):

view route (React):
list many examples: /examples
edit example: /examples/:id
new example: /examples/new
api route (Express):
create one examples: POST /api/examples
read many examples: GET /api/examples
read one example: GET /api/examples/:id
update one example: PUT /api/examples/:id
delete one example: DELETE /api/examples/:id
