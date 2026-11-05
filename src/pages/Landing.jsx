import Bioinputs from '../components/landing/Bioinputs'
import FAQ from '../components/landing/FAQ'
import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import Impact from '../components/landing/Impact'
import Pricing from '../components/landing/Pricing'
import Problem from '../components/landing/Problem'
import SampleShowcase from '../components/landing/SampleShowcase'
import SiteFooter from '../components/landing/SiteFooter'

export default function Landing() {
  return (
    <main className="overflow-hidden bg-cream-100">
      <Hero />
      <Problem />
      <HowItWorks />
      <SampleShowcase />
      <Bioinputs />
      <Impact />
      <Pricing />
      <FAQ />
      <SiteFooter />
    </main>
  )
}
