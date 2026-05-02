// React Query service for fetching project data
const API_DELAY = 800 // Simulate network delay for demo

export const fetchProjects = async () => {
  // Simulate a slight delay to showcase loading states
  await new Promise((resolve) => setTimeout(resolve, API_DELAY))

  const response = await fetch('/data/projects.json')
  if (!response.ok) {
    throw new Error('Failed to fetch projects')
  }
  return response.json()
}
