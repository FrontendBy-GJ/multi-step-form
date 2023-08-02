import { useForm, Controller } from "react-hook-form";
import useFormContext from "../hooks/useFormContext";

const PickAddOns = () => {
  const {
    setCurrentStep,
    addOns,
    selectedAddOns,
    setSelectedAddOns,
    billingCycleShort,
    addOnPrices,
  } = useFormContext();

  const { handleSubmit, control } = useForm();

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit(() =>
          setCurrentStep((prevStep) => prevStep + 1),
        )}
      >
        <div className="my-4 grid grid-rows-3 gap-4">
          {addOns.map((addOn, index) => (
            <Controller
              key={addOn.name}
              name={addOn.name}
              control={control}
              defaultValue={
                selectedAddOns?.some(
                  (selectedAddOn) => selectedAddOn.name === addOn.name,
                ) || false
              }
              render={({ field: { onChange, value } }) => (
                <label
                  htmlFor={addOn.name}
                  className={`flex h-24 cursor-pointer items-center justify-between gap-4 rounded-lg border-2 border-neutral-Light-gray px-3 transition hover:border-primary-Purplish-blue ${
                    value
                      ? "border-primary-Purplish-blue bg-primary-Purplish-blue/5"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-primary-Purplish-blue text-primary-Purplish-blue focus:ring-primary-Purplish-blue"
                    name={addOn.name}
                    id={addOn.name}
                    value={value}
                    checked={value}
                    onChange={(e) => {
                      onChange(e.currentTarget.checked);
                      if (e.currentTarget.checked) {
                        setSelectedAddOns((prevSelectedAddOns) => [
                          ...(prevSelectedAddOns || []),
                          { name: addOn?.name, price: addOnPrices[index] },
                        ]);
                      } else {
                        setSelectedAddOns((prevSelectedAddOns) =>
                          (prevSelectedAddOns || []).filter(
                            (selectedAddOn) =>
                              selectedAddOn?.name !== addOn?.name,
                          ),
                        );
                      }
                    }}
                  />
                  <div className="w-full">
                    <h2 className="font-medium text-primary-Marine-blue">
                      {addOn.name}
                    </h2>
                    <p className="text-sm text-neutral-Cool-gray">
                      {addOn.info}
                    </p>
                  </div>
                  <p className="text-sm text-primary-Purplish-blue">
                    ${addOnPrices[index]}/{billingCycleShort}
                  </p>
                </label>
              )}
            />
          ))}
        </div>

        <div className="btn-wrapper">
          <button
            type="button"
            onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
          >
            Go Back
          </button>
          <button type="submit" className="btn">
            Next Step
          </button>
        </div>
      </form>
    </>
  );
};

export default PickAddOns;
