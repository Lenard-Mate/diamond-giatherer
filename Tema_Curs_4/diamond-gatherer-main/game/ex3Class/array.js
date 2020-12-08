var arr = [1, -2, 6, -7, 10, 9, 14, true, false, null, undefined];

function isNumber(x){
    return Number.isInteger(x) === true;
  }
  
  const isNumbers = arr.filter(isNumber);
  console.log(isNumbers);


var multiple10 = isNumbers.map(function (number) {
    return number * 10;
});

console.log(multiple10);



const sum = multiple10.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;}
);
console.log(sum); 