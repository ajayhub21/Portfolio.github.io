// Chat service - simulates AI responses with pattern matching
import { chatResponses } from '../data/chatData'

/**
 * Simulate an AI response based on the user's message.
 * Matches keywords from the chatData responses.
 */
export const getChatResponse = async (userMessage) => {
  // Simulate network delay for realistic typing effect
  const delay = 600 + Math.random() * 800
  await new Promise((resolve) => setTimeout(resolve, delay))

  const message = userMessage.toLowerCase().trim()

  // Search through all response categories for keyword matches
  for (const [, data] of Object.entries(chatResponses)) {
    if (data.keywords && data.keywords.some((keyword) => message.includes(keyword))) {
      return data.response
    }
  }

  // Default response if no keywords matched
  return chatResponses.default.response
}
