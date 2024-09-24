'use client'
import React, { useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Linkedin, CheckIcon } from 'lucide-react'

export default function Component() {
  const contactFormRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const mailtoLink = `mailto:justin@needfpv.com?subject=Contact from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
    window.location.href = mailtoLink;
  };

  useEffect(() => {
    const currentRef = contactFormRef.current;
    const handleScroll = (e: Event) => {
      e.preventDefault()
      const target = e.target as HTMLAnchorElement
      const id = target.getAttribute('href')?.slice(1) || target.dataset.scrollTo
      if (id) {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    const links = document.querySelectorAll('nav a[href^="#"], .scroll-to-contact')
    links.forEach(link => {
      link.addEventListener('click', handleScroll)
    })

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-attention')
        } else {
          entry.target.classList.remove('animate-attention')
        }
      })
    }, options)

    if (contactFormRef.current) {
      observer.observe(contactFormRef.current)
    }

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleScroll)
      })
      if (contactFormRef.current) {
        observer.unobserve(contactFormRef.current)
      }
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <style jsx global>{`
        @keyframes circleAnimation {
          0% {
            box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(249, 115, 22, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(249, 115, 22, 0);
          }
        }
        .animate-attention {
          animation: circleAnimation 2s infinite;
        }
      `}</style>

      <header className="bg-black py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="NEED FPV Logo"
              width={150}
              height={50}
              className="object-contain"
            />
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#home" className="text-white hover:text-orange-500">Home</a></li>
              <li><a href="#about" className="text-white hover:text-orange-500">About</a></li>
              <li><a href="#services" className="text-white hover:text-orange-500">Services</a></li>
              <li><a href="#why-partner" className="text-white hover:text-orange-500">Why Partner</a></li>
              <li><a href="#contact" className="text-white hover:text-orange-500">Contact</a></li>
            </ul>
          </nav>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white scroll-to-contact" data-scroll-to="contact">
            Get Started
          </Button>
        </div>
      </header>

      <main>
        <section id="home" className="py-20 relative">
          <video 
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src="/clip.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-6xl font-bold text-orange-500 mb-4">
              Unlock New Horizons with FPV Expertise
            </h1>
            <p className="text-2xl mb-8">
              Transforming Hobbyist Passion into Real-World Solutions
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3 scroll-to-contact" data-scroll-to="contact">
              Get Started
            </Button>
          </div>
        </section>

        <section id="about" className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">About Need FPV</h2>
            <p className="text-lg mb-4">
              Welcome to <strong>Need FPV</strong>! I&apos;m <strong>Justin</strong>, a dedicated FPV (First Person View) drone enthusiast with years of hands-on experience. What began as a passion for flying drones has evolved into a mission to explore how FPV technology can be applied to solve complex challenges in various environments, from remote operations to highly constrained communication scenarios.
            </p>
            <p className="text-lg mb-4">
              In today&apos;s fast-paced world, where speed, agility, and real-time data are essential, FPV technology offers unmatched capabilities. Whether it&apos;s gathering critical insights in hard-to-reach areas or improving operational efficiency through immersive experiences, FPV drones can significantly enhance situational awareness and decision-making.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">How FPV Can Drive Innovation</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Real-Time Data Acquisition</h3>
                <p>FPV drones provide live visual feedback, offering near-instantaneous reconnaissance without the need for robust network infrastructures.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">On-Device Processing</h3>
                <p>With edge computing capabilities, FPV systems can process and interpret data on the fly, reducing latency and enabling quick reactions in dynamic situations.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Improved Spatial Awareness</h3>
                <p>FPV drones allow for in-depth terrain analysis, route optimization, and heightened awareness of surroundings, all critical for planning and rapid response.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Adaptable and Scalable</h3>
                <p>FPV solutions are flexible, capable of integrating with a wide range of platforms and devices, ensuring seamless compatibility across various systems.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Services Offered</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-black p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Consultation and Training</h3>
                <p>Expert guidance on integrating FPV technology into your operations, including personalized training.</p>
              </div>
              <div className="bg-black p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Custom FPV Solutions</h3>
                <p>Tailored FPV setups to meet your unique needs, ensuring smooth deployment in any environment.</p>
              </div>
              <div className="bg-black p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Demonstrations and Workshops</h3>
                <p>Experience the power of FPV drones firsthand with live demonstrations and workshops.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="why-partner" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Why Partner with Me</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckIcon className="h-6 w-6 text-orange-500 mr-2 mt-1" />
                <div>
                  <strong className="text-lg">Unmatched FPV Expertise:</strong>
                  <p>Years of experience building, flying, and optimizing FPV drones.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-6 w-6 text-orange-500 mr-2 mt-1" />
                <div>
                  <strong className="text-lg">Real-World Applications:</strong>
                  <p>Expertise in applying FPV technology to solve complex challenges.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-6 w-6 text-orange-500 mr-2 mt-1" />
                <div>
                  <strong className="text-lg">Collaborative Mindset:</strong>
                  <p>Working closely with your team to deliver tailored solutions.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-white">Testimonials</h2>
            <div className="space-y-8">
              <div>
              <blockquote className="italic text-xl mb-4 text-white">
                &quot;Justin is one of the most friendly and intelligent people I have ever worked with. He truly loves to share his knowledge and time generously. He is an excellent drone pilot and planner, and the passion he has for those things radiates from him.&quot;
              </blockquote>
                <p className="text-orange-500 font-semibold">— Preston Williams</p>
                <p className="text-gray-400">Nuclear Machinists Mate and instructor, Naval Nuclear Propulsion Training Command</p>
                </div>
              <div>
              <blockquote className="italic text-xl mb-4 text-white">
                &quot;Justin&apos;s work ethic, safety consciousness, and willingness to go the extra mile made him an excellent addition to our team. I would not hesitate to work with him again in the future.&quot;
              </blockquote>
                <p className="text-orange-500 font-semibold">— Katie Pickup</p>
                <p className="text-gray-400">Event Coordinator, The Drone Racing League</p>
              </div>
              <div>
              <blockquote className="italic text-xl mb-4 text-white">
                &quot;I would like to extend my deepest gratitude to Justin Burnett for his outstanding work and for being an invaluable asset to our team here at The Drone Racing League during our live audience events. In the high-performance event of live drone racing with the world&apos;s greatest pilots and the largest drone racing franchise, he demonstrated a remarkable work ethic and unwavering dedication to his duties as a drone runner.&quot;
              </blockquote>
                <p className="text-orange-500 font-semibold">— David Ye</p>
                <p className="text-gray-400">Director of Hardware Engineering, The Drone Racing League</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 bg-black">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div>
        <h2 className="text-4xl font-bold text-white mb-6">Get in Touch</h2>
        <p className="text-gray-300 mb-6">Ready to see how FPV can unlock new possibilities for your operations?</p>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-orange-500" />
            <span className="text-orange-500">justin@needfpv.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-orange-500" />
            <span className="text-white">502-724-0878</span>
          </div>
          <div className="flex items-center space-x-2">
            <Linkedin className="h-5 w-5 text-orange-500" />
            <Link href="https://www.linkedin.com/in/justin-a-burnett/" className="text-orange-500 hover:underline">LinkedIn Profile</Link>
          </div>
        </div>
      </div>
      <div ref={contactFormRef} className="p-4 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your Name" 
          className="bg-gray-800 border-gray-700 text-white rounded-md w-full"
          required
        />
          <Input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email" 
            className="bg-gray-800 border-gray-700 text-white rounded-md w-full"
            required
          />
          <Textarea 
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your Message" 
            className="bg-gray-800 border-gray-700 text-white rounded-md w-full h-32"
            required
          />
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-4 py-2">
          Send Message
        </Button>
      </form>
    </div>
    </div>
  </div>
</section>
      </main>

      <footer className="bg-black py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="NEED FPV Logo"
                width={100}
                height={33}
                className="object-contain"
              />
            </div>
            <p>&copy; {new Date().getFullYear()} Need FPV. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}