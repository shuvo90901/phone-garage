import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const booking = useLoaderData();
    console.log(booking)
    return (
        <div>

        </div>
    );
};

export default Payment;