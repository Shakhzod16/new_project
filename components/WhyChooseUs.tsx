const features = [
  {
    icon: "🔍",
    title: "Powerful Search",
    description:
      "Advanced filtering by job title, category, and more. Find exactly what you're looking for in seconds.",
  },
  {
    icon: "⭐",
    title: "Curated Opportunities",
    description:
      "Carefully selected job postings from verified companies across industries and experience levels.",
  },
  {
    icon: "✨",
    title: "User-Friendly Interface",
    description:
      "Intuitive design makes job hunting simple and enjoyable. Browse, filter, and explore with ease.",
  },
  {
    icon: "⚡",
    title: "Real-Time Updates",
    description:
      "Instant notifications for new job postings. Never miss an opportunity that matches your profile.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-5xl font-extrabold text-gray-900">
            Why Choose JobPortal?
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-gray-500">
            We've designed the most intuitive job search platform to help you
            find opportunities that align with your career goals.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-8"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
