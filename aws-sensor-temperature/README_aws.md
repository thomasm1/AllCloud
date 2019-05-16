#   "description": "SQL->Sequilize, AWS-SDK, Post-GreSQL, handlebars UI, daily filter of tech blogs, host of our daily tech",
  "repository": "https://github.com/thomasm1/daily-filter_aws.git",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
### DIAGRAMM
EC2 main-->images/assets->S3
    main-->Users->RDS
    main-->DynamoDB->Pizza/Toppings->DynamoDB
    main-->Sessions->ElastiCache
 