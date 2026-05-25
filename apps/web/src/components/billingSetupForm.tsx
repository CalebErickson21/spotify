import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function BillingSetupForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setErrorMsg(null);

    const { error } = await stripe.confirmSetup({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: window.location.origin + "/register/complete",
      },
    });

    setSubmitting(false);

    if (error) {
      setErrorMsg(error.message ?? "Payment setup failed.");
      return;
    }

    // ✅ Card saved. You can route the user to the app now.
    window.location.href = "/app";
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <PaymentElement />
      {errorMsg && <p className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>}

      <button
        disabled={!stripe || submitting}
        className="w-full rounded-md px-4 py-2.5 font-semibold bg-accent text-primary hover:bg-accent/90 disabled:opacity-60 transition-colors"
      >
        {submitting ? "Saving..." : "Save payment method"}
      </button>
    </form>
  );
}
