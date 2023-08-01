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
    { form: <PersonalInfo />, title: "Your Info" },
    { form: <SelectPlan />, title: "Select Plan" },
    { form: <PickAddOns />, title: "Add-ons" },
    { form: <Review />, title: "Summary" },
  ];

  return (
    <div className="bg-neutral-Magnolia md:flex md:h-screen md:items-center md:justify-center md:px-10">
      <div className="min-h-screen w-full min-w-[375px] bg-neutral-Magnolia pb-24 font-Ubuntu md:flex md:min-h-0 md:max-w-5xl md:rounded-md md:bg-white md:p-5">
        <div className="relative">
          <picture role="presentation">
            <source media="(min-width: 768px)" srcSet={desktopBG} />
            <img src={mobileBG} role="presentation" className="h-full w-full" />
          </picture>

          <div className="absolute left-1/2 top-1/3 flex -translate-x-1/2 -translate-y-2/3 justify-center gap-5 md:w-max md:-translate-x-24 md:-translate-y-32 md:flex-col">
            {formInputs.map((form, index) => (
              <div
                key={form.title}
                className="flex items-center gap-5 duration-500 animate-in zoom-in-0"
              >
                <div
                  key={index}
                  className={`${
                    index === currentStep
                      ? "border-none bg-primary-Light-blue font-bold text-black"
                      : "border-current text-neutral-Alabaster"
                  } grid aspect-square w-9 place-items-center rounded-full border transition duration-500 animate-in zoom-in-0`}
                >
                  {index + 1}
                </div>
                <div className="hidden flex-col md:flex">
                  <span className="text-sm uppercase text-neutral-Cool-gray">
                    Step {index + 1}
                  </span>
                  <h2 className="font-medium uppercase text-white">
                    {form.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        <main className="mx-auto px-5 md:p-10">
          <section className="relative mx-auto -mt-20 max-w-xl rounded-lg bg-white p-5 shadow-lg sm:-mt-32 md:m-0 md:flex md:h-full md:flex-col md:p-0 md:shadow-none">
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
              <>{formInputs[currentStep].form}</>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Form;
