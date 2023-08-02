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
    {
      form: <PersonalInfo />,
      title: "Your Info",
      formHeading: "Personal info",
      formInfo: "Please provide your name, email address, and phone number.",
    },
    {
      form: <SelectPlan />,
      title: "Select Plan",
      formHeading: "Select your plan",
      formInfo: "You have the option of monthly or yearly billing.",
    },
    {
      form: <PickAddOns />,
      title: "Add-ons",
      formHeading: "Pick add-ons",
      formInfo: "Add-ons help enhance your gaming experience.",
    },
    {
      form: <Review />,
      title: "Summary",
      formHeading: "Finishing up",
      formInfo: "Double-check everything looks OK before confirming.",
    },
  ];

  return (
    <div className="bg-neutral-Magnolia lg:flex lg:h-screen lg:items-center lg:justify-center lg:px-10">
      <div className="min-h-screen w-full min-w-[375px] bg-neutral-Magnolia pb-24 font-Ubuntu lg:flex lg:min-h-0 lg:max-w-5xl lg:justify-between lg:rounded-lg lg:bg-white lg:p-5">
        <div className="relative">
          <picture role="presentation">
            <source media="(min-width: 1024px)" srcSet={desktopBG} />
            <img src={mobileBG} role="presentation" className="h-full w-full" />
          </picture>

          <div className="absolute left-1/2 top-1/3 flex -translate-x-1/2 -translate-y-2/3 justify-center gap-5 sm:-translate-y-16 lg:w-max lg:-translate-x-28 lg:-translate-y-40 lg:flex-col">
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
                  } grid aspect-square w-11 place-items-center rounded-full border text-lg transition duration-500 animate-in zoom-in-0`}
                >
                  {index + 1}
                </div>

                <div className="hidden flex-col lg:flex">
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

        <main className="mx-auto w-full max-w-lg px-5 lg:p-0">
          <section
            className={`relative -mt-[84px] h-full w-full max-w-3xl rounded-lg bg-white p-5 shadow-lg sm:-mt-56 md:flex md:flex-col md:shadow-none lg:m-0`}
          >
            {canConfirm ? (
              <div className="flex h-full flex-col items-center justify-center gap-5 py-12 text-center">
                <img src={complete} role="presentation" />
                <h1 className="text-3xl font-bold text-primary-Marine-blue">
                  Thank you!
                </h1>
                <p className="text-neutral-Cool-gray lg:px-5">
                  Thanks for confirming your subscription! We hope you have fun
                  using our platform. If you ever need support, please feel free
                  to email us at support@loremgaming.com.
                </p>
              </div>
            ) : (
              <>
                <div className="pt-5">
                  <h1 className="text-2xl font-bold text-primary-Marine-blue lg:text-3xl">
                    {formInputs[currentStep].formHeading}
                  </h1>
                  <p className="mt-3 text-neutral-Cool-gray">
                    {formInputs[currentStep].formInfo}
                  </p>
                </div>
                {formInputs[currentStep].form}
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Form;
