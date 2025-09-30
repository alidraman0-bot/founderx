export default function TrustedBy() {
  const companies = [
    { name: "TechCorp", logo: "TC" },
    { name: "StartupHub", logo: "SH" },
    { name: "InnovateLab", logo: "IL" },
    { name: "VentureX", logo: "VX" },
    { name: "ScaleUp", logo: "SU" },
    { name: "GrowthCo", logo: "GC" }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container-max">
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-8">Trusted by 260+ companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {companies.map((company, index) => (
              <div key={index} className="w-24 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-sm">{company.logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
