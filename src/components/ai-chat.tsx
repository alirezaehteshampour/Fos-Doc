'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export function AIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages,
                }),
            });

            const data = await response.json();

            if (data.error) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: `Error: ${data.error}`
                }]);
            } else {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: data.response
                }]);
            }
        } catch {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Common dark background color
    const bgColor = '#0a0a0a';
    const borderColor = '#262626';
    const mutedBg = '#171717';

    return (
        <>
            {/* Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-3 sm:p-4 rounded-full text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                style={{ background: 'linear-gradient(to right, #f97316, #ec4899)' }}
                aria-label="Toggle AI Chat"
            >
                {isOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="fixed z-50 flex flex-col overflow-hidden shadow-2xl"
                    style={{
                        backgroundColor: bgColor,
                        border: `1px solid ${borderColor}`,
                        // Mobile: full width at bottom
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '85vh',
                        borderRadius: '16px 16px 0 0',
                    }}
                >
                    {/* Desktop override styles */}
                    <style jsx>{`
            @media (min-width: 640px) {
              div {
                bottom: 80px !important;
                left: auto !important;
                right: 24px !important;
                width: 384px !important;
                height: 500px !important;
                max-height: calc(100vh - 120px) !important;
                border-radius: 16px !important;
              }
            }
          `}</style>

                    {/* Header */}
                    <div
                        className="p-3 sm:p-4 flex-shrink-0"
                        style={{
                            borderBottom: `1px solid ${borderColor}`,
                            background: 'linear-gradient(to right, rgba(249, 115, 22, 0.1), rgba(236, 72, 153, 0.1))',
                            backgroundColor: bgColor,
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'linear-gradient(to right, #f97316, #ec4899)' }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                        <line x1="9" y1="9" x2="9.01" y2="9" />
                                        <line x1="15" y1="9" x2="15.01" y2="9" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm text-white">FOS AI Assistant</h3>
                                    <p className="text-xs text-gray-400 hidden sm:block">Ask me about the documentation</p>
                                </div>
                            </div>
                            {/* Mobile close button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="sm:hidden p-2 rounded-full hover:bg-gray-800 transition-colors text-white"
                                aria-label="Close chat"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div
                        className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4"
                        style={{ backgroundColor: bgColor }}
                    >
                        {messages.length === 0 && (
                            <div className="text-center text-sm text-gray-400 py-6 sm:py-8">
                                <p className="mb-4">👋 Hi! I can help you with:</p>
                                <ul className="space-y-2 text-left max-w-xs mx-auto">
                                    <li>• Smart contract questions</li>
                                    <li>• Minting mechanics</li>
                                    <li>• Whitelist verification</li>
                                    <li>• API integration</li>
                                    <li>• Platform features</li>
                                </ul>
                            </div>
                        )}
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className="max-w-[85%] sm:max-w-[80%] p-3 rounded-2xl text-sm"
                                    style={
                                        msg.role === 'user'
                                            ? {
                                                background: 'linear-gradient(to right, #f97316, #ec4899)',
                                                color: 'white',
                                                borderBottomRightRadius: '4px',
                                            }
                                            : {
                                                backgroundColor: mutedBg,
                                                color: 'white',
                                                borderBottomLeftRadius: '4px',
                                            }
                                    }
                                >
                                    <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div
                                    className="p-3 rounded-2xl"
                                    style={{ backgroundColor: mutedBg, borderBottomLeftRadius: '4px' }}
                                >
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div
                        className="p-3 sm:p-4 flex-shrink-0"
                        style={{
                            borderTop: `1px solid ${borderColor}`,
                            backgroundColor: bgColor,
                        }}
                    >
                        <form onSubmit={sendMessage} className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about FOS..."
                                className="flex-1 px-4 py-2.5 sm:py-2 rounded-full text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                                style={{ backgroundColor: mutedBg, border: 'none' }}
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="p-2.5 sm:p-2 rounded-full text-white disabled:opacity-50 transition-opacity flex-shrink-0"
                                style={{ background: 'linear-gradient(to right, #f97316, #ec4899)' }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Mobile overlay backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 sm:hidden"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
