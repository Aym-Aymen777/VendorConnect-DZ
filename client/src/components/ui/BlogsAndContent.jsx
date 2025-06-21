import React from "react";

const blogs = [
  {
    title: "How to Choose the Perfect Sofa for Your Living Room",
    image: "/blogs/sofa-guide.jpg",
    excerpt: "Discover tips and tricks for selecting a sofa that fits your style, space, and comfort needs.",
    link: "/blog/choose-perfect-sofa"
  },
  {
    title: "Top 10 Kitchen Trends in 2025",
    image: "/blogs/kitchen-trends.jpg",
    excerpt: "Explore the latest kitchen design trends, from smart appliances to sustainable materials.",
    link: "/blog/kitchen-trends-2025"
  },
  {
    title: "Garden Makeover: Before & After",
    image: "/blogs/garden-makeover.jpg",
    excerpt: "See how a simple garden can be transformed into a beautiful outdoor retreat.",
    link: "/blog/garden-makeover"
  },
  {
    title: "Lighting Ideas for Every Room",
    image: "/blogs/lighting-ideas.jpg",
    excerpt: "Brighten up your home with these creative lighting solutions for every space.",
    link: "/blog/lighting-ideas"
  },
  {
    title: "Bathroom Renovation on a Budget",
    image: "/blogs/bathroom-renovation.jpg",
    excerpt: "Upgrade your bathroom without breaking the bank with these cost-saving tips.",
    link: "/blog/bathroom-renovation-budget"
  },
  {
    title: "Smart Home Essentials",
    image: "/blogs/smart-home.jpg",
    excerpt: "Make your home smarter and more efficient with these must-have devices.",
    link: "/blog/smart-home-essentials"
  },
  {
    title: "DIY Outdoor Decor Ideas",
    image: "/blogs/outdoor-decor.jpg",
    excerpt: "Create a cozy and inviting outdoor space with these DIY projects.",
    link: "/blog/diy-outdoor-decor"
  }
];

const BlogsAndContent = () => (
  <section className="py-12 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1f3b73] mb-3">
          Blogs & Content
        </h2>
        <p className="text-[#1f3b73c7] max-w-2xl mx-auto">
          Explore our latest articles, tips, and inspiration for your home and projects.
        </p>
      </div>

      {/* Desktop 12-column grid */}
      <div className="hidden lg:grid grid-cols-12 gap-8 mb-12">
        {/* Hero Blog (first blog) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col bg-[#f4f2ed] rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <img
            src={blogs[0].image}
            alt={blogs[0].title}
            className="w-full h-72 object-cover"
            loading="lazy"
          />
          <div className="p-8 flex flex-col flex-1">
            <h3 className="font-bold text-2xl text-[#1f3b73] mb-3">{blogs[0].title}</h3>
            <p className="text-base text-gray-700 mb-6 flex-1">{blogs[0].excerpt}</p>
            <a
              href={blogs[0].link}
              className="inline-block mt-auto text-[#e1a95f] font-semibold hover:underline text-base"
            >
              Read More &rarr;
            </a>
          </div>
        </div>
        {/* Side Blogs (next two blogs) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          {[blogs[1], blogs[2]].map((blog) => (
            <div
              key={blog.title}
              className="bg-[#f4f2ed] rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-36 object-cover"
                loading="lazy"
              />
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-lg text-[#1f3b73] mb-2">{blog.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">{blog.excerpt}</p>
                <a
                  href={blog.link}
                  className="inline-block mt-auto text-[#e1a95f] font-semibold hover:underline text-sm"
                >
                  Read More &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {blogs.slice(3).map((blog) => (
          <div
            key={blog.title}
            className="bg-[#f4f2ed] rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-semibold text-lg text-[#1f3b73] mb-2">{blog.title}</h3>
              <p className="text-sm text-gray-600 mb-4 flex-1">{blog.excerpt}</p>
              <a
                href={blog.link}
                className="inline-block mt-auto text-[#e1a95f] font-semibold hover:underline text-sm"
              >
                Read More &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BlogsAndContent;