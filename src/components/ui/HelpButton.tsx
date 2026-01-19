import { useState } from 'react';
import { HelpCircle, X, Mail, MessageCircle, FileText } from 'lucide-react';

export default function HelpButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-8 right-8 z-40">
            {/* Help Menu */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-72 bg-gradient-to-br from-slate-900 to-black border-2 border-cyan-400/30 rounded-2xl shadow-2xl overflow-hidden animate-fade-in mb-4">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-b border-cyan-400/30 px-6 py-4">
                        <h3 className="text-xl font-black text-white uppercase tracking-wide">Need Help?</h3>
                        <p className="text-sm text-gray-400 mt-1">Choose an option below</p>
                    </div>

                    {/* Menu Items */}
                    <div className="p-4 space-y-3">
                        {/* Contact Me */}
                        <a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-400/20 rounded-lg hover:border-cyan-400/50 hover:from-cyan-500/20 transition-all duration-300 group"
                        >
                            <div className="p-3 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                                <Mail className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <div className="text-white font-bold">Contact Me</div>
                                <div className="text-xs text-gray-400">Send a message</div>
                            </div>
                        </a>

                        {/* View Portfolio */}
                        <a
                            href="#projects"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-400/20 rounded-lg hover:border-purple-400/50 hover:from-purple-500/20 transition-all duration-300 group"
                        >
                            <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                                <FileText className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <div className="text-white font-bold">View Projects</div>
                                <div className="text-xs text-gray-400">See my work</div>
                            </div>
                        </a>

                        {/* Quick Chat */}
                        <a
                            href="mailto:mshuvik@gmail.com"
                            className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-500/10 to-transparent border border-pink-400/20 rounded-lg hover:border-pink-400/50 hover:from-pink-500/20 transition-all duration-300 group"
                        >
                            <div className="p-3 bg-pink-500/20 rounded-lg group-hover:bg-pink-500/30 transition-colors">
                                <MessageCircle className="w-5 h-5 text-pink-400" />
                            </div>
                            <div>
                                <div className="text-white font-bold">Quick Email</div>
                                <div className="text-xs text-gray-400">mshuvik@gmail.com</div>
                            </div>
                        </a>
                    </div>

                    {/* Footer */}
                    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-t border-cyan-400/20 px-6 py-3 text-center">
                        <p className="text-xs text-gray-400">I'm here to help! 👋</p>
                    </div>
                </div>
            )}

            {/* Help Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative group"
            >
                {/* Glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 animate-pulse"></div>

                {/* Button */}
                <div className="relative bg-gradient-to-br from-cyan-500 to-purple-500 p-4 rounded-full shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                    {isOpen ? (
                        <X className="w-6 h-6 text-white" />
                    ) : (
                        <HelpCircle className="w-6 h-6 text-white" />
                    )}
                </div>

                {/* Tooltip */}
                {!isOpen && (
                    <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                        <div className="bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded-lg border border-cyan-400/30">
                            Need Help?
                        </div>
                    </div>
                )}
            </button>
        </div>
    );
}
