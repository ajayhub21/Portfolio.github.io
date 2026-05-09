// React Query service for fetching project data
const API_DELAY = 800 // Simulate network delay for demo

export const fetchProjects = async () => {
  // Simulate a slight delay to showcase loading states
  await new Promise((resolve) => setTimeout(resolve, API_DELAY))

  const response = await fetch(`${import.meta.env.BASE_URL}data/projects.json`)
  if (!response.ok) {
    throw new Error('Failed to fetch projects')
  }
  const data = await response.json()
  
  // Format the image paths for GitHub pages compatibility
  return data.map(project => ({
    ...project,
    image: project.image.startsWith('/') 
      ? import.meta.env.BASE_URL + project.image.slice(1) 
      : project.image
  }))
}
