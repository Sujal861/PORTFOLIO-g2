"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  BotIcon as Robot,
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
  Download,
  Eye,
  Wrench,
  Brain,
  Monitor,
  Users,
  Award,
  FileText,
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
} from "lucide-react"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/theme-toggle"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export default function RoboticPortfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const sections = ["hero", "about", "experience", "education", "projects", "skills", "certifications", "contact"]
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const handleViewResume = () => {
    // Open PDF in new tab for viewing
    const newWindow = window.open("/resume/Sujal_Gupta_Resume.pdf", "_blank", "noopener,noreferrer")
    if (!newWindow) {
      toast({
        title: "Popup Blocked",
        description: "Please allow popups to view the resume, or try downloading it instead.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Resume Opened! 👁️",
        description: "Your resume is now open in a new tab.",
      })
    }
  }

  const handleDownloadResume = async () => {
    setIsDownloading(true)
    setDownloadProgress(0)

    try {
      // Simulate download progress for better UX
      const progressInterval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)

      // Create direct download link for the PDF
      const link = document.createElement("a")
      link.href = "/resume/Sujal_Gupta_Resume.pdf"
      link.download = "Sujal_Gupta_Resume.pdf"
      link.style.display = "none"

      // Add to DOM and trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Complete the progress
      setTimeout(() => {
        clearInterval(progressInterval)
        setDownloadProgress(100)
        toast({
          title: "Download Complete! 🎯",
          description: "Your resume has been downloaded successfully!",
        })

        setTimeout(() => {
          setIsDownloading(false)
          setDownloadProgress(0)
        }, 1000)
      }, 500)
    } catch (error) {
      console.error("Download failed:", error)
      toast({
        title: "Download Failed ❌",
        description: "An error occurred while downloading the resume. Please try again.",
        variant: "destructive",
      })
      setIsDownloading(false)
      setDownloadProgress(0)
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
        "Built custom robotic arm motions in a simulated agricultural setup using inverse kinematics and path planning.",
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

    const nextImage = () => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
    }

    const prevImage = () => {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
    }

    return (
      <div className="mb-6">
        <div className="relative w-full h-48 rounded-lg overflow-hidden border-4 border-black bg-gray-100">
          <Image
            src={project.images[currentImageIndex].src || "/placeholder.svg"}
            alt={project.images[currentImageIndex].alt}
            fill
            className="object-cover transition-all duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Navigation arrows */}
          {project.images.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-black rounded-full p-2 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4 text-black" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-black rounded-full p-2 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4 text-black" />
              </motion.button>
            </>
          )}

          {/* Image indicators */}
          {project.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {project.images.map((_, index) => (
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
                      src={project.images[currentImageIndex].src || "/placeholder.svg"}
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

        {/* Image caption */}
        <p className="text-sm text-black font-bold mt-2 text-center manga-text">
          {project.images[currentImageIndex].caption}
        </p>
      </div>
    )
  }

  // Enhanced Certificate Modal Component
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
                src={cert.image || "/placeholder.svg"}
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

  // Enhanced Certificate Preview with Click-to-Expand
  const CertificatePreview = ({ cert }: { cert: any }) => (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mb-4 relative w-full h-32 rounded-lg overflow-hidden border-4 border-black cursor-pointer group"
        >
          <Image
            src={cert.image || "/placeholder.svg"}
            alt={`${cert.name} Certificate Preview`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <motion.div whileHover={{ scale: 1.1 }} className="bg-white/90 rounded-full p-3 border-2 border-black">
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
              <Badge className="bg-blue-300 text-black border-2 border-black manga-text font-bold">{cert.level}</Badge>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="relative w-full flex-1 mb-4 min-h-[500px]">
              <Image
                src={cert.image || "/placeholder.svg"}
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

  // Manga Robot Illustration Component
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
        {/* Robot Body with manga style */}
        <rect x="60" y="80" width="80" height="90" rx="15" fill="#ffffff" stroke="#000000" strokeWidth="4" />

        {/* Robot Head */}
        <rect x="70" y="40" width="60" height="50" rx="12" fill="#ffffff" stroke="#000000" strokeWidth="4" />

        {/* Manga-style eyes */}
        <ellipse cx="85" cy="60" rx="8" ry="12" fill="#000000" />
        <ellipse cx="115" cy="60" rx="8" ry="12" fill="#000000" />
        <ellipse cx="85" cy="58" rx="4" ry="8" fill="#ffffff" />
        <ellipse cx="115" cy="58" rx="4" ry="8" fill="#ffffff" />
        <circle cx="87" cy="56" r="2" fill="#000000" />
        <circle cx="117" cy="56" r="2" fill="#000000" />

        {/* Manga-style mouth */}
        <path d="M 90 72 Q 100 78 110 72" stroke="#000000" strokeWidth="3" fill="none" />

        {/* Arms with manga style */}
        <rect x="25" y="90" width="35" height="18" rx="9" fill="#ffffff" stroke="#000000" strokeWidth="3" />
        <rect x="140" y="90" width="35" height="18" rx="9" fill="#ffffff" stroke="#000000" strokeWidth="3" />

        {/* Legs */}
        <rect x="70" y="170" width="22" height="28" rx="8" fill="#ffffff" stroke="#000000" strokeWidth="3" />
        <rect x="108" y="170" width="22" height="28" rx="8" fill="#ffffff" stroke="#000000" strokeWidth="3" />

        {/* Chest Panel */}
        <rect x="75" y="95" width="50" height="40" rx="8" fill="#f0f0f0" stroke="#000000" strokeWidth="2" />

        {/* Manga-style details */}
        <circle cx="85" cy="110" r="4" fill="#ff0000" stroke="#000000" strokeWidth="2" />
        <circle cx="100" cy="110" r="4" fill="#00ff00" stroke="#000000" strokeWidth="2" />
        <circle cx="115" cy="110" r="4" fill="#0000ff" stroke="#000000" strokeWidth="2" />

        {/* Antenna */}
        <line x1="100" y1="40" x2="100" y2="20" stroke="#000000" strokeWidth="4" />
        <circle cx="100" cy="20" r="6" fill="#ffff00" stroke="#000000" strokeWidth="3" />

        {/* Manga action lines */}
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

  // Manga Speech Bubble Component
  const MangaSpeechBubble = ({ text, className = "" }: { text: string; className?: string }) => (
    <div className={`manga-bubble ${className}`}>
      <span className="manga-text text-lg">{text}</span>
    </div>
  )

  // Manga Action Effect Component
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

  // Manga Panel Component
  const MangaPanel = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`manga-panel p-6 rounded-lg ${className}`}>{children}</div>
  )

  // Floating Manga Elements
  const FloatingMangaElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-black/20 text-4xl manga-text"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
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
            transition={{ delay: 0.5 }}
            className="text-black text-2xl manga-title"
          >
            LOADING HERO DATA...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <FloatingMangaElements />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b-4 border-black z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
              <Robot className="w-8 h-8 text-black" />
              <span className="text-lg sm:text-xl font-bold manga-title text-black">SUJAL.GUPTA</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {["hero", "about", "experience", "education", "projects", "skills", "certifications", "contact"].map(
                (section) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`capitalize transition-colors manga-text text-base ${
                      activeSection === section ? "text-red-600 font-bold" : "text-black hover:text-red-600"
                    }`}
                  >
                    {section === "hero" ? "HOME" : section.toUpperCase()}
                  </motion.button>
                ),
              )}

              {/* Resume Buttons */}
              <div className="flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleDownloadResume}
                    disabled={isDownloading}
                    className="bg-black text-white hover:bg-gray-800 border-4 border-black manga-text text-sm font-bold"
                    size="sm"
                  >
                    {isDownloading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-4 h-4 mr-2"
                        >
                          <Download className="w-4 h-4" />
                        </motion.div>
                        DOWNLOADING...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        RESUME
                      </>
                    )}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleViewResume}
                    variant="outline"
                    className="border-4 border-black text-black hover:bg-black hover:text-white manga-text text-sm font-bold bg-transparent"
                    size="sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    VIEW
                  </Button>
                </motion.div>
              </div>
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <ThemeToggle />
              <button className="ml-4" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t-4 border-black"
            >
              <div className="px-4 py-2 space-y-2">
                {["hero", "about", "experience", "education", "projects", "skills", "certifications", "contact"].map(
                  (section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className="block w-full text-left py-2 capitalize manga-text text-sm text-black hover:text-red-600 transition-colors"
                    >
                      {section === "hero" ? "HOME" : section.toUpperCase()}
                    </button>
                  ),
                )}
                <div className="pt-2 border-t-2 border-black space-y-2">
                  <Button
                    onClick={handleDownloadResume}
                    disabled={isDownloading}
                    className="w-full bg-black text-white hover:bg-gray-800 manga-text font-bold text-sm"
                    size="sm"
                  >
                    {isDownloading ? "DOWNLOADING..." : "DOWNLOAD RESUME"}
                  </Button>
                  <Button
                    onClick={handleViewResume}
                    variant="outline"
                    className="w-full border-4 border-black text-black hover:bg-black hover:text-white manga-text font-bold bg-transparent text-sm"
                    size="sm"
                  >
                    VIEW RESUME
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden manga-speed-lines pt-20"
      >
        <div className="absolute inset-0 manga-halftone opacity-10" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-screen flex items-center justify-center py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center justify-items-center w-full">
              {/* Left Column - Text Content */}
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
                  className="mb-8 flex justify-center lg:justify-start"
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

              {/* Right Column - Profile Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex justify-center items-center w-full"
              >
                <MangaPanel className="relative">
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto">
                    {/* Manga-style frame */}
                    <div className="absolute inset-0 border-8 border-black rounded-lg bg-white shadow-2xl">
                      <Image
                        src="/images/sujal-profile.jpg"
                        alt="Sujal Gupta - Robotics & AI Engineer"
                        fill
                        className="object-cover object-center rounded-lg"
                        style={{
                          filter: "contrast(1.3) brightness(1.1) saturate(1.4)",
                        }}
                        priority
                        sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, 384px"
                      />

                      {/* Manga-style overlay effects */}
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

                  {/* Floating manga effects */}
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
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-12 h-12 text-black" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-yellow-100 relative">
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
                <motion.div whileHover={{ scale: 1.05 }} className="bg-green-200 p-4 rounded-lg border-4 border-black">
                  <Award className="w-8 h-8 text-black mb-2" />
                  <p className="text-sm text-black font-bold">EDUCATION</p>
                  <p className="text-black manga-text">B.E. ROBOTICS!</p>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    onClick={handleDownloadResume}
                    disabled={isDownloading}
                    className="bg-red-500 text-white hover:bg-red-600 border-4 border-black manga-text font-bold text-lg"
                  >
                    {isDownloading ? "DOWNLOADING..." : "GET RESUME!"}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    onClick={handleViewResume}
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
      <section id="experience" className="py-20 bg-red-100 relative">
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
      <section id="education" className="py-20 bg-blue-100 relative">
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
      <section id="projects" className="py-20 bg-green-100 relative">
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
                        <Badge className="bg-yellow-300 text-black border-2 border-black manga-text font-bold">
                          {project.category}
                        </Badge>
                      </div>
                      <CardDescription className="text-black text-base leading-relaxed font-bold">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Project Image Gallery */}
                      <ProjectImageGallery project={project} />

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, techIndex) => (
                          <motion.div key={techIndex} whileHover={{ scale: 1.05 }}>
                            <Badge className="bg-orange-300 text-black border-2 border-black manga-text font-bold">
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex space-x-3">
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
      <section id="skills" className="py-20 bg-purple-100 relative">
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
      <section id="certifications" className="py-20 bg-orange-100 relative">
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

          {/* Category Filter */}
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

          {/* Certifications Grid */}
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

                        <CardTitle className="text-lg text-black mb-2 manga-title leading-tight">{cert.name}</CardTitle>

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

                        {/* Enhanced Certificate Image Preview with Click-to-Expand */}
                        <CertificatePreview cert={cert} />

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

          {/* Certification Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              {
                label: "Total Badges",
                value: certifications.length,
                icon: <Award className="w-8 h-8" />,
              },
              {
                label: "AI/ML Power",
                value: certifications.filter(
                  (c) => c.category.includes("AI") || c.category.includes("Artificial Intelligence"),
                ).length,
                icon: <Brain className="w-8 h-8" />,
              },
              {
                label: "Robot Skills",
                value: certifications.filter((c) => c.category === "Robotics").length,
                icon: <Robot className="w-8 h-8" />,
              },
              {
                label: "Pro Level",
                value: certifications.filter((c) => c.level === "Professional").length,
                icon: <Star className="w-8 h-8" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg border-4 border-black text-center relative"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-yellow-300 rounded-full border-4 border-black">
                    <div className="text-black">{stat.icon}</div>
                  </div>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold text-black mb-2 manga-title"
                >
                  {stat.value}
                </motion.div>
                <p className="text-black text-sm font-bold manga-text">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-12">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
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
      <section id="contact" className="py-20 bg-pink-100 relative">
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

          {/* Additional Social Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <MangaPanel className="bg-white relative">
              <MangaActionEffect effect="TEAM UP!" className="top-4 right-4" />

              <h3 className="text-4xl font-bold text-black mb-4 manga-title">LET'S CONNECT</h3>
              <p className="text-black mb-6 max-w-2xl mx-auto font-bold text-lg">
                Follow my latest adventures in robotics and AI development!
              </p>
              <div className="flex justify-center space-x-6">
                <motion.a
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://github.com/Sujal861"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-gray-800 hover:bg-black px-6 py-4 rounded-lg transition-all duration-300 border-4 border-black"
                  aria-label="Visit Sujal's GitHub profile"
                >
                  <Github className="w-6 h-6 text-white" />
                  <span className="text-white font-bold manga-text text-lg">GITHUB</span>
                  <ExternalLink className="w-5 h-5 text-white" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.linkedin.com/in/sujalgupta352/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-lg transition-all duration-300 border-4 border-black"
                  aria-label="Visit Sujal's LinkedIn profile"
                >
                  <Linkedin className="w-6 h-6 text-white" />
                  <span className="text-white font-bold manga-text text-lg">LINKEDIN</span>
                  <ExternalLink className="w-5 h-5 text-white" />
                </motion.a>
              </div>
            </MangaPanel>
          </motion.div>

          <div className="flex justify-center mt-8">
            <MangaRobotIllustration size={200} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t-8 border-white py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2 mb-4 md:mb-0">
              <Robot className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold manga-title text-white">SUJAL.GUPTA</span>
            </motion.div>
            <p className="text-white text-center md:text-right font-bold manga-text">
              © 2025 SUJAL GUPTA. BUILT WITH MANGA POWER AND ROBOT PASSION!
            </p>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  )
}
