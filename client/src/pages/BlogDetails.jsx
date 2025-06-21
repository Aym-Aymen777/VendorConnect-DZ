import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Calendar, Eye } from "lucide-react";
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
    content: `
      <p>Choosing the right sofa is essential for both comfort and style in your living room. Here are some tips to help you make the best choice:</p>
      <ul>
        <li>Measure your space before shopping.</li>
        <li>Consider the sofa's material and color.</li>
        <li>Think about functionality and seating needs.</li>
        <li>Test for comfort and durability.</li>
      </ul>
      <p>With these tips, you'll find a sofa that fits your home perfectly!</p>
    `
  },
  {
    id: "2",
    title: "Top 10 Kitchen Trends in 2025",
    image: "/blogs/kitchen-trends.jpg",
    author: "John Smith",
    date: "2024-06-10",
    views: 85,
    content: `
      <p>Kitchen design is evolving fast. Here are the top trends for 2025:</p>
      <ol>
        <li>Smart appliances</li>
        <li>Sustainable materials</li>
        <li>Minimalist cabinetry</li>
        <li>Bold backsplashes</li>
        <li>Multi-functional islands</li>
      </ol>
      <p>Upgrade your kitchen with these fresh ideas!</p>
    `
  }
];

export default function BlogDetails() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#f4f2ed]">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center text-[#1f3b73]">
          <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
          <Link to="/blogs" className="inline-flex items-center gap-2 text-[#e1a95f] font-semibold hover:underline">
            <ArrowLeft size={18} /> Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f2ed]">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-[#e1a95f] font-semibold hover:underline mb-6"
        >
          <ArrowLeft size={18} /> Back to Blogs
        </Link>
        <div className="bg-white rounded-2xl shadow-lg border border-[#1f3b73]/10 p-6 md:p-10 mb-8">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-xl mb-6 border border-[#e1a95f]/30 bg-[#f4f2ed]"
          />
          <h1 className="text-3xl font-bold text-[#1f3b73] mb-4">{blog.title}</h1>
          <div className="flex flex-wrap gap-4 items-center text-sm text-[#1f3b73] mb-6">
            <span className="flex items-center gap-1">
              <User size={16} /> {blog.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} /> {blog.date}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={16} /> {blog.views} views
            </span>
          </div>
          <div
            className="prose max-w-none text-[#1f3b73]"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-[#e1a95f] font-semibold hover:underline"
        >
          <ArrowLeft size={18} /> Back to Blogs
        </Link>
      </div>
    </div>
  );
}