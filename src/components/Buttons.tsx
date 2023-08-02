import useFormContext from "@/hooks/useFormContext";
import Button from "./Button";

const Buttons = () => {
  const { currentStep, setCurrentStep, setCanConfirm } = useFormContext();

  return (
    <div
      className={`fixed bottom-0 left-0 flex h-20 w-full items-center bg-white px-6 lg:absolute ${
        currentStep === 0 ? "justify-end" : "justify-between"
      }`}
    >
      {currentStep !== 0 && (
        <Button
          type="button"
          text="Go Back"
          onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
        />
      )}

      {currentStep === 3 ? (
        <Button
          type="submit"
          text="Confirm"
          onClick={() => setCanConfirm(true)}
        />
      ) : (
        <Button type="submit" text="Next Step" />
      )}
    </div>
  );
};

export default Buttons;
