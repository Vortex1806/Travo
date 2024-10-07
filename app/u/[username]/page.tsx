import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Heart, Share2, ArrowUpRight, MapPin, ShoppingBag, Users, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Share from './share'

const Loading = () => (
    <div className="flex items-center justify-center h-screen w-full bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
)

interface CardProps {
    title: string
    content: React.ReactNode
    icon?: React.ReactNode
    color: string
    className?: string
}

const Card: React.FC<CardProps> = ({ title, content, icon, color, className }) => (
    <div className={`${color} rounded-3xl p-6 shadow-lg backdrop-blur-lg bg-opacity-30 ${className} transition-all duration-300 ease-in-out transform hover:scale-105`}>
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
                {icon && <div className="mr-3">{icon}</div>}
                <h3 className="text-xl font-semibold text-white">{title}</h3>
            </div>
            <ArrowUpRight className="h-5 w-5 text-white opacity-75" />
        </div>
        <div className="text-white opacity-90">{content}</div>
    </div>
)


async function checkUsernameExists(username: string) {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('userData')
        .select('userName')
        .eq('userName', username)
        .single()

    if (error || !data) {
        console.error('Username not found or error fetching data:', error)
        redirect('/login')
    }

    return data
}

async function fetchData(username: string) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from("userData")
        .select()
        .eq("userName", username)

    if (error) {
        console.error("Error fetching data", error)
        return { error: "Error fetching data" }
    }
    if (data) {
        return {
            bizname: data[0].businessName as string,
            email: data[0].email as string,
            phone: data[0].phone as string,
            facebook: data[0].socialLinks['facebook'],
            twitter: data[0].socialLinks['twitter'],
            instagram: data[0].socialLinks['instagram'],
            location: data[0].location as string,
            customlinks: JSON.parse(data[0].customLinks),
            logo: data[0].logo,
            aboutUs: data[0].aboutUs as string,
        }
    }
    return null
}

interface Link {
    title: string
    url: string
}
import Image from 'next/image'
import { Compass, Mail, MessageCircle, User } from 'lucide-react'
import ThemeToggle from './themetoggle'
function CustomLinksCatalog({ links }: { links: { title: string; url: string }[] }) {
    return (
        <div className="mt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold my-2 px-4 text-gray-900 dark:text-white">Custom Links</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto px-4">
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 text-gray-900 dark:text-white"
                    >
                        {link.title}
                    </a>
                ))}
            </div>
        </div>
    )
}

async function DigitalBusinessCard({ username }: { username: string }) {
    const userData = await fetchData(username)

    if (!userData) {
        return <div>Error: User data not found</div>
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden max-w-md w-full">
                <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600">
                    <div className="absolute top-4 right-4">
                        <Share />
                    </div>
                    <div className="absolute top-4 right-4">
                        <ThemeToggle />
                    </div>

                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                        <div className="relative">
                            <Image
                                src={userData.logo}
                                alt="Profile picture"
                                width={120}
                                height={120}
                                className="rounded-full border-4 border-white dark:border-gray-800"
                            />

                        </div>
                    </div>
                </div>
                <div className="pt-16 pb-6 px-6 text-center">
                    <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{userData.bizname} <span className="text-blue-500">✓</span></h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Bangalore, Karnataka</p>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">{userData.aboutUs}</p>
                    <a href="#connect" className="mt-6 bg-black dark:bg-white text-white dark:text-black w-full py-3 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition duration-200 inline-block">
                        Connect With Me
                    </a>
                </div>

                <div className="grid grid-cols-3 border-t border-gray-200 dark:border-gray-700">
                    <a href="#save-info" className="flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <User className="w-8 h-8 text-gray-400 dark:text-gray-300 mb-1" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">Save My Info</span>
                    </a>
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <MessageCircle className="w-8 h-8 text-green-500 mb-1" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">WhatsApp</span>
                    </a>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <MapPin className="w-8 h-8 text-red-500 mb-1" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">Directions</span>
                    </a>
                </div>

                <div className="flex justify-around border-t border-gray-200 dark:border-gray-700 p-4">
                    <a href="#facebook" className="text-blue-600 dark:text-blue-400">
                        <Facebook className="w-6 h-6" />
                    </a>
                    <a href="#twitter" className="text-blue-400 dark:text-blue-300">
                        <Twitter className="w-6 h-6" />
                    </a>
                    <a href="#linkedin" className="text-blue-700 dark:text-blue-500">
                        <Linkedin className="w-6 h-6" />
                    </a>
                </div>

                <CustomLinksCatalog links={userData.customlinks} />
            </div>
        </div>
    )
}

async function Component2({ username }: { username: string }) {
    const userData = await fetchData(username)

    if (!userData) {
        return <div>Error: User data not found</div>
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 p-6 text-white">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-8 p-6 bg-white bg-opacity-10 rounded-lg shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out transform hover:bg-opacity-20">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                        {userData.bizname}
                    </h1>
                    <div className="flex items-center space-x-6">
                        <Share />
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card
                        title="Business Details"
                        icon={<div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold"></div>}
                        content={
                            <div className="space-y-2">
                                <p><strong>Email:</strong> <a href={`mailto:${userData.email}`} className="text-blue-300 hover:underline">{userData.email}</a></p>
                                <p><strong>Phone:</strong> <a href={`tel:${userData.phone}`} className="text-blue-300 hover:underline">{userData.phone}</a></p>
                                <p className="mt-4">{userData.aboutUs}</p>
                            </div>
                        }
                        color="bg-blue-600"
                        className="md:col-span-2 lg:col-span-3"
                    />

                    <Card
                        title="Social Media"
                        icon={<Users className="h-8 w-8 text-white" />}
                        content={
                            <div className="space-y-4">
                                <a href={userData.facebook.startsWith('http') ? userData.facebook : `https://${userData.facebook}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-blue-300 transition duration-300">
                                    <Facebook className="h-5 w-5 mr-2" /> Facebook
                                </a>
                                <a href={userData.twitter.startsWith('http') ? userData.twitter : `https://${userData.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-blue-300 transition duration-300">
                                    <Twitter className="h-5 w-5 mr-2" /> Twitter
                                </a>
                                <a href={userData.instagram.startsWith('http') ? userData.instagram : `https://${userData.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-blue-300 transition duration-300">
                                    <Instagram className="h-5 w-5 mr-2" /> Instagram
                                </a>
                            </div>
                        }
                        color="bg-green-600"
                    />

                    <Card
                        title="Location"
                        icon={<MapPin className="h-8 w-8 text-white" />}
                        content={
                            <div>
                                <p className="mb-2">{userData.location}</p>
                                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                    <iframe
                                        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0167387869!2d77.57314861482183!3d12.963636190866334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15e2fc1de573%3A0x69e806c752cb97ae!2sGovernment%20Dental%20College%20%26%20Research%20Centre%2C%20Bengaluru%2C%20Karnataka%20560002!5e0!3m2!1sen!2sin!4v1633512615050!5m2!1sen!2sin'
                                        width="100%"
                                        height="200"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                    ></iframe>
                                </div>
                            </div>
                        }
                        color="bg-purple-600"
                    />

                    <Card
                        title="Our Catalog"
                        icon={<ShoppingBag className="h-8 w-8 text-white" />}
                        content={
                            <div className="space-y-4">
                                {userData.customlinks.map((link: Link, index: number) => (
                                    <div
                                        key={index}
                                        className="bg-white bg-opacity-10 p-4 rounded-lg hover:bg-opacity-20 transition duration-300 transform hover:scale-105"
                                    >
                                        <h4 className="text-lg font-semibold text-white mb-2">{link.title}</h4>
                                        <a
                                            href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-300 hover:underline"
                                        >
                                            {link.url}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        }
                        color="bg-red-600"
                        className="md:col-span-2 lg:col-span-3"
                    />
                </div>
            </div>
        </div>
    )
}

export default function MyLinkPage({ params }: { params: { username: string } }) {
    return (
        <Suspense fallback={<Loading />}>
            {/* <Component2 username={params.username} /> */}
            <DigitalBusinessCard username={params.username} />
        </Suspense>
    )
}