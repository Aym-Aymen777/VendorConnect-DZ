import React from 'react'
import AutoImageSlider from '../ui/AutoImageSlider'
import Header from './Header'
import {Handshake ,HandCoins , Goal} from 'lucide-react'
import { useState ,useEffect,useRef} from 'react'

const UnauthUserScreen = () => {
  const steps = [
    {
      title: 'Create an Account',
      description: 'Start your journey by creating a personal or business account. Access the supplier dashboard and manage your profile with ease. Quick registration using email or social media.',
      button: 'Register Now',
      icon: '👤'
    },
    {
      title: 'Verify Phone Number',
      description: 'Secure your account by verifying your phone number. Receive a verification code via WhatsApp or SMS to confirm your contact details.',
      icon: '📱'
    },
    {
      title: 'Submit Documents',
      description: 'Upload required legal documents including business license and tax certificates. Our team will verify your credentials to ensure quality standards.',
      icon: '📄'
    },
    {
      title: 'Add First Product',
      description: 'Start showcasing your products with detailed descriptions, high-quality images, and competitive pricing. Begin your selling journey on our platform.',
      icon: '🏷️'
    }
  ];

   const services = [
    {
      id: 1,
      title: "Product Photography",
      description: "We photograph your products professionally.",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      className: "md:col-span-1"
    },
    {
      id: 2,
      title: "Professional Marketing",
      description: "We design attractive posts for your campaigns.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80",
      className: "md:col-span-1"
    },
    {
      id: 3,
      title: "Display on Our Platform",
      description: "Dedicated page on our platform.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
      className: "md:col-span-1"
    },
    {
      id: 4,
      title: "Official Partnership",
      description: "We connect you to our brand.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2369&q=80",
      className: "md:col-span-1"
    },
    {
    id: 5,
    title: "Unified Digital Identity",
    description: "Identity gathering suppliers under one platform.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    className: "md:col-span-2" // Changed to span 2 columns
  },
  {
    id: 6,
    title: "Showroom Setup",
    description: "We provide you with a physical display space.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2369&q=80",
    className: "md:col-span-3 md:col-start-2 lg:col-span-3 lg:col-start-1" // Center in its row
  }
  ];



  const [visibleSteps, setVisibleSteps] = useState(new Set());
  const [currentStep, setCurrentStep] = useState(-1);
  const timelineRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineRect = timelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Check if timeline is in viewport
      if (timelineRect.top > viewportHeight || timelineRect.bottom < 0) {
        return;
      }

      let newVisibleSteps = new Set();
      let newCurrentStep = -1;

      stepRefs.current.forEach((stepRef, index) => {
        if (!stepRef) return;

        const stepRect = stepRef.getBoundingClientRect();
        
        // Step becomes visible when it crosses 75% of viewport
        if (stepRect.top < viewportHeight * 0.75) {
          newVisibleSteps.add(index);
        }

        // Current step is the one closest to center
        const stepCenter = stepRect.top + stepRect.height / 2;
        if (stepCenter < viewportHeight * 0.6 && stepCenter > viewportHeight * 0.2) {
          newCurrentStep = index;
        }
      });

      // Update visible steps with staggered animation
      newVisibleSteps.forEach((stepIndex) => {
        if (!visibleSteps.has(stepIndex)) {
          setTimeout(() => {
            setVisibleSteps(prev => new Set([...prev, stepIndex]));
          }, stepIndex * 150); // 150ms delay between each step
        }
      });

      setCurrentStep(newCurrentStep);
    };

    // Throttle scroll events for better performance
    let scrollTimeout;
    const throttledScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        handleScroll();
        scrollTimeout = null;
      }, 16); // ~60fps
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [visibleSteps]);

  // Helper functions
  const isStepVisible = (index) => visibleSteps.has(index);
  const isStepCurrent = (index) => currentStep === index;
  const getProgressPercentage = () => {
    if (currentStep === -1) return 0;
    return ((currentStep + 1) / steps.length) * 100;
  };

  
  return (
    <div>
      <Header/>
      <AutoImageSlider />
      <section id='about' className='py-16 bg-transparent'>
  <div className='container mx-auto px-4'>
    <div className='text-center mb-12'>
      <h2 className='text-3xl font-bold text-[#1f3b73] mb-4'>Who we are?</h2>
      <p className='text-[#1f3b73c7] max-w-2xl mx-auto'>
        logo is a modern Algerian platform that brings together everything related to the world of construction, decoration, renovation and home equipment under one roof.
        We believe that beauty begins at home, and that every house deserves an elegant, smart and accessible touch.
      </p>
    </div>

    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {/* Feature 1 */}
      <div className='bg-gradient-to-br from-[#0d0d0d] via-[#1a1a2e] to-[#111111] p-6 rounded-xl shadow-[0_4px_20px_rgba(203,161,53,0.4)] transition-shadow hover:shadow-[0_6px_30px_rgba(203,161,53,0.6)]'>
        <div className='text-[#CBA135] mb-4'>
          <Goal />
        </div>
        <h3 className='text-xl font-semibold text-slate-200 mb-2'>Our Vision</h3>
        <p className='text-slate-200'>
          Connect suppliers, workshops, stores and brands from different regions (Algeria, Libya, Tunisia, Turkey...) directly to consumers — through a modern, simple and effective digital platform.
        </p>
      </div>

      {/* Feature 2 */}
      <div className='bg-gradient-to-br from-[#0d0d0d] via-[#1a1a2e] to-[#111111] p-6 rounded-xl shadow-[0_4px_20px_rgba(203,161,53,0.4)] transition-shadow hover:shadow-[0_6px_30px_rgba(203,161,53,0.6)]'>
        <div className='text-[#CBA135] mb-4'>
          <HandCoins />
        </div>
        <h3 className='text-xl font-semibold text-slate-200 mb-2'>What We Offer</h3>
        <p className='text-slate-200'>
          - Display of various decoration products, furniture, appliances, construction tools... <br />
          - Real marketing and promotion opportunities for merchants and suppliers <br />
          - Inspiring content, exclusive offers and weekly draws for our subscribers <br />
          We are more than just a platform... We are an idea, a project and a message.
        </p>
      </div>

      {/* Feature 3 */}
      <div className='bg-gradient-to-br from-[#0d0d0d] via-[#1a1a2e] to-[#111111] p-6 rounded-xl shadow-[0_4px_20px_rgba(203,161,53,0.4)] transition-shadow hover:shadow-[0_6px_30px_rgba(203,161,53,0.6)]'>
        <div className='text-[#CBA135] mb-4'>
          <Handshake />
        </div>
        <h3 className='text-xl font-semibold text-slate-200 mb-2 capitalize'>Who Can Join</h3>
        <p className='text-slate-200'>
          🏬 Decoration and Furniture Stores <br />
          🏭 Home Equipment Factories and Workshops <br />
          📦 Home Appliance Importers <br />
          🏗️ Construction Materials Distributors <br />
          🎨 Decoration Designers and Artists
        </p>
      </div>
    </div>
  </div>
</section>
{/*Join Us Section */}
 <section id="joinUs" className="py-20 text-slate-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-[#1f3b73]">
          Join Us As A Supplier
        </h2>

        {/* Progress Bar */}
        <div className="w-full max-w-sm mx-auto mb-12">
          <div className="bg-gray-700/50 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#e1a95f] to-[#f6b868] h-full transition-all duration-1000 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          <p className="text-center text-sm text-[#1f3b73c7] mt-2">
            Step {Math.max(0, currentStep + 1)} of {steps.length}
          </p>
        </div>

        {/* Mobile Timeline */}
        <div className="block md:hidden">
          {steps.map((step, index) => (
            <div 
              key={index} 
              ref={el => stepRefs.current[index] = el}
              className={`step-container relative mb-12 pl-8 transition-all duration-700 ease-out ${
                isStepVisible(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Mobile timeline line */}
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-500/30 via-yellow-500/50 to-yellow-500/30" />
              
              {/* Mobile timeline dot */}
              <div
                className={`absolute left-0 top-2 w-4 h-4 rounded-full transition-all duration-500 ${
                  isStepCurrent(index) 
                    ? 'bg-[#e1a95f] scale-125 animate-pulse' 
                    : isStepVisible(index) 
                    ? 'bg-[#e1a95f]' 
                    : 'bg-gray-600'
                }`}
              />

              {/* Mobile content */}
              <div className={`bg-gradient-to-br from-[#1a1a2e] via-[#1a1a2e] to-[#111111] p-6 rounded-xl transition-all duration-300 ${
                isStepCurrent(index)
                  ? 'shadow-[0_8px_40px_rgba(203,161,53,0.6)] scale-105 border border-yellow-500/30'
                  : isStepVisible(index)
                  ? 'shadow-[0_4px_20px_rgba(203,161,53,0.2)] hover:shadow-[0_6px_30px_rgba(203,161,53,0.4)]'
                  : 'shadow-none'
              }`}>
                <span className="text-4xl mb-4 block">{step.icon}</span>
                <h3 className="text-2xl font-semibold mb-3 text-slate-200">
                  {step.title}
                </h3>
                <p className="text-slate-400 mb-4">{step.description}</p>
                {step.button && (
                  <button className={`bg-[#e1a95f] text-black px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                    isStepVisible(index) ? 'hover:bg-[#f6b868] hover:scale-105' : 'opacity-50'
                  }`}>
                    {step.button}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Timeline */}
        <div 
          ref={timelineRef}
          className="timeline hidden md:block relative"
        >
          {/* Animated center timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-600/30">
            <div 
              className="bg-gradient-to-b from-[#e1a95f] to-[#f6b868] w-full transition-all duration-1000 ease-out"
              style={{ height: `${getProgressPercentage()}%` }}
            />
          </div>
          
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            
            return (
              <div 
                key={index} 
                ref={el => stepRefs.current[index] = el}
                className="step-container relative mb-20 flex items-center"
              >
                {/* Timeline dot with enhanced animations */}
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-[#1a1a2e] z-10 transition-all duration-500 ${
                    isStepCurrent(index) 
                      ? 'bg-[#e1a95f] scale-125 animate-pulse shadow-lg shadow-yellow-500/50' 
                      : isStepVisible(index) 
                      ? 'bg-[#e1a95f] scale-110' 
                      : 'bg-gray-600 scale-100'
                  }`}
                />

                {/* Content with enhanced animations */}
                <div className={`w-full flex ${isLeft ? 'justify-end pr-8' : 'justify-start pl-8'}`}>
                  <div 
                    className={`w-full max-w-md transition-all duration-700 ease-out ${
                      isStepVisible(index) 
                        ? 'opacity-100 translate-y-0 translate-x-0' 
                        : `opacity-0 translate-y-8 ${isLeft ? 'translate-x-8' : '-translate-x-8'}`
                    } ${isLeft ? 'text-right' : 'text-left'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`bg-gradient-to-br from-[#1a1a2e] via-[#1a1a2e] to-[#111111] p-6 rounded-xl transition-all duration-300 ${
                      isStepCurrent(index)
                        ? 'shadow-[0_8px_40px_rgba(203,161,53,0.6)] scale-105 border border-yellow-500/30'
                        : isStepVisible(index)
                        ? 'shadow-[0_4px_20px_rgba(203,161,53,0.2)] hover:shadow-[0_6px_30px_rgba(203,161,53,0.4)] hover:scale-102'
                        : 'shadow-none'
                    }`}>
                      <span className="text-4xl mb-4 block">{step.icon}</span>
                      <h3 className="text-2xl font-semibold mb-3 text-slate-200">
                        {step.title}
                      </h3>
                      <p className="text-slate-400 mb-4">{step.description}</p>
                      {step.button && (
                        <button className={`bg-[#e1a95f] text-black px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                          isStepVisible(index) ? 'hover:bg-[#f6b868] hover:scale-105' : 'opacity-50'
                        }`}>
                          {step.button}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Connecting line animation */}
                <div 
                  className={`absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-yellow-500/50 transition-all duration-500 ${
                    isStepVisible(index) ? 'w-8 opacity-100' : 'w-0 opacity-0'
                  } ${
                    isLeft 
                      ? 'left-1/2 ml-3' 
                      : 'right-1/2 mr-3'
                  }`} 
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/*Services section */}
    <section className="py-20 text-slate-200" id='services'>
  <div className="container mx-auto px-4">
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-[#1f3b73] mb-4">
        What Do We Offer?
      </h2>
      <p className="text-[#1f3b73c7] max-w-2xl mx-auto">
        Discover our comprehensive suite of services designed to help you succeed
      </p>
    </div>

    {/* Services Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <div
          key={service.id}
          className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a2e] via-[#1a1a2e] to-[#111111] 
            shadow-[0_4px_20px_rgba(203,161,53,0.2)] 
            hover:shadow-[0_6px_30px_rgba(203,161,53,0.4)] 
            transition-all duration-500 group ${service.className}`}
        >
          {/* Background Image */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/90 to-transparent 
              opacity-80 group-hover:opacity-90 transition-all duration-500"></div>
          </div>

          {/* Content */}
          <div className="relative p-6">
            <h3 className="text-xl font-bold mb-3 text-[#CBA135] group-hover:text-yellow-400 
              transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
              {service.description}
            </p>
          </div>

          {/* Border Effect */}
          <div className="absolute inset-0 border border-[#CBA135]/20 group-hover:border-[#CBA135]/40 
            rounded-xl transition-colors duration-500"></div>
        </div>
      ))}
    </div>

    {/* Call to Action */}
    <div className="text-center mt-16">
      <button className="bg-[#e1a95f] hover:bg-[#f6b868] text-black font-bold 
        py-3 px-8 rounded-full transition-all duration-300 
        transform hover:scale-105 
        shadow-[0_4px_20px_rgba(203,161,53,0.4)] 
        hover:shadow-[0_6px_30px_rgba(203,161,53,0.6)]">
        Get Started Today
      </button>
    </div>
  </div>
</section>

{/*Contact Section*/}
{/* Contact Section */}
<section className="py-20 text-slate-200" id="contact">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-[#1f3b73] mb-4">
        Get In Touch
      </h2>
      <p className="text-[#1f3b73c7] max-w-2xl mx-auto">
        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      {/* Contact Form */}
      <div className="bg-gradient-to-br from-[#1a1a2e] via-[#1a1a2e] to-[#111111] p-8 rounded-xl 
        shadow-[0_4px_20px_rgba(203,161,53,0.2)] hover:shadow-[0_6px_30px_rgba(203,161,53,0.4)] 
        transition-all duration-500">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 rounded-lg bg-[#0d0d0d] border border-[#CBA135]/20 
                focus:border-[#e1a95f] focus:ring-2 focus:ring-[#CBA135]/20 
                text-slate-200 placeholder-slate-400"
              placeholder="Your Full Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-lg bg-[#0d0d0d] border border-[#CBA135]/20 
                focus:border-[#e1a95f] focus:ring-2 focus:ring-[#CBA135]/20 
                text-slate-200 placeholder-slate-400"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-200 mb-2">Message</label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-[#0d0d0d] border border-[#CBA135]/20 
                focus:border-[#e1a95f] focus:ring-2 focus:ring-[#CBA135]/20 
                text-slate-200 placeholder-slate-400"
              placeholder="Your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#e1a95f] hover:bg-[#f6b868] text-black font-bold 
              py-3 px-8 rounded-full transition-all duration-300 
              transform hover:scale-105 
              shadow-[0_4px_20px_rgba(203,161,53,0.4)] 
              hover:shadow-[0_6px_30px_rgba(203,161,53,0.6)]"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Information */}
      <div className="space-y-8">
        <div className="bg-gradient-to-br from-[#1a1a2e] via-[#1a1a2e] to-[#111111] p-8 rounded-xl 
          shadow-[0_4px_20px_rgba(203,161,53,0.2)] hover:shadow-[0_6px_30px_rgba(203,161,53,0.4)] 
          transition-all duration-500">
          <h3 className="text-xl font-bold text-[#e1a95f] mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-slate-300">
              <svg className="w-5 h-5 text-[#e1a95f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>Alger, Algeria</span>
            </div>
            <div className="flex items-center space-x-4 text-slate-300">
              <svg className="w-5 h-5 text-[#e1a95f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>contact@logo.com</span>
            </div>
            <div className="flex items-center space-x-4 text-slate-300">
              <svg className="w-5 h-5 text-[#e1a95f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span>+213 123 456 789</span>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-gradient-to-br from-[#1a1a2e] via-[#1a1a2e] to-[#111111] p-8 rounded-xl 
          shadow-[0_4px_20px_rgba(203,161,53,0.2)] hover:shadow-[0_6px_30px_rgba(203,161,53,0.4)] 
          transition-all duration-500">
          <h3 className="text-xl font-bold text-[#e1a95f] mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {/* Facebook */}
            <a href="#" className="p-2 rounded-full border border-[#CBA135]/20 hover:border-[#CBA135] 
              hover:bg-[#CBA135]/10 transition-all duration-300">
              <svg className="w-6 h-6 text-[#e1a95f]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/*instagram */}
            <a href="#" className="p-2 rounded-full border border-[#CBA135]/20 hover:border-[#CBA135] 
              hover:bg-[#CBA135]/10 transition-all duration-300">
              <svg className="w-6 h-6 text-[#e1a95f]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* TikTok */}
  <a href="#" className="p-2 rounded-full border border-[#CBA135]/20 hover:border-[#e1a95f] 
    hover:bg-[#CBA135]/10 transition-all duration-300">
    <svg className="w-6 h-6 text-[#e1a95f]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  </a>

  {/* YouTube */}
  <a href="#" className="p-2 rounded-full border border-[#CBA135]/20 hover:border-[#e1a95f] 
    hover:bg-[#CBA135]/10 transition-all duration-300">
    <svg className="w-6 h-6 text-[#e1a95f]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default UnauthUserScreen
