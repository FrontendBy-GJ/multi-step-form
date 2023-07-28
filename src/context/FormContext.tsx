import React, { ReactNode, createContext, useEffect, useState } from "react";
import Arcade from "../assets/icons/icon-arcade.svg";
import Advanced from "../assets/icons/icon-advanced.svg";
import Pro from "../assets/icons/icon-pro.svg";

type ChildrenProps = {
  children: ReactNode;
};

type FormDetailsProps = {
  name: string;
  email: string;
  phone: string;
} | null;

type SelectedPlanProps = {
  name: string;
  price: number;
} | null;

type SelectedAddOnsProps =
  | {
      name: string;
      price: number;
    }[]
  | null;

type ValuesProps = {
  formDetails: FormDetailsProps;
  setFormDetails: React.Dispatch<React.SetStateAction<FormDetailsProps>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  plans: { name: string; price: number; icon: string }[];
  isYearly: boolean;
  setIsYearly: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPlan: SelectedPlanProps;
  setSelectedPlan: React.Dispatch<React.SetStateAction<SelectedPlanProps>>;
  isPlanSelected: boolean;
  setIsPlanSelected: React.Dispatch<React.SetStateAction<boolean>>;
  billingCycleShort: JSX.Element;
  planPrices: number[];
  addOns: { name: string; info: JSX.Element | string; price: number }[];
  selectedAddOns: SelectedAddOnsProps;
  setSelectedAddOns: React.Dispatch<React.SetStateAction<SelectedAddOnsProps>>;
  canConfirm: boolean;
  setCanConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  addOnPrices: number[];
  total: number;
};

export const FormContext = createContext<ValuesProps | null>(null);

export const FormContextProvider = ({ children }: ChildrenProps) => {
  const [formDetails, setFormDetails] = useState<FormDetailsProps>(null);

  const [selectedPlan, setSelectedPlan] = useState<SelectedPlanProps>(null);

  const [isPlanSelected, setIsPlanSelected] = useState<boolean>(false);

  const [isYearly, setIsYearly] = useState<boolean>(false);

  const [currentStep, setCurrentStep] = useState<number>(0);

  const [selectedAddOns, setSelectedAddOns] =
    useState<SelectedAddOnsProps>(null);

  const [canConfirm, setCanConfirm] = useState<boolean>(false);

  const plans: { name: string; price: number; icon: string }[] = [
    { name: "Arcade", price: 9, icon: Arcade },
    { name: "Advance", price: 12, icon: Advanced },
    { name: "Pro", price: 15, icon: Pro },
  ];

  const addOns: { name: string; info: JSX.Element | string; price: number }[] =
    [
      {
        name: "Online service",
        info: "Access to multiplayer games",
        price: 1,
      },
      {
        name: "Larger storage",
        info: (
          <>
            Extra 1
            <abbr className="no-underline" title="Terabyte">
              TB
            </abbr>{" "}
            of cloud save
          </>
        ),
        price: 2,
      },
      {
        name: "Customizable profile",
        info: "Custom theme on your profile",
        price: 2,
      },
    ];

  const billingCycleShort: JSX.Element = (
    <abbr className="no-underline" title={isYearly ? "year" : "month"}>
      {isYearly ? "yr" : "mo"}
    </abbr>
  );

  const planPrices: number[] = plans.map((plan) =>
    isYearly ? plan.price * 10 : plan.price,
  );

  const addOnPrices: number[] = addOns.map((addOn) =>
    isYearly ? addOn.price * 10 : addOn.price,
  );

  const total: number =
    (selectedAddOns || []).reduce((total, curr) => total + curr.price, 0) +
    (selectedPlan! || {}).price;

  useEffect(() => {
    // Recalculate the price of the selected plan based on isYearly
    if (selectedPlan) {
      const newPrice = selectedPlan.price * (isYearly ? 10 : 0.1);

      setSelectedPlan((prevSelectedPlan) => ({
        ...prevSelectedPlan!,
        price: newPrice,
      }));
    }

    // Recalculate the price of the selected add-on(s) based on isYearly
    if (selectedAddOns) {
      const newPrice = selectedAddOns.map((addOn) => ({
        ...addOn,
        price: addOn.price * (isYearly ? 10 : 0.1),
      }));

      setSelectedAddOns(newPrice);
    }
  }, [isYearly]);

  const values: ValuesProps = {
    formDetails,
    setFormDetails,
    currentStep,
    setCurrentStep,
    plans,
    isYearly,
    setIsYearly,
    selectedPlan,
    setSelectedPlan,
    isPlanSelected,
    setIsPlanSelected,
    billingCycleShort,
    planPrices,
    addOns,
    selectedAddOns,
    setSelectedAddOns,
    canConfirm,
    setCanConfirm,
    addOnPrices,
    total,
  };
  return <FormContext.Provider value={values}>{children}</FormContext.Provider>;
};

export default FormContextProvider;
