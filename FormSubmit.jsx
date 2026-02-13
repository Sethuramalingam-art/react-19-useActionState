//https://blog.logrocket.com/react-useactionstate/
"use client";
import React, { useActionState } from "react";

async function submitForm(prevState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const email = formData.get("email");
  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address." };
  }
  return { success: true, message: "Form submitted successfully!" };
}

const FormSubmit = () => {
  const [state, formAction, isPending] = useActionState(submitForm, {
    success: null,
    message: "",
  });
  return (
    <div className="form-container">
      <div className="form-card">
        <form action={formAction}>
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="Name"
          />
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Email"
          />
          <button className="form-button" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </button>

          {state.message && (
            <p
              className={`form-message ${state.success ? "success" : "error"}`}
            >
              {state.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default FormSubmit;
