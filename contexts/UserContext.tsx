import React, { createContext, useContext, useEffect, useState } from "react";
import type { User, NewUser } from "../types";

type UserContextType = {
  users: User[];
  addUser: (user: NewUser) => void;
  editUser: (id: number, user: NewUser) => void;
  deleteUser: (id: number) => void;
  loading: boolean;
  error: string;
  refresh: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const LOCAL_KEY = "local-users";

function getLocalUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(LOCAL_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function setLocalUsers(users: User[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(users));
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiUsers, setApiUsers] = useState<User[]>([]);
  const [localUsers, setLocalUsersState] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load API users
  const fetchUsers = () => {
    setLoading(true);
    setError("");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(r => {
        if (!r.ok) throw new Error("Failed to fetch users");
        return r.json();
      })
      .then(data => setApiUsers(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };

  // Load local users
  useEffect(() => {
    setLocalUsersState(getLocalUsers());
    fetchUsers();
  }, []);

  // Methods
  const addUser = (user: NewUser) => {
    const newUser: User = {
      id: Date.now(),
      phone: "",
      ...user,
    };
    const updated = [...localUsers, newUser];
    setLocalUsersState(updated);
    setLocalUsers(updated);
  };

  const editUser = (id: number, user: NewUser) => {
    const updated = localUsers.map(u => (u.id === id ? { ...u, ...user } : u));
    setLocalUsersState(updated);
    setLocalUsers(updated);
  };

  const deleteUser = (id: number) => {
    const updated = localUsers.filter(u => u.id !== id);
    setLocalUsersState(updated);
    setLocalUsers(updated);
  };

  const refresh = () => fetchUsers();

  // Compose users: API (read-only) + local
  const users = [...apiUsers, ...localUsers];

  return (
    <UserContext.Provider
      value={{ users, addUser, editUser, deleteUser, loading, error, refresh }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUserContext must be used inside UserProvider");
  return ctx;
}