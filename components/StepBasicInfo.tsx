import React, { useState } from "react";
import { basicInfoSchema } from "../utils/validations";
import { NewUser } from "../types";
import { motion } from "framer-motion";

type Props = {
  user: NewUser;
  onChange: (key: string, value: string) => void;
  onNext: () => void;
  saveProgress: () => void;
};

const StepBasicInfo: React.FC<Props> = ({ user, onChange, onNext, saveProgress }) => {
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    const result = basicInfoSchema.safeParse({
      name: user.name,
      email: user.email,
      phone:user.phone
    });
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
      key="step-basic"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.3 }}
      className="glass p-8"
    >
      <h2 className="text-2xl font-extrabold text-center mb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        Basic Info
      </h2>
      <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-6" />
      <FloatingInput label="Name *" value={user.name} onChange={v => onChange("name", v)} />
      <FloatingInput label="Email *" value={user.email} onChange={v => onChange("email", v)} />
         <FloatingInput label="Phone *" value={user.phone} onChange={v => onChange("phone", v)} />
      {error && <div className="text-red-500 mb-3">{error}</div>}
      <button className="w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow transition hover:scale-105" onClick={handleNext}>
        Next
      </button>
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

export default StepBasicInfo;