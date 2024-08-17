"use client";

export default function ThankYou() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center py-12 md:py-24 lg:py-32 bg-gray-900">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="text-center space-y-6 md:space-y-8">
          <h2 className="text-2xl font-bold text-gray-100 tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Why So Serious? 🃏
          </h2>
          <p className="text-gray-400 text-base md:text-lg lg:text-xl">
            Your message has been sent. You know, it’s all a game of chance. Sometimes, things just don’t go as planned. But don’t worry—I’ll reach out... eventually. Or maybe I’ll just let the chaos decide.
          </p>
          <div className="mt-6 md:mt-8">
            <a
              href="/"
              className="inline-block py-2 px-4 md:py-2.5 md:px-6 bg-emerald-500 text-white rounded-md shadow hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-colors duration-300"
            >
              Back to Reality
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
