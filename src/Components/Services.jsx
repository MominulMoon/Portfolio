import { useEffect } from "react";

/**
 * Services
 * Defines and renders the various professional services offered using a 
 * declarative data array (`services`). Binds grid items to `scrollReveal` 
 * for a staggered entrance effect upon scroll visibility.
 */

const servicesData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
    title: "Web Development",
    description:
      "I create responsive, modern websites using the latest technologies and best practices. From concept to deployment, I ensure your website looks great and performs perfectly.",
    features: ["Responsive Design", "Performance Optimized", "SEO Friendly"],
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop",
    title: "Mobile Development",
    description:
      "Building cross-platform mobile applications that work seamlessly on both iOS and Android devices using React Native framework and tools.",
    features: ["Cross-Platform", "Native Performance", "User-Friendly"],
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop",
    title: "UI/UX Design",
    description:
      "Designing intuitive and beautiful user interfaces that provide exceptional user experiences. I focus on usability, accessibility, and visual appeal.",
    features: ["User-Centered", "Modern Design", "Accessibility"],
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=200&fit=crop",
    title: "Game Development",
    description:
      "Creating engaging 2D and 3D games using the Godot engine. From gameplay mechanics to polished visuals, I build immersive experiences for desktop and mobile platforms.",
    features: ["Godot Engine", "2D & 3D Games", "Cross-Platform"],
  },
];

function Services({ scrollReveal }) {
  useEffect(() => {
    if (scrollReveal) {
      const cleanup = scrollReveal(".service-card");
      return () => cleanup && cleanup();
    }
  }, [scrollReveal]);
  return (
    <section id="service" className="section services">
      <div className="container">
        <h2 className="section-title">What I Do</h2>
        <p className="section-subtitle">
          Practical services focused on clean code, maintainable delivery, and strong UX.
        </p>
        <div className="services-content">
          <div className="services-grid">
            {servicesData.map((service) => (
              <div key={service.id} className="service-card">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-img"
                />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-features">
                  {service.features.map((feature, index) => (
                    <span key={index}>{feature}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
