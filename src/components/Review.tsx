import useFormContext from "../hooks/useFormContext";

const Review = () => {
  const {
    selectedPlan,
    billingCycleShort,
    setCurrentStep,
    selectedAddOns,
    setCanConfirm,
    isYearly,
    total,
  } = useFormContext();

  return (
    <>
      <h1>Finishing up</h1>
      <p>Double-check everything looks OK before confirming.</p>

      <div className="my-4 flex flex-col gap-5 divide-y-4 divide-gray-300 bg-gray-50 p-6">
        <div className="flex justify-between">
          <div className="flex flex-col items-start">
            <p>
              {selectedPlan!.name} ({isYearly ? "Yearly" : "Monthly"})
            </p>
            <button
              onClick={() => setCurrentStep(1)}
              className="text-gray-500 underline"
            >
              Change
            </button>
          </div>
          <p>
            ${selectedPlan!.price}/{billingCycleShort}
          </p>
        </div>

        <div className="flex flex-col pt-5">
          {selectedAddOns && selectedAddOns.length !== 0 ? (
            <>
              {selectedAddOns?.map((addOns) => (
                <div key={addOns.name} className="flex justify-between">
                  <p>{addOns.name}</p>
                  <p>
                    +${addOns.price}/{billingCycleShort}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <p>Add-ons: ({(selectedAddOns || "").length})</p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <p>Total (per {isYearly ? "year" : "month"})</p>
        <p>
          ${total}/{billingCycleShort}
        </p>
      </div>

      <div className="btn-wrapper">
        <button onClick={() => setCurrentStep((prevStep) => prevStep - 1)}>
          Go Back
        </button>
        <button onClick={() => setCanConfirm(true)}>Confirm</button>
      </div>
    </>
  );
};

export default Review;
