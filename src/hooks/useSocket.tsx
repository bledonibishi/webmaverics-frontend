import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { io, Socket } from 'socket.io-client'

const SOCKET_URL = process.env.REACT_APP_SERVER_BASE_URL

const useSocket = (): Socket | null => {
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (SOCKET_URL) {
      socketRef.current = io(SOCKET_URL)

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect()
        }
      }
    }

    return undefined
  }, [])
  return socketRef.current
}

export default useSocket
