type ButtonsProps = {
  type: "button" | "submit";
  text: "Next Step" | "Go Back" | "Confirm";
  onClick?: () => void;
};

const Button = ({ type, text, onClick }: ButtonsProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        text === "Go Back"
          ? "text-neutral-Cool-gray hover:text-primary-Marine-blue focus:ring-primary-Marine-blue"
          : text === "Confirm"
          ? "bg-primary-Purplish-blue text-white focus:ring-primary-Purplish-blue"
          : "bg-primary-Marine-blue text-neutral-Magnolia focus:ring-primary-Marine-blue"
      } rounded px-4 py-2 font-semibold transition hover:bg-opacity-80 focus:outline-none focus:ring focus-visible:ring-offset-2`}
    >
      {text}
    </button>
  );
};

export default Button;
