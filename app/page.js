"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import FinanceTicker from "@/components/ui/financeticker";
import {
  featuresData,
  howItWorksData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

const LandingPage = () => {
  const [hideLogo, setHideLogo] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setHideLogo(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const words = [
    { text: "Smart Expense Tracking" },
    { text: "AI Powered Insights" },
    { text: "Smart Receipt Scanner", className: "text-yellow-400" },
    { text: "Smart Buget planning" },
  ];

  if (!isMounted) return null;

  return (
    <div className="min-h-screen text-gray-200 relative overflow-hidden font-sans">
      {/* Professional Finance Background */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-black via-gray-900 to-sky-400/90">
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/20 via-transparent to-transparent opacity-60"></div>
        <SparklesCore
          id="global-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={1}
          particleDensity={15}
          className="w-full h-full"
          particleColor="#B4E1EF"
        />
      </div>

      {/* Logo Animation */}
      {/* <AnimatePresence>
        {!hideLogo && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              y: "100vh",
              transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
            }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1, 0.9, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <Image
                src="/logo4.png"
                alt="Logo"
                width={400}
                height={400}
                className="w-96 h-96 object-contain"
                priority
              />
            </motion.div>
            <div className="absolute inset-0">
              <SparklesCore
                id="logo-sparkles"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Main Content */}
      <div className="relative z-0">
        <HeroSection />
        <FinanceTicker />

        {/* Features Section */}
        <section className="py-24 relative  border-sky-300/20 ">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <TypewriterEffect words={words} />
              <p className="text-xl text-white mt-4 max-w-2xl mx-auto">
                Powerful tools for effortless financial control
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuresData.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="p-6 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-sky-300 hover:border-sky-300/40 transition-all hover:shadow-lg hover:shadow-yellow-400/10">
                    <CardContent className="space-y-4 pt-4">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 bg-yellow-400/10 rounded-lg flex items-center justify-center mb-4 text-sky-300"
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300">{feature.description}</p>
                      <motion.div whileHover={{ x: 5 }} className="mt-4">
                        <Button variant="link" className="text-sky-300 p-0 hover:text-sky-200">
                          Learn more →
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 px-5 relative  border-sky-300/20 ">
          <div className="container  mx-auto backdrop-blur-sm px-4  border-2 border-sky-300/30 rounded-xl p-8 bg-gray-800/20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-extrabold mb-4 text-white">
                How It <span className="text-sky-400">Works</span>
              </h2>
              <p className="text-sky-200 max-w-2xl mx-auto">
                Three simple steps to financial clarity
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {howItWorksData.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, type: "spring" }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-gradient-to-br from-cyan-300 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-400/20"
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {step.icon}
                    </motion.div>
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-300">{step.description}</p>
                  <div className="mt-4 text-sky-300 font-mono text-sm">
                    Step 0{index + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 relative  border-sky-300/20 ">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-extrabold mb-4 text-white">
                Trusted by <span className="text-sky-300">Thousands</span>
              </h2>
              <p className="text-sky-200 max-w-2xl mx-auto">
                Join our community of financially empowered users
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonialsData.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-md border border-sky-300/20 hover:border-sky-300/40 transition-all"
                >
                  <CardContent>
                    <div className="flex items-center mb-4">
                      <div className="relative">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-gray-800"></div>
                      </div>
                      <div className="ml-4">
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                      </div>
                    </div>
                    <p className="text-gray-300 italic border-l-2 border-sky-300/50 pl-4">
                      "{testimonial.quote}"
                    </p>
                    <div className="mt-4 flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < testimonial.rating ? 'fill-current' : 'fill-none stroke-current'}`}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </CardContent>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative  border-sky-300/20 ">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready for <span className="text-sky-300">Financial Freedom</span>?
              </h2>
              <p className="text-sky-200 mb-8 max-w-2xl mx-auto text-lg">
                Take control of your expenses today
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-blue-500 to-sky-300 text-gray-900 hover:sky-300  rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-yellow-500/20">
                    Start Free Trial
                  </Button>
                </Link>
              </motion.div>
              <p className="mt-4 text-sky-200/70 text-sm">
                No credit card required • 14-day free trial
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;