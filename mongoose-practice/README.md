# Mongoose Practice Queries
<!-- ctrl + shift + v -->
### $eq, $ne, $gt, $gte, $lt, $lte
### Field Filtering, Field Filtering with Projection, Sorting
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