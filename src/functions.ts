import { map } from "rxjs/operators";


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