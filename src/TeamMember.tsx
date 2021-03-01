import React from 'react';
import type {ReactChildren} from 'react';

export const TeamMember = ( props: {
    firstName: string;
    surname: string,
    children?: ReactChildren
} ) => {
    return <div>Hello I am {props.firstName}</div>;
};
