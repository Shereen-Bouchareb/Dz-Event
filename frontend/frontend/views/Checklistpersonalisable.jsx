import React from "react";

const BlurLayerExample = () => {
  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center m-32">
      {/* Background content */}
      <div className="absolute inset-0 bg-amber-50 p-8  ">
        <h1 className="text-gray-800 text-4xl font-bold">Background Content</h1>
        <a
          href="https://www.example.com"
          className="text-blue-600 hover:text-blue-800 underline mt-4 inline-block"
        ></a>
      </div>

      {/* Blurred overlay */}
      <div className="absolute inset-0 bg-gray-300 bg-opacity-50 backdrop-blur-sm "></div>

      {/* Foreground card */}
      <div className="relative bg-[#D08E70] text-white p-6 rounded-lg shadow-lg max-w-2lg">
        <h2 className="text-xl font-bold mb-4">Checklist personnalisable</h2>
        <ul className="space-y-2">
          {[
            "Prises de vue supplémentaires en soirée (par exemple, after-party d’un mariage).",
            "Installation d’éclairages spéciaux pour des photos glamour.",
            "Création d’un effet cinématique ou vintage sur les photos.",
            "Vidéo en coulisses ('Behind the scenes').",
            "Courts métrages ou montage vidéo résumant l’événement.",
          ].map((item, index) => (
            <li key={index}>
              <input
                type="checkbox"
                className="mr-2"
                defaultChecked={index < 3}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlurLayerExample;
