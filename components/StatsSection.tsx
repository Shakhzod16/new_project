const stats = [
  { number: "500+", label: "Active Job Listings" },
  { number: "200+", label: "Top Companies" },
  { number: "50K+", label: "Successful Placements" },
  { number: "98%", label: "User Satisfaction" },
];

export default function StatsSection() {
  return (
    <section
      style={{ backgroundColor: "#1e3a6e" }}
      className="px-4 py-16"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="mb-3 text-3xl font-bold text-white">
          Trusted by Job Seekers Worldwide
        </h2>
        <p className="mx-auto mb-12 max-w-md text-sm text-blue-200">
          Our platform has helped thousands of professionals find their ideal
          career opportunities.
        </p>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="mb-1 text-4xl font-extrabold text-white">
                {stat.number}
              </div>
              <div className="text-sm text-blue-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
