export class User {

    constructor(name, age, workSpace, studyLevel, phoneNumber) {

        this.name = name;
        this.age = age;
        this.workSpace = workSpace;
        this.studyLevel = studyLevel;
        this.phoneNumber = phoneNumber;

    }

    userData() {

        console.log(`User name is: ${this.name}`);
        console.log(`User age is: ${this.age}`);
        console.log(`User workSpace is: ${this.workSpace}`);
        console.log(`User studyLevel is: ${this.studyLevel}`);
        console.log(`User phoneNumber is: ${this.phoneNumber}`);

    }

    userName() {

        console.log(`This is your name:${this.name}${this.age}`);

    }


    JSON() {

        var data = [];
        data.push(this);
        console.log(data);

    }


}