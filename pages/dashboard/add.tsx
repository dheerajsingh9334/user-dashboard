import React from "react";
import AddUserForm from "../../components/AddUserForm";
import Link from "next/link";
import { motion } from "framer-motion";

const AddUserPage = () => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-xl mx-auto py-10 px-2 md:px-0"
  >
    <div className="glass mb-8 px-6 py-8 flex flex-col md:flex-row md:items-center gap-4">
      <Link href="/dashboard">
        <button className="text-blue-600 hover:underline mr-4">&larr; Dashboard</button>
      </Link>
      <div>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-1">Add New User</h1>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-1" />
      </div>
    </div>
    <AddUserForm />
  </motion.div>
);

export default AddUserPage;