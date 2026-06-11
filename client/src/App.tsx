import React, { useState, useEffect } from 'react';
import { Bot, Calendar, Zap, TrendingUp, Bell, Search, Sparkles, CheckCircle2, ArrowRight, Github, AlertTriangle, Users, Layers, MapPin, Terminal, Cpu, GraduationCap, BarChart3, Target, Rocket } from 'lucide-react';
import { Button, Card, cn } from './components/ui';
import OnboardingQuiz from './features/onboarding/OnboardingQuiz';
import EventCard from './features/events/EventCard';
import ZuzuChat from './features/chat/ZuzuChat';
import { UserProfile, Event } from './types';
import { aiService } from './services/api';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activePillar, setActivePillar] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  const pillars = [
    {
      title: "AI Event Seeder",
      description: "Crawls Instagram, LinkedIn, and university sites to autopopulate 500+ events daily. OCR-parses WhatsApp posters instantly with 95% accuracy.",
      icon: <Calendar className="w-6 h-6" />,
      color: "bg-blue-500",
      accent: "text-blue-600"
    },
    {
      title: "Zuzu 2.0",
      description: "NLP-powered engine that captures your profile through natural conversation and recommends events, driving conversion in under 60s.",
      icon: <Bot className="w-6 h-6" />,
      color: "bg-purple-500",
      accent: "text-purple-600"
    },
    {
      title: "Smart Match Score",
      description: "Personalised Match % on every event card using content-based filtering. Scores improve as the AI learns your preferences over time.",
      icon: <Sparkles className="w-6 h-6" />,
      color: "bg-amber-500",
      accent: "text-amber-600"
    },
    {
      title: "Growth Engine",
      description: "AI auto-fills listings from Google Forms or posters. Gamified college leaderboard drives healthy competition and platform growth.",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-emerald-500",
      accent: "text-emerald-600"
    },
    {
      title: "Predictive Nudges",
      description: "Monitors 5 behavioral signals and sends targeted re-engagement nudges automatically to stop user drop-off before it happens.",
      icon: <Bell className="w-6 h-6" />,
      color: "bg-rose-500",
      accent: "text-rose-600"
    }
  ];

  const teamMembers = [
    { name: "Prof. Bais P. G.", role: "SPOC", designation: "Assistant Professor", college: "Narnarayan Shastri Institute of Technology, Ahmedabad" },
    { name: "Syed Asif Syed Gaffar", role: "Project Leader", designation: "Student", college: "Narnarayan Shastri Institute of Technology, Ahmedabad" },
    { name: "Karan Sadashiv Ingole", role: "Research Analyst", designation: "Student", college: "Narnarayan Shastri Institute of Technology, Ahmedabad" },
    { name: "Shravan Sandip Gaikwad", role: "Developer", designation: "Student", college: "Narnarayan Shastri Institute of Technology, Ahmedabad" },
    { name: "Arpita Mukund Jondhale", role: "Tester / Debugger", designation: "Student", college: "Narnarayan Shastri Institute of Technology, Ahmedabad" },
    { name: "Gayatri Shriram Bharose", role: "Presentation Lead", designation: "Student", college: "Narnarayan Shastri Institute of Technology, Ahmedabad" },
  ];

  const auditGaps = [
    { title: "0 Events Listed", desc: "The platform catalogue is completely empty — no content for users to discover." },
    { title: "Decorative Chatbot", desc: "Zuzu exists in the UI but delivers no recommendations or actionable guidance." },
    { title: "Zero Personalisation", desc: "Every visitor sees an identical homepage regardless of branch, city or interest." },
    { title: "Broken Discovery", desc: "Cannot filter events by college, city, domain or date — core functionality is absent." },
  ];

  const roadmap = [
     { phase: "PHASE 1", title: "PRE-LAUNCH", items: ["AI Event Seeder (Crawler + OCR)", "Zuzu 2.0 NLP Intent Classifier", "Onboarding Quiz & Match Score"] },
     { phase: "PHASE 2", title: "LAUNCH WEEK", items: ["Enable Smart Match Score Feed", "Activate Zuzu 2.0 as Default UI", "Launch Organizer Growth Engine"] },
     { phase: "PHASE 3", title: "POST-LAUNCH", items: ["Activate 5 Predictive Nudges", "Refine Match Score (Collaborative)", "Advanced Registration Funnel Analysis"] },
   ];

  // Fetch all events on load
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await aiService.getAllEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleQuizComplete = async (profile: UserProfile) => {
    setUserProfile(profile);
    setShowQuiz(false);
    setLoading(true);
    try {
      const matchedEvents = await aiService.getMatchedEvents(profile);
      setEvents(matchedEvents);
    } catch (error) {
      console.error("Failed to get matched events:", error);
    } finally {
      setLoading(false);
    }
    window.scrollTo({ top: document.getElementById('discovery')?.offsetTop, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Full-Screen Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source src="/background_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark Overlay for Readability */}
      <div className="fixed inset-0 bg-slate-900/30 z-10" />
      
      {/* Main Content Container */}
      <div className="relative z-20">
        {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/10 backdrop-blur-xl border-b border-white/20 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white drop-shadow-md">ACE IQ</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-bold text-white/80">
            <a href="#mission" className="hover:text-white transition-colors text-[10px] uppercase tracking-widest">Mission</a>
            <a href="#audit" className="hover:text-white transition-colors text-[10px] uppercase tracking-widest">Audit</a>
            <a href="#features" className="hover:text-white transition-colors text-[10px] uppercase tracking-widest">Pillars</a>
            <a href="#impact" className="hover:text-white transition-colors text-[10px] uppercase tracking-widest">Impact</a>
            <a href="#roadmap" className="hover:text-white transition-colors text-[10px] uppercase tracking-widest">Roadmap</a>
            <a href="#architecture" className="hover:text-white transition-colors text-[10px] uppercase tracking-widest">Stack</a>
            <a href="#team" className="hover:text-white transition-colors text-[10px] uppercase tracking-widest">Team</a>
            <Button 
              size="sm" 
              onClick={() => setShowQuiz(true)} 
              className="bg-white text-indigo-700 hover:bg-indigo-50"
            >
              Demo
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-8 pt-32 pb-32 overflow-hidden min-h-screen flex items-center">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover -z-20"
        >
          <source src="/background_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Gradient Overlay for perfect readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-50 -z-10" />
        
        {/* Subtle Gradient Orbs for depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-25 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/90 text-indigo-700 px-4 py-2 rounded-full text-xs font-black mb-8 border border-white/30 uppercase tracking-widest backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>India's First AI-Driven Event Intelligence</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-white leading-[0.9] drop-shadow-lg"
          >
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 bg-300% animate-gradient">College Events.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-100 mb-12 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md"
          >
            ACE IQ is the autonomous intelligence layer for AllCollegeEvent.com, 
            eliminating cold-starts and delivering hyper-personalized discovery for every student.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <div className="relative w-full sm:w-[450px]">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search events, colleges, or skills..." 
                className="w-full pl-14 pr-6 py-5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 bg-white shadow-xl shadow-slate-200/50 text-lg font-medium transition-all"
              />
            </div>
            <Button size="lg" onClick={() => setShowQuiz(true)} className="w-full sm:w-auto rounded-2xl gap-2 h-[68px]">
              {userProfile ? 'Update Profile' : 'Start Discovery'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Mission/Abstract Section */}
      <section id="mission" className="px-8 py-20 text-white overflow-hidden relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="bg-indigo-600/20 p-8 rounded-[40px] border border-indigo-500/20 backdrop-blur-3xl md:w-1/3 text-center">
            <div className="text-indigo-400 font-black uppercase tracking-[0.2em] text-xs mb-2">Domain 3</div>
            <h4 className="text-2xl font-black mb-4">EdTech Solutions</h4>
            <div className="h-1 w-12 bg-indigo-500 mx-auto rounded-full mb-4" />
            <p className="text-sm text-slate-300 font-medium leading-relaxed">
              ECLearnix 360° 4.0 Innovation Challenge <br /> Round 2 Presentation
            </p>
          </div>
          <div className="md:w-2/3">
            <h3 className="text-3xl font-black mb-6 tracking-tight">The Mission: Project ACE IQ</h3>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              AllCollegeEvent.com is the next-gen platform for discovering educational events. 
              <span className="text-white"> ACE IQ</span> (AI-powered College Event Intelligence) 
              is the full-stack AI layer solving the cold-start crisis, lack of personalisation, 
              and decorative chatbot issues before the official launch.
            </p>
          </div>
        </div>
      </section>

      {/* Business Impact Section */}
      <section id="impact" className="px-8 py-32 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/2" />
        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <h2 className="text-sm font-black text-indigo-200 uppercase tracking-[0.3em] mb-4">The Result</h2>
              <h3 className="text-5xl font-black tracking-tighter mb-8 leading-tight">Measurable <br />Business Impact.</h3>
              <p className="text-lg text-indigo-100 font-medium mb-12">
                ACE IQ doesn't just add features; it transforms AllCollegeEvent.com into a genuinely intelligent, engagement-driven marketplace.
              </p>
              <div className="space-y-6">
                {[
                  { icon: <BarChart3 className="w-5 h-5" />, text: "10x More Events at Launch (500+ seeded)" },
                  { icon: <Target className="w-5 h-5" />, text: "40% Higher User Retention from Session 1" },
                  { icon: <Rocket className="w-5 h-5" />, text: "3x More Organizer Sign-ups via AI automation" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                    <div className="bg-white text-indigo-600 p-2 rounded-xl shadow-lg">
                      {item.icon}
                    </div>
                    <span className="font-bold text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-6">
              {[
                { label: "Registration", val: "< 60s", desc: "Via Zuzu 2.0" },
                { label: "Listing Time", val: "10s", desc: "Via Growth Engine" },
                { label: "Confidence", val: "85%+", desc: "Auto-Publish Rate" },
                { label: "Nudge Limit", val: "2/wk", desc: "Engagement Cap" },
              ].map((stat, i) => (
                <Card key={i} className="p-8 bg-white text-slate-900 border-none shadow-2xl flex flex-col items-center text-center group hover:scale-105 transition-transform">
                  <div className="text-4xl font-black text-indigo-600 mb-2">{stat.val}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{stat.label}</div>
                  <p className="text-xs text-slate-500 font-bold">{stat.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Audit Section */}
      <section id="audit" className="px-8 py-20 border-y border-white/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-[10px] font-black mb-6 border border-rose-100 uppercase tracking-widest">
                <AlertTriangle className="w-3 h-3" />
                Live Audit Results
              </div>
              <h2 className="text-4xl font-black mb-6 tracking-tight">The Cold-Start Content Crisis</h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">
                A live audit of AllCollegeEvent.com revealed critical gaps that ACE IQ is designed to solve before the official launch.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {auditGaps.map((gap, i) => (
                  <Card key={i} className="p-4 border-white/20 bg-white/80 backdrop-blur-xl">
                    <h4 className="font-bold text-sm mb-1 text-slate-800">{gap.title}</h4>
                    <p className="text-xs text-slate-600 leading-normal">{gap.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Terminal className="w-32 h-32 text-white" />
                </div>
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex gap-2">
                    <span className="text-emerald-400">➜</span>
                    <span className="text-white">ace-iq --audit live-site</span>
                  </div>
                  <div className="text-slate-400">Scanning AllCollegeEvent.com...</div>
                  <div className="flex gap-4 items-center py-2 border-y border-slate-800">
                    <div className="text-rose-400 font-bold uppercase tracking-tighter text-[10px]">Critical Failure</div>
                    <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '85%' }}
                        className="h-full bg-rose-500" 
                      />
                    </div>
                    <div className="text-rose-400 font-bold">85% Gap</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-slate-500">[WARN] 0 events found in catalog.</div>
                    <div className="text-slate-500">[WARN] Chatbot response latency: N/A (No logic).</div>
                    <div className="text-slate-500">[WARN] Session personalization: 0%</div>
                  </div>
                  <div className="pt-2 text-indigo-400">ACE IQ Injection Recommended.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Section */}
      <AnimatePresence>
        {(showQuiz || userProfile) && (
          <section id="discovery" className="px-8 py-20 text-white overflow-hidden relative">
            <div className="max-w-6xl mx-auto">
              {showQuiz ? (
                <div className="flex flex-col items-center">
                  <div className="mb-12 text-center">
                    <h2 className="text-4xl font-black mb-4 tracking-tight">Personalise Your Session</h2>
                    <p className="text-slate-400 font-medium">Our AI needs 30 seconds to match 500+ events to your career goals.</p>
                  </div>
                  <OnboardingQuiz onComplete={handleQuizComplete} />
                </div>
              ) : userProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                      <div className="flex items-center gap-3 text-emerald-400 font-black uppercase tracking-widest text-xs mb-4">
                        <CheckCircle2 className="w-5 h-5" />
                        Smart Match Active
                      </div>
                      <h2 className="text-5xl font-black tracking-tight">
                        Matched for {userProfile.branch} <br />
                        <span className="text-slate-500">in {userProfile.city}</span>
                      </h2>
                    </div>
                    <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800" onClick={() => setShowQuiz(true)}>
                      Refine Profile
                    </Button>
                  </div>

                  {loading ? (
                    <div className="flex items-center justify-center h-64">
                      <div className="text-slate-500 font-bold">Loading matched events...</div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {events.map((event, idx) => (
                        <EventCard key={event.id || idx} event={event} />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* Pillars Section */}
      <section id="features" className="px-8 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Core Intelligence</h2>
            <h3 className="text-5xl font-black tracking-tighter">The 5 Pillars of ACE IQ</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-3">
              {pillars.map((pillar, index) => (
                <button
                  key={index}
                  onClick={() => setActivePillar(index)}
                  className={cn(
                    "w-full p-6 rounded-2xl transition-all text-left flex items-center gap-4 group backdrop-blur-xl",
                    activePillar === index 
                      ? 'bg-white/80 text-slate-900 shadow-2xl shadow-indigo-500/20 border border-indigo-500/30' 
                      : 'hover:bg-white/30 text-slate-700 bg-white/10 border border-white/20'
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                    activePillar === index ? pillar.color + " text-white" : "bg-slate-100 group-hover:bg-slate-200"
                  )}>
                    {pillar.icon}
                  </div>
                  <span className="font-black tracking-tight uppercase text-sm">{pillar.title}</span>
                </button>
              ))}
            </div>

            <Card className="lg:col-span-8 p-12 bg-white/80 backdrop-blur-xl border-white/30 min-h-[400px] flex flex-col justify-center">
              <motion.div
                key={activePillar}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-2xl", pillars[activePillar].color)}>
                  {pillars[activePillar].icon}
                </div>
                <h3 className="text-4xl font-black mb-6 tracking-tight">{pillars[activePillar].title}</h3>
                <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10 max-w-xl">
                  {pillars[activePillar].description}
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-slate-900">
                      {activePillar === 0 ? '500+' : activePillar === 1 ? '< 60s' : activePillar === 2 ? '98%' : activePillar === 3 ? '10s' : '5'}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {activePillar === 0 ? 'Daily Seeded' : activePillar === 1 ? 'Conversion' : activePillar === 2 ? 'Match Accuracy' : activePillar === 3 ? 'Auto-fill' : 'Signals'}
                    </span>
                  </div>
                  <div className="h-10 w-[1px] bg-slate-200" />
                  <Button variant="ghost" className={cn("gap-2 p-0 hover:bg-transparent", pillars[activePillar].accent)}>
                    Read Technical Whitepaper <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            </Card>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="px-8 py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Implementation</h2>
            <h3 className="text-5xl font-black tracking-tighter text-slate-900">3-Phase Roadmap</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/30 -translate-y-1/2 hidden md:block -z-10" />
            {roadmap.map((phase, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-8 h-full border-white/30 relative bg-white/80 backdrop-blur-xl group hover:border-indigo-600 transition-colors">
                  <div className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full absolute -top-3 left-8 uppercase tracking-widest shadow-lg">
                    {phase.phase}
                  </div>
                  <h4 className="text-xl font-black mb-6 text-slate-900 pt-2">{phase.title}</h4>
                  <ul className="space-y-4">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm font-medium text-slate-500">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="px-8 py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">System Architecture</h2>
              <h3 className="text-5xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.9]">Built for <br />Scalability.</h3>
              <p className="text-lg text-slate-700 font-medium mb-12">
                ACE IQ uses a modular 4-layer architecture, combining Python-based AI microservices with a high-performance React frontend.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Core Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {['FastAPI', 'React', 'Firebase', 'Redis'].map(tech => (
                      <span key={tech} className="bg-white/70 text-slate-700 px-3 py-1 rounded-lg text-xs font-bold border border-white/30 backdrop-blur-md">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">AI Tools</div>
                  <div className="flex flex-wrap gap-2">
                    {['spaCy', 'Tesseract', 'Scikit-learn', 'TensorFlow'].map(tech => (
                      <span key={tech} className="bg-indigo-50/80 text-indigo-700 px-3 py-1 rounded-lg text-xs font-bold border border-indigo-100/50 backdrop-blur-md">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full grid grid-cols-1 gap-4">
              {[
                { label: "Data Layer", desc: "Crawler, OCR Engine, User Profile DB", icon: <Layers className="w-5 h-5" /> },
                { label: "Processing Layer", desc: "NLP Classifier, Match Score Engine, Nudges", icon: <Cpu className="w-5 h-5" /> },
                { label: "Application Layer", desc: "React Web App, Zuzu 2.0 UI", icon: <Terminal className="w-5 h-5" /> },
                { label: "Output Layer", desc: "Personalised Feeds, Engagement Nudges", icon: <Sparkles className="w-5 h-5" /> },
              ].map((layer, i) => (
                <Card key={i} className="p-6 border-white/30 bg-white/80 backdrop-blur-xl flex items-center gap-6 group hover:shadow-xl transition-all">
                  <div className="bg-indigo-600 text-white p-3 rounded-2xl group-hover:scale-110 transition-transform shadow-lg">
                    {layer.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900">{layer.label}</h4>
                    <p className="text-sm text-slate-600 font-medium">{layer.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="px-8 py-32 text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="text-sm font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">The Innovators</h2>
              <h3 className="text-6xl font-black tracking-tighter">Team Alpha's</h3>
            </div>
            <div className="text-right">
              <div className="text-indigo-400 font-black text-lg">Domain 3</div>
              <div className="text-slate-400 font-medium">EdTech Solutions</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700 hover:border-indigo-500 transition-colors group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-700 flex items-center justify-center mb-6 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-black mb-1 group-hover:text-indigo-400 transition-colors">{member.name}</h4>
                  <div className="text-indigo-400 font-bold text-xs uppercase tracking-widest mb-4">{member.role}</div>
                  <div className="space-y-1 pt-4 border-t border-slate-700">
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <GraduationCap className="w-3 h-3" />
                      {member.designation}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      {member.college}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-20 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-black tracking-tighter">ACE IQ</span>
              </div>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Empowering AllCollegeEvent.com with state-of-the-art AI intelligence for the next generation of campus leaders.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
              <div className="space-y-4">
                <h4 className="font-black text-xs uppercase tracking-widest text-slate-400">Platform</h4>
                <ul className="text-sm font-bold text-slate-600 space-y-2">
                  <li className="hover:text-indigo-600 cursor-pointer transition-colors">Events Feed</li>
                  <li className="hover:text-indigo-600 cursor-pointer transition-colors">Organizer Portal</li>
                  <li className="hover:text-indigo-600 cursor-pointer transition-colors">Leaderboards</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-black text-xs uppercase tracking-widest text-slate-400">Team Alpha's</h4>
                <ul className="text-sm font-bold text-slate-600 space-y-2">
                  <li className="hover:text-indigo-600 cursor-pointer transition-colors">About Us</li>
                  <li className="hover:text-indigo-600 cursor-pointer transition-colors">Hackathon 360</li>
                  <li className="hover:text-indigo-600 cursor-pointer transition-colors">Documentation</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">© 2026 Team Alpha's | Narnarayan Shastri Institute of Technology, Ahmedabad</p>
            <div className="flex items-center gap-6">
              <Github className="w-5 h-5 text-slate-300 hover:text-slate-900 cursor-pointer transition-colors" />
              <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                Version 2.0.0 Stable
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Zuzu 2.0 Chatbot */}
      <ZuzuChat />
      </div>
    </div>
  );
}

export default App;
