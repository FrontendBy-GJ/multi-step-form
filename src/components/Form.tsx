import PersonalInfo from "./PersonalInfo";
import SelectPlan from "./SelectPlan";
import PickAddOns from "./PickAddOns";
import Review from "./Review";
import useFormContext from "../hooks/useFormContext";
import desktopBG from "../assets/bg-sidebar-desktop.svg";
import mobileBG from "../assets/bg-sidebar-mobile.svg";
import complete from "../assets/icons/icon-thank-you.svg";

const Form = () => {
  const { currentStep, canConfirm } = useFormContext();

  const formInputs = [
    <PersonalInfo />,
    <SelectPlan />,
    <PickAddOns />,
    <Review />,
  ];

  return (
    <div className="sm:p- min-h-screen bg-neutral-Magnolia pb-24 font-Ubuntu lg:flex lg:p-5">
      <div className="relative">
        <picture role="presentation">
          <source media="(min-width: 1024px)" srcSet={desktopBG} />
          <img src={mobileBG} alt="" className="h-full w-full" />
        </picture>

        <div className="absolute left-1/2 top-1/3 flex -translate-x-1/2 -translate-y-2/3 justify-center gap-5">
          {Array(formInputs.length)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className={`${
                  index === currentStep
                    ? "border-none bg-primary-Light-blue font-bold text-black"
                    : "border-current text-neutral-Alabaster"
                } grid aspect-square w-9 place-items-center rounded-full border transition duration-500 animate-in zoom-in-0 sm:w-16 sm:text-xl `}
              >
                {index + 1}
              </div>
            ))}
        </div>
      </div>

      <main className="px-5">
        <section className="relative mx-auto -mt-20 max-w-xl rounded-lg bg-white p-5 shadow-lg sm:-mt-32 md:-mt-40">
          {canConfirm ? (
            <div className="flex flex-col items-center gap-5 py-12 text-center">
              <img src={complete} role="presentation" />
              <h1 className="text-2xl font-bold text-primary-Marine-blue">
                Thank you!
              </h1>
              <p className="text-neutral-Cool-gray">
                Thanks for confirming your subscription! We hope you have fun
                using our platform. If you ever need support, please feel free
                to email us at support@loremgaming.com.
              </p>
            </div>
          ) : (
            <>{formInputs[currentStep]}</>
          )}
        </section>
      </main>
    </div>
  );
};

export default Form;
