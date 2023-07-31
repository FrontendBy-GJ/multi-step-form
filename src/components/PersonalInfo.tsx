import { SubmitHandler, useForm } from "react-hook-form";
import useFormContext from "../hooks/useFormContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const PersonalInfoSchema = z.object({
  name: z.string().nonempty("This field is required"),
  email: z
    .string()
    .nonempty("This field is required")
    .email("Email format is invalid")
    .endsWith("com"),
  phone: z
    .string()
    .nonempty("This field is required")
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
});

const PersonalInfo = () => {
  const { formDetails, setFormDetails, setCurrentStep } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string; email: string; phone: string }>({
    defaultValues: {
      name: formDetails?.name,
      email: formDetails?.email,
      phone: formDetails?.phone,
    },
    resolver: zodResolver(PersonalInfoSchema),
  });

  const onSubmit: SubmitHandler<{
    name: string;
    email: string;
    phone: string;
  }> = (data) => {
    const { name, email, phone } = data;

    setFormDetails((prevInfo) => ({
      ...prevInfo,
      name: name,
      email: email,
      phone: phone,
    }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <>
      <h1 className="text-2xl font-medium text-primary-Marine-blue">
        Personal Info
      </h1>
      <p className="mt-3 text-neutral-Cool-gray">
        Please provide your name, email address, and phone number.
      </p>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4 grid gap-4">
          <div>
            <div className="flex justify-between">
              <label htmlFor="name" className="label">
                Name{" "}
              </label>
              <p className="font-semibold text-primary-Strawberry-red">
                {errors.name?.message}
              </p>
            </div>
            <input
              type="text"
              id="name"
              placeholder="e.g. Jane Doe"
              className={`${
                errors.name?.message
                  ? "border-primary-Strawberry-red"
                  : "border-neutral-Light-gray"
              } w-full rounded border px-5 py-2 font-medium placeholder:text-neutral-Cool-gray backdrop:bg-none hover:border-primary-Purplish-blue focus:outline-none focus:ring focus:ring-primary-Purplish-blue/80 focus-visible:ring-offset-2`}
              {...register("name")}
            />
          </div>

          <div>
            <div className="flex flex-wrap justify-between">
              <label htmlFor="email" className="label">
                Email{" "}
              </label>
              <p className="font-semibold text-primary-Strawberry-red">
                {errors.email?.message}
              </p>
            </div>
            <input
              type="email"
              id="email"
              placeholder="e.g. jane@email.com"
              className={`${
                errors.email?.message
                  ? "border-primary-Strawberry-red"
                  : "border-neutral-Light-gray"
              } w-full rounded border px-5 py-2 font-medium placeholder:text-neutral-Cool-gray focus:outline-none focus:ring focus:ring-primary-Purplish-blue/80 focus-visible:ring-offset-2`}
              {...register("email")}
            />
          </div>
          <div>
            <div className="flex justify-between">
              <label htmlFor="name" className="label">
                Phone{" "}
              </label>
              <p className="font-semibold text-primary-Strawberry-red">
                {errors.phone?.message}
              </p>
            </div>
            <input
              type="text"
              id="phone"
              placeholder="e.g. 123 456 7890"
              className={`${
                errors.phone?.message
                  ? "border-primary-Strawberry-red"
                  : "border-neutral-Light-gray"
              } w-full rounded border px-5 py-2 font-medium placeholder:text-neutral-Cool-gray focus:outline-none focus:ring focus:ring-primary-Purplish-blue/80 focus-visible:ring-offset-2`}
              {...register("phone")}
            />
          </div>
        </div>
        <div className="btn-wrapper justify-end">
          <button type="submit" className="btn">
            Next Step
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonalInfo;
