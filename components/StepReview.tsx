import React from "react";
import { newUserSchema } from "../utils/validations";
import { NewUser } from "../types";
import { motion } from "framer-motion";

type Props = {
  user: NewUser;
  onBack: () => void;
  onSubmit: () => void;
};

const StepReview: React.FC<Props> = ({ user, onBack, onSubmit }) => {
  const result = newUserSchema.safeParse(user);

  return (
    <motion.div
      key="step-review"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.3 }}
      className="glass p-8"
    >
      <h2 className="text-2xl font-extrabold text-center mb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        Review & Confirm
      </h2>
      <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-6" />
      <div className="mb-5 space-y-1 text-lg">
        <div><span className="font-semibold">Name:</span> {user.name}</div>
        <div><span className="font-semibold">Email:</span> {user.email}</div>
                <div><span className="font-semibold">Phone:</span> {user.phone}</div>
        <div>
          <span className="font-semibold">Address:</span> {user.address.street}, {user.address.city}, {user.address.zipcode}
        </div>
      </div>
      {!result.success && (
        <div className="text-red-500 mb-3">Validation failed: {result.error.errors[0].message}</div>
      )}
      <div className="flex gap-2 mt-8">
        <button className="w-1/2 bg-gray-200 px-6 py-3 rounded-xl font-semibold" onClick={onBack}>
          Back
        </button>
        <button
          className="w-1/2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold shadow transition hover:scale-105"
          onClick={onSubmit}
          disabled={!result.success}
        >
          Confirm & Add
        </button>
      </div>
    </motion.div>
  );
};

export default StepReview;