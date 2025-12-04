import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FeaturedArtifacts() {
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/artifacts")
      .then(res => setArtifacts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="p-10 text-center">
      <h2 className="text-3xl font-bold mb-8">Featured Artifacts</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {artifacts.map(a => (
          <div key={a._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-200">
            <img src={a.imageUrl} alt={a.title} className="w-full h-48 object-cover" />
            <h3 className="text-xl font-semibold py-4">{a.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
