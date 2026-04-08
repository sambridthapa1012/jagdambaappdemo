import { useNavigate } from "react-router-dom";
import shivam from "../assets/shivam.png";
import hardwaretools from "../assets/hardware-tools.jpg";

const Blog = () => {
  const navigate = useNavigate();

  const blogs = [
    {
      id: 1,
      title: "OPC vs PPC Cement",
      desc: "Understand the difference between OPC and PPC cement and which is best for your construction.",
      image: shivam,
      slug: "opc-vs-ppc",
    },
    {
      id: 2,
      title: "Essential Hardware Tools",
      desc: "Top tools every builder and homeowner should have.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
      slug: "hardware-tools",
    },
  ];

  return (
    <div>
      {/* 🔥 HERO SECTION */}
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src={hardwaretools}
          alt="Tools"
          className="w-full max-h-[400px] object-contain rounded-lg bg-gray-100"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            Our Blog
          </h1>
        </div>
      </div>

      {/* 🔥 BLOG CARDS */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
            className="w-full max-h-[400px] object-contain rounded-lg bg-gray-100"
            />

            <div className="p-5">
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{blog.desc}</p>

              <button
                onClick={() => navigate(`/blog/${blog.slug}`)}
                className="text-orange-600 font-semibold hover:underline"
              >
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;