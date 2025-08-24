"use client";

import { useState, useEffect } from "react";
import { Shield, Bug, Code, Globe, ChevronRight, ExternalLink, Github, Linkedin, Mail, Sparkles } from "lucide-react";

export default function Home() {
  const [currentProject, setCurrentProject] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

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

  const handleMagicalAnimation = () => {
    setIsAnimating(!isAnimating);
    
    // Create magical particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    }));
    setParticles(newParticles);

    // Clear particles after animation
    setTimeout(() => {
      setParticles([]);
    }, 3000);
  };

  useEffect(() => {
    if (isAnimating) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isAnimating]);

  return (
    <main className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden ${isAnimating ? 'magical-chaos' : ''}`}>
      {/* Magical Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed w-2 h-2 bg-yellow-300 rounded-full animate-ping z-40 pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random() * 2}s`
          }}
        />
      ))}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full bg-black/20 backdrop-blur-md border-b border-purple-500/20 z-50 transition-all duration-1000 ${isAnimating ? 'animate-bounce' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className={`flex items-center gap-2 transition-all duration-1000 ${isAnimating ? 'animate-spin' : ''}`}>
            <Shield className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Bromskiii
            </span>
          </div>
          <div className={`flex items-center gap-6 transition-all duration-1000 ${isAnimating ? 'animate-pulse' : ''}`}>
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
          
          <div className="flex justify-center gap-4 mb-12">
            <button className={`bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-500 ${isAnimating ? 'animate-spin' : ''}`}>
              View Projects
            </button>
            <button className={`border border-purple-400 px-8 py-3 rounded-lg font-semibold hover:bg-purple-400/10 transition-all duration-500 ${isAnimating ? 'animate-bounce' : ''}`}>
              Download CV
            </button>
            <button 
              onClick={handleMagicalAnimation}
              className={`bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 px-8 py-3 rounded-lg font-bold text-black shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 ${isAnimating ? 'animate-pulse bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500' : ''}`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className={`w-5 h-5 ${isAnimating ? 'animate-spin' : ''}`} />
                ANIMATE!!!
                <Sparkles className={`w-5 h-5 ${isAnimating ? 'animate-spin' : ''}`} />
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
        @keyframes magical-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        .magical-chaos {
          animation: magical-float 3s ease-in-out infinite;
        }
        
        .magical-chaos * {
          animation-duration: ${Math.random() * 2 + 1}s !important;
        }
      `}</style>
    </main>
  );
}
