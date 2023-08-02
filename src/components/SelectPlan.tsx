import { useForm, Controller } from "react-hook-form";
import useFormContext from "../hooks/useFormContext";
import { Switch } from "@/components/ui/switch";
import Buttons from "./Buttons";

const SelectPlan = () => {
  const {
    setCurrentStep,
    setSelectedPlan,
    plans,
    selectedPlan,
    isYearly,
    setIsYearly,
    billingCycleShort,
    planPrices,
  } = useFormContext();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ selectedPlan: string }>();

  const handlePlanSelected = (
    plan: { name: string; price: number },
    prices: number[],
    index: number,
  ) => {
    setSelectedPlan((prevPlan) => ({
      ...prevPlan,
      name: plan.name,
      price: prices[index],
    }));
  };

  const onSubmit = (data: { selectedPlan: string }) => {
    if (data.selectedPlan) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <>
      {errors.selectedPlan && (
        <p className="mt-2 text-primary-Strawberry-red">
          {errors.selectedPlan.message}
        </p>
      )}

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-7 flex flex-col gap-3 lg:flex-row">
          {plans.map((plan, index) => (
            <Controller
              key={plan.name}
              name="selectedPlan"
              control={control}
              defaultValue={selectedPlan?.name}
              rules={{
                required: "Please select a plan before proceeding",
              }}
              render={({ field: { onChange, value } }) => (
                <button
                  type="button"
                  onClick={() => {
                    onChange(plan.name);
                    handlePlanSelected(plan, planPrices, index);
                  }}
                  className={`h-24 rounded-lg border-2 border-neutral-Light-gray px-4 text-left ring-offset-2 transition hover:border-primary-Purplish-blue focus:outline-none focus:ring focus:ring-primary-Purplish-blue lg:h-52 lg:w-full lg:py-8 ${
                    value === plan.name
                      ? "border-primary-Purplish-blue bg-primary-Purplish-blue/5"
                      : ""
                  }`}
                >
                  <div
                    className={`flex gap-3 lg:h-full lg:flex-col lg:justify-between ${
                      isYearly ? "items-start" : "items-center md:items-start"
                    }`}
                  >
                    <img src={plan.icon} alt={plan.name} />
                    <div>
                      <h2 className="text-lg font-medium text-primary-Marine-blue">
                        {plan.name}
                      </h2>
                      <p className="text-sm text-neutral-Cool-gray">
                        ${planPrices[index]}/{billingCycleShort}
                      </p>
                      {isYearly && (
                        <p className="text-sm text-primary-Marine-blue">
                          2 months free
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              )}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center rounded-md bg-neutral-Magnolia py-4">
          <label
            htmlFor="yearly-switch"
            className="flex cursor-pointer items-center gap-4"
          >
            <span
              className={`${
                !isYearly
                  ? "text-primary-Marine-blue"
                  : "text-neutral-Cool-gray"
              } font-semibold`}
            >
              Monthly
            </span>
            <Switch
              id="yearly-switch"
              checked={isYearly}
              onClick={() => setIsYearly((prev) => !prev)}
            />
            <span
              className={`${
                isYearly ? "text-primary-Marine-blue" : "text-neutral-Cool-gray"
              } font-semibold`}
            >
              Yearly
            </span>
          </label>
        </div>

        <Buttons />
      </form>
    </>
  );
};

export default SelectPlan;
