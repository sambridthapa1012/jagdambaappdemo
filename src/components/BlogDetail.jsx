import { useParams } from "react-router-dom";
import { useEffect } from "react";
import shivam from "../assets/shivam.png";
import hardwaretools from "../assets/hardware-tools.jpg";
import opc from "../assets/opc.jpg";
import ppc from "../assets/ppc.jpg";
import toolsforblog from "../assets/toolsforblog.webp";
import powertoolsforblog from "../assets/powertoolsforblog.avif";
import safetytoolsforblog from "../assets/safetytoolsforblog.webp";

const BlogDetail = () => {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const blogContent = {
    "opc-vs-ppc": {
      title: "OPC vs PPC Cement",
      hero:
       shivam,
      sections: [
        {
          heading: "What is OPC Cement?",
          text: "OPC (Ordinary Portland Cement) is widely used for general construction. It provides high initial strength and is suitable for fast-paced projects.",
          image:
            opc,
        },
        {
          heading: "What is PPC Cement?",
          text: "PPC (Portland Pozzolana Cement) contains pozzolanic materials which improve durability and resistance to chemicals. It is best for long-term structures.",
          image:
            ppc,
        },
      ],
      table: [
        ["Feature", "OPC", "PPC"],
        ["Strength", "High early strength", "Slow but long-lasting"],
        ["Durability", "Moderate", "High"],
        ["Heat of hydration", "High", "Low"],
        ["Best Use", "Quick construction", "Long-term structures"],
      ],
    },

    "hardware-tools": {
      title: "Essential Hardware Tools",
      hero:
        hardwaretools,
      sections: [
        {
          heading: "Basic Tools You Must Have",
          text: "Every home and construction site needs essential tools like hammer, screwdrivers, and pliers.",
          image:
            toolsforblog,
        },
        {
          heading: "Power Tools",
          text: "Drilling machines, grinders, and electric cutters make work faster and more efficient.",
          image:
            powertoolsforblog,
        },
        {
          heading: "Safety Equipment",
          text: "Always use gloves, helmets, and safety shoes to avoid injuries.",
          image:
            safetytoolsforblog,
        },
      ],
    },
  };

  const blog = blogContent[slug];

  if (!blog) return <p className="p-10">Blog not found</p>;

  return (
    <div>
      {/* 🔥 HERO */}
      <div className="h-[300px] md:h-[400px] relative">
        <img
          src={blog.hero}
          alt={blog.title}
          className="w-full max-h-[400px] object-contain rounded-lg bg-gray-100"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {blog.sections.map((sec, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-2xl font-bold mb-3">{sec.heading}</h2>

            <p className="text-gray-700 leading-7 mb-4">{sec.text}</p>

            <img
              src={sec.image}
              alt={sec.heading}
             className="w-full max-h-[400px] object-contain rounded-lg bg-gray-100"
            />
          </div>
        ))}

        {/* 🔥 TABLE (only for OPC vs PPC) */}
        {blog.table && (
          <div className="mt-10 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">Comparison Table</h2>

            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {blog.table[0].map((head, i) => (
                    <th key={i} className="border p-3 text-left">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {blog.table.slice(1).map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="border p-3">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;