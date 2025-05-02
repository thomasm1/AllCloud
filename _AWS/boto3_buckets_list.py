#  Iterate through buckets:


import boto3
		
REGION_NAME='us-east1=`'		   

s3_ob=boto3.resource('s3', aws_access_key_id="AKIAX3DHXE_XXX_B7CNZC5UL",
                          aws_secret_access_key="xqTYEIgY5IW1XYRvx_XXX_h2rvQzOb+YBOhZV81",
                          region_name=REGION_NAME)

s3_ob_cli=boto3.client('s3') 

for each_b in s3_ob.buckets.all():
    print(each_b.name)
