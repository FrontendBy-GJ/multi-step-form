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
      <h1>Pick add-ons</h1>
      <p>Add-ons help enhance your gaming experience.</p>

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
                  className="grid h-24 cursor-pointer grid-cols-3 place-items-center outline"
                >
                  <input
                    type="checkbox"
                    name={addOn.name}
                    id={addOn.name}
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
                  <div>
                    <h2>{addOn.name}</h2>
                    <p>{addOn.info}</p>
                  </div>
                  <p>
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
          <button type="submit">Next Step</button>
        </div>
      </form>
    </>
  );
};

export default PickAddOns;
