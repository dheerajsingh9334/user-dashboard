import React, { useMemo, useState, useEffect } from "react";
import { useUserContext } from "../../contexts/UserContext";
import UserList from "../../components/UserList";
import SearchBar from "../../components/SearchBar";
import Link from "next/link";
import Toast from "../../components/Toast";
import EditUserModal from "../../components/EditUserModal";
import { User, NewUser } from "../../types";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { users, editUser, deleteUser, loading, error, refresh } = useUserContext();
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [editUserModal, setEditUserModal] = useState<User | null>(null);

  // Auto-dismiss toast after 2s
  useEffect(() => {
    if (toast) {
      const timeout = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timeout);
    }
  }, [toast]);

  // Editable user IDs (local users vs API users)
  const editableIds = useMemo(
    () => new Set(users.filter(u => u.id > 1000 || u.id >= 1e10).map(u => u.id)),
    [users]
  );

  const filtered = useMemo(
    () =>
      users.filter(
        user =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.address.city.toLowerCase().includes(search.toLowerCase())
      ),
    [search, users]
  );

  const handleEdit = (user: User) => setEditUserModal(user);

  const handleEditSave = (data: NewUser) => {
    if (editUserModal) {
      editUser(editUserModal.id, data);
      setToast({ msg: "User updated!", type: "success" });
    }
  };

  const handleDelete = (user: User) => {
    if (window.confirm(`Delete user "${user.name}"?`)) {
      deleteUser(user.id);
      setToast({ msg: "User deleted.", type: "success" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto py-10 px-4 md:px-0"
      role="main"
    >
     <Toast message={toast?.msg ?? ""} show={!!toast} />


      <header className="glass mb-8 py-8 px-6 md:px-10 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-1">
            User Dashboard
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-1" />
        </div>

        <nav className="flex gap-4 md:gap-6">
          <Link href="/dashboard/add" passHref>
            <button
              type="button"
              className="relative px-7 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-400"
              aria-label="Add new user"
            >
              + Add User
            </button>
          </Link>

          <button
            onClick={refresh}
            aria-label="Refresh user list"
            type="button"
            className="bg-gray-300 px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-300 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-400 text-blue-400"
          >
            Refresh
          </button>
        </nav>
      </header>

      <SearchBar value={search} onChange={setSearch} />

      {loading && (
        <div className="flex justify-center my-12" role="status" aria-live="polite">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="sr-only">Loading users...</span>
        </div>
      )}

      {error && (
        <p className="text-red-500 mt-6 text-center" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && (
        <UserList
          users={filtered}
          editableIds={editableIds}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {editUserModal && (
        <EditUserModal
          user={editUserModal}
          onSave={handleEditSave}
          onClose={() => setEditUserModal(null)}
        />
      )}
    </motion.div>
  );
}
