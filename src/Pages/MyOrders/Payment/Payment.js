import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOut from '../CheckOut/CheckOut';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);


const Payment = () => {
    const booking = useLoaderData();
    console.log(booking)
    return (
        <div>
            <div className='w-96 my-6 mx-10'>
                <Elements stripe={stripePromise}>
                    <CheckOut
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;