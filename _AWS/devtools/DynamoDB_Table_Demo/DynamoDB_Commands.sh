#!/bin/bash

# AFter aws configure....
aws dynamodb create-table --table-name ProductCatalog --attribute-definitions \
AttributeName=Id,AttributeType=N --key-schema \
AttributeName=Id,KeyType=HASH \
--provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
  
aws dynamodb batch-write-item --request-items file://items.json

aws dynamodb get-item --table-name ProductCatalog --region us-east-1  --key '{"Id":{"N":"403"}}'
 
 
aws iam get-user
 
 
# ***WINDOWS DOS  *** - Please replace \ with ^ 
# aws dynamodb create-table --table-name SessionData --attribute-definitions ^
# AttributeName=UserID,AttributeType=N --key-schema ^
# AttributeName=UserID,KeyType=HASH ^
# --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5