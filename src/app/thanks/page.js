"use client";

export default function ThankYou() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center py-12 md:py-24 lg:py-32 bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold text-gray-100 tracking-tighter sm:text-4xl md:text-5xl">
            Thank You! 🙏
          </h2>
          <p className="text-gray-400 md:text-xl">
            Your message has been sent successfully. I appreciate you reaching
            out, and I will get back to you as soon as possible.
          </p>
          <div className="mt-8">
            <a
              href="/"
              className="inline-block py-2 px-6 bg-emerald-500 text-white rounded-md shadow hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-colors duration-300"
            >
              Go Back Home
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
