import { useForm, Controller } from "react-hook-form";
import useFormContext from "../hooks/useFormContext";
import { Switch } from "@/components/ui/switch";

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
      <h1>Select your plan</h1>
      <p>You have the option of monthly or yearly billing.</p>

      {errors.selectedPlan && (
        <p className="text-red-500">{errors.selectedPlan.message}</p>
      )}

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 grid grid-rows-3 gap-5">
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
                  className={`h-24 rounded-lg px-5 text-left outline lg:h-24 ${
                    value === plan.name ? "bg-purple-400" : ""
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <img src={plan.icon} alt={plan.name} />
                    <div className="">
                      <h2>{plan.name}</h2>
                      <p>
                        ${planPrices[index]}/{billingCycleShort}
                      </p>
                      {isYearly && <p>2 months free</p>}
                    </div>
                  </div>
                </button>
              )}
            />
          ))}
        </div>

        <div className="mt-4 flex justify-center rounded-md bg-slate-200 py-4">
          <label
            htmlFor="yearly-switch"
            className="flex cursor-pointer items-center gap-4"
          >
            <span
              className={`${
                !isYearly ? "text-blue-700" : "text-slate-400/70"
              } text-sm font-bold`}
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
                isYearly ? "text-blue-700" : "text-slate-400/70"
              } text-sm font-bold`}
            >
              Yearly
            </span>
          </label>
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

export default SelectPlan;
