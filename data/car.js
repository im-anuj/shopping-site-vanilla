class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;
    constructor(carDetails){
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
    }

    displayInfo(){
        const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';
        console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk: ${trunkStatus}`);
    }

    go(){
        //if trunk is open then car will not go
        if(this.isTrunkOpen){
            return;
        } else if(this.speed >= 200){
            return;
        }else{
            this.speed += 5;
        }
        
    }

    brake(){
        if (this.speed <= 0) {
            return;
        }
        this.speed -= 5;
    }

    //only if the speed is 0 then trunk will open
    openTrunk(){
        if(this.speed === 0){
            this.isTrunkOpen = true;
        }
    }

    closeTrunk(){
        this.isTrunkOpen = false;
    }

}

const car1 = new Car({
    brand: 'Toyota',
    model: 'Corolla'
});

const car2 = new Car({
    brand: 'Tesela',
    model: 'Model 3'
});

console.log(car1);
console.log(car2);

car1.displayInfo();
car1.go();
car1.go();
car1.go();
car1.openTrunk();
car1.brake();
car1.brake();
car1.brake();
car1.openTrunk();
car1.go();

car1.displayInfo();

class RaceCar extends Car{
    acceleration;

    constructor(carDetails){
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    go(){
        if(this.speed >= 300){
            return;
        }
        this.speed += this.acceleration;
    }

    openTrunk() {
        console.log('Race cars do not have a trunk.');
    }

    closeTrunk() {
        console.log('Race cars do not have a trunk.');
    }
}

const raceCar = new RaceCar({
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20
});

raceCar.displayInfo();
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.brake();
raceCar.openTrunk();
raceCar.displayInfo();
console.log(raceCar);