import { useState } from 'react'
import LoadingScreen from './components/loading_screen'
import Hero from './components/hero'
import About from './components/about'
import Contact from './components/contact'
import Footer from './components/footer'
import './App.css'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) return <LoadingScreen onComplete={() => setIsLoading(false)} />

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Hero />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
