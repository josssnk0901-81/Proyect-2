import { Background } from '@/components/layout/Background'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollManager } from '@/components/layout/ScrollManager'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { Portfolio } from '@/components/sections/Portfolio'
import { Process } from '@/components/sections/Process'
import { TechStack } from '@/components/sections/TechStack'
import { Testimonials } from '@/components/sections/Testimonials'
import { Booking } from '@/components/sections/Booking'
import { Contact } from '@/components/sections/Contact'

export default function App() {
  return (
    <>
      <Background />
      <Navbar />
      <ScrollManager />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <TechStack />
        <Testimonials />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
