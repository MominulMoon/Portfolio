import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_mct6aw4";
const TEMPLATE_ID = "template_046mmig";
const PUBLIC_KEY = "bKL4kJw7SbywtDtGt";

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
          {/* ── Contact Info (unchanged) ── */}
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>m.mmoon1527@gmail.com</p>
                <a href="mailto:m.mmoon1527@gmail.com">Send Email</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="contact-details">
                <h3>Phone</h3>
                <p>+880 18427-41365</p>
                <a href="tel:+8801842741365">Call Now</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-details">
                <h3>Location</h3>
                <p>Tikapara, Rajshahi, Bangladesh</p>
                <a
                  href="https://maps.app.goo.gl/zBYm7x4pf2hXhb229"
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Map
                </a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fab fa-whatsapp"></i>
              </div>
              <div className="contact-details">
                <h3>WhatsApp</h3>
                <p>+880 018427-41365</p>
                <a
                  href="https://wa.me/8801842741365"
                  target="_blank"
                  rel="noreferrer"
                >
                  Send Message
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form  */}
          <div className="contact-form">
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
