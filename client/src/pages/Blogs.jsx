import { Link } from "react-router-dom";
import { User, Calendar, Eye } from "lucide-react";
import Header from "../components/common/Header";

// Mock blog data (replace with real fetch logic)
const blogs = [
  {
    id: "1",
    title: "How to Choose the Perfect Sofa for Your Living Room",
    image: "/blogs/sofa-guide.jpg",
    author: "Jane Doe",
    date: "2024-06-01",
    views: 120,
    excerpt: "Discover tips and tricks for selecting a sofa that fits your style, space, and comfort needs."
  },
  {
    id: "2",
    title: "Top 10 Kitchen Trends in 2025",
    image: "/blogs/kitchen-trends.jpg",
    author: "John Smith",
    date: "2024-06-10",
    views: 85,
    excerpt: "Explore the latest kitchen design trends, from smart appliances to sustainable materials."
  }
];

export default function Blogs() {
  return (
    <div className="min-h-screen bg-[#f4f2ed]">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-[#1f3b73] mb-8">Blogs & Content</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <Link
              to={`/blogs/${blog.id}`}
              key={blog.id}
              className="bg-white rounded-2xl shadow-lg border border-[#1f3b73]/10 hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-[#1f3b73] mb-2">{blog.title}</h2>
                <div className="flex flex-wrap gap-4 items-center text-xs text-[#1f3b73] mb-3">
                  <span className="flex items-center gap-1">
                    <User size={14} /> {blog.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={14} /> {blog.views} views
                  </span>
                </div>
                <p className="text-gray-700 mb-4 flex-1">{blog.excerpt}</p>
                <span className="inline-block mt-auto text-[#e1a95f] font-semibold hover:underline text-sm">
                  Read More &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}