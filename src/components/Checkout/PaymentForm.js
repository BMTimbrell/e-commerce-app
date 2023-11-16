import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { makePayment } from '../../api/api';

function PaymentForm({ amount, updateSuccess }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsProcessing(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if (!error) {
            const { id } = paymentMethod;
            await makePayment(id, amount);
        }
        updateSuccess(true);
        setIsProcessing(false);
    };
    

    return (
        <>
            <form onSubmit={handleSubmit}>
            <fieldset>
                <CardElement />
            </fieldset>
            <button disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
        </>
    );
}

export default PaymentForm;