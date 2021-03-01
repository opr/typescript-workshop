/**
 * An example of types
 */
type SubLength = 6 | 12;
type SandwichFilling = 'Cheese' | 'Tuna' | 'Ham';
type SandwichTopping = 'Tomato'|'Lettuce'|'Olives';
type BreadType = 'Tiger bread' | 'Italian' | 'Wholemeal';

/**
 * An example of an interface
 */
interface Sandwich {
    breadType: BreadType,
    filling: SandwichFilling,
    description?: string /* Optional property */
}

/**
 * Example of declaration merge.
 */
interface Sandwich {
    filling: SandwichFilling
}

/**
 * Example of type unions
 */
type HorridFillings = 'Spinach' | 'Soil' | 'Grass';
type NiceFillings = 'Ham' | 'Tuna' | 'Cheese';
type AllFillings = HorridFillings & NiceFillings;

/**
 * Extending interfaces
 */
interface Club extends Sandwich {
    layers: number
}

interface Sub extends Sandwich {
    length: SubLength
}

/**
 * We will use this interface to allow other interfaces that
 * should have an "expireable" property to extend it. This
 * is a good abstraction as it allows us to group together
 * and identify objects that can expire more easily.
 */
interface Expireable {
    expiryDate: Date
}

/**
 * Example of an Enum, this is one that is mapped to strings, without
 * the assignments here, the values would be mapped to numbers 0-n
 */
enum SandwichProcessingState {
    ADDING_FILLING = 'ADDING_FILLING',
    TOASTING = 'TOASTING',
    ADDING_TOPPINGS = 'ADDING_TOPPINGS',
    COMPLETE = 'COMPLETE'
}

/**
 * Creating an object that matches the Sandwich interface.
 */
const mySandwich: Sandwich = {
    breadType: 'Tiger bread',
    filling: 'Cheese',
    expiryDate: new Date(),
    state: SandwichProcessingState.ADDING_FILLING,
    toppings: ['Lettuce'],
    description: 'Tasty sandwich'
};

/**
 * More examples of declaration merging, it can also be used to extend
 * other interfaces.
 */
interface Sandwich extends Expireable {

}

interface Drink {
    carbonated: boolean
}

/**
 * This function works on any type that extends Expireable.
 * This is useful because many different items could be Expireable,
 * so listing them all as valid types for our items argument would
 * be a long-term maintenance burden. Using generics solves this
 */
function findExpiredItems<T extends Expireable>( items: T[] ): T[] {
    return items.filter( item => item.expiryDate.getTime() < new Date().getTime() )
}

/**
 * Returns a Tuple. Using generics means we can explicitly know the
 * type of the entries in the Tuple.
 */
function createTuple<A, B>( a: A, b: B ): [ A, B ] {
    return [a, b]
}

/**
 * Another example of using generics to replace values in an object.
 * Without using generics here we would need to check that newValue
 * is a valid type for the property whose value we're trying to change.
 * By using generics, we can make TypeScript do this work for us (at compile time)
 */
function replaceSandwichComponent<T, K extends keyof T>(sandwich: T, component: K, newValue: T[K]) {
    return {
        ...sandwich,
        [component]: newValue
    };
}

/**
 * Type union with a specific value set on a property.
 */
type HamSandwich = Sandwich & { filling: 'Ham' };
function convertToHam(sandwich: Sandwich): HamSandwich {
    return {
        ...sandwich,
        filling: 'Ham'
    }
}

const myHamSandwich = convertToHam(mySandwich);
console.log( myHamSandwich );

replaceSandwichComponent(mySandwich, 'filling', 'Ham');

interface Sandwich {
    state: SandwichProcessingState,
    toppings: Array<SandwichTopping>
}

/**
 * The Partial type indicates that every property of the type in the angle
 * brackets is optional. This could be useful when we're building
 * objects and don't have enough data available to give every property
 * a value straight away.
 */
type PartialSandwich = Partial<Sandwich>;

function createSandwich( bread: BreadType, filling: SandwichFilling, toppings: Array<SandwichTopping>, wantsToasted: boolean ) {
    let sandwich: PartialSandwich = { breadType: bread };

    console.log('Welcome to the Rubik Sandwich bar 🥪');

    console.log('Adding your filling:', filling)
    sandwich.state = SandwichProcessingState.ADDING_FILLING;
    sandwich = replaceSandwichComponent( sandwich, 'filling', filling );

    if( wantsToasted ) {
        console.log('Toasting your sandwich')
        sandwich.state = SandwichProcessingState.TOASTING;
        console.log( 'Toasting done!' )
    }

    console.log('Adding your toppings:', toppings.join( ', ' ) );
    sandwich = replaceSandwichComponent( sandwich, 'toppings', toppings );
    sandwich.state = SandwichProcessingState.ADDING_TOPPINGS;

    console.log('Done, enjoy!');
    sandwich.state = SandwichProcessingState.COMPLETE;

    return sandwich;
}

console.log( createSandwich( 'Italian', 'Ham', [ 'Lettuce', 'Olives' ], true ) );