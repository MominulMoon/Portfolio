import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const SERVICE_ID = "service_mct6aw4";
const TEMPLATE_ID = "template_046mmig";
const PUBLIC_KEY = "bKL4kJw7SbywtDtGt";

const contactsData = [
  {
    icon: "fas fa-envelope",
    title: "Email",
    value: "m.mmoon1527@gmail.com",
    link: "mailto:m.mmoon1527@gmail.com",
    action: "Send Email",
  },
  {
    icon: "fas fa-phone",
    title: "Phone",
    value: "+880 18427-41365",
    link: "tel:+8801842741365",
    action: "Call Now",
  },
  {
    icon: "fas fa-map-marker-alt",
    title: "Location",
    value: "Tikapara, Rajshahi, Bangladesh",
    link: "https://maps.app.goo.gl/zBYm7x4pf2hXhb229",
    action: "View on Map",
  },
  {
    icon: "fab fa-whatsapp",
    title: "WhatsApp",
    value: "+880 018427-41365",
    link: "https://wa.me/8801842741365",
    action: "Send Message",
  },
];

/**
 * Contact
 * Represents the final section of the page, acting as an interactive form and list of contact methods.
 * Registers form groups and contact items to animate dynamically via `scrollReveal`.
 */
function Contact({ scrollReveal }) {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "success" | "error"

  useEffect(() => {
    if (scrollReveal) {
      const cleanups = [
        scrollReveal(".contact-item"),
        scrollReveal(".form-group")
      ];
      return () => cleanups.forEach((c) => c && c());
    }
  }, [scrollReveal]);

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatus("success");
        formRef.current.reset();
        setTimeout(() => setStatus("idle"), 4000);
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      });
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            {contactsData.map((item) => (
              <motion.div
                key={item.title}
                className="contact-item dynamic-contact-item"
                whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                onMouseMove={handleCardMouseMove}
              >
                <div className="contact-icon">
                  <i className={item.icon}></i>
                </div>
                <div className="contact-details">
                  <h3>{item.title}</h3>
                  <p>{item.value}</p>
                  <a
                    href={item.link}
                    target={item.link.startsWith("http") ? "_blank" : undefined}
                    rel={item.link.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {item.action}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="contact-form contact-form-3d"
            whileHover={{ rotateX: 2, rotateY: -2 }}
            transition={{ duration: 0.35 }}
            onMouseMove={handleCardMouseMove}
          >
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name="from_name" id="name" required />
                <label htmlFor="name">Your Name</label>
              </div>
              <div className="form-group">
                <input type="email" name="from_email" id="email" required />
                <label htmlFor="email">Your Email</label>
              </div>
              <div className="form-group">
                <input type="text" name="subject" id="subject" required />
                <label htmlFor="subject">Your Subject</label>
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  required
                ></textarea>
                <label htmlFor="message">Your Message</label>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={status === "sending"}
              >
                <span>
                  {status === "idle" && "Send Message"}
                  {status === "sending" && "Sending…"}
                  {status === "success" && "Message Sent!"}
                  {status === "error" && "Failed — Try Again"}
                </span>
                <i
                  className={`fas ${
                    status === "success"
                      ? "fa-check"
                      : status === "error"
                        ? "fa-times"
                        : "fa-paper-plane"
                  }`}
                ></i>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
