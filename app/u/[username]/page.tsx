import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Share from './share'

const Loading = () => (
    <div className="flex items-center justify-center h-screen w-full bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
)


async function checkUsernameExists(username: string) {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('userData')
        .select('userName')
        .eq('userName', username)
    if (error || data.length === 0) {
        console.error('Username not found or error fetching data:', error)
        redirect('/error')
    }
    console.log(data);
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
            linkedin: data[0].socialLinks['linkedin'],
            location: data[0].location as string,
            customlinks: JSON.parse(data[0].customLinks),
            logo: data[0].logo,
            aboutUs: data[0].aboutUs as string,
        }
    }
    return null
}


import Image from 'next/image'
import { MessageCircle, User } from 'lucide-react'
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
    await checkUsernameExists(username);
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
                    <div className="absolute top-4 left-4">
                        <ThemeToggle />
                    </div>

                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                        <div className="relative w-32 h-32">
                            <Image
                                src={userData.logo}
                                alt="Profile picture"
                                layout="fill"
                                objectFit="cover"
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
                    <a href={`https://wa.me/${userData.phone}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <MessageCircle className="w-8 h-8 text-green-500 mb-1" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">WhatsApp</span>
                    </a>
                    <a href={`${userData.location}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <MapPin className="w-8 h-8 text-red-500 mb-1" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">Directions</span>
                    </a>
                </div>

                <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">Social Links</h2>
                    <div className="flex overflow-x-auto whitespace-nowrap border-t border-gray-200 dark:border-gray-700 p-2">
                        {userData.facebook.length > 0 && (
                            <a href={userData.facebook.startsWith('http') ? userData.facebook.url : `https://${userData.facebook}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 mx-2">
                                <Facebook className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-1" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">Facebook</span>
                            </a>
                        )}
                        {userData.twitter.length > 0 && (

                            <a href={userData.twitter.startsWith('http') ? userData.twitter.url : `https://${userData.twitter}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 mx-2">
                                <Twitter className="w-8 h-8 text-blue-400 dark:text-blue-300 mb-1" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">Twitter</span>
                            </a>
                        )}
                        {userData.linkedin.length > 0 && (
                            <a href={userData.linkedin.startsWith('http') ? userData.linkedin.url : `https://${userData.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 mx-2">
                                <Linkedin className="w-8 h-8 text-blue-700 dark:text-blue-500 mb-1" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">LinkedIn</span>
                            </a>
                        )}
                        {userData.instagram.length > 0 && (
                            <a href={userData.instagram.startsWith('http') ? userData.instagram.url : `https://${userData.instagram}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 mx-2">
                                <Instagram className="w-8 h-8 text-blue-700 dark:text-blue-500 mb-1" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">Instagram</span>
                            </a>
                        )}
                    </div>
                </div>

                <CustomLinksCatalog links={userData.customlinks} />

            </div>
        </div>
    )
}


export default function MyLinkPage({ params }: { params: { username: string } }) {
    return (
        <Suspense fallback={<Loading />}>
            <DigitalBusinessCard username={params.username} />
        </Suspense>
    )
}