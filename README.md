1.What is the difference between var, let, and const?
Ans:
var -> var is a functional scope. Reassignment possible. In same scope redeclaration is also possible. It can be hoisted and value becomes undefine.

let -> let is a block scope. Reassignment is possible but redeclaration is not possible. It can be hoisted and value is uninitialized.

const -> const is a block scope. Reassignment and redeclaration is not possible. It can be hoisted and value is uninitialized.

----------0----------

2.What is the spread operator (...)?
Ans:
Spread operator is a feature that allows to expand the contents of an iterable into individual. It is used to copying an array, combines multiple arrays into one;

----------0----------

3.What is the difference between map(), filter(), and forEach()?
Ans:
map() -> It is used to transform each array item into a new value. It returns a new array. It dose not change original array.

forEach() -> It is used to execute code for each item. It returns undefined. It dose not chainable. 

filter() -> It is used to select specific items based on a condition. It returns a new array. It is chainable.


----------0----------


4.What is an arrow function?
Ans:
An arrow function is a more clean and concise way to write function. It is used for callbacks and array methods.

----------0----------

5.What are template literals?
Ans:
Template literals are a modern way to work with string. It is enclosed by backticks. It embed variables directly into the string. Without escape characters, it allows line breaks.