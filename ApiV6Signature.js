var ApiV6Signature = function() {
  this.evaluate = function(context) {
    var httpRequest = new NetworkHTTPRequest();
    httpRequest.requestTimeout = 2000;
    httpRequest.requestUrl = "https://eu.api.ovh.com/1.0/auth/time";
    httpRequest.requestMethod = "GET";
    httpRequest.send();
    if(httpRequest.responseStatusCode == 200){
        var serverTime = httpRequest.responseBody;
        var key = this.applicationSecret + '+' + this.consumerKey + '+' + this.method.toUpperCase() + '+' + this.url + '+' + this.body + '+' + serverTime;
        var sha1 = new DynamicValue('com.luckymarmot.HashDynamicValue', {input: key, hashType: 3}).getEvaluatedString();
        return '$1$' + sha1;
    }else{
        return 'Cannot fetch API time.';
    }
  }
}

ApiV6Signature.inputs = [
    InputField("applicationSecret", "Application secret", "String"),
    InputField("consumerKey", "Consumer key", "String"),
    InputField("method", "Method", "String"),
    InputField("url", "URL", "String"),
    InputField("body", "Body", "String"),
];


ApiV6Signature.identifier = "com.ovh.ApiV6Signature";
ApiV6Signature.title = "OVH API V6 Signature";
ApiV6Signature.help = "https://github.com/hugoch";

// register our extension
registerDynamicValueClass(ApiV6Signature);
