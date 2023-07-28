import PersonalInfo from "./PersonalInfo";
import SelectPlan from "./SelectPlan";
import PickAddOns from "./PickAddOns";
import Review from "./Review";
import useFormContext from "../hooks/useFormContext";

const Form = () => {
  const { currentStep, canConfirm } = useFormContext();

  const formInputs = [
    <PersonalInfo />,
    <SelectPlan />,
    <PickAddOns />,
    <Review />,
  ];

  return (
    <div>
      <div className="flex justify-center gap-5">
        {Array(formInputs.length)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className={`${
                index === currentStep
                  ? "border-none bg-blue-300 font-bold text-black"
                  : "border-gray-300 text-black"
              } grid aspect-square w-12 place-items-center rounded-full border text-xl duration-500 animate-in zoom-in-0 `}
            >
              {index + 1}
            </div>
          ))}
      </div>

      {canConfirm ? (
        <>
          <h1>Thank you!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
            laudantium ducimus facilis?
          </p>
        </>
      ) : (
        <>{formInputs[currentStep]}</>
      )}
    </div>
  );
};

export default Form;
