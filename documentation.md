
# Game Reviews

---

Name: Kevin Lin

Date: 4-12-2019

Project Topic: Game Reviews

URL: http://127.0.0.1:3000/

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`: Name         `Type: String`
- `Field 2`: Age          `Type: Number`
- `Field 3`: Game         `Type: String`
- `Field 4`: Tags         `Type: [String]`
- `Field 5`: Review       `Type: String`

Schema:
```javascript
{
  name: String,
  age: Number,
  game: String,
  tags: [String],
  review: String
}
```

### 2. Add New Data

HTML form route: `/addReview`

POST endpoint route: `/api/addReview`

Example Node.js POST request to endpoint:
```javascript
var request = require("request");

var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/...',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
       ...
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/reviews`

### 4. Search Data

Search Field: Game

### 5. Navigation Pages

Navigation Filters
1. Adult -> `/adult`
2. Select a Game -> `/game/:game_name`
3. Child -> `/child`
4. Random Review -> `/random`
5. Age Order -> `/youngtoold`
