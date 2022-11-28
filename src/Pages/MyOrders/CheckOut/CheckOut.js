import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const CheckoutForm = ({ booking }) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setprocessing] = useState(false)
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const { price, _id } = booking;
    const { user } = useContext(AuthContext)
    const email = user?.email

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://doctors-portal-server-nine-phi.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                auhtorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log(error)
            setCardError(error.message)
        }
        else {
            setCardError('');
        }
        setSuccess('');
        setprocessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {
            console.log('card info', card)
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id
            }

            fetch('https://doctors-portal-server-nine-phi.vercel.app/payments', {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    auhtorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.insertedId) {
                        setSuccess('Congrats ! your payment completed');
                        setTransactionId(paymentIntent.id);
                    }
                })

            setprocessing(false)

        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='btn btn-sm mt-4 btn-primary'
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
            {
                success && <div>
                    <p className="text-green-500">{success}</p>
                    <p>Your transactionid : <span className="font-bold">{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;