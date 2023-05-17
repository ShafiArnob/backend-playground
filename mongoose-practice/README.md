# Mongoose Practice Queries
<!-- ctrl + shift + v -->
## $eq, $ne, $gt, $gte, $lt, $lte
## Field Filtering, Field Filtering with Projection, Sorting
```
// basic find
db.practice.find({ gender : "Female" })

//$eq = Equals
db.practice.find({ age : {$eq: 17} })

//$eq with Field-Filtering
db.practice.find({ age : {$eq: 17}}, {"name.firstName":1,"name.lastName":1,age:1})

//$ne = Not-Equals
db.practice.find({ gender : {$ne: "Female"} })

//$ne with Field-Filtering using  Projection
db.practice.find({ gender : {$ne: "Female"} }).project({"name.firstName":1, "name.lastName":1, gender:1})

//$gt = Greater Than
db.practice.find({age:{$gt:30}})

//$lt = Less Than
db.practice.find({age:{$lt:30}})

//$lte = Less Than Equals
db.practice.find({age:{$lte:18}})

//$gte = Greater Than Equals
db.practice.find({age:{$gte:18}})

//$gte with Sorting - Ascending 1, Descending -1
db.practice.find({age:{$gte:18}}).sort({ age:-1 })
```

## $in, $nin
## Nested Condition, Implicit AND
```
// Range of values, Implicit AND (,)
db.practice.find({age:{$gte:18, $lt:30}})

// $in , Fixed Values
db.practice.find({age:{ $in:[18, 23]}})

// Implicit AND Multiple Condition
db.practice.find({gender:"Female",age:{ $in:[18, 23]}})

//$nin
db.practice.find({gender:"Female",age:{ $nin:[18, 23]}})
```
#### **NOTE:** You cannot use implicit and in same field. It does not work.
**Q: Find Female whos age is not 18 or 23 and interested in Gaming and Cooking and Show only Gender, Age , Interests**
```
db.practice.find({
    gender:"Female",
    age:{ $nin:[18, 23]},
    interests:{$in: ['Gaming', "Cooking"]}
}).project({
    gender:1,
    age:1,
    interests:1
})
```
---
## **Logical Query Operator**
## $and, $or
Q: Find Someone whos gender Female, age less than 30, has skill JAVASCRIPT using Explicit **$and**
```
db.practice.find({
    $and:[
        {gender:"Female"},
        {age: {$lt: 30}},
        {"skills.name":"JAVASCRIPT"}
    ]
})
```
Q: Find Someone who has skills JAVASCRIPT or PYTHON using **$or**
```
db.practice.find({
    $or:[
        {"skills.name":"PYTHON"},
        {"skills.name":"JAVASCRIPT"}
    ]
})
```
**Implicit vs Explicit :**
You cannot use Implicit AND (,) in the same field it does not work. You can use Explicit AND ($and) in the same field
```
//Implicit AND
// Here it also shows 18 age. Does not work
db.practice.find({
    age: {$ne: 18},
    age: {$gt: 15}
})

// Explicit AND
//Works!!
db.practice.find({
    $and:[
        {age: {$ne: 18}},
        {age: {$gt: 15}}
    ]
})
```

#### **NOTE:** $not, $nor do it youself
---
## $exists - field exists or not
```
// true if field exists, false if does not
// Here finds all the rows if phone field exists 
db.practice.find({phone:{$exists: true}})
```

## $type - field type
Q: Give me such document where the age field is 'int'
```
db.practice.find({age:{$type: "int"}})
```
Q: Give me such document where the friends field is 'array'
```
db.practice.find({friends:{$type: "array"}})
```
## $size - field array size
Q: Give me such document where there is only one skill
```
db.practice.find({skills:{$size: 1}})
```
---
Q: Give me all the interest where the "Travelling" is in the index 0 of the array
```
db.practice.find({"interests.0":"Travelling"})

```
Q: Give me all the interest where the "Travelling", "Cooking", "Reading" is in the array
```
db.practice.find({"interests":[ "Travelling", "Reading", "Cooking" ]})
//Here the query maintains order of those items 
```
## $all
### Q: 
1. Give me all the interest where the "Travelling", "Cooking", "Reading" is in the array **regardless of order**
2. and convert it to $and
```
db.practice.find({
    "interests":{$all:[ "Travelling", "Reading", "Cooking" ]}
})
```
```
db.practice.find({
    $and:[
        {interests:"Cooking"},
        {interests:"Travelling"},
        {interests:"Reading"},
    ]
}).project({interests:1})
```
**NOTE:** $all is equivalent to $and
## $elemMatch
Q: Find skills JAVASCRIPT and Level "Intermediate"
```
db.practice.find({
    skills:{$elemMatch: {name:"JAVASCRIPT", level:"Intermidiate"}}
})
```