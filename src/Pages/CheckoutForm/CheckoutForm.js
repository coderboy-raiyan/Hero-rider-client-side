import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

const CheckoutForm = ({ price, order }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [process, setProcess] = useState(false);
  console.log(price, order);

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    setProcess(true);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    } else {
      setError(" ");
      console.log(paymentMethod);
    }

    // payment intenet
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: order.displayName,
            email: order.email,
          },
        },
      });

    if (intentError) {
      setError(intentError.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${intentError.message}`,
      });
    } else {
      setError(" ");
      Swal.fire("Good job!", "Payment successful", "success");
      console.log("success", paymentIntent);
      setProcess(false);
      //   update to database

      const payment = {
        payment_status: "paid",
        clientSecret: paymentIntent.client_secret.slice("_secret")[0],
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      };

      fetch(`http://localhost:5000/order/${order._id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };
  return (
    <div className="my-4">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {process ? (
          <Spinner animation="border" />
        ) : (
          <button type="submit" className="primary-btn my-5" disabled={!stripe}>
            Pay ${price}
          </button>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
