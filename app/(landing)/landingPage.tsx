import LoginButton from "@/components/LoginLogoutButton";
import { Link as LinkIcon, Zap, Shield } from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <header className="px-4 lg:px-6 h-16 flex items-center justify-between w-full max-w-7xl mx-auto transition-all duration-500 hover:bg-black/80 backdrop-blur-md">
                <Link className="flex items-center justify-center" href="#">
                    <LinkIcon className="h-6 w-6 mr-2 text-primary" />
                    <span className="font-bold text-lg">LinkBiz</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    {['Features', 'Pricing', 'About'].map((item, index) => (
                        <Link
                            key={index}
                            className="text-sm font-medium transition-all hover:text-primary hover:scale-105"
                            href={`#${item.toLowerCase()}`}
                        >
                            {item}
                        </Link>
                    ))}

                </nav>
            </header>
            <main className="flex-1 w-full max-w-7xl mx-auto">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 transition-all duration-700">
                    <div className="px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center animate-fade-in">
                            <div className="space-y-2">
                                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 bg-clip-text text-transparent">
                                    Your Digital Presence, Simplified
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                                    Get your own digital presence in just 2 minutes! Create a sharable landing page that consolidates all your information in one place, making it easy to connect with others quickly and efficiently.
                                </p>
                                <br /><br />
                                <Link href="/login">
                                    <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 text-white font-bold transition-all hover:scale-105 shadow-md">
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-black/60 backdrop-blur-md">
                    <div className="px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                            Why Choose LinkBiz?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: <Zap />, title: 'Lightning Fast', description: 'Create your page in minutes and share it instantly.' },
                                { icon: <LinkIcon />, title: 'Customizable', description: 'Tailor your page to match your brand perfectly.' },
                                { icon: <Shield />, title: 'Secure', description: 'Your data is always safe and protected with us.' },
                            ].map((feature, index) => (
                                <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg bg-white/10 transition-all transform hover:scale-105">
                                    <div className="h-12 w-12 mb-4 text-primary">{feature.icon}</div>
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center animate-fade-in-up">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Ready to Boost Your Online Presence?
                                </h2>
                                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                                    Join thousands of businesses who have already transformed their digital presence with LinkBiz.
                                </p>
                            </div>
                            {/* <Link href="/login">
                                <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 text-white font-bold transition-all hover:scale-105 shadow-md">
                                    Get Started
                                </button>
                            </Link> */}
                            <LoginButton />
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full max-w-7xl mx-auto items-center px-4 md:px-6 border-t border-gray-700 backdrop-blur-md">
                <p className="text-xs text-gray-400">© 2024 LinkBiz. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    {['Terms of Service', 'Privacy'].map((item, index) => (
                        <Link key={index} className="text-xs hover:underline" href="#">
                            {item}
                        </Link>
                    ))}
                </nav>
            </footer>
        </div>
    );
};

export default LandingPage;
