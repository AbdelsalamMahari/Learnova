import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "orange",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "red",
			color: "red"
		}
	}
}

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:5000/payment", {
          amount: 1000,
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
          toast.success(response.data.success, {
            theme: "colored",
          });
        }
      } catch (error) {
        console.log("Error", error);
        toast.error(error, {
          theme: "colored",
        });
      }
    } else {
      console.log(error.message);
      toast.error(error.message, {
        theme: "colored",
      });
    }
  };
  return (
    <>
    <ToastContainer/>
      {!success ? (
        <div className="bg-gray-200 w-1/2 p-10 rounded-md m-auto">
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="Formrow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button className="bg-orange text-white px-5 rounded-xl">Pay</button>
        </form>
        </div>
      ) : (
        <div>
          <h2>Payment success!</h2>
        </div>
      )}
    </>
  );
}
