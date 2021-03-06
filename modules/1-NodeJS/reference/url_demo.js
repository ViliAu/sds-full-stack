const url = require('url');

const myUrl = new URL('http://mywebsite.com/hello.html?id=100&status=active');

// Serialized URL
console.log(myUrl.href);
console.log(myUrl.toString());

// Host
console.log(myUrl.host);

// Hostname
console.log(myUrl.hostname);

// Query
console.log(myUrl.search);

// Params
console.log(myUrl.searchParams);

// Add params
myUrl.searchParams.append('abc', '123');
