"use client"; // Ensure this is at the top of the file

import { FaGithubAlt, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const socialLinks = [
  {
    href: process.env.NEXT_PUBLIC_GITHUB_URL,
    icon: FaGithubAlt,
    label: "GitHub",
    hoverColor: "text-white",
  },
  {
    href: process.env.NEXT_PUBLIC_WHATSAPP_URL,
    icon: FaWhatsapp,
    label: "WhatsApp",
    hoverColor: "text-emerald-500",
  },
  {
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    icon: FaLinkedinIn,
    label: "LinkedIn",
    hoverColor: "text-blue-600",
  },
];

const MotionSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const FormInput = ({ id, name, type, label, required }) => (
  <div>
    <label htmlFor={id} className="block text-gray-300">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      className="w-full p-3 mt-1 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
      required={required}
    />
  </div>
);

const FormTextarea = ({ id, name, label, rows, required }) => (
  <div>
    <label htmlFor={id} className="block text-gray-300">
      {label}
    </label>
    <textarea
      id={id}
      name={name}
      rows={rows}
      className="w-full p-3 mt-1 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
      required={required}
    />
  </div>
);

export const Contact = () => (
  <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
    <div className="container max-w-8xl m-auto px-4 md:px-6">
      <div className="space-y-8 text-center">
        <MotionSection>
          <h2 className="text-3xl font-bold text-gray-100 tracking-tighter sm:text-4xl md:text-5xl">
            Contact Me 📬
          </h2>
        </MotionSection>
        <MotionSection>
          <p className="text-gray-400 md:text-xl">
            Feel free to reach out to me through any of the following platforms
            or by filling out the form below.
          </p>
        </MotionSection>
        <MotionSection>
          <div className="flex justify-center space-x-6">
            {socialLinks.map(({ href, icon: Icon, label, hoverColor }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 hover:text-gray-100 transition-colors duration-300`}
                aria-label={label}
              >
                <Icon className={`h-8 w-8 hover:${hoverColor} transition-colors duration-300`} />
              </a>
            ))}
          </div>
        </MotionSection>
        <MotionSection>
          <form
            action={process.env.NEXT_PUBLIC_FORM_SUBMIT_URL}
            method="post"
            className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg"
          >
            <input
              type="hidden"
              name="_next"
              value={process.env.NEXT_PUBLIC_WEBSITE_URL + "thanks"}
            />
            <input
              type="hidden"
              name="_subject"
              value="Someone visited our profile!"
            />
            <input type="hidden" name="_captcha" value="false" />
            <h3 className="text-2xl font-bold text-gray-100 mb-4">
              Send me a message
            </h3>
            <div className="space-y-4">
              <FormInput id="name" name="name" type="text" label="Name" required />
              <FormInput id="email" name="email" type="email" label="Email" required />
              <FormTextarea id="message" name="message" label="Message" rows="4" required />
              <button
                type="submit"
                className="w-full py-2 bg-emerald-500 text-white rounded-md shadow hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-colors duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </MotionSection>
      </div>
    </div>
  </section>
);
