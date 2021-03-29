# GetEventSourceMapping<a name="API_GetEventSourceMapping"></a>

Returns details about an event source mapping\. You can get the identifier of a mapping from the output of [ListEventSourceMappings](API_ListEventSourceMappings.md)\.

## Request Syntax<a name="API_GetEventSourceMapping_RequestSyntax"></a>

```
GET /2015-03-31/event-source-mappings/UUID HTTP/1.1
```

## URI Request Parameters<a name="API_GetEventSourceMapping_RequestParameters"></a>

The request uses the following URI parameters\.

 ** [UUID](#API_GetEventSourceMapping_RequestSyntax) **   <a name="SSS-GetEventSourceMapping-request-UUID"></a>
The identifier of the event source mapping\.  
Required: Yes

## Request Body<a name="API_GetEventSourceMapping_RequestBody"></a>

The request does not have a request body\.

## Response Syntax<a name="API_GetEventSourceMapping_ResponseSyntax"></a>

```
HTTP/1.1 200
Content-type: application/json

{
   "BatchSize": number,
   "BisectBatchOnFunctionError": boolean,
   "DestinationConfig": { 
      "OnFailure": { 
         "Destination": "string"
      },
      "OnSuccess": { 
         "Destination": "string"
      }
   },
   "EventSourceArn": "string",
   "FunctionArn": "string",
   "FunctionResponseTypes": [ "string" ],
   "LastModified": number,
   "LastProcessingResult": "string",
   "MaximumBatchingWindowInSeconds": number,
   "MaximumRecordAgeInSeconds": number,
   "MaximumRetryAttempts": number,
   "ParallelizationFactor": number,
   "Queues": [ "string" ],
   "SelfManagedEventSource": { 
      "Endpoints": { 
         "string" : [ "string" ]
      }
   },
   "SourceAccessConfigurations": [ 
      { 
         "Type": "string",
         "URI": "string"
      }
   ],
   "StartingPosition": "string",
   "StartingPositionTimestamp": number,
   "State": "string",
   "StateTransitionReason": "string",
   "Topics": [ "string" ],
   "TumblingWindowInSeconds": number,
   "UUID": "string"
}
```

## Response Elements<a name="API_GetEventSourceMapping_ResponseElements"></a>

If the action is successful, the service sends back an HTTP 200 response\.

The following data is returned in JSON format by the service\.

 ** [BatchSize](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-BatchSize"></a>
The maximum number of items to retrieve in a single batch\.  
Type: Integer  
Valid Range: Minimum value of 1\. Maximum value of 10000\.

 ** [BisectBatchOnFunctionError](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-BisectBatchOnFunctionError"></a>
\(Streams\) If the function returns an error, split the batch in two and retry\. The default value is false\.  
Type: Boolean

 ** [DestinationConfig](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-DestinationConfig"></a>
\(Streams\) An Amazon SQS queue or Amazon SNS topic destination for discarded records\.  
Type: [DestinationConfig](API_DestinationConfig.md) object

 ** [EventSourceArn](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-EventSourceArn"></a>
The Amazon Resource Name \(ARN\) of the event source\.  
Type: String  
Pattern: `arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\-])+:([a-z]{2}(-gov)?-[a-z]+-\d{1})?:(\d{12})?:(.*)` 

 ** [FunctionArn](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-FunctionArn"></a>
The ARN of the Lambda function\.  
Type: String  
Pattern: `arn:(aws[a-zA-Z-]*)?:lambda:[a-z]{2}(-gov)?-[a-z]+-\d{1}:\d{12}:function:[a-zA-Z0-9-_]+(:(\$LATEST|[a-zA-Z0-9-_]+))?` 

 ** [FunctionResponseTypes](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-FunctionResponseTypes"></a>
\(Streams\) A list of current response type enums applied to the event source mapping\.  
Type: Array of strings  
Array Members: Fixed number of 1 item\.  
Valid Values:` ReportBatchItemFailures` 

 ** [LastModified](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-LastModified"></a>
The date that the event source mapping was last updated, or its state changed, in Unix time seconds\.  
Type: Timestamp

 ** [LastProcessingResult](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-LastProcessingResult"></a>
The result of the last AWS Lambda invocation of your Lambda function\.  
Type: String

 ** [MaximumBatchingWindowInSeconds](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-MaximumBatchingWindowInSeconds"></a>
\(Streams and SQS standard queues\) The maximum amount of time to gather records before invoking the function, in seconds\. The default value is zero\.  
Type: Integer  
Valid Range: Minimum value of 0\. Maximum value of 300\.

 ** [MaximumRecordAgeInSeconds](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-MaximumRecordAgeInSeconds"></a>
\(Streams\) Discard records older than the specified age\. The default value is infinite \(\-1\)\. When set to infinite \(\-1\), failed records are retried until the record expires\.  
Type: Integer  
Valid Range: Minimum value of \-1\. Maximum value of 604800\.

 ** [MaximumRetryAttempts](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-MaximumRetryAttempts"></a>
\(Streams\) Discard records after the specified number of retries\. The default value is infinite \(\-1\)\. When set to infinite \(\-1\), failed records are retried until the record expires\.  
Type: Integer  
Valid Range: Minimum value of \-1\. Maximum value of 10000\.

 ** [ParallelizationFactor](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-ParallelizationFactor"></a>
\(Streams\) The number of batches to process from each shard concurrently\. The default value is 1\.  
Type: Integer  
Valid Range: Minimum value of 1\. Maximum value of 10\.

 ** [Queues](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-Queues"></a>
 \(MQ\) The name of the Amazon MQ broker destination queue to consume\.   
Type: Array of strings  
Array Members: Fixed number of 1 item\.  
Length Constraints: Minimum length of 1\. Maximum length of 1000\.  
Pattern: `[\s\S]*` 

 ** [SelfManagedEventSource](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-SelfManagedEventSource"></a>
The Self\-Managed Apache Kafka cluster for your event source\.  
Type: [SelfManagedEventSource](API_SelfManagedEventSource.md) object

 ** [SourceAccessConfigurations](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-SourceAccessConfigurations"></a>
An array of the authentication protocol, or the VPC components to secure your event source\.  
Type: Array of [SourceAccessConfiguration](API_SourceAccessConfiguration.md) objects  
Array Members: Minimum number of 0 items\. Maximum number of 22 items\.

 ** [StartingPosition](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-StartingPosition"></a>
The position in a stream from which to start reading\. Required for Amazon Kinesis, Amazon DynamoDB, and Amazon MSK Streams sources\. `AT_TIMESTAMP` is only supported for Amazon Kinesis streams\.  
Type: String  
Valid Values:` TRIM_HORIZON | LATEST | AT_TIMESTAMP` 

 ** [StartingPositionTimestamp](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-StartingPositionTimestamp"></a>
With `StartingPosition` set to `AT_TIMESTAMP`, the time from which to start reading, in Unix time seconds\.  
Type: Timestamp

 ** [State](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-State"></a>
The state of the event source mapping\. It can be one of the following: `Creating`, `Enabling`, `Enabled`, `Disabling`, `Disabled`, `Updating`, or `Deleting`\.  
Type: String

 ** [StateTransitionReason](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-StateTransitionReason"></a>
Indicates whether the last change to the event source mapping was made by a user, or by the Lambda service\.  
Type: String

 ** [Topics](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-Topics"></a>
The name of the Kafka topic\.  
Type: Array of strings  
Array Members: Fixed number of 1 item\.  
Length Constraints: Minimum length of 1\. Maximum length of 249\.  
Pattern: `^[^.]([a-zA-Z0-9\-_.]+)` 

 ** [TumblingWindowInSeconds](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-TumblingWindowInSeconds"></a>
\(Streams\) The duration in seconds of a processing window\. The range is between 1 second up to 900 seconds\.  
Type: Integer  
Valid Range: Minimum value of 0\. Maximum value of 900\.

 ** [UUID](#API_GetEventSourceMapping_ResponseSyntax) **   <a name="SSS-GetEventSourceMapping-response-UUID"></a>
The identifier of the event source mapping\.  
Type: String

## Errors<a name="API_GetEventSourceMapping_Errors"></a>

 **InvalidParameterValueException**   
One of the parameters in the request is invalid\.  
HTTP Status Code: 400

 **ResourceNotFoundException**   
The resource specified in the request does not exist\.  
HTTP Status Code: 404

 **ServiceException**   
The AWS Lambda service encountered an internal error\.  
HTTP Status Code: 500

 **TooManyRequestsException**   
The request throughput limit was exceeded\.  
HTTP Status Code: 429

## See Also<a name="API_GetEventSourceMapping_SeeAlso"></a>

For more information about using this API in one of the language\-specific AWS SDKs, see the following:
+  [AWS Command Line Interface](https://docs.aws.amazon.com/goto/aws-cli/lambda-2015-03-31/GetEventSourceMapping) 
+  [AWS SDK for \.NET](https://docs.aws.amazon.com/goto/DotNetSDKV3/lambda-2015-03-31/GetEventSourceMapping) 
+  [AWS SDK for C\+\+](https://docs.aws.amazon.com/goto/SdkForCpp/lambda-2015-03-31/GetEventSourceMapping) 
+  [AWS SDK for Go](https://docs.aws.amazon.com/goto/SdkForGoV1/lambda-2015-03-31/GetEventSourceMapping) 
+  [AWS SDK for Java V2](https://docs.aws.amazon.com/goto/SdkForJavaV2/lambda-2015-03-31/GetEventSourceMapping) 
+  [AWS SDK for JavaScript](https://docs.aws.amazon.com/goto/AWSJavaScriptSDK/lambda-2015-03-31/GetEventSourceMapping) 
+  [AWS SDK for PHP V3](https://docs.aws.amazon.com/goto/SdkForPHPV3/lambda-2015-03-31/GetEventSourceMapping) 
+  [AWS SDK for Python](https://docs.aws.amazon.com/goto/boto3/lambda-2015-03-31/GetEventSourceMapping) 
+  [AWS SDK for Ruby V3](https://docs.aws.amazon.com/goto/SdkForRubyV3/lambda-2015-03-31/GetEventSourceMapping) 