import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const AmbientSound = () => {
  const { theme, soundEnabled } = useSelector((state) => state.ui)
  const audioCtxRef = useRef(null)
  const noiseNodeRef = useRef(null)
  const gainNodeRef = useRef(null)
  const lfoRef = useRef(null)

  useEffect(() => {
    // Only play sound if sound is enabled AND theme is dark
    if (!soundEnabled || theme !== 'dark') {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend()
      }
      return
    }

    const initAudio = () => {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        const ctx = new AudioContext()
        audioCtxRef.current = ctx

        // Create pink noise buffer
        const bufferSize = ctx.sampleRate * 2 // 2 seconds
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const output = noiseBuffer.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) {
          let white = Math.random() * 2 - 1
          output[i] = (lastOut + (0.02 * white)) / 1.02
          lastOut = output[i]
          output[i] *= 3.5 // (roughly) compensate for gain
        }

        // Noise Source
        const noiseSource = ctx.createBufferSource()
        noiseSource.buffer = noiseBuffer
        noiseSource.loop = true
        noiseNodeRef.current = noiseSource

        // Filter to make it sound like waves (lowpass)
        const filter = ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.value = 1000

        // Gain (Volume)
        const gainNode = ctx.createGain()
        gainNode.gain.value = 0.5 // Base volume
        gainNodeRef.current = gainNode

        // LFO for wave crashing effect
        const lfo = ctx.createOscillator()
        lfo.type = 'sine'
        lfo.frequency.value = 0.15 // Wave cycle speed
        lfoRef.current = lfo

        // LFO Gain to modulate the main filter frequency
        const lfoGain = ctx.createGain()
        lfoGain.gain.value = 800

        lfo.connect(lfoGain)
        lfoGain.connect(filter.frequency)

        // Connections
        noiseSource.connect(filter)
        filter.connect(gainNode)
        gainNode.connect(ctx.destination)

        noiseSource.start()
        lfo.start()
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }
    }

    let lastOut = 0
    initAudio()

    return () => {
      // Cleanup is handled by suspend/resume for performance
    }
  }, [theme, soundEnabled])

  return null
}

export default AmbientSound
