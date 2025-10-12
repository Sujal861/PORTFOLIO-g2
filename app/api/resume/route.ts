import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

// Helper to wrap text within a given width using pdf-lib font metrics
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
  let currentLine = ""

  for (const word of words) {
    const tentative = currentLine ? `${currentLine} ${word}` : word
    const width = font.widthOfTextAtSize(tentative, size)
    if (width <= maxWidth) {
      currentLine = tentative
    } else {
      if (currentLine) lines.push(currentLine)
      currentLine = word
    }
  }
  if (currentLine) lines.push(currentLine)
  return lines
}

type DrawOptions = {
  page: any
  x: number
  y: number
  font: any
  size: number
  color?: { r: number; g: number; b: number }
  maxWidth: number
  lineHeight: number
}

// Draw plain text with wrapping. Returns new y cursor after drawing.
function drawParagraph(
  text: string,
  { page, x, y, font, size, color = rgb(0, 0, 0), maxWidth, lineHeight }: DrawOptions,
) {
  const lines = wrapText({ text, font, size, maxWidth })
  for (const line of lines) {
    page.drawText(line, { x, y, size, font, color })
    y -= lineHeight
  }
  return y
}

// Draw bullet list with wrapping for each item
function drawBullets(
  items: string[],
  { page, x, y, font, size, color = rgb(0, 0, 0), maxWidth, lineHeight }: DrawOptions,
) {
  const bulletIndent = 12
  const textX = x + bulletIndent
  const textWidth = maxWidth - bulletIndent

  for (const item of items) {
    // First line with bullet
    const wrapped = wrapText({ text: item, font, size, maxWidth: textWidth })
    if (wrapped.length === 0) continue

    // Bullet dot
    page.drawText("•", { x, y, size, font, color })
    // First line text
    page.drawText(wrapped[0], { x: textX, y, size, font, color })
    y -= lineHeight

    // Remaining wrapped lines (indented)
    for (let i = 1; i < wrapped.length; i++) {
      page.drawText(wrapped[i], { x: textX, y, size, font, color })
      y -= lineHeight
    }
  }
  return y
}

function addHeaderLine(page: any, x: number, y: number, width: number, color = rgb(0, 0, 0)) {
  page.drawLine({
    start: { x, y },
    end: { x: x + width, y },
    thickness: 1.5,
    color,
  })
}

export async function HEAD() {
  // Health check for existence
  return new Response(null, { status: 200 })
}

export async function GET(request: Request) {
  // inline=1 will render inline
  const { searchParams } = new URL(request.url)
  const inline = searchParams.get("inline") === "1"

  // Create PDF
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595.28, 841.89]) // A4 size in points
  const margin = 48
  const contentWidth = page.getWidth() - margin * 2

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  let cursorY = page.getHeight() - margin

  // Header: Name and Title
  const name = "Sujal Gupta B"
  const title = "Student | Robotics Engineer"

  page.drawText(name, {
    x: margin,
    y: cursorY,
    size: 22,
    font: fontBold,
    color: rgb(0, 0, 0),
  })
  cursorY -= 26

  page.drawText(title.toUpperCase(), {
    x: margin,
    y: cursorY,
    size: 11,
    font: fontRegular,
    color: rgb(0.15, 0.15, 0.15),
  })
  cursorY -= 14

  addHeaderLine(page, margin, cursorY, contentWidth)
  cursorY -= 16

  // Contact
  const contactLeft = ["Karnataka, India", "sujalgupta352@gmail.com", "(+91) 8618416816"]
  const contactRight = [
    "LinkedIn: https://www.linkedin.com/in/sujalgupta352/",
    "GitHub: https://github.com/Sujal861",
    "Portfolio: https://portfolio-g2.vercel.app/",
  ]

  const colGap = 24
  const colWidth = (contentWidth - colGap) / 2

  // Left column contacts
  let yTemp = cursorY
  for (const c of contactLeft) {
    page.drawText(c, { x: margin, y: yTemp, size: 10.5, font: fontRegular })
    yTemp -= 14
  }

  // Right column contacts
  let yTemp2 = cursorY
  for (const c of contactRight) {
    page.drawText(c, { x: margin + colWidth + colGap, y: yTemp2, size: 10.5, font: fontRegular, color: rgb(0, 0, 0.8) })
    yTemp2 -= 14
  }

  cursorY = Math.min(yTemp, yTemp2) - 10

  // Profile
  page.drawText("Profile", { x: margin, y: cursorY, size: 13, font: fontBold })
  cursorY -= 16
  cursorY = drawParagraph(
    "Skilled in Python, C++/Rust, ROS, Arduino, and motor control, with experience in systems integration, Fusion 360/ROBOCELL, and careful testing and validation. Applying for Embedded/Mechatronics Robotics roles; a strong fit shown by control and perception modules that improved path‑tracking and battery runtime on mobile robots, plus mentoring and event leadership.",
    {
      page,
      x: margin,
      y: cursorY,
      font: fontRegular,
      size: 10.5,
      maxWidth: contentWidth,
      lineHeight: 14,
    },
  )
  cursorY -= 8

  // Employment History
  page.drawText("Employment History", { x: margin, y: cursorY, size: 13, font: fontBold })
  cursorY -= 16
  page.drawText("Robotics Intern – Kodacy", { x: margin, y: cursorY, size: 11.5, font: fontBold })
  page.drawText("Feb 2025 – Apr 2025 | Remote", {
    x: margin + 270,
    y: cursorY,
    size: 10.5,
    font: fontRegular,
    color: rgb(0.2, 0.2, 0.2),
  })
  cursorY -= 16
  cursorY = drawBullets(
    [
      "Assisted in developing and testing robotic algorithms for autonomous navigation and sensor integration.",
      "Contributed to simulation workflows using Python and ROS (Robot Operating System).",
      "Documented and presented findings weekly, gaining practical experience in real-world robotics applications.",
    ],
    { page, x: margin, y: cursorY, font: fontRegular, size: 10.5, maxWidth: contentWidth, lineHeight: 14 },
  )
  cursorY -= 8

  // Education
  page.drawText("Education", { x: margin, y: cursorY, size: 13, font: fontBold })
  cursorY -= 16
  page.drawText("Bangalore Technological Institute", { x: margin, y: cursorY, size: 11.5, font: fontBold })
  cursorY -= 14
  cursorY = drawParagraph(
    "Bachelor of Engineering (B.E.) in Robotics and Artificial Intelligence • Nov 2022 – Apr 2026 (Expected) • Bangalore, Karnataka, India",
    { page, x: margin, y: cursorY, font: fontRegular, size: 10.5, maxWidth: contentWidth, lineHeight: 14 },
  )
  cursorY -= 8

  // Other Projects
  page.drawText("Other Projects", { x: margin, y: cursorY, size: 13, font: fontBold })
  cursorY -= 16
  cursorY = drawParagraph(
    "AMR Simulation – PyBullet AMR build with Python 3.8+: Designed, programmed and simulated a mobile robot featuring realistic physics, LiDAR sensing, occupancy-grid mapping, path planning, and obstacle avoidance—lightweight, modular, and ROS-free for rapid prototyping and research.",
    { page, x: margin, y: cursorY, font: fontRegular, size: 10.5, maxWidth: contentWidth, lineHeight: 14 },
  )
  cursorY -= 6
  cursorY = drawParagraph(
    "Mobile Turtlebot in ROS2: Built and deployed a ROS 2–based mobile platform using TurtleBot, integrating LiDAR, SLAM, and Nav2 for autonomous mapping and navigation in simulation. Capabilities include teleop, waypoint following, and obstacle avoidance with Gazebo/RViz workflows, packaged as reproducible launch files.",
    { page, x: margin, y: cursorY, font: fontRegular, size: 10.5, maxWidth: contentWidth, lineHeight: 14 },
  )
  cursorY -= 6
  cursorY = drawParagraph(
    "Quadruped Robot (Spot‑Inspired): Designed a modular Fusion 360–based mechanical assembly for a Spot‑like quadruped, optimized for fabrication and future actuator/electronics integration; enables rapid prototyping and simulation.",
    { page, x: margin, y: cursorY, font: fontRegular, size: 10.5, maxWidth: contentWidth, lineHeight: 14 },
  )
  cursorY -= 6
  cursorY = drawParagraph(
    "TriPUS - Retail Intelligence Platform: Built a full‑stack e‑commerce web app with authentication, product catalog, cart/checkout, and admin inventory. Emphasized clean architecture, scalable components, responsive UI, performant APIs, CI-ready structure, and clear documentation.",
    { page, x: margin, y: cursorY, font: fontRegular, size: 10.5, maxWidth: contentWidth, lineHeight: 14 },
  )
  cursorY -= 6
  cursorY = drawParagraph(
    "Design & Implementation of A Mobile Robot with 6‑DoF Arm for Agri Purpose: Developed a rugged mobile base with a 6‑DoF manipulator for field tasks such as soil sampling, targeted spraying, and object handling, integrating perception, IK/path planning, and motor control.",
    { page, x: margin, y: cursorY, font: fontRegular, size: 10.5, maxWidth: contentWidth, lineHeight: 14 },
  )
  cursorY -= 8

  // Skills (two columns)
  page.drawText("Skills", { x: margin, y: cursorY, size: 13, font: fontBold })
  cursorY -= 16

  const skillsLeft = [
    "UI & Web: WPF, XML, HTML, JavaScript, CSS, TypeScript",
    "Back-end: C, Python, MATLAB, Node.js",
    "Libraries: TensorFlow, PyBullet, OpenCV, NLTK, spaCy, React",
    "Modeling: Fusion 360, SolidWorks, AutoCAD",
  ]
  const skillsRight = [
    "Robot Simulation: Gazebo, Webots, ROS, ABB, RoboCell",
    "Microcontrollers: Arduino, ESP8266, ESP32, Raspberry Pi",
    "EE Design: LabVIEW",
    "DevOps & Tools: Git, GitHub Desktop, MS Office",
  ]

  yTemp = cursorY
  for (const s of skillsLeft) {
    yTemp = drawParagraph(s, {
      page,
      x: margin,
      y: yTemp,
      font: fontRegular,
      size: 10.5,
      maxWidth: colWidth,
      lineHeight: 14,
    })
    yTemp -= 2
  }

  yTemp2 = cursorY
  for (const s of skillsRight) {
    yTemp2 = drawParagraph(s, {
      page,
      x: margin + colWidth + colGap,
      y: yTemp2,
      font: fontRegular,
      size: 10.5,
      maxWidth: colWidth,
      lineHeight: 14,
    })
    yTemp2 -= 2
  }

  cursorY = Math.min(yTemp, yTemp2) - 8

  // Professional Skills
  page.drawText("Professional Skills", { x: margin, y: cursorY, size: 13, font: fontBold })
  cursorY -= 16
  cursorY = drawBullets(
    [
      "Robotic Process Automation, Systemic Product Design, Project Planning",
      "Cross-Cultural Communication, Conference Organisation, Teaching",
    ],
    { page, x: margin, y: cursorY, font: fontRegular, size: 10.5, maxWidth: contentWidth, lineHeight: 14 },
  )
  cursorY -= 8

  // Certifications
  page.drawText("Certifications", { x: margin, y: cursorY, size: 13, font: fontBold })
  cursorY -= 16
  cursorY = drawBullets(
    [
      "MoE's Innovation Ambassador (IA) Training – Foundation, Reskilling, Advanced Levels",
      "Mechanics and Control of Robotic Manipulator (NPTEL)",
      "Advanced Robotics Applications (NPTEL ELITE)",
      "Prompt Design in Vertex AI; Build Real World AI Applications with Gemini and Imagen; Develop GenAI Apps with Gemini and Streamlit",
      "TCS iON Career Edge – Young Professional",
      "Comparative Analysis of Converter Techniques for Ripple Reduction (Zigma Medicare India)",
      "Generative AI Model Development",
    ],
    { page, x: margin, y: cursorY, font: fontRegular, size: 10.5, maxWidth: contentWidth, lineHeight: 14 },
  )
  cursorY -= 8

  // Languages
  page.drawText("Languages", { x: margin, y: cursorY, size: 13, font: fontBold })
  cursorY -= 16
  cursorY = drawParagraph("English (Native), Kannada (Bilingual), Hindi (Limited working), Telugu (Elementary).", {
    page,
    x: margin,
    y: cursorY,
    font: fontRegular,
    size: 10.5,
    maxWidth: contentWidth,
    lineHeight: 14,
  })
  cursorY -= 8

  // References
  page.drawText("References", { x: margin, y: cursorY, size: 13, font: fontBold })
  cursorY -= 16
  cursorY = drawParagraph("Available upon request.", {
    page,
    x: margin,
    y: cursorY,
    font: fontRegular,
    size: 10.5,
    maxWidth: contentWidth,
    lineHeight: 14,
  })

  const pdfBytes = await pdfDoc.save()

  const headers = new Headers({
    "Content-Type": "application/pdf",
    "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="Sujal_Gupta_Resume.pdf"`,
    "Cache-Control": "no-store",
  })

  return new Response(pdfBytes, { status: 200, headers })
}
