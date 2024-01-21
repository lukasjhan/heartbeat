import Hero from "@/components/pages/hero"
import FeatureCards from "@/components/pages/feature-cards"
import Features from "@/components/pages/features"
import Contact from "./contact/page"

export default function Home() {
  return (
    <main>
      <Hero />
      <FeatureCards />
      <Features />
      <Contact />
    </main>
  )
}
