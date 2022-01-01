import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "./../CheckoutForm/CheckoutForm";
import Header from "./../Home/Header/Header";

const Payment = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});

  useEffect(() => {
    fetch(`https://afternoon-coast-04252.herokuapp.com/order/${orderId}`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [orderId]);

  const stripePromise = loadStripe(
    "pk_test_51Jw3zHB9jksQQfHL1sojU7yCmPhWnn8RZSOxDBZc36qDE5C89aKopkbqnrWIWfU1M7BBj3LbTclAojAC6Dbdq0Z5008gz1NU2s"
  );

  return (
    <>
      <Header />

      <div className="flex lg:space-x-8 mt-8 lg:flex-col flex-col items-center space-y-4 lg:space-y-0 justify-center">
        {order?.vehicle_type?.toLowerCase()?.trim() === "car" ? (
          <div className="h-ful  lg:w-2/3 md:w-2/3 w-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
            <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
              START
            </h2>
            <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
              CAR $200
            </h1>
            <p className="flex items-center text-gray-600 mb-2">
              All modern support
            </p>
            <p className="flex items-center text-gray-600 mb-2">
              Great Teacher
            </p>
            <p className="flex items-center text-gray-600 mb-6">
              With 24/7 support
            </p>

            <p className="text-xs text-gray-500 mt-3">
              Literally you probably haven't heard this type of offer
            </p>
          </div>
        ) : (
          <div className="h-full  lg:w-2/3 md:w-2/3 w-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
            <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
              START
            </h2>
            <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
              Bike $100
            </h1>
            <p className="flex items-center text-gray-600 mb-2">
              All modern support
            </p>
            <p className="flex items-center text-gray-600 mb-2">
              Great Teacher
            </p>
            <p className="flex items-center text-gray-600 mb-6">
              With 24/7 support
            </p>

            <p className="text-xs text-gray-500 mt-3">
              Literally you probably haven't heard this type of offer
            </p>
          </div>
        )}
        <div className="w-2/5">
          {order && (
            <Elements stripe={stripePromise}>
              {order?.vehicle_type?.toLowerCase()?.trim() === "car" ? (
                <CheckoutForm price={200} order={order} />
              ) : (
                <CheckoutForm price={100} order={order} />
              )}
            </Elements>
          )}
        </div>
      </div>
    </>
  );
};

export default Payment;
