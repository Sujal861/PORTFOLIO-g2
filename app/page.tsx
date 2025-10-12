"use client"

import type React from "react"
import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  Bot as Robot,
  Code,
  Cpu,
  Zap,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Send,
  Eye,
  Wrench,
  Brain,
  Monitor,
  Users,
  Award,
  Calendar,
  Building,
  CheckCircle,
  Star,
  Trophy,
  GraduationCap,
  Settings,
  BookOpen,
  Target,
  Cog,
  Database,
  Wifi,
  Layers,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Shield,
  PlayCircle,
  Film,
  ShoppingCart,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/theme-toggle"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Resume public path
const RESUME_PATH = "/resume/Sujal_Gupta_Resume.pdf"

type SectionId = "hero" | "about" | "experience" | "education" | "projects" | "skills" | "certifications" | "contact"

const sections: { id: SectionId; label: string }[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
]

export default function RoboticPortfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<SectionId>("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resumeReady, setResumeReady] = useState<boolean | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const { toast } = useToast()
  const lastYRef = useRef(0) // kept if needed later

  // Intersection observer for active section highlighting
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id") as SectionId | null
            if (id) setActiveSection(id)
          }
        })
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0.2 },
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // Navbar scrolled bg effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    const original = document.body.style.overflow
    if (mobileMenuOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = original || ""
    return () => {
      document.body.style.overflow = original || ""
    }
  }, [mobileMenuOpen])

  // Verify resume endpoint exists so buttons don't error
  useEffect(() => {
    let cancelled = false
    async function checkPdf() {
      try {
        const res = await fetch(RESUME_PATH, { method: "HEAD", cache: "no-store" })
        if (!cancelled) setResumeReady(res.ok)
      } catch {
        if (!cancelled) setResumeReady(false)
      }
    }
    checkPdf()
    return () => {
      cancelled = true
    }
  }, [])

  // Track active section based on scroll (duplicate logic, intersection observer is preferred)
  // useEffect(() => {
  //   const sections = ["hero", "about", "experience", "education", "projects", "skills", "certifications", "contact"]
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY + 120 // Offset for fixed nav
  //     for (const section of sections) {
  //       const element = document.getElementById(section)
  //       if (element) {
  //         const { offsetTop, offsetHeight } = element
  //         if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
  //           setActiveSection(section as SectionId)
  //           break
  //         }
  //       }
  //     }
  //   }
  //   window.addEventListener("scroll", handleScroll, { passive: true })
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" })
    setMobileMenuOpen(false)
  }

  // Move the nav useMemo block so it runs before the early return. Insert the following code RIGHT AFTER the scrollToSection function and BEFORE the experiences array:
  const nav = useMemo(
    () =>
      sections.map(({ id, label }) => {
        const isActive = activeSection === id
        return (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "px-3 py-2 rounded-sm text-sm manga-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black relative",
              "hover:text-black",
              isActive
                ? "text-black font-extrabold bg-amber-300 border-2 border-black rounded shadow-[3px_3px_0_#000]"
                : "text-gray-700 hover:bg-gray-100",
            )}
          >
            {label}
            {isActive && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />}
          </button>
        )
      }),
    [activeSection],
  )

  const handleViewResume = () => {
    if (resumeReady === false) {
      toast({
        title: "Resume Not Found",
        description: "The resume file is not available right now. Please try again later.",
        variant: "destructive",
      })
      return
    }
    const newWindow = window.open(RESUME_PATH, "_blank", "noopener,noreferrer")
    if (!newWindow) {
      toast({
        title: "Popup Blocked",
        description: "Please allow popups to view the resume.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Resume Opened! 👁️",
        description: "Your resume is now open in a new tab.",
      })
    }
  }

  const experiences = [
    {
      title: "Vice Secretary",
      company: "BTI Students' Club",
      duration: "Dec 2024 – Present",
      location: "Bengaluru, Karnataka",
      description: [
        "Coordinated over 10+ student-driven technical and non-technical events, enhancing engagement and participation.",
        "Managed cross-departmental collaboration to support innovation focused activities like Ideathons and tech fests.",
      ],
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-400 to-purple-600",
      mangaEffect: "LEADERSHIP POWER!",
    },
    {
      title: "Robotics Intern",
      company: "Kodacy",
      duration: "Feb 2025 – Apr 2025",
      location: "Remote",
      description: [
        "Assisted in developing and testing robotic algorithms for autonomous navigation and sensor integration.",
        "Contributed to simulation workflows using Python and ROS (Robot Operating System).",
        "Documented and presented findings weekly, gaining practical experience in real-world robotics applications.",
      ],
      icon: <Robot className="w-6 h-6" />,
      color: "from-green-400 to-blue-600",
      mangaEffect: "ROBOT MASTERY!",
    },
    {
      title: "Robotics Project Lead",
      company: "Bangalore Technological Institute",
      duration: "Dec 2023",
      location: "Bangalore",
      description: [
        "Led a team to design and build the R C Robot (Kalabhairav), integrating electronic components.",
        "Presented project outcomes at university technical symposiums.",
      ],
      icon: <Trophy className="w-6 h-6" />,
      color: "from-yellow-400 to-orange-600",
      mangaEffect: "VICTORY!",
    },
  ]

  const education = {
    degree: "Bachelor of Engineering in Robotics & AI",
    university: "Bangalore Technological Institute",
    duration: "2022 - 2026 (Expected)",
    gpa: "9.0/10.0",
    highlights: [
      "Specialized in autonomous systems, machine learning, and intelligent robotics.",
      "Relevant coursework: Advanced Robotics, AI Algorithms, Computer Vision, Embedded Systems.",
      "Actively participated in robotics club and inter-university hackathons.",
    ],
  }

  const projects = [
    {
      title: "TriPUS Store",
      description:
        "E‑commerce application showcasing a modern store experience with product browsing, cart, and checkout flows.",
      tech: ["React", "Node.js", "Express", "MongoDB"],
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "from-rose-400 to-fuchsia-600",
      category: "Web App",
      mangaEffect: "E-COMMERCE!",
      githubLink: "https://github.com/Sujal861/Tripus-Store.git",
    },
    {
      title: "R C Robot (Kalabhairav)",
      description:
        "Designed and built a remote-controlled robotic system, integrating advanced mechanical and electronic components. Led team presentation at university technical symposiums.",
      tech: ["Arduino", "Mechanical Design", "Electronics", "C++"],
      icon: <Robot className="w-6 h-6" />,
      color: "from-cyan-400 to-blue-600",
      category: "Robotics",
      mangaEffect: "MECHA POWER!",
    },
    {
      title: "Smart Monitoring System",
      description:
        "Developed an IoT-based monitoring solution using Arduino for real-time data collection and environmental analysis with wireless connectivity.",
      tech: ["Arduino", "IoT", "Python", "Sensors"],
      icon: <Monitor className="w-6 h-6" />,
      color: "from-green-400 to-teal-600",
      category: "IoT",
      mangaEffect: "SENSOR NETWORK!",
    },
    {
      title: "The Best AI Mentor",
      description:
        "AI-powered wearable application that listens continuously and provides real-time personalized advice via in-app notifications using generative AI techniques.",
      tech: ["TypeScript", "AI/ML", "Mobile Dev", "Generative AI"],
      icon: <Brain className="w-6 h-6" />,
      color: "from-purple-400 to-pink-600",
      category: "AI/ML",
      mangaEffect: "AI AWAKENING!",
      githubLink: "https://github.com/Sujal861/Omi-Mentor.git",
    },
    {
      title: "Hiring AI Platform",
      description:
        "Collaborated on an AI-driven recruitment platform to optimize candidate selection processes with automated resume screening and ML algorithms.",
      tech: ["Machine Learning", "Frontend", "Backend", "AI"],
      icon: <Users className="w-6 h-6" />,
      color: "from-orange-400 to-red-600",
      category: "AI/ML",
      mangaEffect: "TALENT SCOUT!",
    },
    {
      title: "AMR-Simulation",
      description:
        "Advanced Autonomous Mobile Robot simulation project featuring path planning, obstacle avoidance, and navigation algorithms. Implemented comprehensive robotics simulation environment for testing AMR capabilities using Bullet Physics engine.",
      tech: ["ROS", "Python", "Simulation", "Path Planning", "Robotics", "Bullet Physics"],
      icon: <Robot className="w-6 h-6" />,
      color: "from-indigo-400 to-purple-600",
      category: "Robotics",
      mangaEffect: "AMR POWER!",
      githubLink: "https://github.com/Sujal861/AMR-Simulation.git",
      images: [
        {
          src: "/images/projects/amr-simulation-1.png",
          alt: "AMR Robot navigating in 3D simulation environment with obstacle avoidance",
          caption: "Autonomous navigation with obstacle detection",
        },
        {
          src: "/images/projects/amr-simulation-2.png",
          alt: "AMR Robot demonstrating path planning capabilities",
          caption: "Advanced path planning algorithms in action",
        },
        {
          src: "/images/projects/amr-simulation-3.png",
          alt: "Bullet Physics ExampleBrowser interface showing robotics control simulation",
          caption: "Full simulation environment with physics engine",
        },
      ],
    },
    {
      title: "Web Watch Phish",
      description:
        "Advanced phishing detection and web security monitoring system built during ChipChamps AMUHACKS4.0. Features real-time URL analysis, machine learning-based threat detection, and comprehensive security reporting for enhanced web browsing safety.",
      tech: ["Python", "Machine Learning", "Web Security", "Flask", "JavaScript", "Cybersecurity"],
      icon: <Shield className="w-6 h-6" />,
      color: "from-red-400 to-orange-600",
      category: "Cybersecurity",
      mangaEffect: "SECURITY SHIELD!",
      githubLink: "https://github.com/Sujal861/ChipChamps_AMUHACKS4.0.git",
      images: [
        {
          src: "/images/projects/web-watch-phish-1.png",
          alt: "Web Watch Phish cybersecurity interface showing URL safety checker and threat detection features",
          caption: "Advanced AI-powered phishing detection with real-time monitoring",
        },
      ],
    },
    {
      title: "Webots Intelligent Navigation",
      description:
        "Built and tuned behaviors for the e-puck robot in Webots, demonstrating autonomous navigation and sensor-driven control.",
      tech: ["Webots", "C", "Robotics", "Sensors"],
      icon: <Robot className="w-6 h-6" />,
      color: "from-teal-400 to-emerald-600",
      category: "Robotics",
      mangaEffect: "SIMULATION!",
      githubLink:
        "https://www.linkedin.com/posts/sujalgupta352_robotics-webots-epuck-activity-7377773374900486144-igbg?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEAPEqwBeIO75JqhpmqPEECNHh_RcopKisM",
      videos: [
        {
          src: "/videos/webots-intelligent-navigation.mp4",
          type: "video/mp4",
          caption: "Autonomous navigation demo in Webots (e-puck)",
        },
      ],
    },
    {
      title: "Webots line following",
      description:
        "Created automation workflows and robot task orchestration in Webots with repeatable simulations and structured behaviors.",
      tech: ["Webots", "Automation", "Python", "Simulation"],
      icon: <Cog className="w-6 h-6" />,
      color: "from-amber-400 to-red-600",
      category: "Robotics",
      mangaEffect: "AUTOMATION!",
      githubLink:
        "https://www.linkedin.com/posts/sujalgupta352_robotics-automation-webots-activity-7375047524149071872-mLRj?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEAPEqwBeIO75JqhpmqPEECNHh_RcopKisM",
      videos: [
        {
          src: "/videos/webots-line-following.mp4",
          type: "video/mp4",
          caption: "Line-following behavior in Webots",
        },
      ],
    },
    {
      title: "Quadruped Robot (Spot‑Inspired!)",
      description:
        "Modeled robotic assemblies and parts in Autodesk Fusion 360, exploring constraints and manufacturable geometry for mechanisms.",
      tech: ["Fusion 360", "CAD", "Mechanical Design"],
      icon: <Wrench className="w-6 h-6" />,
      color: "from-purple-400 to-pink-600",
      category: "Mechanical Design",
      mangaEffect: "MECH DESIGN!",
      githubLink:
        "https://www.linkedin.com/posts/sujalgupta352_roboticsdesign-mechanicalengineering-fusion360-activity-7370520603805675520-no-e?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEAPEqwBeIO75JqhpmqPEECNHh_RcopKisM",
      videos: [
        {
          src: "/videos/quadruped-spot-inspired.mp4",
          type: "video/mp4",
          caption: "Quadruped gait and articulation showcase",
        },
      ],
    },
  ]

  const skills = [
    { name: "Python", level: 90, icon: <Code className="w-5 h-5" />, color: "from-yellow-400 to-green-500" },
    { name: "C++", level: 85, icon: <Code className="w-5 h-5" />, color: "from-blue-400 to-purple-500" },
    { name: "Robotic Perception", level: 88, icon: <Eye className="w-5 h-5" />, color: "from-cyan-400 to-blue-500" },
    { name: "Mechanical Design", level: 82, icon: <Wrench className="w-5 h-5" />, color: "from-orange-400 to-red-500" },
    { name: "Arduino", level: 90, icon: <Cpu className="w-5 h-5" />, color: "from-teal-400 to-green-500" },
    { name: "ROS", level: 75, icon: <Robot className="w-5 h-5" />, color: "from-purple-400 to-pink-500" },
    { name: "Fusion 360", level: 80, icon: <Wrench className="w-5 h-5" />, color: "from-indigo-400 to-blue-500" },
    {
      name: "Electrical Engineering",
      level: 85,
      icon: <Zap className="w-5 h-5" />,
      color: "from-yellow-400 to-orange-500",
    },
  ]

  const certifications = [
    {
      name: "Robotics Virtual Internship Certificate",
      organization: "Kodacy & SPACE",
      date: "Feb 2025",
      level: "Professional",
      category: "Robotics",
      icon: <Robot className="w-6 h-6" />,
      description:
        "Successfully completed a 15-day virtual internship program on 'ROBOTICS' conducted by KODACY in association with Scientific Platforms And Cosmic Explorations (SPACE). Gained hands-on experience in robotics fundamentals and practical applications.",
      color: "from-blue-400 to-cyan-600",
      image: "/images/certificates/kodacy-robotics-internship.png",
    },
    {
      name: "Build Real World AI Applications with Gemini and Imagen",
      organization: "Google Cloud",
      date: "2024",
      level: "Introductory",
      category: "AI Development",
      icon: <Zap className="w-6 h-6" />,
      description:
        "Google Cloud skill badge for building real-world AI applications using Gemini and Imagen technologies. Covers introductory concepts in Machine Learning & AI application development.",
      color: "from-orange-400 to-red-600",
      image: "/images/certificates/google-gemini-imagen-real-world.png",
    },
    {
      name: "Develop GenAI Apps with Gemini and Streamlit",
      organization: "Google Cloud",
      date: "2024",
      level: "Intermediate",
      category: "App Development",
      icon: <Monitor className="w-6 h-6" />,
      description:
        "Intermediate-level Google Cloud skill badge for developing generative AI applications using Gemini API and Streamlit framework. Focuses on practical implementation of GenAI solutions.",
      color: "from-indigo-400 to-purple-600",
      image: "/images/certificates/google-gemini-streamlit-apps.png",
    },
    {
      name: "MoE's Innovation Ambassador (IA) Training - Foundation Level",
      organization: "Ministry of Education, India",
      date: "2024",
      level: "Foundation",
      category: "Innovation & Leadership",
      icon: <Trophy className="w-6 h-6" />,
      description:
        "Foundation level training program focusing on innovation methodologies and leadership in educational technology as part of MoE's Innovation Cell & AICTE initiative.",
      color: "from-yellow-400 to-orange-600",
      image: "/images/certificates/moe-innovation-ambassador-foundation.png",
    },
    {
      name: "MoE's Innovation Ambassador (IA) Training - Advanced Level",
      organization: "Ministry of Education, India",
      date: "2024",
      level: "Advanced",
      category: "Innovation & Leadership",
      icon: <Trophy className="w-6 h-6" />,
      description:
        "Advanced level Innovation Ambassador training program focusing on innovation methodologies and leadership in educational technology as part of MoE's Innovation Cell & AICTE initiative.",
      color: "from-yellow-400 to-orange-600",
      image: "/images/certificates/moe-innovation-ambassador-advanced.png",
    },
    {
      name: "MoE's Innovation Ambassador (IA) Training - Advanced Level 2",
      organization: "Ministry of Education, India",
      date: "2024",
      level: "Advanced",
      category: "Innovation & Leadership",
      icon: <Trophy className="w-6 h-6" />,
      description:
        "Second advanced level Innovation Ambassador certification demonstrating continued excellence in innovation leadership and educational technology advancement through MoE's comprehensive training program.",
      color: "from-yellow-400 to-orange-600",
      image: "/images/certificates/moe-innovation-ambassador-advanced-2.png",
    },
    {
      name: "Generative AI Model Development",
      organization: "NxtWave",
      date: "2024",
      level: "Professional",
      category: "Artificial Intelligence",
      icon: <Brain className="w-6 h-6" />,
      description:
        "Advanced certification in developing and implementing generative AI models and applications through hands-on workshop 'AI for Students: Build Your Own Generative AI Model'.",
      color: "from-purple-400 to-pink-600",
      image: "/images/certificates/nxtwave-generative-ai.png",
    },
    {
      name: "Mechanics and Control of Robotic Manipulator",
      organization: "NPTEL - IIT Palakkad",
      date: "Jul-Sep 2024",
      level: "Advanced",
      category: "Robotics",
      icon: <Robot className="w-6 h-6" />,
      description:
        "NPTEL certification in robotic manipulator mechanics, kinematics, and control systems with consolidated score of 47%. 8-week comprehensive course covering advanced robotics concepts.",
      color: "from-blue-400 to-cyan-600",
      image: "/images/certificates/nptel-robotics-manipulators.png",
    },
    {
      name: "Prompt Design in Vertex AI",
      organization: "Google Cloud",
      date: "2024",
      level: "Professional",
      category: "AI/ML",
      icon: <Code className="w-6 h-6" />,
      description:
        "Google Cloud certification focusing on effective prompt engineering and AI model optimization using Vertex AI platform.",
      color: "from-green-400 to-teal-600",
      image: "/images/certificates/google-vertex-ai-prompt.png",
    },
    {
      name: "Comparative Analysis of Converter Techniques for Ripple Reduction",
      organization: "Zigma Medicare India",
      date: "Sep 2024",
      level: "Research",
      category: "Electrical Engineering",
      icon: <Cpu className="w-6 h-6" />,
      description:
        "Research-based certification focusing on power electronics and converter optimization techniques presented at International Conference on Engineering and Technology.",
      color: "from-cyan-400 to-blue-600",
      image: "/images/certificates/zigma-medicare-converter-techniques.png",
    },
    {
      name: "ROBORIKISHI Competition Participation",
      organization: "National Institute of Engineering",
      date: "Dec 2023",
      level: "Competition",
      category: "Robotics",
      icon: <Trophy className="w-6 h-6" />,
      description:
        "Certificate of participation in ROBORIKISHI, a national level robotics competition organized by Robotics Club @ NIE, demonstrating practical robotics skills and innovation.",
      color: "from-red-400 to-orange-600",
      image: "/images/certificates/roborikishi-participation.png",
    },
    {
      name: "Advanced Robotics Applications",
      organization: "NPTEL - IIT Kanpur",
      date: "Feb-Apr 2025",
      level: "Advanced",
      category: "Robotics",
      icon: <Wrench className="w-6 h-6" />,
      description:
        "NPTEL Elite certification in advanced robotics applications with consolidated score of 66%. Comprehensive 8-week course covering cutting-edge robotics applications and implementation strategies.",
      color: "from-pink-400 to-purple-600",
      image: "/images/certificates/advanced-robotics-nptel.png",
    },
    {
      name: "TCS iON Career Edge - Young Professional",
      organization: "Tata Consultancy Services",
      date: "May 2025",
      level: "Professional",
      category: "Career Development",
      icon: <GraduationCap className="w-6 h-6" />,
      description:
        "Comprehensive professional development certification covering Communication Skills, Presentation Skills, Career Guidance, Resume Writing, Interview Skills, Business Etiquette, and IT Foundational Skills.",
      color: "from-teal-400 to-green-600",
      image: "/images/certificates/tcs-career-edge-certificate.png",
    },
  ]

  const certificationCategories = [
    "All",
    "Artificial Intelligence",
    "Robotics",
    "AI/ML",
    "Innovation & Leadership",
    "Electrical Engineering",
    "Career Development",
    "AI Development",
    "App Development",
  ]

  const [selectedCategory, setSelectedCategory] = useState("All")
  const filteredCertifications =
    selectedCategory === "All" ? certifications : certifications.filter((cert) => cert.category === selectedCategory)

  // Project Image Gallery Component
  const ProjectImageGallery = ({ project }: { project: any }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    if (!project.images || project.images.length === 0) return null

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)

    return (
      <div className="mb-6">
        <div className="relative w-full h-48 rounded-lg overflow-hidden border-4 border-black bg-gray-100">
          <Image
            src={project.images[currentImageIndex].src || "/placeholder.svg?height=400&width=600&query=robotic+project"}
            alt={project.images[currentImageIndex].alt}
            fill
            className="object-cover transition-all duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {project.images.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-black rounded-full p-2 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4 text-black" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-black rounded-full p-2 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4 text-black" />
              </motion.button>
            </>
          )}

          {project.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
              {project.images.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full border border-black transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Zoom button */}
          <Dialog>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 right-2 p-2 bg-blue-500 text-white rounded-full border-2 border-black hover:bg-blue-600 transition-colors"
                aria-label="View full size image"
              >
                <ZoomIn className="w-4 h-4" />
              </motion.button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full p-0 bg-white border-8 border-black">
              <div className="relative">
                <div className="p-6 border-b-4 border-black bg-yellow-300">
                  <h3 className="text-2xl font-bold manga-title text-black">{project.title}</h3>
                  <p className="text-black font-bold">{project.images[currentImageIndex].caption}</p>
                </div>
                <div className="p-6">
                  <div className="relative w-full h-96 mb-4">
                    <Image
                      src={
                        project.images[currentImageIndex].src ||
                        "/placeholder.svg?height=800&width=1200&query=robotics+zoom" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg"
                      }
                      alt={project.images[currentImageIndex].alt}
                      fill
                      className="object-contain rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    />
                  </div>
                  <p className="text-black font-bold leading-relaxed">{project.images[currentImageIndex].caption}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <p className="text-sm text-black font-bold mt-2 text-center manga-text">
          {project.images[currentImageIndex].caption}
        </p>
      </div>
    )
  }

  // Project Video Gallery Component
  const ProjectVideoGallery = ({ project }: { project: any }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [errorIndexes, setErrorIndexes] = useState<Record<number, boolean>>({})

    if (!project.videos || project.videos.length === 0) return null

    const onVideoError = (idx: number) => {
      setErrorIndexes((prev) => ({ ...prev, [idx]: true }))
    }

    return (
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-black" />
          <span className="text-sm font-bold manga-text text-black">DEMO CLIPS</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {project.videos.map((video: { src: string; type: string; caption?: string }, idx: number) => (
            <div key={video.src} className="relative">
              <div className="relative w-full h-48 rounded-lg overflow-hidden border-4 border-black bg-gray-100">
                {errorIndexes[idx] ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white p-4 text-center">
                    <p className="text-black font-bold mb-3">Video unavailable here. Watch on LinkedIn instead.</p>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white border-4 border-black manga-text font-bold"
                      onClick={() =>
                        window.open(
                          project.githubLink || "https://www.linkedin.com/in/sujalgupta352/details/posts/",
                          "_blank",
                          "noopener,noreferrer",
                        )
                      }
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Watch on LinkedIn
                    </Button>
                  </div>
                ) : (
                  <video
                    className="h-full w-full object-cover"
                    src={video.src}
                    onError={() => onVideoError(idx)}
                    muted
                    playsInline
                    loop
                    autoPlay
                    controls
                  />
                )}

                {!errorIndexes[idx] && (
                  <Dialog open={openIndex === idx} onOpenChange={(o) => setOpenIndex(o ? idx : null)}>
                    <DialogTrigger asChild>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full border-2 border-black hover:bg-red-600 transition-colors"
                        aria-label="Open video"
                      >
                        <PlayCircle className="w-4 h-4" />
                      </motion.button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl w-[95vw] p-0 bg-white border-8 border-black">
                      <div className="p-4 border-b-4 border-black bg-yellow-300">
                        <h3 className="text-2xl font-bold manga-title text-black">{project.title}</h3>
                        {video.caption ? <p className="text-black font-bold">{video.caption}</p> : null}
                      </div>
                      <div className="p-4">
                        <div className="relative w-full aspect-video border-4 border-black rounded-lg bg-black">
                          <video className="h-full w-full" src={video.src} controls playsInline />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              {video.caption ? (
                <p className="text-sm text-black font-bold mt-2 text-center manga-text">{video.caption}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const CertificateModal = ({ cert }: { cert: any }) => (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-2 left-2 p-2 bg-blue-500 text-white rounded-full border-2 border-black hover:bg-blue-600 transition-colors z-10"
          aria-label={`View ${cert.name} certificate`}
        >
          <ZoomIn className="w-4 h-4" />
        </motion.button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl w-[95vw] h-[95vh] p-0 bg-white border-8 border-black">
        <div className="relative h-full flex flex-col">
          <div className="p-6 border-b-4 border-black bg-yellow-300 flex-shrink-0">
            <h3 className="text-3xl font-bold manga-title text-black mb-2">{cert.name}</h3>
            <p className="text-black font-bold text-lg">
              {cert.organization} • {cert.date}
            </p>
            <div className="flex items-center space-x-2 mt-3">
              <Badge className="bg-purple-300 text-black border-2 border-black manga-text font-bold">
                {cert.category}
              </Badge>
              <Badge className="bg-blue-300 text-black border-2 border-black manga-text font-bold">{cert.level}</Badge>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="relative w-full flex-1 mb-4 min-h-[500px]">
              <Image
                src={cert.image || "/placeholder.svg?height=900&width=1600&query=certificate+preview"}
                alt={`${cert.name} Certificate`}
                fill
                className="object-contain rounded-lg border-4 border-black"
                sizes="95vw"
                priority
              />
            </div>
            <div className="flex-shrink-0">
              <p className="text-black font-bold leading-relaxed text-lg">{cert.description}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  const MangaRobotIllustration = ({ className = "", size = 150 }: { className?: string; size?: number }) => (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-bounce"
      >
        <rect x="60" y="80" width="80" height="90" rx="15" fill="#ffffff" stroke="#000000" strokeWidth="4" />
        <rect x="70" y="40" width="60" height="50" rx="12" fill="#ffffff" stroke="#000000" strokeWidth="4" />
        <ellipse cx="85" cy="60" rx="8" ry="12" fill="#000000" />
        <ellipse cx="115" cy="60" rx="8" ry="12" fill="#000000" />
        <ellipse cx="85" cy="58" rx="4" ry="8" fill="#ffffff" />
        <ellipse cx="115" cy="58" rx="4" ry="8" fill="#ffffff" />
        <circle cx="87" cy="56" r="2" fill="#000000" />
        <circle cx="117" cy="56" r="2" fill="#000000" />
        <path d="M 90 72 Q 100 78 110 72" stroke="#000000" strokeWidth="3" fill="none" />
        <rect x="25" y="90" width="35" height="18" rx="9" fill="#ffffff" stroke="#000000" strokeWidth="3" />
        <rect x="140" y="90" width="35" height="18" rx="9" fill="#ffffff" stroke="#000000" strokeWidth="3" />
        <rect x="70" y="170" width="22" height="28" rx="8" fill="#ffffff" stroke="#000000" strokeWidth="3" />
        <rect x="108" y="170" width="22" height="28" rx="8" fill="#ffffff" stroke="#000000" strokeWidth="3" />
        <rect x="75" y="95" width="50" height="40" rx="8" fill="#f0f0f0" stroke="#000000" strokeWidth="2" />
        <circle cx="85" cy="110" r="4" fill="#ff0000" stroke="#000000" strokeWidth="2" />
        <circle cx="100" cy="110" r="4" fill="#00ff00" stroke="#000000" strokeWidth="2" />
        <circle cx="115" cy="110" r="4" fill="#0000ff" stroke="#000000" strokeWidth="2" />
        <line x1="100" y1="40" x2="100" y2="20" stroke="#000000" strokeWidth="4" />
        <circle cx="100" cy="20" r="6" fill="#ffff00" stroke="#000000" strokeWidth="3" />
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
            <line
              key={index}
              x1="100"
              y1="100"
              x2={100 + 80 * Math.cos((angle * Math.PI) / 180)}
              y2={100 + 80 * Math.sin((angle * Math.PI) / 180)}
              stroke="#000000"
              strokeWidth="1"
              opacity="0.3"
            />
          ))}
        </motion.g>
      </svg>
    </div>
  )

  const MangaSpeechBubble = ({ text, className = "" }: { text: string; className?: string }) => (
    <div className={`manga-bubble ${className}`}>
      <span className="manga-text text-lg">{text}</span>
    </div>
  )

  const MangaActionEffect = ({ effect, className = "" }: { effect: string; className?: string }) => (
    <motion.div
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`absolute bg-yellow-300 border-4 border-black rounded-lg px-3 py-1 ${className}`}
    >
      <span className="manga-text text-xl font-bold text-black">{effect}</span>
    </motion.div>
  )

  const MangaPanel = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`manga-panel p-6 rounded-lg ${className}`}>{children}</div>
  )

  const FloatingMangaElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-black/20 text-4xl manga-text"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6 + Math.random() * 4, repeat: Number.POSITIVE_INFINITY, delay: Math.random() * 2 }}
        >
          {["POW!", "BOOM!", "ZAP!", "TECH!", "CODE!"][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}
    </div>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center manga-speed-lines">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-24 h-24 border-8 border-black border-t-yellow-400 rounded-full mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-black text-2xl manga-title"
          >
            LOADING HERO DATA...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  // Remove the existing nav useMemo block that currently appears BELOW the isLoading check. Delete from:
  // const nav = useMemo(
  // down to and including its closing:
  // ), [activeSection], )

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] bg-black text-white px-3 py-2 rounded border-2 border-white"
      >
        Skip to content
      </a>

      <FloatingMangaElements />

      {/* Navigation */}
      <motion.nav
        role="navigation"
        aria-label="Primary"
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className={`fixed top-0 left-0 right-0 z-50 border-b-4 border-black transition-colors ${
          scrolled ? "bg-white/95 shadow-[6px_6px_0_#000] supports-[backdrop-filter]:backdrop-blur-sm" : "bg-white/85"
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none opacity-10 manga-halftone" aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative">
            <div className="flex justify-between items-center h-16">
              {/* Brand */}
              <button
                onClick={() => scrollToSection("hero")}
                aria-label="Go to home"
                className="inline-flex items-center gap-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                <Robot className="w-7 h-7 text-black" />
                <span className="text-lg font-bold manga-title tracking-tight text-black">SUJAL.GUPTA</span>
              </button>

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-3">{nav}</div>

              {/* Desktop actions */}
              <div className="hidden md:flex items-center gap-2">
                <TooltipProvider>
                  <span
                    className={`ml-1 inline-flex items-center justify-center h-3 w-3 rounded-full border-2 border-black ${
                      resumeReady === true ? "bg-emerald-400" : resumeReady === false ? "bg-red-400" : "bg-amber-300"
                    }`}
                    aria-live="polite"
                  >
                    <span className="sr-only">
                      {resumeReady === true ? "PDF ready" : resumeReady === false ? "PDF missing" : "Checking PDF"}
                    </span>
                  </span>
                  <div className="ml-1 border-2 border-black rounded-md shadow-[3px_3px_0_#000] overflow-hidden">
                    <ThemeToggle />
                  </div>
                </TooltipProvider>
              </div>

              {/* Mobile actions */}
              <div className="flex items-center gap-1 md:hidden">
                <div className="border-2 border-black rounded-md shadow-[3px_3px_0_#000] overflow-hidden">
                  <ThemeToggle />
                </div>
                <button
                  className="ml-2 p-2 rounded border-2 border-black bg-white shadow-[3px_3px_0_#000] focus:outline-none focus-visible:ring-2 focus-visible:ring-black text-black"
                  onClick={() => setMobileMenuOpen((v) => !v)}
                  aria-label="Toggle menu"
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-nav"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t-4 border-black shadow-[6px_6px_0_#000]"
            >
              <div className="px-3 py-3 space-y-2">
                {nav}

                <div className="pt-2"></div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-3 w-3 rounded-full border-2 border-black ${
                      resumeReady === true ? "bg-emerald-400" : resumeReady === false ? "bg-red-400" : "bg-amber-300"
                    }`}
                    aria-live="polite"
                  >
                    <span className="sr-only">
                      {resumeReady === true ? "PDF ready" : resumeReady === false ? "PDF missing" : "Checking PDF"}
                    </span>
                  </span>
                  <span className="text-xs manga-text text-black">
                    {resumeReady === true ? "PDF READY" : resumeReady === false ? "PDF MISSING" : "CHECKING..."}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main content */}
      <main id="main">
        {/* Hero Section */}
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center relative overflow-hidden manga-speed-lines pt-24 scroll-mt-24"
        >
          <div className="absolute inset-0 manga-halftone opacity-10" />
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="min-h-screen flex items-center justify-center py-24">
              <div className="grid lg:grid-cols-2 gap-12 items-center justify-items-center w-full">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left relative w-full max-w-2xl"
                >
                  <MangaActionEffect effect="HERO APPEARS!" className="top-0 right-0" />
                  <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 manga-title text-black leading-tight">
                    SUJAL GUPTA
                  </h1>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                  >
                    <MangaSpeechBubble text="ROBOTICS & AI ENGINEER!" className="inline-block" />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-base sm:text-lg md:text-xl text-black mb-8 leading-relaxed max-w-2xl font-bold"
                  >
                    Innovative engineering student specializing in robotics, AI, and autonomous systems. Ready to build
                    the machines of tomorrow!
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex justify-center items-center w-full"
                >
                  <MangaPanel className="relative">
                    <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto">
                      <div className="absolute inset-0 border-8 border-black rounded-lg bg-white shadow-2xl">
                        <Image
                          src="/images/sujal-profile.jpg"
                          alt="Sujal Gupta - Robotics & AI Engineer"
                          fill
                          className="object-cover object-center rounded-lg"
                          style={{ filter: "contrast(1.3) brightness(1.1) saturate(1.4)" }}
                          priority
                          sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, 384px"
                        />
                        <div className="absolute top-4 right-4">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            className="bg-yellow-300 border-4 border-black rounded-full p-2"
                          >
                            <Star className="w-6 h-6 text-black" />
                          </motion.div>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="bg-blue-300 border-4 border-black rounded-full p-2"
                          >
                            <Zap className="w-6 h-6 text-black" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    <MangaActionEffect effect="TECH MASTER!" className="top-4 left-4" />
                    <MangaActionEffect effect="FUTURE READY!" className="bottom-4 right-4" />
                  </MangaPanel>
                </motion.div>
              </div>
            </div>
          </div>
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-12 h-12 text-black" />
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-yellow-100 relative scroll-mt-24">
          <div className="absolute inset-0 manga-action-line opacity-20" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-6xl md:text-7xl font-bold mb-6 manga-title text-black">ABOUT THE HERO</h2>
              <div className="w-32 h-2 bg-black mx-auto" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <MangaPanel className="bg-white">
                  <div className="flex justify-center">
                    <MangaRobotIllustration size={300} />
                  </div>
                  <MangaActionEffect effect="ROBO POWER!" className="top-4 right-4" />
                </MangaPanel>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <MangaPanel className="bg-white">
                  <p className="text-lg text-black leading-relaxed font-bold">
                    I'm an outgoing and innovative Robotics and AI engineering student with a strong foundation in
                    robotics principles, mechanical design, and systems integration. Currently pursuing my Bachelor's
                    degree at Bangalore Technological Institute.
                  </p>
                </MangaPanel>
                <MangaPanel className="bg-white">
                  <p className="text-lg text-black leading-relaxed font-bold">
                    Proficient in Python programming, Rust Programming, Robotic perception, and Electrical engineering
                    concepts. I have hands-on experience in developing smart robotic systems and AI-driven projects.
                  </p>
                </MangaPanel>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <motion.div whileHover={{ scale: 1.05 }} className="bg-blue-200 p-4 rounded-lg border-4 border-black">
                    <MapPin className="w-8 h-8 text-black mb-2" />
                    <p className="text-sm text-black font-bold">LOCATION</p>
                    <p className="text-black manga-text">BANGALORE!</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-green-200 p-4 rounded-lg border-4 border-black"
                  >
                    <Award className="w-8 h-8 text-black mb-2" />
                    <p className="text-sm text-black font-bold">EDUCATION</p>
                    <p className="text-black manga-text">B.E. ROBOTICS!</p>
                  </motion.div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      onClick={handleViewResume}
                      disabled={resumeReady === false}
                      variant="outline"
                      className="border-4 border-black text-black hover:bg-black hover:text-white manga-text font-bold text-lg bg-transparent"
                    >
                      VIEW RESUME!
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 bg-red-100 relative scroll-mt-24">
          <div className="absolute inset-0 manga-halftone opacity-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-6xl md:text-7xl font-bold mb-6 manga-title text-black">BATTLE EXPERIENCE</h2>
              <div className="w-32 h-2 bg-black mx-auto mb-6" />
              <MangaSpeechBubble text="My journey through the tech world!" className="inline-block" />
            </motion.div>

            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <MangaPanel className="bg-white relative">
                    <MangaActionEffect effect={exp.mangaEffect} className="top-4 right-4" />
                    <Card className="bg-transparent border-0 shadow-none">
                      <CardHeader>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-4 bg-yellow-300 rounded-full border-4 border-black">
                            <div className="text-black">{exp.icon}</div>
                          </div>
                          <CardTitle className="text-2xl text-black manga-title">{exp.title}</CardTitle>
                        </div>
                        <CardDescription className="text-black text-lg font-bold">
                          <div className="flex items-center space-x-2 mb-2">
                            <Building className="w-5 h-5 text-black" />
                            <span>{exp.company}</span>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Calendar className="w-5 h-5 text-black" />
                            <span>{exp.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-5 h-5 text-black" />
                            <span>{exp.location}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-none text-black space-y-3">
                          {exp.description.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="mr-3 text-2xl">⚡</span>
                              <span className="font-bold">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </MangaPanel>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 bg-blue-100 relative scroll-mt-24">
          <div className="absolute inset-0 manga-speed-lines opacity-20" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-6xl md:text-7xl font-bold mb-6 manga-title text-black">TRAINING ARC</h2>
              <div className="w-32 h-2 bg-black mx-auto mb-6" />
              <MangaSpeechBubble text="Academic power-up journey!" className="inline-block" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="relative flex justify-center">
                <MangaPanel className="bg-white">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="flex justify-center"
                  >
                    <BookOpen className="w-48 h-48 text-black" />
                  </motion.div>
                  <MangaActionEffect effect="KNOWLEDGE!" className="top-4 right-4" />
                </MangaPanel>
              </div>

              <MangaPanel className="bg-white relative">
                <MangaActionEffect effect="LEVEL UP!" className="top-4 right-4" />
                <Card className="bg-transparent border-0 shadow-none">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-4 bg-purple-300 rounded-full border-4 border-black">
                        <GraduationCap className="w-8 h-8 text-black" />
                      </div>
                      <CardTitle className="text-2xl text-black manga-title">{education.degree}</CardTitle>
                    </div>
                    <CardDescription className="text-black text-lg font-bold">
                      <div className="flex items-center space-x-2 mb-2">
                        <Building className="w-5 h-5 text-black" />
                        <span>{education.university}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-5 h-5 text-black" />
                        <span>{education.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-black" />
                        <span>GPA: {education.gpa}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="text-xl font-bold text-black mb-4 manga-text">POWER HIGHLIGHTS:</h4>
                    <ul className="list-none text-black space-y-3">
                      {education.highlights.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-3 text-2xl">🎯</span>
                          <span className="font-bold">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </MangaPanel>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-green-100 relative scroll-mt-24">
          <div className="absolute inset-0 manga-action-line opacity-20" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-6xl md:text-7xl font-bold mb-6 manga-title text-black">EPIC PROJECTS</h2>
              <div className="w-32 h-2 bg-black mx-auto mb-6" />
              <MangaSpeechBubble text="My greatest creations!" className="inline-block" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <MangaPanel className="bg-white relative h-full">
                    <MangaActionEffect effect={project.mangaEffect} className="top-4 right-4" />
                    <Card className="bg-transparent border-0 shadow-none h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="p-4 bg-cyan-300 rounded-full border-4 border-black">
                              <div className="text-black">{project.icon}</div>
                            </div>
                            <CardTitle className="text-xl text-black manga-title">{project.title}</CardTitle>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-yellow-300 text-black border-2 border-black manga-text font-bold">
                              {project.category}
                            </Badge>
                            {project.videos?.length ? (
                              <Badge className="bg-red-300 text-black border-2 border-black manga-text font-bold">
                                VIDEO
                              </Badge>
                            ) : null}
                          </div>
                        </div>
                        <CardDescription className="text-black text-base leading-relaxed font-bold">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ProjectImageGallery project={project} />
                        <ProjectVideoGallery project={project} />

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((tech: string, techIndex: number) => (
                            <motion.div key={techIndex} whileHover={{ scale: 1.05 }}>
                              <Badge className="bg-orange-300 text-black border-2 border-black manga-text font-bold">
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              size="sm"
                              className="bg-red-500 text-white hover:bg-red-600 border-4 border-black manga-text font-bold"
                              onClick={() =>
                                window.open(
                                  project.githubLink || "https://www.linkedin.com/in/sujalgupta352/details/projects/",
                                  "_blank",
                                  "noopener,noreferrer",
                                )
                              }
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              VIEW!
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-4 border-black text-black hover:bg-black hover:text-white manga-text font-bold bg-transparent"
                              onClick={() => window.open("https://github.com/Sujal861", "_blank")}
                            >
                              <Github className="w-4 h-4 mr-2" />
                              CODE!
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </MangaPanel>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-purple-100 relative scroll-mt-24">
          <div className="absolute inset-0 manga-halftone opacity-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-6xl md:text-7xl font-bold mb-6 manga-title text-black">SPECIAL ABILITIES</h2>
              <div className="w-32 h-2 bg-black mx-auto mb-6" />
              <MangaSpeechBubble text="My technical superpowers!" className="inline-block" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <MangaPanel className="bg-white relative">
                    <Card className="bg-transparent border-0 shadow-none">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-pink-300 rounded-full border-4 border-black">
                              <div className="text-black">{skill.icon}</div>
                            </div>
                            <span className="text-xl font-bold text-black manga-title">{skill.name}</span>
                          </div>
                          <span className="text-black font-bold text-2xl manga-text">{skill.level}%</span>
                        </div>

                        <div className="w-full bg-gray-300 rounded-full h-6 border-4 border-black overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-red-400 to-yellow-400 h-6 rounded-full border-r-4 border-black"
                          />
                        </div>

                        <div className="mt-3 text-center">
                          <span className="text-sm px-3 py-1 rounded-full bg-yellow-300 text-black border-2 border-black manga-text font-bold">
                            {skill.level >= 90
                              ? "MASTER!"
                              : skill.level >= 80
                                ? "EXPERT!"
                                : skill.level >= 70
                                  ? "SKILLED!"
                                  : "LEARNING!"}
                          </span>
                        </div>
                      </CardHeader>
                    </Card>
                  </MangaPanel>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <h3 className="text-4xl font-bold text-black mb-8 manga-title">BONUS SKILLS</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { name: "Machine Learning", icon: Brain },
                  { name: "Computer Vision", icon: Eye },
                  { name: "IoT Development", icon: Wifi },
                  { name: "3D Modeling", icon: Layers },
                  { name: "Circuit Design", icon: Zap },
                  { name: "Embedded Systems", icon: Cpu },
                  { name: "Data Analysis", icon: Database },
                  { name: "Project Management", icon: Users },
                ].map((expertise, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="bg-cyan-300 px-4 py-3 rounded-full border-4 border-black flex items-center space-x-2"
                  >
                    <expertise.icon className="w-5 h-5 text-black" />
                    <span className="text-black font-bold manga-text">{expertise.name}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center mt-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="relative"
                >
                  <Settings className="w-32 h-32 text-black" />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <Cog className="w-32 h-32 text-black opacity-50" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-20 bg-orange-100 relative scroll-mt-24">
          <div className="absolute inset-0 manga-speed-lines opacity-20" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-6xl md:text-7xl font-bold mb-6 manga-title text-black">ACHIEVEMENT BADGES</h2>
              <div className="w-32 h-2 bg-black mx-auto mb-6" />
              <MangaSpeechBubble text="Collected power-ups and certifications!" className="inline-block" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {certificationCategories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-lg font-bold manga-text border-4 border-black transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-red-500 text-white shadow-lg"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                >
                  {category.toUpperCase()}
                </motion.button>
              ))}
            </motion.div>

            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredCertifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <MangaPanel className="bg-white relative h-full">
                      <MangaActionEffect effect="CERTIFIED!" className="top-2 right-2" />
                      <CertificateModal cert={cert} />
                      <Card className="bg-transparent border-0 shadow-none h-full">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-green-300 rounded-full border-4 border-black">
                              <div className="text-black">{cert.icon}</div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-blue-300 text-black border-2 border-black manga-text font-bold text-xs">
                                {cert.level}
                              </Badge>
                              <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                              >
                                <CheckCircle className="w-6 h-6 text-green-600" />
                              </motion.div>
                            </div>
                          </div>
                          <CardTitle className="text-lg text-black mb-2 manga-title leading-tight">
                            {cert.name}
                          </CardTitle>
                          <div className="space-y-2">
                            <div className="flex items-center text-black text-sm font-bold">
                              <Building className="w-4 h-4 mr-2" />
                              {cert.organization}
                            </div>
                            <div className="flex items-center text-black text-sm font-bold">
                              <Calendar className="w-4 h-4 mr-2" />
                              {cert.date}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4">
                            <Badge className="bg-purple-300 text-black border-2 border-black manga-text font-bold text-xs">
                              {cert.category}
                            </Badge>
                          </div>
                          <div className="mb-4">
                            <Dialog>
                              <DialogTrigger asChild>
                                <motion.div
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="mb-4 relative w-full h-32 rounded-lg overflow-hidden border-4 border-black cursor-pointer group"
                                >
                                  <Image
                                    src={cert.image || "/placeholder.svg?height=180&width=320&query=certificate+thumb"}
                                    alt={`${cert.name} Certificate Preview`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      className="bg-white/90 rounded-full p-3 border-2 border-black"
                                    >
                                      <ZoomIn className="w-6 h-6 text-black" />
                                    </motion.div>
                                  </div>
                                  <div className="absolute top-2 left-2 bg-yellow-300 border-2 border-black rounded px-2 py-1">
                                    <span className="text-xs font-bold manga-text text-black">CLICK TO ENLARGE</span>
                                  </div>
                                </motion.div>
                              </DialogTrigger>
                              <DialogContent className="max-w-7xl w-[95vw] h-[95vh] p-0 bg-white border-8 border-black">
                                <div className="relative h-full flex flex-col">
                                  <div className="p-6 border-b-4 border-black bg-yellow-300 flex-shrink-0">
                                    <h3 className="text-3xl font-bold manga-title text-black mb-2">{cert.name}</h3>
                                    <p className="text-black font-bold text-lg">
                                      {cert.organization} • {cert.date}
                                    </p>
                                    <div className="flex items-center space-x-2 mt-3">
                                      <Badge className="bg-purple-300 text-black border-2 border-black manga-text font-bold">
                                        {cert.category}
                                      </Badge>
                                      <Badge className="bg-blue-300 text-black border-2 border-black manga-text font-bold">
                                        {cert.level}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="p-6 flex-1 flex flex-col">
                                    <div className="relative w-full flex-1 mb-4 min-h-[500px]">
                                      <Image
                                        src={
                                          cert.image || "/placeholder.svg?height=900&width=1600&query=certificate+full"
                                        }
                                        alt={`${cert.name} Certificate`}
                                        fill
                                        className="object-contain rounded-lg border-4 border-black"
                                        sizes="95vw"
                                        priority
                                      />
                                    </div>
                                    <div className="flex-shrink-0">
                                      <p className="text-black font-bold leading-relaxed text-lg">{cert.description}</p>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <CardDescription className="text-black text-sm leading-relaxed font-bold">
                            {cert.description}
                          </CardDescription>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="mt-4 h-2 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full border-2 border-black"
                          />
                        </CardContent>
                      </Card>
                    </MangaPanel>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <div className="flex justify-center mt-12">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{
                  rotate: { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                }}
              >
                <Target className="w-32 h-32 text-black" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-pink-100 relative scroll-mt-24">
          <div className="absolute inset-0 manga-action-line opacity-20" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-6xl md:text-7xl font-bold mb-6 manga-title text-black">CONTACT THE HERO</h2>
              <div className="w-32 h-2 bg-black mx-auto mb-6" />
              <MangaSpeechBubble text="Ready to team up? Let's connect!" className="inline-block" />
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <MangaPanel className="bg-white relative">
                  <MangaActionEffect effect="CONTACT INFO!" className="top-4 right-4" />
                  <h3 className="text-3xl font-bold text-black mb-6 manga-title">HERO DETAILS</h3>
                  <div className="space-y-6">
                    <motion.div
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-center space-x-4 p-4 rounded-lg border-4 border-black bg-blue-200"
                    >
                      <div className="p-3 bg-white rounded-full border-4 border-black">
                        <Mail className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <p className="text-black font-bold manga-text">EMAIL</p>
                        <p className="text-black font-bold">Sujalgupta352@gmail.com</p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-center space-x-4 p-4 rounded-lg border-4 border-black bg-green-200"
                    >
                      <div className="p-3 bg-white rounded-full border-4 border-black">
                        <Phone className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <p className="text-black font-bold manga-text">PHONE</p>
                        <p className="text-black font-bold">+91 861-841-6816</p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-center space-x-4 p-4 rounded-lg border-4 border-black bg-purple-200"
                    >
                      <div className="p-3 bg-white rounded-full border-4 border-black">
                        <MapPin className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <p className="text-black font-bold manga-text">LOCATION</p>
                        <p className="text-black font-bold">Bangalore, Karnataka</p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-8 pt-8 border-t-4 border-black">
                    <h4 className="text-xl font-bold text-black mb-4 manga-title">SOCIAL LINKS</h4>
                    <div className="flex space-x-4">
                      <motion.a
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        href="https://github.com/Sujal861"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-gray-800 rounded-lg border-4 border-black hover:bg-black transition-all duration-300"
                        aria-label="Visit Sujal's GitHub profile"
                      >
                        <Github className="w-8 h-8 text-white" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        href="https://www.linkedin.com/in/sujalgupta352/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-blue-600 rounded-lg border-4 border-black hover:bg-blue-700 transition-all duration-300"
                        aria-label="Visit Sujal's LinkedIn profile"
                      >
                        <Linkedin className="w-8 h-8 text-white" />
                      </motion.a>
                    </div>
                    <p className="text-sm text-black mt-3 font-bold">Follow my tech adventures!</p>
                  </div>
                </MangaPanel>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <MangaPanel className="bg-white relative">
                  <MangaActionEffect effect="MESSAGE ME!" className="top-4 right-4" />
                  <Card className="bg-transparent border-0 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-3xl text-black manga-title flex items-center">
                        <Send className="w-8 h-8 mr-3" />
                        SEND MESSAGE
                      </CardTitle>
                      <CardDescription className="text-black font-bold text-lg">
                        I'll respond faster than a robot's reflexes!
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-lg font-bold text-black mb-2 manga-text">FIRST NAME</label>
                          <Input
                            placeholder="John"
                            className="bg-yellow-100 border-4 border-black text-black placeholder-gray-600 font-bold text-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-lg font-bold text-black mb-2 manga-text">LAST NAME</label>
                          <Input
                            placeholder="Doe"
                            className="bg-yellow-100 border-4 border-black text-black placeholder-gray-600 font-bold text-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-lg font-bold text-black mb-2 manga-text">EMAIL</label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          className="bg-yellow-100 border-4 border-black text-black placeholder-gray-600 font-bold text-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-bold text-black mb-2 manga-text">SUBJECT</label>
                        <Input
                          placeholder="Project Collaboration"
                          className="bg-yellow-100 border-4 border-black text-black placeholder-gray-600 font-bold text-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-bold text-black mb-2 manga-text">MESSAGE</label>
                        <Textarea
                          placeholder="Tell me about your epic project idea..."
                          rows={5}
                          className="bg-yellow-100 border-4 border-black text-black placeholder-gray-600 font-bold text-lg resize-none"
                        />
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="w-full bg-red-500 text-white hover:bg-red-600 py-4 text-xl manga-text font-bold border-4 border-black">
                          <Send className="w-6 h-6 mr-3" />
                          SEND MESSAGE!
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </MangaPanel>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
