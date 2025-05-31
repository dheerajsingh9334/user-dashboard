import React from "react";

const COLORS = [
  "from-blue-400 via-purple-500 to-pink-500",
  "from-green-400 via-blue-500 to-purple-500",
  "from-pink-400 via-yellow-500 to-red-500",
  "from-purple-400 via-indigo-500 to-blue-500",
  "from-yellow-400 via-pink-500 to-red-500"
];

function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

export default function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map(w => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const bgGradient = stringToColor(name);

  return (
    <div
      className={`w-14 h-14 flex items-center justify-center rounded-full 
      bg-gradient-to-br ${bgGradient} text-white font-bold text-xl 
      shadow-md ring-2 ring-white transition-transform duration-200 hover:scale-110`}
      aria-label={`Avatar for ${name}`}
      title={name}
    >
      {initials}
    </div>
  );
}
