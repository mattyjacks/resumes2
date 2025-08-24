"use client";

import { useState, useEffect } from "react";
import { Shield, Bug, Code, Globe, ChevronRight, ExternalLink, Github, Linkedin, Mail, Sparkles } from "lucide-react";

export default function Home() {
  const [currentProject, setCurrentProject] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStyle, setAnimationStyle] = useState<'magical' | 'fire' | 'water' | 'matrix' | 'cosmic'>('magical');
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, type?: string}>>([]);

  const projects = [
    {
      title: "Coursify",
      description: "Revolutionary Learning Platform",
      details: "An innovative React-based course platform that transforms online education with interactive modules, real-time progress tracking, and adaptive learning algorithms. Built with modern web technologies for seamless user experience.",
      url: "https://coursify-psi.vercel.app/",
      tech: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
      category: "EdTech"
    },
    {
      title: "GiveHub",
      description: "Decentralized Crowdfunding Revolution",
      details: "A cutting-edge Web3 donation platform leveraging ZetaChain for seamless cross-chain transactions. Features an integrated AI assistant for campaign optimization and smart contract automation for transparent fund distribution.",
      url: "https://give-hub-kappa.vercel.app/",
      tech: ["Next.js", "ZetaChain", "Web3", "AI Integration", "Smart Contracts"],
      category: "Blockchain"
    },
    {
      title: "Ethereum Wallet",
      description: "Secure Cryptocurrency Management",
      details: "A beautifully crafted, security-first cryptocurrency wallet with an intuitive interface. Implements advanced encryption protocols and multi-signature support for enterprise-grade security in digital asset management.",
      url: "https://etherium-wallet-rouge.vercel.app/",
      tech: ["React", "Ethereum", "Web3.js", "Cryptography", "Security"],
      category: "FinTech"
    }
  ];

  const skills = [
    { icon: Shield, name: "Cybersecurity", level: 95 },
    { icon: Bug, name: "Bug Bounty", level: 90 },
    { icon: Code, name: "Full-Stack Dev", level: 88 },
    { icon: Globe, name: "Web3 & Blockchain", level: 85 }
  ];

  const animationStyles = ['magical', 'fire', 'water', 'matrix', 'cosmic'] as const;

  const handleMagicalAnimation = () => {
    if (isAnimating) return; // Prevent multiple animations
    
    // Randomly select animation style
    const randomStyle = animationStyles[Math.floor(Math.random() * animationStyles.length)];
    setAnimationStyle(randomStyle);
    setIsAnimating(true);
    
    // Create particles based on animation style
    let newParticles: Array<{id: number, x: number, y: number, type?: string}> = [];
    
    switch (randomStyle) {
      case 'magical':
        newParticles = Array.from({ length: 50 }, (_, i) => ({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          type: 'sparkle'
        }));
        break;
      case 'fire':
        newParticles = Array.from({ length: 80 }, (_, i) => ({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          type: 'flame'
        }));
        break;
      case 'water':
        newParticles = Array.from({ length: 60 }, (_, i) => ({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          type: 'droplet'
        }));
        break;
      case 'matrix':
        newParticles = Array.from({ length: 100 }, (_, i) => ({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          type: 'code'
        }));
        break;
      case 'cosmic':
        newParticles = Array.from({ length: 70 }, (_, i) => ({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          type: 'star'
        }));
        break;
    }
    
    setParticles(newParticles);

    // Stop animation after 10 seconds and return smoothly
    setTimeout(() => {
      setIsAnimating(false);
      setParticles([]);
    }, 10000);
  };

  useEffect(() => {
    if (isAnimating) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isAnimating]);

  const getAnimationClasses = () => {
    if (!isAnimating) return '';
    
    switch (animationStyle) {
      case 'magical': return 'magical-chaos';
      case 'fire': return 'fire-explosion';
      case 'water': return 'water-flow';
      case 'matrix': return 'matrix-rain';
      case 'cosmic': return 'cosmic-drift';
      default: return '';
    }
  };

  const getParticleClasses = (particle: {id: number, x: number, y: number, type?: string}) => {
    const baseClasses = "fixed z-40 pointer-events-none";
    
    switch (particle.type) {
      case 'sparkle':
        return `${baseClasses} w-2 h-2 bg-yellow-300 rounded-full animate-ping`;
      case 'flame':
        return `${baseClasses} w-3 h-4 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full animate-bounce`;
      case 'droplet':
        return `${baseClasses} w-2 h-3 bg-gradient-to-b from-blue-300 to-blue-600 rounded-full animate-pulse`;
      case 'code':
        return `${baseClasses} w-1 h-4 bg-green-400 animate-pulse`;
      case 'star':
        return `${baseClasses} w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping`;
      default:
        return `${baseClasses} w-2 h-2 bg-yellow-300 rounded-full animate-ping`;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Dynamic Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={getParticleClasses(particle)}
          style={{
            left: particle.x,
            top: particle.y,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random() * 3}s`
          }}
        >
          {particle.type === 'code' && (
            <span className="text-xs text-green-400 font-mono">
              {['0', '1', '{', '}', '<', '>', '/', '*'][Math.floor(Math.random() * 8)]}
            </span>
          )}
        </div>
      ))}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full bg-black/20 backdrop-blur-md border-b border-purple-500/20 z-50 transition-all duration-1000 ${
        isAnimating ? (
          animationStyle === 'magical' ? 'animate-bounce' :
          animationStyle === 'fire' ? 'animate-pulse' :
          animationStyle === 'water' ? 'animate-bounce' :
          animationStyle === 'matrix' ? 'animate-pulse' :
          'animate-spin'
        ) : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className={`flex items-center gap-2 transition-all duration-1000 ${
            isAnimating ? (
              animationStyle === 'magical' ? 'animate-spin' :
              animationStyle === 'fire' ? 'animate-bounce' :
              animationStyle === 'water' ? 'animate-pulse' :
              animationStyle === 'matrix' ? 'animate-bounce' :
              'animate-spin'
            ) : ''
          }`}>
            <Shield className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Bromskiii
            </span>
          </div>
          <div className={`flex items-center gap-6 transition-all duration-1000 ${
            isAnimating ? (
              animationStyle === 'magical' ? 'animate-pulse' :
              animationStyle === 'fire' ? 'animate-spin' :
              animationStyle === 'water' ? 'animate-bounce' :
              animationStyle === 'matrix' ? 'animate-pulse' :
              'animate-bounce'
            ) : ''
          }`}>
            <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`mb-8 transition-all duration-1000 ${isAnimating ? 'animate-bounce' : ''}`}>
            <h1 className={`text-6xl font-bold mb-6 transition-all duration-1000 ${isAnimating ? 'animate-pulse' : ''}`}>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Cybersecurity Expert
              </span>
            </h1>
            <p className={`text-xl text-gray-300 mb-8 max-w-3xl mx-auto transition-all duration-1000 ${isAnimating ? 'animate-ping' : ''}`}>
              Canadian Bug Bounty Hunter & Computer Engineer specializing in web security, 
              blockchain vulnerabilities, and full-stack development. Protecting digital assets 
              through ethical hacking and innovative security solutions.
            </p>
          </div>
          
          <div className="flex justify-center gap-4 mb-8">
            <button className={`bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-500 ${
              isAnimating ? (
                animationStyle === 'magical' ? 'animate-spin' :
                animationStyle === 'fire' ? 'animate-bounce' :
                animationStyle === 'water' ? 'animate-pulse' :
                animationStyle === 'matrix' ? 'animate-bounce' :
                'animate-spin'
              ) : ''
            }`}>
              View Projects
            </button>
            <button className={`border border-purple-400 px-8 py-3 rounded-lg font-semibold hover:bg-purple-400/10 transition-all duration-500 ${
              isAnimating ? (
                animationStyle === 'magical' ? 'animate-bounce' :
                animationStyle === 'fire' ? 'animate-pulse' :
                animationStyle === 'water' ? 'animate-bounce' :
                animationStyle === 'matrix' ? 'animate-pulse' :
                'animate-bounce'
              ) : ''
            }`}>
              Download CV
            </button>
          </div>

          {/* Animate Button - Own Row */}
          <div className="flex justify-center mb-12">
            <button 
              onClick={handleMagicalAnimation}
              disabled={isAnimating}
              className={`px-16 py-6 rounded-2xl text-xl font-bold text-black shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 ${
                isAnimating 
                  ? `animate-pulse ${
                      animationStyle === 'magical' ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500' :
                      animationStyle === 'fire' ? 'bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500' :
                      animationStyle === 'water' ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400' :
                      animationStyle === 'matrix' ? 'bg-gradient-to-r from-green-600 via-lime-500 to-emerald-400' :
                      'bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500'
                    }`
                  : 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500'
              } ${isAnimating ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
            >
              <div className="flex items-center gap-4">
                <Sparkles className={`w-8 h-8 ${isAnimating ? 'animate-spin' : ''}`} />
                <span className="text-2xl">
                  {isAnimating ? `${animationStyle.toUpperCase()}ING...` : 'ANIMATE!!!'}
                </span>
                <Sparkles className={`w-8 h-8 ${isAnimating ? 'animate-spin' : ''}`} />
              </div>
            </button>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 transition-all duration-1000 ${
                  isAnimating ? 'animate-bounce' : ''
                }`}
                style={{
                  animationDelay: isAnimating ? `${index * 0.2}s` : '0s'
                }}
              >
                <skill.icon className={`w-8 h-8 text-purple-400 mx-auto mb-3 transition-all duration-1000 ${isAnimating ? 'animate-spin' : ''}`} />
                <h3 className={`font-semibold mb-2 transition-all duration-1000 ${isAnimating ? 'animate-pulse' : ''}`}>{skill.name}</h3>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r from-purple-400 to-cyan-400 h-2 rounded-full transition-all duration-1000 ${isAnimating ? 'animate-ping' : ''}`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className={`text-sm text-gray-400 transition-all duration-1000 ${isAnimating ? 'animate-bounce' : ''}`}>{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-6 bg-black/20 transition-all duration-1000 ${isAnimating ? 'animate-pulse' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-12 transition-all duration-1000 ${isAnimating ? 'animate-bounce' : ''}`}>About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${isAnimating ? 'animate-pulse' : ''}`}>
              <h3 className={`text-2xl font-semibold mb-6 text-purple-400 transition-all duration-1000 ${isAnimating ? 'animate-ping' : ''}`}>Professional Background</h3>
              <p className={`text-gray-300 mb-6 transition-all duration-1000 ${isAnimating ? 'animate-bounce' : ''}`}>
                Based in Canada, I'm a passionate cybersecurity professional with over 5 years of experience 
                in ethical hacking and vulnerability research. My expertise spans web application security, 
                blockchain auditing, and full-stack development.
              </p>
              <p className={`text-gray-300 mb-6 transition-all duration-1000 ${isAnimating ? 'animate-pulse' : ''}`}>
                As a certified bug bounty hunter, I've successfully identified and reported critical 
                vulnerabilities for major tech companies, earning recognition in their security halls of fame. 
                My approach combines deep technical knowledge with creative problem-solving.
              </p>
              <div className="flex gap-4">
                <div className={`bg-purple-600/20 px-4 py-2 rounded-lg transition-all duration-1000 ${isAnimating ? 'animate-spin' : ''}`}>
                  <span className="text-purple-400 font-semibold">50+</span>
                  <p className="text-sm">Vulnerabilities Found</p>
                </div>
                <div className={`bg-cyan-600/20 px-4 py-2 rounded-lg transition-all duration-1000 ${isAnimating ? 'animate-bounce' : ''}`}>
                  <span className="text-cyan-400 font-semibold">$25K+</span>
                  <p className="text-sm">Bug Bounty Rewards</p>
                </div>
              </div>
            </div>
            <div className={`bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-2xl p-8 transition-all duration-1000 ${isAnimating ? 'animate-bounce' : ''}`}>
              <h4 className={`text-xl font-semibold mb-4 transition-all duration-1000 ${isAnimating ? 'animate-pulse' : ''}`}>Certifications & Education</h4>
              <ul className="space-y-3">
                <li className={`flex items-center gap-3 transition-all duration-1000 ${isAnimating ? 'animate-ping' : ''}`}>
                  <ChevronRight className={`w-4 h-4 text-purple-400 transition-all duration-1000 ${isAnimating ? 'animate-spin' : ''}`} />
                  <span>Computer Engineering Degree - University of Toronto</span>
                </li>
                <li className={`flex items-center gap-3 transition-all duration-1000 ${isAnimating ? 'animate-bounce' : ''}`}>
                  <ChevronRight className={`w-4 h-4 text-purple-400 transition-all duration-1000 ${isAnimating ? 'animate-spin' : ''}`} />
                  <span>Certified Ethical Hacker (CEH)</span>
                </li>
                <li className={`flex items-center gap-3 transition-all duration-1000 ${isAnimating ? 'animate-pulse' : ''}`}>
                  <ChevronRight className={`w-4 h-4 text-purple-400 transition-all duration-1000 ${isAnimating ? 'animate-spin' : ''}`} />
                  <span>OSCP - Offensive Security Certified Professional</span>
                </li>
                <li className={`flex items-center gap-3 transition-all duration-1000 ${isAnimating ? 'animate-ping' : ''}`}>
                  <ChevronRight className={`w-4 h-4 text-purple-400 transition-all duration-1000 ${isAnimating ? 'animate-spin' : ''}`} />
                  <span>AWS Security Specialist</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 px-6 transition-all duration-1000 ${isAnimating ? 'animate-pulse' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-12 transition-all duration-1000 ${isAnimating ? 'animate-bounce' : ''}`}>Featured Projects</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className={`bg-white/5 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden cursor-pointer transition-all duration-1000 hover:scale-105 hover:border-purple-400/40 ${
                  currentProject === index ? 'ring-2 ring-purple-400' : ''
                } ${isAnimating ? 'animate-spin' : ''}`}
                onClick={() => setCurrentProject(index)}
                style={{
                  animationDelay: isAnimating ? `${index * 0.3}s` : '0s',
                  animationDuration: isAnimating ? '2s' : '0s'
                }}
              >
                {/* 4:3 Aspect Ratio Preview */}
                <div className={`aspect-[4/3] bg-gradient-to-br from-purple-600/30 to-cyan-600/30 flex items-center justify-center relative transition-all duration-1000 ${isAnimating ? 'animate-ping' : ''}`}>
                  <div className="text-center">
                    <h3 className={`text-2xl font-bold mb-2 transition-all duration-1000 ${isAnimating ? 'animate-bounce' : ''}`}>{project.title}</h3>
                    <p className={`text-purple-300 transition-all duration-1000 ${isAnimating ? 'animate-pulse' : ''}`}>{project.category}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <ExternalLink className={`w-5 h-5 text-purple-400 transition-all duration-1000 ${isAnimating ? 'animate-spin' : ''}`} />
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className={`text-xl font-semibold mb-2 transition-all duration-1000 ${isAnimating ? 'animate-pulse' : ''}`}>{project.description}</h4>
                  <p className={`text-gray-400 text-sm mb-4 line-clamp-3 transition-all duration-1000 ${isAnimating ? 'animate-bounce' : ''}`}>{project.details}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className={`bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs transition-all duration-1000 ${isAnimating ? 'animate-ping' : ''}`}>
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className={`text-gray-400 text-xs transition-all duration-1000 ${isAnimating ? 'animate-bounce' : ''}`}>+{project.tech.length - 3} more</span>
                    )}
                  </div>
                  
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-all duration-1000 ${isAnimating ? 'animate-pulse' : ''}`}
                  >
                    View Live Site <ExternalLink className={`w-4 h-4 transition-all duration-1000 ${isAnimating ? 'animate-spin' : ''}`} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-6 bg-black/20 transition-all duration-1000 ${isAnimating ? 'animate-pulse' : ''}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl font-bold mb-8 transition-all duration-1000 ${isAnimating ? 'animate-bounce' : ''}`}>Let's Connect</h2>
          <p className={`text-xl text-gray-300 mb-12 transition-all duration-1000 ${isAnimating ? 'animate-ping' : ''}`}>
            Ready to secure your digital assets? Let's discuss your cybersecurity needs.
          </p>
          
          <div className="flex justify-center gap-8 mb-12">
            <a href="mailto:bromskiii@example.com" className={`flex items-center gap-3 bg-purple-600/20 px-6 py-3 rounded-lg hover:bg-purple-600/30 transition-all duration-1000 ${isAnimating ? 'animate-spin' : ''}`}>
              <Mail className={`w-5 h-5 transition-all duration-1000 ${isAnimating ? 'animate-bounce' : ''}`} />
              Email
            </a>
            <a href="https://linkedin.com/in/bromskiii" className={`flex items-center gap-3 bg-blue-600/20 px-6 py-3 rounded-lg hover:bg-blue-600/30 transition-all duration-1000 ${isAnimating ? 'animate-pulse' : ''}`}>
              <Linkedin className={`w-5 h-5 transition-all duration-1000 ${isAnimating ? 'animate-spin' : ''}`} />
              LinkedIn
            </a>
            <a href="https://github.com/bromskiii" className={`flex items-center gap-3 bg-gray-600/20 px-6 py-3 rounded-lg hover:bg-gray-600/30 transition-all duration-1000 ${isAnimating ? 'animate-bounce' : ''}`}>
              <Github className={`w-5 h-5 transition-all duration-1000 ${isAnimating ? 'animate-spin' : ''}`} />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-6 border-t border-purple-500/20 transition-all duration-1000 ${isAnimating ? 'animate-pulse' : ''}`}>
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p className={`transition-all duration-1000 ${isAnimating ? 'animate-bounce' : ''}`}>&copy; 2024 Bromskiii. Securing the digital frontier, one vulnerability at a time.</p>
        </div>
      </footer>

      <style jsx global>{`
        /* Remove global body animations - animate only individual elements */
        
        /* Smooth transitions for individual elements only */
        .transition-all {
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        /* Enhanced button hover effects */
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </main>
  );
}
