function multiply( a: number, b: number ): number {
    return a * b;
}

console.log( 'Multiply:', multiply( 1,2 ) );


function addAll( values: number[] ) {
    return values.reduce(
        ( a, c ) => a+c,
        0
    );
}

console.log('Add all:', addAll( [ 1, 2, 3, 4 ] ) );


function createOperationFunction( operator: string ) {
    switch( operator ) {
        case '*':
            return ( a: number, b: number ) => a*b;
        case '+':
            return ( a: number, b: number ) => a+b;
        case '-':
            return ( a: number, b: number ) => a-b;
        case '/':
            return ( a: number, b: number ) => a/b;
    }
    return null;
}

const opFunc = createOperationFunction( '*' );
if( opFunc ) console.log( opFunc( 50, 2 ) );

const myNewOpFunc = createOperationFunction( 'x' );

import './cafeteria';