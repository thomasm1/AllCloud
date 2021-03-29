# Tutorial: Using AWS Lambda with Amazon Simple Notification Service<a name="with-sns-example"></a>

You can use a Lambda function in one AWS account to subscribe to an Amazon SNS topic in a separate AWS account\. In this tutorial, you use the AWS Command Line Interface to perform AWS Lambda operations such as creating a Lambda function, creating an Amazon SNS topic and granting permissions to allow these two resources to access each other\. 

## Prerequisites<a name="with-sns-prepare"></a>

This tutorial assumes that you have some knowledge of basic Lambda operations and the Lambda console\. If you haven't already, follow the instructions in [Getting started with Lambda](getting-started-create-function.md) to create your first Lambda function\.

To complete the following steps, you need a command line terminal or shell to run commands\. Commands and the expected output are listed in separate blocks:

```
this is a command
```

You should see the following output:

```
this is output
```

For long commands, an escape character \(`\`\) is used to split a command over multiple lines\.

On Linux and macOS, use your preferred shell and package manager\. On Windows 10, you can [install the Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to get a Windows\-integrated version of Ubuntu and Bash\.

In the tutorial, you use two accounts\. The AWS CLI commands illustrate this by using two [named profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html), each configured for use with a different account\. If you use profiles with different names, or the default profile and one named profile, modify the commands as needed\.

## Create an Amazon SNS topic<a name="with-sns-create-topic"></a>

From account A \(01234567891A\), create the source Amazon SNS topic\.

```
aws sns create-topic --name lambda-x-account --profile accountA
```

Note the topic ARN that is returned by the command\. You will need it when you add permissions to the Lambda function to subscribe to the topic\.

## Create the execution role<a name="with-sns-example-create-iam-role"></a>

From account B \(01234567891B\), create the [execution role](lambda-intro-execution-role.md) that gives your function permission to access AWS resources\.

**To create an execution role**

1. Open the [roles page](https://console.aws.amazon.com/iam/home#/roles) in the IAM console\.

1. Choose **Create role**\.

1. Create a role with the following properties\.
   + **Trusted entity** – **AWS Lambda**\.
   + **Permissions** – **AWSLambdaBasicExecutionRole**\.
   + **Role name** – **lambda\-sns\-role**\.

The **AWSLambdaBasicExecutionRole** policy has the permissions that the function needs to write logs to CloudWatch Logs\.

## Create a Lambda function<a name="with-sns-example-create-test-function"></a>

From account B \(01234567891B\), create the function that processes events from Amazon SNS\. The following example code receives an Amazon SNS event input and processes the messages that it contains\. For illustration, the code writes some of the incoming event data to CloudWatch Logs\.

**Note**  
For sample code in other languages, see [Sample function code](with-sns-create-package.md)\.

**Example index\.js**  

```
console.log('Loading function');

exports.handler = function(event, context, callback) {
// console.log('Received event:', JSON.stringify(event, null, 4));

    var message = event.Records[0].Sns.Message;
    console.log('Message received from SNS:', message);
    callback(null, "Success");
};
```

**To create the function**

1. Copy the sample code into a file named `index.js`\.

1. Create a deployment package\.

   ```
   zip function.zip index.js
   ```

1. Create a Lambda function with the `create-function` command\.

   ```
   aws lambda create-function --function-name SNS-X-Account \
   --zip-file fileb://function.zip --handler index.handler --runtime nodejs12.x \
   --role arn:aws:iam::01234567891B:role/service-role/lambda-sns-execution-role  \
   --timeout 60 --profile accountB
   ```

Note the function ARN that is returned by the command\. You will need it when you add permissions to allow Amazon SNS to invoke your function\.

## Set up cross\-account permissions<a name="with-sns-create-x-account-permissions"></a>

From account A \(01234567891A\), grant permission to account B \(01234567891B\) to subscribe to the topic:

```
aws sns add-permission --label lambda-access --aws-account-id 12345678901B \
--topic-arn arn:aws:sns:us-east-2:12345678901A:lambda-x-account \
--action-name Subscribe ListSubscriptionsByTopic --profile accountA
```

From account B \(01234567891B\), add the Lambda permission to allow invocation from Amazon SNS\.

```
aws lambda add-permission --function-name SNS-X-Account \
--source-arn arn:aws:sns:us-east-2:12345678901A:lambda-x-account \
--statement-id sns-x-account --action "lambda:InvokeFunction" \
--principal sns.amazonaws.com --profile accountB
```

You should see the following output:

```
{
    "Statement": "{\"Condition\":{\"ArnLike\":{\"AWS:SourceArn\":
      \"arn:aws:sns:us-east-2:12345678901A:lambda-x-account\"}},
      \"Action\":[\"lambda:InvokeFunction\"],
      \"Resource\":\"arn:aws:lambda:us-east-2:01234567891B:function:SNS-X-Account\",
      \"Effect\":\"Allow\",\"Principal\":{\"Service\":\"sns.amazonaws.com\"},
      \"Sid\":\"sns-x-account1\"}"
}
```

Do not use the `--source-account` parameter to add a source account to the Lambda policy when adding the policy\. Source account is not supported for Amazon SNS event sources and will result in access being denied\.

**Note**  
If the account with the SNS topic is hosted in an opt\-in region, you need to specify the region in the principal\. For an example, see [Invoking Lambda functions using Amazon SNS notifications](https://docs.aws.amazon.com/sns/latest/dg/sns-lambda.html) in the *Amazon Simple Notification Service Developer Guide*\. 

## Create a subscription<a name="with-sns-create-supscription"></a>

From account B, subscribe the Lambda function to the topic\. When a message is sent to the `lambda-x-account` topic in account A \(01234567891A\), Amazon SNS invokes the `SNS-X-Account` function in account B \(01234567891B\)\.

```
aws sns subscribe --protocol lambda \
--topic-arn arn:aws:sns:us-east-2:12345678901A:lambda-x-account \
--notification-endpoint arn:aws:lambda:us-east-2:12345678901B:function:SNS-X-Account \
--profile accountB
```

You should see the following output:

```
{
    "SubscriptionArn": "arn:aws:sns:us-east-2:12345678901A:lambda-x-account:5d906xxxx-7c8x-45dx-a9dx-0484e31c98xx"
}
```

The output contains the ARN of the topic subscription\.

## Test subscription<a name="with-sns-create-test"></a>

From account A \(01234567891A\), test the subscription\. Type `Hello World` into a text file and save it as `message.txt`\. Then run the following command: 

```
aws sns publish --message file://message.txt --subject Test \
--topic-arn arn:aws:sns:us-east-2:12345678901A:lambda-x-account \
--profile accountA
```

This will return a message id with a unique identifier, indicating the message has been accepted by the Amazon SNS service\. Amazon SNS will then attempt to deliver it to the topic's subscribers\. Alternatively, you could supply a JSON string directly to the `message` parameter, but using a text file allows for line breaks in the message\.

To learn more about Amazon SNS, see [What is Amazon Simple Notification Service](https://docs.aws.amazon.com/sns/latest/dg/)\.

## Clean up your resources<a name="cleanup"></a>

You can now delete the resources that you created for this tutorial, unless you want to retain them\. By deleting AWS resources that you're no longer using, you prevent unnecessary charges to your AWS account\.

**To delete the Amazon SNS topic**

1. Open the [Topics page](https://console.aws.amazon.com/sns/home#topics:) of the Amazon SNS console\.

1. Select the topic you created\.

1. Choose **Delete**\.

1. Enter **delete me** in the text box\.

1. Choose **Delete**\.

**To delete the execution role**

1. Open the [Roles page](https://console.aws.amazon.com/iam/home#/roles) of the IAM console\.

1. Select the execution role that you created\.

1. Choose **Delete role**\.

1. Choose **Yes, delete**\.

**To delete the Lambda function**

1. Open the [Functions page](https://console.aws.amazon.com/lambda/home#/functions) of the Lambda console\.

1. Select the function that you created\.

1. Choose **Actions**, **Delete**\.

1. Choose **Delete**\.

**To delete the Amazon SNS subscription**

1. Open the [Subscriptions page](https://console.aws.amazon.com/sns/home#subscriptions:) of the Amazon SNS console\.

1. Select the subscription you created\.

1. Choose **Delete**, **Delete**\.