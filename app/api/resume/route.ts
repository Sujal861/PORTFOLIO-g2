import type { NextRequest } from "next/server"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

export const maxDuration = 30

function wrapText({
  text,
  font,
  size,
  maxWidth,
}: {
  text: string
  font: any
  size: number
  maxWidth: number
}) {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let current = ""
  for (const w of words) {
    const tentative = current.length ? current + " " + w : w
    const width = font.widthOfTextAtSize(tentative, size)
    if (width <= maxWidth) {
      current = tentative
    } else {
      if (current.length) lines.push(current)
      // extremely long single word fallback
      if (font.widthOfTextAtSize(w, size) > maxWidth) {
        let chunk = ""
        for (const ch of w) {
          const t2 = chunk + ch
          if (font.widthOfTextAtSize(t2, size) > maxWidth) {
            if (chunk.length) {
              lines.push(chunk)
              chunk = ch
            } else {
              // last resort: push char
              lines.push(ch)
              chunk = ""
            }
          } else {
            chunk = t2
          }
        }
        if (chunk.length) {
          lines.push(chunk)
        }
        current = ""
      } else {
        current = w
      }
    }
  }
  if (current.length) lines.push(current)
  return lines
}

async function buildPdf({ inline }: { inline: boolean }) {
  const doc = await PDFDocument.create()
  let page = doc.addPage()
  const { width, height } = page.getSize()

  const margin = 48
  let x = margin
  let y = height - margin

  const fontRegular = await doc.embedFont(StandardFonts.Helvetica)
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold)

  const drawTitle = (t: string) => {
    const size = 22
    const tw = fontBold.widthOfTextAtSize(t, size)
    page.drawText(t, {
      x: x,
      y: y - size,
      size,
      font: fontBold,
      color: rgb(0.05, 0.05, 0.05),
    })
    y -= size + 8
    page.drawLine({
      start: { x, y },
      end: { x: x + Math.min(tw, width - margin * 2), y },
      thickness: 1,
      color: rgb(0, 0, 0),
    })
    y -= 10
  }

  const ensureSpace = (needed: number) => {
    if (y - needed < margin) {
      const newPage = doc.addPage()
      y = newPage.getSize().height - margin
      x = margin
      // switch context
      page = newPage
    }
  }

  const drawHeading = (t: string) => {
    const size = 16
    ensureSpace(size + 10)
    page.drawText(t, { x, y: y - size, size, font: fontBold, color: rgb(0.1, 0.1, 0.1) })
    y -= size + 6
  }

  const drawSmall = (t: string) => {
    const size = 10.5
    const maxWidth = width - margin * 2
    const lines = wrapText({ text: t, font: fontRegular, size, maxWidth })
    for (const line of lines) {
      ensureSpace(size + 4)
      page.drawText(line, { x, y: y - size, size, font: fontRegular, color: rgb(0.1, 0.1, 0.1) })
      y -= size + 3
    }
  }

  const drawBullet = (t: string) => {
    const size = 11.5
    const bullet = "•"
    const maxWidth = width - margin * 2 - 14
    const lines = wrapText({ text: t, font: fontRegular, size, maxWidth })
    for (let i = 0; i < lines.length; i++) {
      ensureSpace(size + 4)
      if (i === 0) {
        page.drawText(bullet, { x, y: y - size, size, font: fontBold, color: rgb(0.05, 0.05, 0.05) })
      }
      page.drawText(lines[i], {
        x: x + 14,
        y: y - size,
        size,
        font: fontRegular,
        color: rgb(0.1, 0.1, 0.1),
      })
      y -= size + 3
    }
  }

  const drawSpacer = (s: number) => {
    ensureSpace(s)
    y -= s
  }

  // Header
  const name = "Sujal Gupta B"
  const role = "STUDENT | ROBOTICS ENGINEER"
  const headerSize = 26
  page.drawText(name, { x, y: y - headerSize, size: headerSize, font: fontBold, color: rgb(0, 0, 0) })
  y -= headerSize + 6
  page.drawText(role, { x, y: y - 14, size: 14, font: fontRegular, color: rgb(0.2, 0.2, 0.2) })
  y -= 18

  // Contact
  drawSmall("Karnataka, India")
  drawSmall("sujalgupta352@gmail.com • (+91) 8618416816")
  drawSmall("LinkedIn: https://www.linkedin.com/in/sujalgupta352/")
  drawSmall("GitHub: https://github.com/Sujal861 • Portfolio: https://portfolio-g2.vercel.app/")

  drawSpacer(10)

  // Profile
  drawHeading("Profile")
  drawSmall(
    "Skilled in Python, C++/Rust, ROS, Arduino, and motor control, with experience in systems integration, Fusion 360/ROBOCELL, and careful testing and validation. Applying for Embedded/Mechatronics Robotics roles; a strong fit shown by control and perception modules that improved path‑tracking and battery runtime on mobile robots, plus mentoring and event leadership.",
  )

  drawSpacer(6)

  // Employment
  drawHeading("Employment History")
  drawSmall("Robotics Intern – Kodacy | Feb 2025 – April 2025 | Remote")
  drawBullet("Assisted in developing and testing robotic algorithms for autonomous navigation and sensor integration.")
  drawBullet("Contributed to simulation workflows using Python and ROS (Robot Operating System).")
  drawBullet(
    "Documented and presented findings weekly, gaining practical experience in real-world robotics applications.",
  )

  drawSpacer(8)

  // Education
  drawHeading("Education")
  drawSmall("Bangalore Technological Institute")
  drawSmall("Bachelor of Engineering (B.E.) in Robotics and Artificial Intelligence")
  drawSmall("Nov 2022 – Apr 2026 (Expected) • Bangalore, Karnataka, India")

  drawSpacer(8)

  // Projects
  drawHeading("Other Projects")
  drawSmall("AMR Simulation – PyBullet AMR build with Python 3.8+")
  drawSmall(
    "Designed, programmed and simulated a mobile robot featuring realistic physics, LiDAR sensing, occupancy-grid mapping, path planning, and obstacle avoidance—lightweight, modular, and ROS-free for rapid prototyping and research.",
  )
  drawSpacer(4)
  drawSmall("Mobile Turtlebot in ROS2")
  drawSmall(
    "Built and deployed a ROS 2–based mobile platform using TurtleBot, integrating LiDAR, SLAM, and Nav2 for autonomous mapping and navigation in simulation; capabilities include teleop, waypoint following, and obstacle avoidance with Gazebo/RViz workflows.",
  )
  drawSpacer(4)
  drawSmall("Quadruped Robot (Spot‑Inspired)")
  drawSmall(
    "Designed a modular, Fusion 360–based mechanical assembly for a Spot‑like quadruped, optimized for fabrication and future actuator/electronics integration; enables rapid prototyping, simulation, and customization for research and education.",
  )
  drawSpacer(4)
  drawSmall("TriPUS - Retail Intelligence Platform")
  drawSmall(
    "Built a full‑stack e‑commerce web app with auth, catalog, cart/checkout, and admin inventory management with clean architecture, responsive UI, performant APIs, CI‑ready structure, and clear docs for quick deployment.",
  )
  drawSpacer(4)
  drawSmall("Design & Implementation of A Mobile Robot with 6‑DoF Arm for Agri Purpose")
  drawSmall(
    "Developed a rugged mobile base with a 6‑DoF manipulator for field tasks (soil sampling, targeted spraying, object handling), integrating perception, IK/path planning, and motor control for precise operation outdoors.",
  )

  drawSpacer(8)

  // Skills
  drawHeading("Skills")
  drawSmall("Technical Skills")
  drawSmall("UI & Web: WPF, XML, HTML, JavaScript, CSS, TypeScript")
  drawSmall("Back-end & Data: C, Python, MATLAB, Node.js")
  drawSmall("Libraries: TensorFlow, PyBullet, OpenCV, NLTK, spaCy, React")
  drawSmall("Technical Modeling: Fusion 360, SolidWorks, AutoCAD")
  drawSmall("Robot Simulation: Gazebo, Webots, ROS, ABB, RoboCell")
  drawSmall("Microcontrollers: Arduino, ESP8266/ESP32, Raspberry Pi")
  drawSmall("Electrical & Electronic Design: LabVIEW")

  drawSpacer(6)
  drawSmall("Professional Skills")
  drawSmall(
    "MS Office Suite • DevOps (Git, GitHub Desktop) • RPA • Systemic Product Design • Project Planning • Cross-Cultural Communication • Conference Organisation • Teaching",
  )

  drawSpacer(8)

  // Certifications
  drawHeading("Certifications")
  drawSmall("MoE's Innovation Ambassador (Foundation, Reskilling, Advanced)")
  drawSmall("Mechanics and Control of Robotic Manipulator (NPTEL)")
  drawSmall("Advanced Robotics Applications (NPTEL ELITE)")
  drawSmall(
    "Prompt Design in Vertex AI • Build Real World AI Apps with Gemini & Imagen • Develop GenAI Apps with Gemini & Streamlit",
  )
  drawSmall("TCS iON Career Edge")
  drawSmall("Comparative Analysis of Converter Techniques for Ripple Reduction (Zigma Medicare India)")
  drawSmall("Generative AI Model Development")

  drawSpacer(8)

  // Languages
  drawHeading("Languages")
  drawSmall("English (Native) • Kannada (Bilingual) • Hindi (Limited Working) • Telugu (Elementary)")

  drawSpacer(8)

  // References
  drawHeading("References")
  drawSmall("Academic Reference and Professional References available upon request.")

  const pdfBytes = await doc.save()
  const headers = new Headers({
    "Content-Type": "application/pdf",
    "Content-Length": String(pdfBytes.length),
    "Cache-Control": "public, max-age=3600",
    "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="Sujal_Gupta_Resume.pdf"`,
  })

  return new Response(pdfBytes, { status: 200, headers })
}

export async function GET(req: NextRequest) {
  const inline = req.nextUrl.searchParams.get("inline") === "1"
  return buildPdf({ inline })
}

export async function HEAD() {
  // Simple readiness probe
  return new Response(null, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "public, max-age=300",
      "Content-Disposition": 'attachment; filename="Sujal_Gupta_Resume.pdf"',
    },
  })
}
