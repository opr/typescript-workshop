type SubLength = 6 | 12;
type SandwichFilling = 'Cheese' | 'Tuna' | 'Ham';
type SandwichTopping = 'Tomato'|'Lettuce'|'Olives';
type BreadType = 'Tiger bread' | 'Italian' | 'Wholemeal';

interface Sandwich {
    breadType: BreadType,
    filling: SandwichFilling,
    description?: string
}

// Example of declaration merge.
interface Sandwich {
    filling: SandwichFilling
}

// union
type HorridFillings = 'Spinach' | 'Soil' | 'Grass';
type NiceFillings = 'Ham' | 'Tuna' | 'Cheese';
type AllFillings = HorridFillings & NiceFillings;

interface Club extends Sandwich {
    layers: number
}

interface Sub extends Sandwich {
    length: SubLength
}

interface Expireable {
    expiryDate: Date
}

enum SandwichProcessingState {
    ADDING_FILLING = 'ADDING_FILLING',
    TOASTING = 'TOASTING',
    ADDING_TOPPINGS = 'ADDING_TOPPINGS',
    COMPLETE = 'COMPLETE'
}

const mySandwich: Sandwich = {
    breadType: 'Tiger bread',
    filling: 'Cheese',
    expiryDate: new Date(),
    state: SandwichProcessingState.ADDING_FILLING,
    toppings: ['Lettuce'],
    description: 'Tasty sandwich'
};

interface Sandwich extends Expireable {

}

interface Drink {
    carbonated: boolean
}

function findExpiredItems<Item extends Expireable>( items: Item[] ): Item[] {
    return items.filter( item => item.expiryDate.getTime() < new Date().getTime() )
}

function createTuple<A, B>( a: A, b: B ): [ A, B ] {
    return [a, b]
}

function replaceSandwichComponent<T, K extends keyof T>(sandwich: T, component: K, newValue: T[K]) {
    return {
        ...sandwich,
        [component]: newValue
    };
}

function convertToTuna(sandwich: Sandwich): Sandwich {
    return {
        ...sandwich,
        filling: 'Tuna'
    };
}

type HamSandwich = Sandwich & { filling: 'Ham' };
function convertToHam(sandwich: Sandwich): HamSandwich {
    return {
        ...sandwich,
        filling: 'Ham'
    }
}

const myTunaSandwich = convertToTuna(mySandwich);
const myHamSandwich = convertToHam(myTunaSandwich);
const myOtherTunaSandwich = convertToTuna(myHamSandwich);
console.log(
    {
        myTunaSandwich,
        myHamSandwich,
        myOtherTunaSandwich
    }
);

replaceSandwichComponent(mySandwich, 'filling', 'Ham');

interface Sandwich {
    state: SandwichProcessingState,
    toppings: Array<SandwichTopping>
}

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