"use strict";

const AWS = require("aws-sdk");

AWS.config.update({ region: "sa-east-1" });

exports.publish = async (event, context, callback) => {
  try {
    const sns = new AWS.SNS();

    const params = {
      Message: event.body.message,
      Subject: event.body.subject,
      TopicArn: event.body.topicArn,
    };

    console.log(await sns.publish({ ...params }).promise());
  } catch (err) {
    console.log(err);
  }
};

// SNS subscribe lambda function
exports.subscribe = async (event, context, callback) => {
  try {
    const sns = new AWS.SNS();

    const params = {
      Protocol: "email",
      TopicArn: event.body.topicArn,
      Endpoint: event.body.email,
    };

    console.log(await sns.subscribe({ ...params }).promise());
  } catch (err) {
    console.log(err);
  }
};

// SNS unsubscribe lambda function
exports.unsubscribe = async (event, context, callback) => {
  try {
    const sns = new AWS.SNS();

    const params = {
      SubscriptionArn: event.body.subscriptionArn,
    };

    console.log(await sns.unsubscribe({ ...params }).promise());
  } catch (err) {
    console.log(err);
  }
};

// SNS Stats lambda function
exports.status = async (event, context, callback) => {
  try {
    const sns = new AWS.SNS();

    const params = {
      TopicArn: event.body.topicArn,
    };

    console.log(await sns.getTopicAttributes({ ...params }).promise());
  } catch (err) {
    console.log(err);
  }
};
