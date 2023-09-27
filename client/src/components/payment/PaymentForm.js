import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Icons from "../../assets/icons/icons";
import Loading from "../loading/loading"

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#007991a8",
			color: "orange",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#007991a8" },
			"::placeholder": { color: "#007991a8" }
		},
		invalid: {
			iconColor: "red",
			color: "red"
		}
	}
}

export default function PaymentForm({ amount, handlePurchase }) {
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
          amount,
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
          toast.success(response.data.success, {
            theme: "colored",
          });
          handlePurchase();
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
        <div>
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="Formrow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button className="bg-orange text-white px-5 rounded-xl mt-5">Pay</button>
        </form>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col gap-5 text-green-500">
          <span><Icons.Check size={30}/></span>
          <h2 className="text-2xl">Payment success!</h2>
        </div>
      )}
    </>
  );
}
