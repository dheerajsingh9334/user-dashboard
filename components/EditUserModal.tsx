import React, { useState } from "react";
import { NewUser, User } from "../types";
import { newUserSchema } from "../utils/validations";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  user: User;
  onSave: (user: NewUser) => void;
  onClose: () => void;
};

const EditUserModal: React.FC<Props> = ({ user, onSave, onClose }) => {
  const [form, setForm] = useState<NewUser>({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: { ...user.address },
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (k: string, v: string) => {
    if (["street", "city", "zipcode"].includes(k)) {
      setForm((prev) => ({ ...prev, address: { ...prev.address, [k]: v } }));
    } else {
      setForm((prev) => ({ ...prev, [k]: v }));
    }
  };

  const handleSave = () => {
    const res = newUserSchema.safeParse(form);
    if (!res.success) {
      setError(res.error.errors[0].message);
      return;
    }
    setError(null);
    onSave(form);
    onClose();
    console.log(user);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-modal="true"
        role="dialog"
      >
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-2xl px-6 py-8 w-full max-w-md shadow-lg border border-gray-100 dark:border-gray-700"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Edit User
          </h2>

          <div className="space-y-5">
            <FloatingInput
              label="Name"
              value={form.name}
              onChange={(v) => handleChange("name", v)}
            />
            <FloatingInput
              label="Email"
              value={form.email}
              onChange={(v) => handleChange("email", v)}
            />
            <FloatingInput
              label="Phone"
              value={form.phone}
              onChange={(v) => handleChange("phone", v)}
            />
            <FloatingInput
              label="Street"
              value={form.address.street}
              onChange={(v) => handleChange("street", v)}
            />
            <FloatingInput
              label="City"
              value={form.address.city}
              onChange={(v) => handleChange("city", v)}
            />
            <FloatingInput
              label="Zip Code"
              value={form.address.zipcode}
              onChange={(v) => handleChange("zipcode", v)}
            />
          </div>

          {error && (
            <p className="text-red-500 mt-4 text-sm text-center">{error}</p>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow hover:scale-105 transition font-semibold"
            >
              Save
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

function FloatingInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer h-12 w-full px-2 pt-4 pb-1 bg-transparent border-b-2 border-gray-300 text-sm text-gray-800 dark:text-white placeholder-transparent focus:outline-none focus:border-blue-500"
        placeholder={label}
        required
      />
      <label
        className="absolute left-2 top-2 text-gray-500 text-sm transition-all 
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
        peer-placeholder-shown:text-gray-400 
        peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
      >
        {label}
      </label>
    </div>
  );
}

export default EditUserModal;
