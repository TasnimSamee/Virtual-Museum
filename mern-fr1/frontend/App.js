import React from "react";
import FeaturedArtifacts from "./components/FeaturedArtifacts";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="flex justify-between items-center bg-gray-900 px-8 py-4 text-white shadow-md">
        <div className="text-2xl font-bold">Virtual Museum</div>
        <nav>
          <ul className="flex gap-6 text-lg">
            <li><a href="#" className="hover:text-gray-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300">Artifacts</a></li>
            <li><a href="#" className="hover:text-gray-300">Museums</a></li>
            <li><a href="#" className="hover:text-gray-300">About</a></li>
            <li><a href="#" className="hover:text-gray-300">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section className="text-center text-white py-32 bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/1200x500?text=Hero+Banner')" }}>
        <h1 className="text-5xl font-extrabold">Explore History Like Never Before</h1>
        <p className="mt-4 text-xl">Discover world artifacts, museums, and cultural treasures online.</p>
      </section>

      <FeaturedArtifacts />
    </div>
  );
}
