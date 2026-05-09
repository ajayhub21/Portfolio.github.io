import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCommentDots, FaTimes, FaExpand, FaCompress, FaPaperPlane, FaTrash } from 'react-icons/fa'
import { toggleChat, setExpanded, addMessage, clearChat } from '../../redux/slices/chatSlice'
import { getChatResponse } from '../../services/chatService'
import { assistantProfile, quickActions } from '../../data/chatData'
import styles from './ChatAssistant.module.css'

const ChatAssistant = () => {
  const dispatch = useDispatch()
  const { isOpen, isExpanded, messages } = useSelector((state) => state.chat)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // React Query mutation for getting AI responses
  const responseMutation = useMutation({
    mutationFn: getChatResponse,
    onSuccess: (response) => {
      dispatch(addMessage({ text: response, sender: 'assistant' }))
    },
  })

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, responseMutation.isPending])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  // Send greeting on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      dispatch(addMessage({ text: assistantProfile.greeting, sender: 'assistant' }))
    }
  }, [isOpen, messages.length, dispatch])

  const sendMessage = (text) => {
    if (!text.trim()) return
    dispatch(addMessage({ text: text.trim(), sender: 'user' }))
    setInput('')
    responseMutation.mutate(text.trim())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleQuickAction = (message) => {
    sendMessage(message)
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Preload avatar so it loads instantly when chat opens */}
      <link rel="preload" as="image" href={assistantProfile.avatar} />

      {/* Floating Chat Button */}
      <motion.button
        className={styles.chatButton}
        onClick={() => dispatch(toggleChat())}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat assistant"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <FaTimes />
            </motion.span>
          ) : (
            <motion.img 
              key="open" 
              src={assistantProfile.avatar} 
              alt="Virtual Assistant"
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.8, opacity: 0 }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '50%', transform: 'scale(0.85)' }}
            />
          )}
        </AnimatePresence>
        {!isOpen && <span className={styles.pulse} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${styles.chatWindow} ${isExpanded ? styles.expanded : ''}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerInfo}>
                <div className={styles.avatarWrapper}>
                  <img src={assistantProfile.avatar} alt={assistantProfile.name} className={styles.avatar} />
                  <span className={styles.onlineIndicator} />
                </div>
                <div>
                  <h4 className={styles.assistantName}>{assistantProfile.name}</h4>
                  <span className={styles.assistantRole}>{assistantProfile.role}</span>
                </div>
              </div>
              <div className={styles.headerActions}>
                <button onClick={() => dispatch(clearChat())} className={styles.headerBtn} aria-label="Clear chat" title="Clear chat">
                  <FaTrash />
                </button>
                <button onClick={() => dispatch(setExpanded(!isExpanded))} className={styles.headerBtn} aria-label="Toggle expand">
                  {isExpanded ? <FaCompress /> : <FaExpand />}
                </button>
                <button onClick={() => dispatch(toggleChat())} className={styles.headerBtn} aria-label="Close chat">
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className={styles.messages}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`${styles.message} ${msg.sender === 'user' ? styles.userMsg : styles.assistantMsg}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {msg.sender === 'assistant' && (
                    <img src={assistantProfile.avatar} alt="" className={styles.msgAvatar} />
                  )}
                  <div className={styles.msgContent}>
                    <div className={styles.bubble} dangerouslySetInnerHTML={{
                      __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
                    }} />
                    <span className={styles.timestamp}>{formatTime(msg.timestamp)}</span>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {responseMutation.isPending && (
                <motion.div
                  className={`${styles.message} ${styles.assistantMsg}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <img src={assistantProfile.avatar} alt="" className={styles.msgAvatar} />
                  <div className={styles.typingIndicator}>
                    <span /><span /><span />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className={styles.quickActions}>
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    className={styles.quickBtn}
                    onClick={() => handleQuickAction(action.message)}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form className={styles.inputArea} onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Tessa anything..."
                className={styles.input}
                disabled={responseMutation.isPending}
              />
              <button type="submit" className={styles.sendBtn} disabled={!input.trim() || responseMutation.isPending} aria-label="Send message">
                <FaPaperPlane />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatAssistant
