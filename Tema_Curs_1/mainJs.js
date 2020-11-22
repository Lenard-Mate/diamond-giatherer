
var person = {

  firstName:"Barle",
  lastName:"Bendrea",
  eyeColor:"albastru",
  age:21,

  printPerson:function(){
  	console.log(person);
  	document.getElementById("personData").innerHTML=""+person.firstName+","+person.lastName+","+person.eyeColor+","+person.age;
  }

};

person.printPerson();

function writeText(){

	var value=document.getElementById("name").value;
	console.log(value);
	document.getElementById("valueOfInput").innerHTML=nameReturning(value);
}

function nameReturning(personName){

	console.log("Buna,numele meu este "+personName);

return "Buna,numele meu este "+personName;
}