// =====================================================================
// LAMBDA: counter-function.js
// Runtime: Node.js 18.x or 20.x  (AWS SDK v3 is bundled — no zip/layer needed)
// Each student deploys their OWN copy of this function.
//
// DynamoDB table setup (console, before deploying this function):
//   Table name:   VisitorCounter          (or your own name — update below)
//   Partition key: id            (String)
//   No sort key needed.
//   After creating the table, add one item manually:
//     id = "visits"   count = 0   (Number type)
//
// IAM: attach a policy to this Lambda's execution role allowing
//   dynamodb:UpdateItem on this table's ARN.
// =====================================================================

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "VisitorCounter"; // EDIT if you named your table differently

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST"
};

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders, body: "" };
  }

  try {
    const result = await docClient.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id: "visits" },
      UpdateExpression: "ADD #c :incr",
      ExpressionAttributeNames: { "#c": "count" },
      ExpressionAttributeValues: { ":incr": 1 },
      ReturnValues: "UPDATED_NEW"
    }));

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ count: result.Attributes.count })
    };
  } catch (err) {
    console.error("Counter update failed:", err);
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Could not update counter" })
    };
  }
};
