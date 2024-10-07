import { Link as LinkIcon, Zap, Shield } from "lucide-react"
import LoginButton from "@/components/LoginLogoutButton"
import Link from "next/link"

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link className="flex items-center justify-center" href="#">
                    <LinkIcon className="h-6 w-6 mr-2" />
                    <span className="font-bold">LinkBiz</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
                        Features
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
                        Pricing
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
                        About
                    </Link>
                    <Link href="/login">
                        <LoginButton />
                    </Link>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Your Digital Presence, Simplified
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Create a beautiful landing page for your business in minutes. Just like Linktree, but tailored for professionals.
                                </p>
                            </div>
                            <div className="space-x-4">
                            </div>
                        </div>
                    </div>
                </section>
                <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                            Why Choose LinkBiz?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center text-center">
                                <Zap className="h-12 w-12 mb-4 text-primary" />
                                <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                                <p className="text-gray-500 dark:text-gray-400">Create your page in minutes and share it instantly.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <LinkIcon className="h-12 w-12 mb-4 text-primary" />
                                <h3 className="text-xl font-bold mb-2">Customizable</h3>
                                <p className="text-gray-500 dark:text-gray-400">Tailor your page to match your brand perfectly.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <Shield className="h-12 w-12 mb-4 text-primary" />
                                <h3 className="text-xl font-bold mb-2">Secure</h3>
                                <p className="text-gray-500 dark:text-gray-400">Your data is always safe and protected with us.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Ready to Boost Your Online Presence?
                                </h2>
                                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Join thousands of businesses who have already transformed their digital presence with LinkBiz.
                                </p>
                            </div>
                            <Link href="/sign-up">
                                <LoginButton />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 LinkBiz. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    );
}

export default LandingPage;