# nodeApp
Procurei utilizar o padrão rest
Boa parte do trabalho foi para entender e utilizar o mongoDb, é um pouco diferente dos bancos que eu estava acostumato.
Como não estava explícito, não tratei autenticação até o fim, apenas preparei o cookies e deixei em standby.
As dependências do projeto estão no package.json

Busquei usar duas rotas mais o id como endpoint
  /product
  /product/:id
  /category
  /category/:id
  
  
User stories:

As a user I would like to register a product so that I can have access to the data of this product in the future (Title, description, price, category)
  - Done.
I as a user would like to be able to associate and edit a product category;
  -Done: both collections have beem set up
  -To do: needs to implement association
As a user I would like to be able to access the list of all products;
  -Done
As a user I would like to be able to filter products by name or category;
  -Done: filter by _id
  -To do: finish category, filter by name
I as a user would like to be able to update the product data;
  -Done
I as a user would like to be able to delete a product from my catalog;
  -Done
  
Infelizmente eu tive outras demandas e não pude finalizar, com um pouco mais de tempo posso finalizar o projeto.
  
  
 
