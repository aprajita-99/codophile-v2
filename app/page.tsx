import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030014] text-white selection:bg-indigo-500/30">
      <Header />
      <Hero />

      {/* Placeholder for future sections mentioned in Header */}
      <div id="features" />
      <div id="playground" />
      <div id="templates" />
    </main>
  );
}
