"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import Journey from "@/components/sections/journey";
import Products from "@/components/sections/products";
import ProductThinking from "@/components/sections/product-thinking";
import Capabilities from "@/components/sections/capabilities";
import LearningDashboard from "@/components/sections/learning-dashboard";
import Contact from "@/components/sections/contact";
import EditorialBackground from "@/components/sections/editorial-background";
import CustomCursor from "@/components/custom-cursor";

const SmoothScroll = dynamic(() => import("@/components/smooth-scroll"), {
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <EditorialBackground />
      <Navbar />
      <Hero />
      <div className="divider" />
      <Journey />
      <div className="divider" />
      <Products />
      <div className="divider" />
      <ProductThinking />
      <div className="divider" />
      <Capabilities />
      <div className="divider" />
      <LearningDashboard />
      <div className="divider" />
      <Contact />
    </SmoothScroll>
  );
}
