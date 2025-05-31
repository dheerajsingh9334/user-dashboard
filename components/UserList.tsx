import React from "react";
import { User } from "../types";
import Avatar from "./Avatar";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  editableIds?: Set<number>;
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04 }
  }),
};

const UserList: React.FC<Props> = ({ users, onEdit, onDelete, editableIds }) => (
  <div className="overflow-x-auto glass my-6">
    <table className="min-w-full">
      <thead>
        <tr className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
          <th className="py-4 px-4 border-b font-semibold">Avatar</th>
          <th className="py-4 px-4 border-b font-semibold">Name</th>
          <th className="py-4 px-4 border-b font-semibold">Email</th>
          <th className="py-4 px-4 border-b font-semibold">Phone</th>
          <th className="py-4 px-4 border-b font-semibold">City</th>
          {(onEdit || onDelete) && <th className="py-4 px-4 border-b font-semibold">Actions</th>}
        </tr>
      </thead>
      <AnimatePresence>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-8 text-gray-400">No users found.</td>
            </tr>
          ) : (
            users.map((user, i) => (
              <motion.tr
                key={user.id}
                custom={i}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={rowVariants}
                className="hover:scale-[1.01] hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-50 dark:hover:from-gray-700 transition-all duration-300"
              >
                <td className="py-2 px-4 border-b"><Avatar name={user.name} /></td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.phone}</td>
                <td className="py-2 px-4 border-b">{user.address.city}</td>
                {(onEdit || onDelete) && (
                  <td className="py-2 px-4 border-b space-x-2">
                    {onEdit && editableIds?.has(user.id) && (
                      <button
                        aria-label={`Edit ${user.name}`}
                        className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold shadow hover:scale-105 transition-all"
                        onClick={() => onEdit(user)}
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && editableIds?.has(user.id) && (
                      <button
                        aria-label={`Delete ${user.name}`}
                        className="px-3 py-1 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold shadow hover:scale-105 transition-all"
                        onClick={() => onDelete(user)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </motion.tr>
            ))
          )}
        </tbody>
      </AnimatePresence>
    </table>
  </div>
);

export default UserList;