"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React from "react";
import portfolioData from "../data/portfolio.json"; // Successfully importing your JSON data
// --- 3D PROJECT CARD COMPONENT ---
function ProjectCard({ project, index }: { project: any; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl hover:bg-zinc-900/60 transition-colors duration-300 flex flex-col justify-between h-[320px]"
      >
        <div style={{ transform: "translateZ(40px)" }}>
          <h3 className="text-2xl font-bold mb-4 group-hover:text-[#ab1bda] transition-colors">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tag: string) => (
              <span key={tag} className="px-3 py-1 bg-black border border-zinc-800 text-xs font-mono text-zinc-500 rounded-lg">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- MAIN PAGE LAYOUT ---
export default function Home() {
  // Combine languages and technologies into one array for the skills section
  const combinedSkills = [
    ...portfolioData.skills.languages, 
    ...portfolioData.skills.technologies
  ];

  return (
    <>
    {/* making the backgroung grid separate */}
    <div className="fixed inset-0 z-[-1] flex items-center justify-center pointer-events-none bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-[10%] left-[10%] w-[50vw] h-[50vh] bg-blue-700/40 blur-[100px] rounded-full mix-blend-screen"></div>
        <div className="absolute top-[30%] left-[40%] w-[40vw] h-[40vh] bg-[#ab1bda]/60 blur-[90px] rounded-full mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vh] bg-cyan-400/30 blur-[80px] rounded-full mix-blend-screen"></div>
      </div>
    <main className="relative min-h-screen px-6 md:px-24 max-w-7xl mx-auto space-y-32 py-20 overflow-hidden">
      
      {/* RADIANT AMBIENT GLOW */}
      

      {/* HERO SECTION */}
      {/* HERO SECTION (Split Layout) */}
      <section className="min-h-[80vh] flex items-center pt-20 lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* Left Column: Text & Calls to Action */}
          <div className="space-y-8">
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#ab1bda]/10 border border-[#ab1bda]/30"
            > */}
              {/* <div className="h-1.5 w-1.5 rounded-full bg-[#ab1bda] animate-pulse" />
              <span className="text-[#ab1bda] text-xs font-mono tracking-wider uppercase">
                Available for Opportunities
              </span> */}
            {/* </motion.div> */}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">
                {portfolioData.personal.name}
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ab1bda] to-blue-500">
                Software Engineer<br /> & Deep Learning Enthusiast
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-zinc-400 max-w-lg text-lg leading-relaxed"
            >
              {portfolioData.personal.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              {/* This button can link down to your resume section */}
              <a href="/Arpan_Chatterjee_resume.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors">
                View my Resume
              </a>
              <a href={`mailto:${portfolioData.personal.email}`} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-transparent border border-zinc-700 hover:border-zinc-500 text-white font-semibold rounded-lg transition-colors">
                Get in touch (Email)
              </a>
            </motion.div>
          </div>

          {/* Right Column: Floating Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            {/* INCREASED: max-w-sm -> max-w-md, p-8 -> p-10 */}
            <div className="w-full max-w-md p-10 bg-zinc-900/40 border border-zinc-800 rounded-3xl backdrop-blur-sm flex flex-col items-center text-center shadow-2xl shadow-black/50">
              
              {/* INCREASED: w-32 h-32 -> w-40 h-40, mb-6 -> mb-8 */}
              <div className="w-40 h-40 rounded-full border-2 border-[#ab1bda] p-1.5 mb-8">
                <div className="w-full h-full rounded-full bg-zinc-800 overflow-hidden relative">
                  {/* IMPORTANT: Place a picture named 'profile.jpg' in your /public folder, or this will just show a grey circle */}
                  <img 
                    src="/profile.jpg"  //profile picture path (e.g., "/profile.jpg")
                    alt={portfolioData.personal.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image isn't found
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
                    
              {/* INCREASED: text-xl -> text-2xl */}
              <h3 className="text-2xl font-bold text-white mb-2">{portfolioData.personal.name}</h3>
              {/* INCREASED: text-xs -> text-sm */}
              <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
                B.Tech (CSE) student • Software Engineer • AI Enthusiast
              </p>
                          
              <div className="flex gap-4 w-full">
                {/* INCREASED: py-2 -> py-3 */}
                <a href="https://github.com/arpan2411" target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold rounded-xl transition-colors">
                  GitHub 
                </a>
                <a href="https://linkedin.com/in/arpan-chatterjee2003" target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-[#ab1bda]/10 border border-[#ab1bda]/30 hover:bg-[#ab1bda]/20 text-[#ab1bda] text-sm font-semibold rounded-xl transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section className="py-20" id="about">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Section Heading */}
            <div className="space-y-4">
              <h4 className="text-[#ab1bda] text-sm font-mono tracking-widest uppercase">
                01 — About Me
              </h4>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Who I am</h2>
              <div className="w-12 h-1 bg-[#ab1bda] rounded-full"></div>
            </div>

            {/* Paragraphs */}
            <div className="text-zinc-400 space-y-4 leading-relaxed text-lg">
              <p>
                Hi, I am <span className="text-white font-semibold">{portfolioData.personal.name}</span> — a B.Tech in CS student with a genuine passion for building intelligent systems and scalable applications.
              </p>
              <p>
                I play with <span className="text-white font-semibold">Softwares</span>, to build solutions that are not only efficient but also able to handle massive users. 
              </p>
              <p>
                Beyond core development (backend), I am deeply curious about <span className="text-white font-semibold">System Design</span> and how it is helping us to handle the massive amount of users with minimum downtime of server
              </p>
              <p>
                Apart from that I love  <span className="text-white font-semibold">Deep Learning</span> and its beauty to solve complex real world problems like humans by using its Human inspired neurons
              </p>
            </div>
          </motion.div>

          {/* Right Column: Stats Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {[
              { value: "4+", label: "Projects Built" },
              { value: "6+", label: "Skills Mastered" },
              { value: "Deep Learning", label: "Area of Interest" },
              { value: "India", label: "Based in" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                className="py-10 px-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl flex flex-col items-center justify-center text-center hover:bg-zinc-900/60 hover:border-zinc-700 transition-all duration-300 backdrop-blur-sm"
              >
                <h3 className="text-4xl font-bold text-[#ab1bda] mb-3">
                  {stat.value}
                </h3>
                <p className="text-sm text-zinc-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="space-y-10" id="experience">
        {/* Section Header */}
        <div className="space-y-4">
          <h4 className="text-[#ab1bda] text-sm font-mono tracking-widest uppercase">
            02 — Career
          </h4>
          <h2 className="text-4xl font-bold text-white">Experience</h2>
          <div className="w-12 h-1 bg-[#ab1bda] rounded-full"></div>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {portfolioData.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 md:p-10 bg-zinc-900/30 border border-zinc-800 rounded-3xl hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                  <p className="text-zinc-400 text-lg">{exp.company} <span className="text-zinc-600 mx-2">•</span> {exp.location}</p>
                </div>
                
                {/* Timeline Pill */}
                <div className="inline-flex items-center px-4 py-2 bg-[#ab1bda]/10 border border-[#ab1bda]/20 text-[#ab1bda] text-sm font-mono rounded-full whitespace-nowrap h-fit">
                  {exp.timeline}
                </div>
              </div>
              
              {/* Job Highlights */}
              <ul className="space-y-3 text-zinc-400">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#ab1bda] mt-1.5 text-xs">▹</span>
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section className="space-y-10" id="education">
        {/* Section Header */}
        <div className="space-y-4">
          <h4 className="text-[#ab1bda] text-sm font-mono tracking-widest uppercase">
            03 — Background
          </h4>
          <h2 className="text-4xl font-bold text-white">Education</h2>
          <div className="w-12 h-1 bg-[#ab1bda] rounded-full"></div>
        </div>

        {/* Education Cards */}
        <div className="space-y-6">
          {portfolioData.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 md:p-10 bg-zinc-900/30 border border-zinc-800 rounded-3xl hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                  <p className="text-zinc-400 text-lg">{edu.institution}</p>
                </div>
                
                {/* Timeline Pill */}
                <div className="inline-flex items-center px-4 py-2 bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm font-mono rounded-full whitespace-nowrap h-fit">
                  {edu.timeline}
                </div>
              </div>

              {/* GPA */}
              <div className="mb-8">
                <span className="text-sm font-semibold text-zinc-400">GPA:</span>
                <span className="text-white font-mono ml-2 bg-zinc-800 px-2 py-1 rounded-md">{edu.gpa}</span>
              </div>
              
              {/* Coursework Tags */}
              <div>
                <p className="text-sm text-zinc-500 mb-4 font-mono uppercase tracking-wider">Relevant Coursework</p>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((course, i) => (
                    <span key={i} className="px-3 py-1.5 bg-black/40 border border-zinc-800 text-xs text-zinc-400 rounded-lg">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TECHNICAL ARSENAL SECTION */}
      <section className="space-y-10" id="skills">
        {/* Section Header */}
        <div className="space-y-4">
          <h4 className="text-[#ab1bda] text-sm font-mono tracking-widest uppercase">
            04 — Capabilities
          </h4>
          <h2 className="text-4xl font-bold text-white">Technical Arsenal</h2>
          <div className="w-12 h-1 bg-[#ab1bda] rounded-full"></div>
        </div>

        {/* Skills Grid */}
        <div className="flex flex-wrap gap-3 md:gap-4">
          {combinedSkills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.03 }} // slightly faster stagger
              className="px-5 py-3 md:px-6 md:py-4 bg-zinc-900/30 border border-zinc-800 rounded-2xl text-zinc-300 font-mono text-sm hover:bg-[#ab1bda]/10 hover:border-[#ab1bda]/40 hover:text-[#ab1bda] transition-all duration-300 cursor-default backdrop-blur-sm shadow-sm"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="space-y-10" id="projects">
        {/* Section Header */}
        <div className="space-y-4">
          <h4 className="text-[#ab1bda] text-sm font-mono tracking-widest uppercase">
            05 — Portfolio
          </h4>
          <h2 className="text-4xl font-bold text-white">What I have built</h2>
          <div className="w-12 h-1 bg-[#ab1bda] rounded-full mb-6"></div>
          <p className="text-zinc-400 max-w-2xl text-lg">
            A selection of projects I have worked on — from machine learning models to full-stack applications.
          </p>
        </div>

        {/* Projects Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative flex flex-col h-full p-8 bg-zinc-900/40 border border-zinc-800 rounded-2xl hover:bg-zinc-900/60 transition-all duration-300 overflow-hidden backdrop-blur-sm"
            >
              {/* Glowing Top Border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ab1bda] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Project Number */}
              <div className="text-[#ab1bda] text-xs font-mono tracking-widest uppercase mb-4">
                Project 0{index + 1}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#ab1bda] transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                {project.description}
              </p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.techStack.map((tech: string) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1 bg-[#ab1bda]/10 border border-[#ab1bda]/20 text-zinc-300 text-xs font-mono rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Link */}
              <div className="mt-auto pt-4 border-t border-zinc-800/50">
                <a 
                  href="#" 
                  className="inline-flex items-center text-sm font-semibold text-white hover:text-[#ab1bda] transition-colors"
                >
                  View on GitHub <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOBBIES & INTERESTS SECTION */}
      <section className="space-y-10" id="hobbies">
        {/* Section Header */}
        <div className="space-y-4">
          <h4 className="text-[#ab1bda] text-sm font-mono tracking-widest uppercase">
            06 — Beyond the Screen
          </h4>
          <h2 className="text-4xl font-bold text-white">Interests & Hobbies</h2>
          <div className="w-12 h-1 bg-[#ab1bda] rounded-full"></div>
        </div>

        {/* Hobbies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.hobbies.map((hobby, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl hover:bg-zinc-900/50 hover:border-[#ab1bda]/50 transition-all duration-300 backdrop-blur-sm flex flex-col items-center text-center"
            >
              {/* Animated Emoji Icon */}
              <div className="text-5xl mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 drop-shadow-lg">
                {hobby.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#ab1bda] transition-colors">
                {hobby.name}
              </h3>
              
              <p className="text-zinc-400 text-sm leading-relaxed">
                {hobby.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER / CONTACT SECTION */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-32 mt-20 border-t border-zinc-800/50 flex flex-col items-center text-center relative"
        id="contact"
      >
        {/* Subtle background glow for the footer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#ab1bda]/10 blur-[100px] pointer-events-none"></div>

        <h4 className="text-[#ab1bda] text-sm font-mono tracking-widest uppercase mb-6">
          07 — What's Next?
        </h4>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Let's build something <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ab1bda] to-blue-500">
            incredible together.
          </span>
        </h2>

        <p className="text-zinc-400 max-w-xl text-lg mb-10 leading-relaxed">
          Whether you have an opportunity, a project idea, or just want to chat about machine learning and code, my inbox is always open.
        </p>

        <a 
          href="https://wa.me/919434149291?text=Hello"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-[#ab1bda] hover:bg-[#8a14b0] text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(171,27,218,0.3)] flex items-center gap-2"
        >
          Say Hello <span className="text-xl">💬</span>
        </a>

        {/* Bottom Credits Line */}
        <div className="mt-20 flex flex-col items-center space-y-2 text-zinc-600 text-sm font-mono">
          <a href={`mailto:${portfolioData.personal.email}`} className="hover:text-[#ab1bda] transition-colors">
            {portfolioData.personal.email}
          </a>
          <p>© {new Date().getFullYear()} {portfolioData.personal.name}. Built with Next.js.</p>
        </div>
      </motion.section>

    </main>
    </>
  );
}