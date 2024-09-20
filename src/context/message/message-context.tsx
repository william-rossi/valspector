"use client"

import React, { createContext, useContext, ReactNode, useState, useEffect, useRef } from "react"
// import { SvgCheckColorFilled02, SvgDangerColorFilled, SvgInfoColorFilled, SvgPlus, SvgWarningColorFilled } from "@/components/svgs/icons"
import { usePathname } from "next/navigation"
import styles from "./styles.module.scss"
import { SvgClose, SvgDanger, SvgInfo, SvgSuccess, SvgWarning } from "@/svgs/icons"

type MessageType = "success" | "danger" | "information" | "warning"

interface Options {
    /** Mantém a mesagem na tela até que clique para fechar. */
    keepOnScreen?: boolean
    /** Estilo da mensagem. */
    type: MessageType
    /** Ícone à esquerda do card da mensagem. */
    hasIcon?: boolean
    /** Duração da mensagem em milissegundos. */
    duration?: number
    /** Escreve no Console do DevTools o erro detalhado. */
    error?: Error
}

interface MessageContextType {
    showMessage: (message?: string, options?: Options) => void
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

interface MessageProviderProps {
    children: ReactNode
}

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
    const [messages, setMessages] = useState<{ id: number; text: string; options: Options; progress: number; isVisible: boolean }[]>([])
    const messageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})
    const pathname = usePathname()
    const requestRef = useRef<number | null>(null)

    const defaultOptions: Options = {
        keepOnScreen: false,
        hasIcon: true,
        type: "information",
        duration: 5000,
    }

    const showMessage = (newMessage?: string, newOptions?: Options) => {
        const mergedOptions = { ...defaultOptions, ...newOptions }
        const id = Date.now()

        setMessages((prevMessages) => {
            if (prevMessages.length >= 3) {
                return [
                    ...prevMessages.slice(1),
                    { id, text: newMessage ?? "Houve um problema indefinido.", options: mergedOptions, progress: 100, isVisible: true }
                ]
            }
            return [
                ...prevMessages,
                { id, text: newMessage ?? "Houve um problema indefinido.", options: mergedOptions, progress: 100, isVisible: true }
            ]
        })

        if (mergedOptions.error) {
            console.error(mergedOptions.error)
        }
    }

    useEffect(() => {
        const animateProgress = () => {
            setMessages((prevMessages) =>
                prevMessages.map((message) => {
                    if (message.options.keepOnScreen) return message
                    const newProgress = message.progress - (100 / (message.options.duration || 5000)) * 16.7
                    if (newProgress <= 0) {
                        return { ...message, progress: 0, isVisible: false }
                    }
                    return { ...message, progress: newProgress }
                })
            )
            requestRef.current = requestAnimationFrame(animateProgress)
        }

        if (messages.some((msg) => msg.progress > 0 && msg.isVisible)) {
            if (!requestRef.current) {
                requestRef.current = requestAnimationFrame(animateProgress)
            }
        } else {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current)
                requestRef.current = null
            }
        }

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current)
                requestRef.current = null
            }
        }
    }, [messages.filter((msg) => msg.isVisible).length])

    useEffect(() => {
        setMessages([])
    }, [pathname])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMessages((prevMessages) => prevMessages.filter((msg) => msg.isVisible))
        }, 500)

        return () => clearTimeout(timeout)
    }, [messages.filter((msg) => !msg.isVisible).length])

    const handleRemoveMessage = (id: number) => {
        setMessages((prevMessages) =>
            prevMessages.map((m) => (m.id === id ? { ...m, progress: 0, isVisible: false } : m))
        )
    }

    const renderIcon = (type: MessageType) => {
        switch (type) {
            case "success":
                return <SvgSuccess />
            case "danger":
                return <SvgDanger />
            case "warning":
                return <SvgWarning />
            case "information":
                return <SvgInfo />
            default:
                return null
        }
    }

    const calculateTopPosition = (index: number): number => {
        let totalHeight = 0

        for (let i = 0; i < index; i++) {
            const messageRef = messageRefs.current[messages[i].id]
            if (messageRef && messages[i].isVisible) {
                totalHeight += messageRef.clientHeight
            }
        }

        return totalHeight
    }

    return (
        <MessageContext.Provider value={{ showMessage }}>
            {children}
            {messages.map(({ id, text, options, progress, isVisible }, index) => (
                <div
                    key={id}
                    ref={(el) => {
                        messageRefs.current[id] = el
                    }}
                    style={{ top: `${calculateTopPosition(index)}px` }}
                    className={`${styles.container} ${isVisible ? styles.showMessage : styles.hideMessage} custom-message`}
                >
                    <div className={`${styles.messageContainer} ${styles[options.type]}`}>
                        <div className={styles.messageArea}>
                            {options.hasIcon && <div className={styles.messageIcon}>{renderIcon(options.type)}</div>}
                            <span className={styles.messageText}>{text}</span>
                            <div onClick={() => handleRemoveMessage(id)} className={styles.closeIcon}>
                                <SvgClose />
                            </div>
                        </div>
                        {!options.keepOnScreen && (
                            <>
                                <div className={styles.progress} />
                                <div style={{ width: `${progress}%` }} className={styles.progressBar} />
                            </>
                        )}
                    </div>
                </div>
            ))}
        </MessageContext.Provider>
    )
}

export const useMessage = (): MessageContextType => {
    const context = useContext(MessageContext)

    if (!context) {
        throw new Error("O contexto de Message deve estar dentro do MessageProvider.")
    }

    return context
}