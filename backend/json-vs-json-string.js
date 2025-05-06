//object
const obj = { name: "Codeek" };
//json or json object literal
const json = { name: "Codeek" }; // {"name": "Codeek" }
//json string
const jsonString = '{"name": "Codeek"}';

// Convert JSON string to object
const objFromJsonString = JSON.parse(jsonString);

// Convert object to JSON string
const jsonStringFromObj = JSON.stringify(obj);

console.log(objFromJsonString.name); // { name: 'Codeek' }
console.log(jsonStringFromObj); // '{"name":"Codeek"}'
console.log("abc");
// console.log(json);
