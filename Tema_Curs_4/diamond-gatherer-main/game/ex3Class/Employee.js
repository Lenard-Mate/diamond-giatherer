class Employee extends Person{

  

    whereIWork(){
        console.log("I am a student");
    }

    whatIWork(){
        console.log("I am a Java developer");
    }


}


let variable = new Employee();

variable.salary(25,32);
variable.myName("My name is here");
variable.myFrendName("My name is here");
variable.whatIWork();
variable.whereIWork();