import React, { useState } from "react";
import { addressSchema } from "../utils/validations";
import { NewUser } from "../types";
import { motion } from "framer-motion";

type Props = {
  user: NewUser;
  onChange: (key: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  saveProgress: () => void;
};

const StepAddress: React.FC<Props> = ({ user, onChange, onNext, onBack, saveProgress }) => {
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    const result = addressSchema.safeParse(user.address);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setError(null);
    saveProgress();
    onNext();
  };

  return (
    <motion.div
      key="step-address"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.3 }}
      className="glass p-8"
    >
      <h2 className="text-2xl font-extrabold text-center mb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        Address
      </h2>
      <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-6" />
      <FloatingInput label="Street *" value={user.address.street} onChange={v => onChange("street", v)} />
      <FloatingInput label="City *" value={user.address.city} onChange={v => onChange("city", v)} />
      <FloatingInput label="Zip *" value={user.address.zipcode} onChange={v => onChange("zipcode", v)} />
      {error && <div className="text-red-500 mb-3">{error}</div>}
      <div className="flex gap-2 mt-8">
        <button className="w-1/2 bg-gray-200 px-6 py-3 rounded-xl font-semibold" onClick={onBack}>
          Back
        </button>
        <button className="w-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow transition hover:scale-105" onClick={handleNext}>
          Next
        </button>
      </div>
    </motion.div>
  );
};

function FloatingInput({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="relative mb-6">
      <input
        type="text"
        className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 dark:text-white bg-transparent focus:outline-none focus:border-blue-500 transition-colors"
        value={value}
        onChange={e => onChange(e.target.value)}
        required
      />
      <label
        className="absolute left-0 top-3 text-gray-500 pointer-events-none transition-all duration-200 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:-top-3 peer-valid:text-xs"
      >
        {label}
      </label>
    </div>
  );
}

export default StepAddress;