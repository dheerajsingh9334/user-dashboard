import React, { useState, useEffect } from "react";
import StepBasicInfo from "./StepBasicInfo";
import StepAddress from "./StepAddress";
import StepReview from "./StepReview";
import { NewUser } from "../types";
import Toast from "./Toast";
import { AnimatePresence } from "framer-motion";
import { useUserContext } from "../contexts/UserContext";

const STORAGE_KEY = "user-form-progress";

const initialData: NewUser = {
  name: "",
  email: "",
  phone:"",
  address: {
    street: "",
    city: "",
    zipcode: "",
  }
};

const AddUserForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState<NewUser>(initialData);
  const [showToast, setShowToast] = useState(false);
  const { addUser } = useUserContext();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const { step, user } = JSON.parse(saved);
      setUser(user);
      setStep(step);
    }
  }, []);

  const saveProgress = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, user }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (key: string, value: any) => {
    if (["street", "city", "zipcode"].includes(key)) {
      setUser(prev => ({ ...prev, address: { ...prev.address, [key]: value } }));
    } else {
      setUser(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = () => {
   
    addUser(user);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
    setUser(initialData);
    setStep(1);
    localStorage.removeItem(STORAGE_KEY);
      console.log("User data submitted:", user);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto min-h-[400px] px-4 py-8">
      <Toast message="User added! (Check dashboard)" show={showToast} />
      
      {/* Step Indicators */}
      <div className="flex justify-between items-center mb-8">
        {["Basic Info", "Address", "Review"].map((label, i) => (
          <div key={i} className="flex flex-col items-center flex-1 text-sm">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full font-bold 
              ${step >= i + 1 ? "bg-blue-600 text-red-900" : "bg-blue-600 text-gray-600"}`}
            >
              {i + 1}
            </div>
            <span className="mt-2">{label}</span>
          </div>
        ))}
      </div>

      {/* Form Steps with Animation */}
      <div className="rounded-xl shadow-lg p-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <StepBasicInfo
              key={1}
              user={user}
              onChange={handleChange}
              onNext={nextStep}
              saveProgress={saveProgress}
            />
          )}
          {step === 2 && (
            <StepAddress
              key={2}
              user={user}
              onChange={handleChange}
              onNext={nextStep}
              onBack={prevStep}
              saveProgress={saveProgress}
            />
          )}
          {step === 3 && (
            <StepReview
              key={3}
              user={user}
              onBack={prevStep}
              onSubmit={handleSubmit}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AddUserForm;
