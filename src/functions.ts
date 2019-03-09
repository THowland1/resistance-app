import { map } from "rxjs/operators";

declare global {
    interface Array<T> {
        /**
         * Randomise every element in the array
         */
        shuffle(): Array<T>;
    }
}

Array.prototype.shuffle = function() {
    let currentIndex = this.length
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = this[currentIndex];
      this[currentIndex] = this[randomIndex];
      this[randomIndex] = temporaryValue;
    }
  
    return this;
}

/**
 * Creates a callback function for a subscription.
 * The given object's property will be updated with the value from the subscription.
 * @param obj  The object on which the property exists.
 * @param prop  The property to be updated.
 * @returns       A callback function to update the object's property with the callback's input.
 */
export function bind<T,K extends keyof T>(obj: T,prop:K): (value: T[K]) => void {
    return (value: T[K]) => {obj[prop] = value};
}


export function log<T>() {
    return map((value: T) => {
        console.log(value);
        return value;
    });
}

export function randomInt(max: number){
    const randomInt = Math.floor(Math.random()*(max+1));

    if (randomInt > max) { // if Math.random() returns exactly 1
      return max;
    }
    return randomInt;
}

export function allEnumValues(enumObject: Object): number[] {
    const keys = Object.keys(enumObject).filter(key => !isNaN(Number(enumObject[key])));
    const values = keys.map((key) => enumObject[key]);
    return values;
}