// Personal information extracted from the original portfolio
export const personalInfo = {
  name: 'Ajay',
  lastName: 'R',
  fullName: 'Ajay R',
  title: 'Frontend Developer (React.js)',
  greeting: 'Hi there...',
  dob: '21/06/2001',
  gender: 'Male',
  language: 'English',
  work: 'Frontend Developer at TCS',
  phone: '+91-9787105400',
  email: 'rajaybe@gmail.com',
  district: 'Chennai',
  state: 'Tamil Nadu',
  country: 'India (Open to Relocation)',
  profileImage: import.meta.env.BASE_URL + 'images/ajay2.png',
  aboutImage: import.meta.env.BASE_URL + 'images/ajay.png',
  resumeUrl: import.meta.env.BASE_URL + 'assets/AjayCV.docx',

  // Bio text from the original site
  heroBio:
    'Frontend Developer with 3+ years of experience building scalable and responsive web applications.',
  aboutBio:
    'Frontend Developer with 3+ years of experience building scalable and responsive web applications using React.js, JavaScript (ES6+), HTML5, and CSS3. Experienced in developing Single Page Applications (SPA), integrating RESTful APIs, and implementing real-time features using SignalR and Azure Web PubSub. Proficient in unit testing with Jest and React Testing Library.',
  aboutHighlights: [
    '3+ years experience',
    'Strong in React ecosystem',
    'Real-time app expertise'
  ],
  shortTermGoal: 'Want a platform where I can grow my career.',
  longTermGoal: 'To be well settled with my family and enjoy life with them.',

  // Social links from the original portfolio
  socials: [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ajay.__.aj/',
      icon: 'FaInstagram',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ajay-aj-474432187/',
      icon: 'FaLinkedinIn',
    },
  ],
}

// Calculate age dynamically
export const getAge = () => {
  const dob = new Date(2001, 5, 21) // June 21, 2001
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const monthDiff = today.getMonth() - dob.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--
  }
  return age
}
