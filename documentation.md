
# UMD Students' Travel History around China, Canada, America, Mexico and Japan

---

Name: Xiaoyu Li   

Date: April 11, 2019

Project Topic: UMD Students' Travel History around China, Canada, America, Mexico and Japan

URL: 

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`:     name       `Type: String`
- `Field 2`:     gender       `Type: String`
- `Field 3`:     countries       `Type: [String]`
- `Field 4`:     age       `Type: Number`
- `Field 5`:     homecountry       `Type: String`

Schema: 
```javascript
{
   name: String,
   gender: String,
   countries: [String],
   age: Number,
   homecountry: String
}
```

### 2. Add New Data

HTML form route: `/create`

POST endpoint route: `/api/createHistory`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/createHistory',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
      name: 'Chris',
      gender: 'Male',
      countries: ['Canada','Japan'],
      age: 21,
      homecountry: 'America'
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getHistory`

### 4. Search Data

Search Field: name

### 5. Navigation Pages

Navigation Filters
1. China -> `  /tag/China  `
2. America -> `  /tag/America  `
3. Japan -> `  /tag/Japan  `
4. Canada -> `  /tag/Canada `
5. Mexico -> ` /tag/Mexico  `
