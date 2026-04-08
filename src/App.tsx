import { useEffect, useRef, useState } from 'react';
import { 
  Instagram, 
  MessageCircle, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Flame, 
  Utensils, 
  Award,
  Menu as MenuIcon,
  X,
  Zap,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_LINK = `https://wa.me/5562984451212?text=${encodeURIComponent("Olá! Acessei o site da Pizza Z e gostaria de fazer um pedido, por favor.")}`;
const INSTAGRAM_LINK = "https://www.instagram.com/pizzaz.maysa/";
const MENU_LINK = "https://vucafood.com.br/pizzaztrindade/3317/delivery";

const LOGO_URL = "https://lh3.googleusercontent.com/d/1M2nngh0_Gi2POyKJVC9i-MLq274iIh2E";

const PizzaDivider = () => {
  return (
    <div className="w-full py-6 bg-gray-50 border-y border-gray-100 overflow-hidden flex select-none relative">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10 pointer-events-none" />
      <motion.div 
        className="flex items-center gap-8 md:gap-16 whitespace-nowrap"
        animate={{ x: [0, -1500] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(30)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 md:gap-16">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-primary shadow-lg" />
              <span className="text-[11px] font-mono uppercase tracking-[0.5em] text-gray-400 font-bold">Pizza Z</span>
            </div>
            <div className="flex items-center gap-2 opacity-30">
              <Utensils size={16} className="text-gray-900" />
              <div className="w-8 h-[1px] bg-gray-200" />
            </div>
            <div className="flex items-center gap-4">
              <img src={LOGO_URL} alt="Pizza Z" className="h-4 w-auto grayscale opacity-50" referrerPolicy="no-referrer" />
              <span className="text-[11px] font-mono uppercase tracking-[0.5em] text-gray-400 font-bold">Franchise</span>
            </div>
            <div className="flex items-center gap-2 opacity-30">
              <div className="w-8 h-[1px] bg-gray-200" />
              <Zap size={16} className="text-accent" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-accent shadow-lg" />
              <span className="text-[11px] font-mono uppercase tracking-[0.5em] text-gray-400 font-bold">Premium</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [experienceType, setExperienceType] = useState<'tradicional' | 'especial' | 'premium'>('tradicional');
  
  const heroRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const customExpRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // Hero Animations
    const ctx = gsap.context(() => {
      gsap.from(".hero-title span", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
      });

      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: "power3.out"
      });

      gsap.from(".hero-cta", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: 1.2,
        ease: "back.out(1.7)"
      });

      gsap.from(".hero-image", {
        x: 100,
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
        ease: "power2.out"
      });

      gsap.from(".hero-image img", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".hero-image",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Parallax Ingredients
      gsap.to(".parallax-item", {
        y: (i, target) => -100 * parseFloat(target.dataset.speed || "1"),
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Reveal Sections
      const revealElements = [".section-title", ".experience-content"];
      revealElements.forEach((selector) => {
        gsap.from(selector, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: selector,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Testimonial Cards Animation
      gsap.from(".testimonial-card", {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        stagger: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "#testimonials",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Custom Experience Section Reveal
      gsap.from(".custom-exp-header", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: customExpRef.current,
          start: "top 80%"
        }
      });

      // Removed GSAP animations for exp-tab-btn and custom-exp-display 
      // to use Framer Motion for better reliability in this environment.

      // Experience Section - Slice Reveal
      gsap.from(".experience-image", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.5,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".experience-image",
          start: "top 80%"
        }
      });

      // Floating Ingredients - Organic Movement
      gsap.to(".parallax-item", {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      // Sticky CTA visibility
      ScrollTrigger.create({
        start: "top -200",
        onUpdate: (self) => {
          setShowStickyCTA(self.direction === 1 || self.scroll() > 500);
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass rounded-2xl px-6 py-3 shadow-sm">
            <div className="flex items-center gap-2">
              <img src={LOGO_URL} alt="Pizza Z Logo" className="h-10 w-auto" referrerPolicy="no-referrer" />
            </div>
          
            <div className="hidden md:flex items-center gap-8 font-bold text-xs uppercase tracking-widest text-gray-700">
              <button onClick={() => scrollToSection('home')} className="hover:text-primary transition-colors">Início</button>
              <button onClick={() => scrollToSection('historia')} className="hover:text-primary transition-colors">História</button>
              <button onClick={() => scrollToSection('experiencia')} className="hover:text-primary transition-colors">Experiência</button>
              <button onClick={() => scrollToSection('cardapio')} className="hover:text-primary transition-colors">Cardápio</button>
              <button onClick={() => scrollToSection('testimonials')} className="hover:text-primary transition-colors">Avaliações</button>
              <motion.a 
                href={WHATSAPP_LINK} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary py-2 px-6 text-[10px] btn-shimmer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Pedir Agora
              </motion.a>
            </div>

          <button className="md:hidden text-gray-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          <button className="absolute top-8 right-8 text-gray-900" onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
          </button>
          <img src={LOGO_URL} alt="Pizza Z Logo" className="h-16 w-auto mb-8" referrerPolicy="no-referrer" />
          <button onClick={() => scrollToSection('home')} className="text-4xl font-display uppercase text-gray-900">Início</button>
          <button onClick={() => scrollToSection('historia')} className="text-4xl font-display uppercase text-gray-900">História</button>
          <button onClick={() => scrollToSection('experiencia')} className="text-4xl font-display uppercase text-gray-900">Experiência</button>
          <button onClick={() => scrollToSection('cardapio')} className="text-4xl font-display uppercase text-gray-900">Cardápio</button>
          <button onClick={() => scrollToSection('testimonials')} className="text-4xl font-display uppercase text-gray-900">Avaliações</button>
          <motion.a 
            href={WHATSAPP_LINK} 
            target="_blank" 
            rel="noreferrer" 
            className="btn-primary text-xl btn-shimmer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            WhatsApp
          </motion.a>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 overflow-hidden min-h-screen flex items-center bg-white">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        </div>

        {/* Parallax Ingredients */}
        <img 
          src="https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?q=80&w=200&auto=format&fit=crop" 
          alt="Basil" 
          className="parallax-item absolute top-1/4 left-10 w-24 h-24 object-contain -z-10 opacity-30 hidden lg:block"
          data-speed="0.5"
          referrerPolicy="no-referrer"
        />
        <img 
          src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=200&auto=format&fit=crop" 
          alt="Tomato" 
          className="parallax-item absolute bottom-1/4 right-10 w-32 h-32 object-contain -z-10 opacity-30 hidden lg:block"
          data-speed="0.8"
          referrerPolicy="no-referrer"
        />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-xs font-bold text-accent uppercase tracking-widest mb-6 border border-accent/20">
              <Award size={14} /> A Melhor Experiência Pizza Z
            </div>
            <h1 className="hero-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display leading-[0.85] mb-8 text-gray-900">
              <span className="block">A ARTE DA</span>
              <span className="block text-primary">PIZZA Z EM</span>
              <span className="block">CADA FATIA</span>
            </h1>
            <p className="hero-sub text-base md:text-xl text-gray-500 max-w-xl mb-10 leading-relaxed">
              Massa no ponto perfeito, ingredientes selecionados e o sabor que sua fome merece. A qualidade premium da Pizza Z agora mais perto de você.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <motion.a 
                href={WHATSAPP_LINK} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary w-full sm:w-auto btn-shimmer animate-pulse-soft"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={20} /> Pedir Agora via WhatsApp
              </motion.a>
              <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex text-accent">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">4.8 Estrelas no Google</p>
                </div>
              </div>
            </div>
          </div>

            <div className="hero-image relative group">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full -z-10 group-hover:bg-primary/20 transition-all duration-700" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden rounded-[40px]">
                <div className="steam-effect left-1/4 bottom-0 w-8 h-8 opacity-0" style={{ animationDelay: '0s' }} />
                <div className="steam-effect left-1/2 bottom-0 w-10 h-10 opacity-0" style={{ animationDelay: '1s' }} />
                <div className="steam-effect right-1/4 bottom-0 w-6 h-6 opacity-0" style={{ animationDelay: '2s' }} />
              </div>
              <img 
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop" 
                alt="Premium Pizza Z" 
                className="w-full h-auto rounded-[40px] shadow-2xl border border-gray-100 transition-transform duration-700 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl hidden md:block shadow-xl border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                  <Flame className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Qualidade Premium</p>
                  <p className="text-lg font-display uppercase text-gray-900">Sabor Pizza Z</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PizzaDivider />

      {/* History of Pizza Z Section */}
      <section id="historia" ref={historyRef} className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[2px] bg-primary" />
                  <span className="text-xs font-mono uppercase tracking-[0.4em] text-primary font-bold">Nossa Jornada</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-display leading-none uppercase tracking-tighter text-gray-900">
                  HISTORY OF <span className="text-primary">PIZZA Z</span>
                </h2>
              </div>

              <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-tech">
                <p className="relative">
                  <span className="absolute -left-6 top-0 w-1 h-full bg-gray-100 rounded-full" />
                  A Pizza Z é uma tradicional rede de pizzarias genuinamente goiana, fundada no início da década de 1980 por Luiz de Boni e Roque de Boni, em Goiânia.
                </p>
                <p>
                  Inicialmente chamada <span className="text-gray-900 font-bold">“Zé Colméia”</span>, a marca ganhou destaque pelo conceito de pizzas saborosas, fartas e com preço acessível. Devido a questões de direitos autorais, o nome foi alterado para Pizza Z, mantendo a qualidade e conquistando ainda mais reconhecimento.
                </p>
                <p>
                  Com o passar dos anos, a empresa se expandiu para outras cidades, como Anápolis e Brasília, consolidando-se como uma franquia de sucesso.
                </p>
                
                <div className="py-8 px-10 bg-gray-50 rounded-[32px] border border-gray-100 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors" />
                  <div className="relative z-10 flex items-center gap-6">
                    <div className="text-5xl md:text-6xl font-display text-primary leading-none">40+</div>
                    <div className="text-sm font-mono uppercase tracking-widest text-gray-400 leading-tight">
                      Anos de<br />Tradição
                    </div>
                  </div>
                  <p className="mt-6 text-gray-900 font-medium leading-relaxed">
                    Hoje, com mais de 40 anos de história, a Pizza Z é uma marca respeitada, conhecida pela tradição, qualidade e forte presença no mercado goiano.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Founder" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                  Fundada por <span className="text-gray-900 font-bold">Luiz & Roque de Boni</span>
                </p>
              </div>
            </motion.div>

            {/* Image Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative group"
            >
              <div className="absolute -inset-4 border-2 border-accent/20 rounded-[48px] -z-10 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[40px] z-10" />
              
              <motion.div
                style={{ y: 0 }}
                whileInView={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative overflow-hidden rounded-[40px] shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=1000&auto=format&fit=crop" 
                  alt="Pizza Z Heritage" 
                  className="w-full h-[500px] lg:h-[700px] object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Badge */}
                <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20 z-20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-white">
                      <Award size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Desde</p>
                      <p className="text-2xl font-display text-gray-900">1980</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      <PizzaDivider />
      <section ref={customExpRef} className="py-32 relative overflow-hidden bg-white transition-colors duration-1000">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 tech-grid" />
          <div className="scanline" />
          
          {/* Dynamic Section Glow */}
          <motion.div 
            animate={{
              backgroundColor: experienceType === 'tradicional' ? 'rgba(211, 47, 47, 0.03)' : experienceType === 'especial' ? 'rgba(46, 125, 50, 0.03)' : 'rgba(0, 0, 0, 0.03)'
            }}
            className="absolute inset-0 transition-colors duration-1000"
          />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] animate-pulse" />
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="custom-exp-header text-center mb-24 space-y-6">
            <h2 className="text-3xl sm:text-5xl md:text-8xl font-pizzeria uppercase tracking-[0.1em] sm:tracking-[0.2em] text-gray-900">
              CRIE SUA <span className="text-primary">EXPERIÊNCIA</span>
            </h2>
            <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-tech">
              Aqui, cada detalhe faz a diferença. Escolha, combine e descubra sabores que vão muito além do comum. 
              Cada pizza é preparada com ingredientes selecionados e pensada para proporcionar uma experiência única a cada mordida.
            </p>
            <div className="w-32 h-1 bg-primary mx-auto rounded-full shadow-lg" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Controls */}
            <div className="lg:col-span-4 custom-exp-controls space-y-6">
              <p className="text-xs font-mono text-gray-400 uppercase tracking-[0.3em] mb-4">Selecione_o_Nível</p>
              
              <div className="flex flex-col gap-4">
                {[
                  { id: 'tradicional', label: 'Tradicional', icon: <Utensils size={20} />, color: 'primary' },
                  { id: 'especial', label: 'Especial', icon: <Zap size={20} />, color: 'accent' },
                  { id: 'premium', label: 'Premium', icon: <Sparkles size={20} />, color: 'gray-900' }
                ].map((opt, index) => (
                  <motion.button
                    key={opt.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    onClick={() => setExperienceType(opt.id as any)}
                    whileHover={{ x: 10, backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                    whileTap={{ scale: 0.98 }}
                    className={`exp-tab-btn w-full p-6 rounded-2xl border-2 transition-all duration-500 flex items-center gap-6 group relative overflow-hidden ${
                      experienceType === opt.id 
                        ? opt.id === 'tradicional' ? 'led-border-red bg-primary/5 shadow-sm' : opt.id === 'especial' ? 'led-border-green bg-accent/5 shadow-sm' : 'border-gray-900 bg-gray-900/5 shadow-sm'
                        : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      experienceType === opt.id ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-gray-200 text-gray-500 group-hover:bg-gray-300'
                    }`}>
                      {opt.icon}
                    </div>
                    <div className="text-left">
                      <h4 className={`text-xl font-display uppercase tracking-widest transition-colors duration-500 ${
                        experienceType === opt.id ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'
                      }`}>{opt.label}</h4>
                      <p className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">Nível_0{index + 1}</p>
                    </div>
                    
                    {experienceType === opt.id && (
                      <motion.div 
                        layoutId="active-indicator"
                        className="absolute right-6 w-2 h-2 bg-primary rounded-full shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="pt-8 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <p className="text-sm text-gray-500 leading-relaxed italic">
                  "Do clássico ao premium, você decide como quer viver essa experiência. Qualidade, sabor e intensidade em cada escolha."
                </p>
              </div>
            </div>

            {/* Display Area */}
            <div className="lg:col-span-8 custom-exp-display relative min-h-[550px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={experienceType}
                  initial={{ opacity: 0, scale: 0.98, x: 20 }}
                  animate={{ opacity: 1, scale: [0.98, 1.01, 1], x: 0 }}
                  exit={{ opacity: 0, scale: 1.02, x: -20 }}
                  transition={{ 
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.5, ease: "easeOut" },
                    x: { duration: 0.4, ease: "easeOut" }
                  }}
                  className="w-full h-full bg-white rounded-[40px] p-8 md:p-16 relative overflow-hidden flex flex-col justify-center border border-gray-100 shadow-xl"
                >
                  {/* Dynamic Background Glow */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] -z-10 transition-colors duration-500 ${
                      experienceType === 'tradicional' ? 'bg-primary' : experienceType === 'especial' ? 'bg-accent' : 'bg-gray-400'
                    }`} 
                  />
                  
                  <div className="space-y-10 relative">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="flex items-center gap-4"
                    >
                      <div className={`px-5 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.3em] shadow-sm ${
                        experienceType === 'tradicional' ? 'bg-primary text-white' : experienceType === 'especial' ? 'bg-accent text-white' : 'bg-gray-900 text-white'
                      }`}>
                        Nível_{experienceType}
                      </div>
                      <div className="h-[1px] flex-grow bg-gray-100" />
                    </motion.div>

                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className={`text-6xl md:text-8xl font-display uppercase leading-[0.9] tracking-tighter text-gray-900`}
                    >
                      {experienceType === 'tradicional' ? 'SABOR CLÁSSICO' : experienceType === 'especial' ? 'COMBINAÇÕES ÚNICAS' : 'MARCANTE & EXCLUSIVO'}
                    </motion.h3>

                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="text-xl md:text-2xl text-gray-600 font-tech leading-relaxed max-w-2xl font-light"
                    >
                      {experienceType === 'tradicional' 
                        ? "O sabor clássico que nunca decepciona. Simples, direto e irresistível."
                        : experienceType === 'especial'
                        ? "Combinações únicas que elevam o sabor a outro nível. Criatividade em cada fatia."
                        : "Uma experiência completa, com ingredientes selecionados e um sabor marcante. O ápice da Pizza Z."}
                    </motion.p>

                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25, duration: 0.3 }}
                      className="pt-8 flex flex-wrap gap-8 items-center"
                    >
                      <div className="flex items-center gap-3 group/item">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 group-hover/item:border-primary/50 transition-colors">
                          <ShieldCheck className="text-primary" size={20} />
                        </div>
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Qualidade_Garantida</span>
                      </div>
                      <div className="flex items-center gap-3 group/item">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 group-hover/item:border-accent/50 transition-colors">
                          <Flame className="text-accent" size={20} />
                        </div>
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Sabor_Intenso</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Visual Representation (Abstract Glow Circle) */}
                  <motion.div 
                    animate={{ 
                      rotate: experienceType === 'tradicional' ? 0 : experienceType === 'especial' ? 120 : 240,
                    }}
                    transition={{ 
                      duration: 0.8, ease: "circOut"
                    }}
                    className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none"
                  >
                    <div className={`w-[500px] h-[500px] rounded-full border-[60px] border-dashed transition-colors duration-500 ${
                      experienceType === 'tradicional' ? 'border-primary' : experienceType === 'especial' ? 'border-accent' : 'border-gray-900'
                    }`} />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <PizzaDivider />

      <section id="experiencia" ref={experienceRef} className="py-32 relative overflow-hidden tech-grid bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="experience-image relative z-10">
                <div className="absolute -inset-4 border-2 border-primary/20 rounded-[40px] -z-10 animate-pulse" />
                <img 
                  src="https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=1000&auto=format&fit=crop" 
                  alt="Pizza Detail" 
                  className="rounded-[32px] shadow-2xl border border-gray-100 w-full h-[400px] lg:h-[600px] object-cover transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Tech Accents */}
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md border border-gray-200 p-4 rounded-xl font-mono text-[10px] text-primary space-y-1 hidden md:block shadow-lg">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 bg-primary rounded-full animate-ping" /> SYSTEM_READY</div>
                  <div className="text-gray-600">TEMP: 450°C</div>
                  <div className="text-gray-600">STATUS: OPTIMAL</div>
                </div>

                <div className="absolute bottom-8 right-8 bg-primary text-white p-6 rounded-2xl shadow-2xl shadow-primary/20 transform rotate-3 hover:rotate-0 transition-transform">
                  <p className="font-display text-4xl leading-none">PIZZA_Z<br/>v2.0</p>
                </div>
              </div>
              
              {/* Decorative Pixel Elements */}
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="space-y-12 order-1 lg:order-2">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-1 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-mono uppercase tracking-[0.4em] text-gray-400">
                  <span className="w-2 h-2 bg-primary rounded-full" /> Experience_Module
                </div>
                
                <h2 className="text-6xl md:text-8xl font-display leading-[0.9] uppercase tracking-tighter text-gray-900">
                  UMA <span className="text-primary">EXPERIÊNCIA</span><br/>
                  ALÉM DO <span className="italic font-sans font-light tracking-normal lowercase text-gray-700">sabor</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 p-8 bg-white rounded-3xl border-l-4 border-primary shadow-lg hover:bg-gray-50 transition-colors">
                  <p className="text-gray-800 text-lg leading-relaxed font-tech font-medium">
                    Mais do que uma pizza, entregamos <span className="text-primary">qualidade</span>, <span className="text-primary">rapidez</span> e um sabor marcante.
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Cada pedido é preparado com ingredientes selecionados e atenção aos detalhes, criando uma experiência única a cada mordida.
                  </p>
                </div>

                <div className="space-y-4 p-8 bg-white rounded-3xl border-l-4 border-accent shadow-lg hover:bg-gray-50 transition-colors">
                  <p className="text-gray-800 text-lg leading-relaxed font-tech font-medium">
                    Do clássico ao inovador, cada detalhe é pensado para <span className="text-accent">surpreender</span>.
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Uma combinação perfeita entre sabor, qualidade e experiência.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                {['Premium_Ingredients', 'Fast_Delivery', 'Unique_Taste'].map((tag) => (
                  <div key={tag} className="px-4 py-2 border border-gray-100 rounded-lg font-mono text-[10px] uppercase tracking-widest text-gray-400 hover:text-primary hover:border-primary/40 transition-colors cursor-default bg-gray-50">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PizzaDivider />

      {/* Premium Menu Showcase Section */}
      <section id="cardapio" className="py-20 relative overflow-hidden bg-white">
        {/* Background Glows */}
        <div className="absolute inset-0 -z-10 bg-warm-gradient opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(211,47,47,0.02)_0%,transparent_70%)]" />

        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-12 space-y-3">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-display leading-none uppercase tracking-tighter text-gray-900"
            >
              SABORES QUE <span className="text-primary">ENCANTAM</span>
            </motion.h2>
            <p className="text-gray-400 font-tech text-sm uppercase tracking-widest">Destaques_do_Mestre</p>
          </div>

          <div className="relative flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0 py-10">
            {[
              {
                title: "Quatro Queijos com Catupiry",
                img: "https://images.unsplash.com/photo-1573821663912-569905455b1c?q=80&w=800&auto=format&fit=crop",
                rotate: -4,
                x: 40,
                delay: 0
              },
              {
                title: "Portuguesa",
                img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=800&auto=format&fit=crop",
                rotate: 0,
                x: 0,
                delay: 0.1,
                featured: true
              },
              {
                title: "Calabresa",
                img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop",
                rotate: 4,
                x: -40,
                delay: 0.2
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { duration: 0.6, delay: card.delay, ease: "easeOut" }
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -15,
                  scale: 1.03,
                  zIndex: 30,
                  transition: { duration: 0.3 }
                }}
                className={`relative w-full max-w-[400px] aspect-[4/5] rounded-[40px] overflow-hidden border border-gray-100 group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  card.featured ? 'z-20 lg:-mx-10 scale-105' : 'z-10'
                }`}
                style={{
                  transform: typeof window !== 'undefined' && window.innerWidth > 1024 ? `rotate(${card.rotate}deg) translateX(${card.x}px)` : 'none'
                }}
              >
                <img 
                  src={card.img} 
                  alt={card.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute bottom-10 left-10 right-10">
                  <h4 className="text-4xl font-display text-white leading-none mb-2 group-hover:text-primary transition-colors">{card.title}</h4>
                  <div className="w-12 h-1 bg-primary rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-8"
          >
            <a href={MENU_LINK} target="_blank" rel="noreferrer" className="btn-futuristic !py-6 !px-16 !text-lg">
              Ver Cardápio Digital
            </a>
          </motion.div>
        </div>
      </section>

      <PizzaDivider />
      <section id="testimonials" ref={testimonialsRef} className="py-20 lg:py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title text-5xl md:text-7xl mb-4 text-gray-900">O QUE DIZEM NOSSOS CLIENTES</h2>
            <p className="text-gray-500">A satisfação de quem já provou a melhor pizza da região.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Soraia Carollinne",
                text: "Pizza maravilhosa, massa fininha e crocante. O atendimento é excelente e o ambiente muito agradável.",
                rating: 5
              },
              {
                name: "Hellen Graciano",
                text: "Melhor pizza de Trindade! Ingredientes de primeira e chega sempre quentinha. Super recomendo.",
                rating: 5
              },
              {
                name: "Daniela",
                text: "Ambiente limpo e aconchegante. As pizzas especiais são de outro mundo. Voltarei com certeza!",
                rating: 5
              }
            ].map((review, idx) => (
              <div key={idx} className="testimonial-card bg-white p-8 rounded-3xl relative border border-gray-100 shadow-lg">
                <div className="flex text-accent mb-6">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg italic text-gray-700 mb-8 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-display text-primary text-xl">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{review.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Cliente Google</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-12 px-6 lg:pt-32 border-t border-gray-100 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-8">
              <div className="flex items-center gap-4">
                <img src={LOGO_URL} alt="Pizza Z Logo" className="h-14 w-auto" referrerPolicy="no-referrer" />
              </div>
              
              <p className="text-gray-500 text-base leading-relaxed max-w-sm font-tech">
                Elevando o padrão da pizza artesanal em Trindade. Ingredientes selecionados, precisão técnica e paixão pelo sabor.
              </p>

              <div className="flex gap-4">
                {[
                  { icon: Instagram, link: INSTAGRAM_LINK, label: "Instagram" },
                  { icon: MessageCircle, link: WHATSAPP_LINK, label: "WhatsApp" }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="group relative w-12 h-12 flex items-center justify-center"
                  >
                    <div className="absolute inset-0 bg-gray-50 rounded-xl border border-gray-100 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500" />
                    <social.icon size={20} className="relative text-gray-400 group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Info Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact & Hours */}
              <div className="space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-primary rounded-full" />
                    <h4 className="text-xs uppercase tracking-[0.4em] text-gray-900 font-bold">Atendimento</h4>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Clock className="text-primary" size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Horário de Funcionamento</p>
                        <p className="text-gray-900 font-display text-xl uppercase tracking-tight">Ter - Dom: 18:30 às 23:30</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Phone className="text-primary" size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Central de Pedidos</p>
                        <p className="text-gray-900 font-display text-xl uppercase tracking-tight">(62) 98445-1212</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  <h4 className="text-xs uppercase tracking-[0.4em] text-gray-900 font-bold">Onde Estamos</h4>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <MapPin className="text-primary" size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Endereço Premium</p>
                      <p className="text-gray-600 text-base leading-relaxed max-w-[280px] font-tech">
                        Av. Elizabeth Marques, Qd. 38 - Lt.14 - St. Maysa, Trindade - GO, 75380-307
                      </p>
                    </div>
                  </div>

                  <div className="pl-14">
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Av.+Elizabeth+Marques,+Qd.+38+-+Lt.14+-+St.+Maysa,+Trindade+-+GO,+75380-307" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-primary hover:text-gray-900 transition-all group"
                    >
                      <span>Traçar Rota no Maps</span>
                      <div className="w-8 h-px bg-primary/30 group-hover:w-12 group-hover:bg-gray-900 transition-all" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <p className="text-[9px] text-gray-400 uppercase tracking-[0.4em]">© 2025 PIZZA Z</p>
              <div className="hidden md:block w-px h-3 bg-gray-200" />
              <p className="text-[9px] text-gray-400 uppercase tracking-[0.4em] hover:text-primary transition-colors cursor-pointer">Política de Privacidade</p>
            </div>
            
            <div className="flex items-center gap-3 group cursor-pointer">
              <span className="text-[9px] text-gray-400 uppercase tracking-[0.4em] group-hover:text-gray-900 transition-colors">Desenvolvido por</span>
              <span className="text-[9px] text-primary font-bold uppercase tracking-[0.4em]">Vitor Lagares</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky WhatsApp CTA */}
      <div className={`fixed bottom-8 right-8 z-[70] transition-all duration-500 ${showStickyCTA ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <motion.a 
          href={WHATSAPP_LINK} 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center gap-3 bg-primary text-white px-6 py-4 rounded-full shadow-2xl shadow-primary/30 transition-all border border-white/20 btn-shimmer animate-pulse-soft"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle size={24} />
          <span className="font-bold uppercase tracking-widest text-sm hidden md:block">Pedir Agora</span>
        </motion.a>
      </div>

    </div>
  );
}
