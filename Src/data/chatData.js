// Chat assistant data - Tessa's knowledge base about Ajay
// Update this file with your real information

export const assistantProfile = {
  name: 'Tessa',
  role: 'Personal AI Assistant',
  avatar: import.meta.env.BASE_URL + 'images/tessa-avatar.png',
  greeting: "Hi there! 👋 I'm Tessa, Ajay's personal AI assistant. How can I help you today?",
}

// Predefined responses keyed by intent
export const chatResponses = {
  greeting: {
    keywords: ['hi', 'hello', 'hey', 'whats up', 'good morning', 'good evening'],
    response: "Hey there! 😊 I'm Tessa, Ajay's personal AI assistant. Feel free to ask me anything about Ajay — his skills, projects, experience, or how to get in touch!",
  },
  identity: {
    keywords: ['who are you', 'what are you', 'your name', 'introduce yourself', 'about you'],
    response: "I'm Tessa ✨ — Ajay's personal AI assistant built right into his portfolio! I can tell you all about Ajay's skills, projects, experience, and how to contact him. Just ask away!",
  },
  about: {
    keywords: ['who is ajay', 'tell me about ajay', 'about ajay', 'about him', 'who is he', 'about you owner'],
    response: "Ajay R is a passionate developer from Nagapattinam, Tamil Nadu 🇮🇳. He completed his BTech in Information Technology from Panimalar Institute of Technology with 84%. He's currently an Intern at Infosys. Ajay is a quick learner who believes in smart work and takes every challenge head-on! 💪",
  },
  skills: {
    keywords: ['skills', 'technologies', 'tech stack', 'what can he do', 'programming', 'languages'],
    response: "Ajay's tech arsenal includes:\n\n🌐 **Web Development** — HTML5, CSS3, JavaScript, React.js\n☕ **Java** — OOP, Application Development\n🐘 **PHP & MySQL** — Backend & Database\n🎨 **Web Design** — UI/UX, Responsive Design\n🎬 **Video Editing** — Content Creation\n🔧 **Tools** — Git, VS Code\n\nHe's always learning and expanding his skill set!",
  },
  projects: {
    keywords: ['projects', 'work', 'portfolio', 'what has he built', 'showcase'],
    response: "Here are some of Ajay's notable projects:\n\n🏠 **Portfolio Website** — Personal site with custom cursor effects\n🛒 **E-Commerce Platform** — Full-stack with PHP/MySQL\n☕ **Java Application** — Data processing tool (Oneyes Technologies)\n📋 **Product Management Tool** — Built at Megam Solutions\n📱 **Responsive Web App** — Modern front-end showcase\n🗄️ **Database Management System** — Built at Ciarpro Tech\n\nScroll up to the Projects section to see them in action!",
  },
  experience: {
    keywords: ['experience', 'internship', 'job', 'career', 'work history', 'education'],
    response: "Ajay's journey so far:\n\n🎓 **Education:**\n• Class 10th — 88% (Amritha Vidyalyam CBSE)\n• Class 12th — 64.3% (Amritha Vidyalyam CBSE)\n• BTech IT — 84% (Panimalar Institute of Technology)\n\n💼 **Work Experience:**\n• Java Development — Oneyes Technologies (2019)\n• Product Development — Megam Solutions (2020)\n• PHP/MySQL — Ciarpro Tech Pvt Ltd (2021)\n• Current: Intern at Infosys",
  },
  contact: {
    keywords: ['contact', 'email', 'phone', 'reach', 'hire', 'connect', 'get in touch'],
    response: "You can reach Ajay through:\n\n📧 **Email:** rajaybe@gmail.com\n📱 **Phone:** 9787105400\n📍 **Location:** Nagapattinam, Tamil Nadu, India\n\n🔗 **Social Media:**\n• LinkedIn: linkedin.com/in/ajay-aj-474432187\n• Instagram: @ajay.__.aj\n• Twitter: @Ajayajkannan004\n\nOr just scroll down to the Contact section and send a message! 📬",
  },
  resume: {
    keywords: ['resume', 'cv', 'download', 'qualification'],
    response: "You can download Ajay's CV right from the About section! Click the 'Download CV' button to get his latest resume. It includes his education, skills, and work experience details. 📄",
  },
  hobbies: {
    keywords: ['hobbies', 'interests', 'fun', 'free time', 'passion', 'sports', 'cricket', 'player'],
    response: "Besides coding, Ajay enjoys:\n\n🏸 **Sports:** Playing Shuttle and Cricket\n🏏 **Favorite Player:** MS Dhoni\n🎬 **Creative:** Video Editing & Content Creation\n🎨 **Design:** UI/UX\n\nHe's always curious and loves staying active!",
  },
  thanks: {
    keywords: ['thanks', 'thank you', 'awesome', 'great', 'nice', 'cool', 'helpful'],
    response: "You're welcome! 😊 I'm always here to help. If you have any more questions about Ajay or his work, just ask! Have a wonderful day! ✨",
  },
  default: {
    response: "That's an interesting question! 🤔 I'm Tessa, and I know a lot about Ajay. Try asking me about:\n\n• His **skills** & tech stack\n• His **projects** & portfolio\n• His **experience** & education\n• How to **contact** him\n• His **resume** / CV\n\nOr just say hi! 👋",
  },
}

// Quick action buttons shown in chat
export const quickActions = [
  { label: '👋 Who are you?', message: 'Who are you?' },
  { label: '🛠️ Skills', message: 'What are your skills?' },
  { label: '📁 Projects', message: 'Tell me about your projects' },
  { label: '📞 Contact', message: 'How can I contact you?' },
  { label: '🎓 Experience', message: 'Tell me about your experience' },
]
