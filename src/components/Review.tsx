import useFormContext from "../hooks/useFormContext";
import Buttons from "./Buttons";

const Review = () => {
  const {
    selectedPlan,
    billingCycleShort,
    setCurrentStep,
    selectedAddOns,
    isYearly,
    total,
  } = useFormContext();

  return (
    <>
      <div className="my-4 flex flex-col gap-5 divide-y-2 divide-neutral-Light-gray rounded-lg bg-neutral-Magnolia p-5">
        <div className="flex justify-between">
          <div className="flex flex-col items-start">
            <p className="font-semibold text-primary-Marine-blue">
              {selectedPlan!.name} ({isYearly ? "Yearly" : "Monthly"})
            </p>
            <button
              onClick={() => setCurrentStep(1)}
              className="text-neutral-Cool-gray underline transition hover:text-primary-Purplish-blue"
            >
              Change
            </button>
          </div>
          <p className="font-semibold text-primary-Marine-blue">
            ${selectedPlan!.price}/{billingCycleShort}
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-5">
          {selectedAddOns && selectedAddOns.length !== 0 ? (
            <>
              {selectedAddOns?.map((addOns) => (
                <div key={addOns.name} className="flex justify-between">
                  <p className="text-neutral-Cool-gray">{addOns.name}</p>
                  <p className="text-primary-Marine-blue">
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

      <div className="flex justify-between px-5 py-2">
        <p className="text-neutral-Cool-gray">
          Total (per {isYearly ? "year" : "month"})
        </p>
        <p className="font-semibold text-primary-Purplish-blue">
          ${total}/{billingCycleShort}
        </p>
      </div>

      <Buttons />
    </>
  );
};

export default Review;
