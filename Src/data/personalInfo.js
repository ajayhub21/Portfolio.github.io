// Personal information extracted from the original portfolio
export const personalInfo = {
  name: 'Ajay',
  lastName: 'R',
  fullName: 'Ajay R',
  title: 'Developer',
  greeting: 'Hi there...',
  dob: '21/06/2001',
  gender: 'Male',
  language: 'English',
  work: 'Intern at Infosys',
  phone: '9787105400',
  email: 'rajaybe@gmail.com',
  district: 'Nagapattinam',
  state: 'Tamil Nadu',
  country: 'India',
  profileImage: '/images/ajay2.png',
  aboutImage: '/images/ajay.png',
  resumeUrl: '/assets/AjayCV.docx',

  // Bio text from the original site
  heroBio:
    'Born and raised in Nagapattinam. I have done my schooling in Amritha Vidyalyam CBSE Senior Secondary School and now pursuing BTech from Panimalar Institute of Technology.',
  aboutBio:
    'I have done my schooling in Amritha Vidyalyam CBSE Senior Secondary School and pursued my BTech from Panimalar Institute of Technology. I did my internship at Megam Solutions and Ciarpro Tech Private Limited, where I gained real-world skills and technical expertise. Technologies I have worked with include Front-end development (HTML, CSS, JavaScript) and PHP/MySQL. My strengths include taking challenges head-on and maintaining a balanced perspective on success and failure. I am a quick learner who believes in smart work.',
  shortTermGoal: 'Want a platform where I can grow my career.',
  longTermGoal: 'To be well settled with my family and enjoy life with them.',

  // Social links from the original portfolio
  socials: [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=100055037331714',
      icon: 'FaFacebookF',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/Ajayajkannan004',
      icon: 'FaTwitter',
    },
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
