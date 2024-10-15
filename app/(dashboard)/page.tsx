"use client"

import { useEffect, useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Instagram, Linkedin, Twitter, MapPin, User, Moon, Sun } from "lucide-react";
import LoginButton from "@/components/LoginLogoutButton";
import { getUserdata, setUserdata, setCustLink } from "./actions";
import LogoutPage from "../(auth)/logout/page";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SetUserNamePageProps {
    userId: string;
}

interface SocialLinks {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
}

interface Link {
    title: string;
    url: string;
}

export default function DashBoardUI({ userId }: SetUserNamePageProps) {
    const router = useRouter();
    const [businessName, setBusiness] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [about, setabout] = useState("");
    const [logourl, setlogo] = useState("");
    const [username, setusername] = useState("");
    const [socialLinks, setSocial] = useState<SocialLinks>({
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: ''
    });
    const [location, setLocation] = useState("");
    const [links, setLinks] = useState<Link[]>([]);
    const [newLink, setNewLink] = useState<Link>({ title: '', url: '' });
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        async function fetchData() {
            const { error, data } = await getUserdata(userId);
            if (error) {
                console.log("Error in fetching data");
                window.alert("Error fetching data");
                LogoutPage();
            }
            if (data) {
                setusername(data[0].userName);
                setCity(data[0].city)
                setCountry(data[0].country);
                setBusiness(data[0].businessName);
                setEmail(data[0].email);
                setPhone(data[0].phone);
                setLocation(data[0].location);
                setSocial(data[0].socialLinks);
                setabout(data[0].aboutUs);
                const linkx = JSON.parse(data[0].customLinks);
                setLinks(linkx);
                setlogo(data[0].logo)
            }
        }

        fetchData();
    }, [userId]);

    const setting = async (formData: FormData) => {
        setSelectedImage(null);
        const { error, success } = await setUserdata(userId, formData);
        if (error) {
            window.alert("Error setting data");
        }
        if (success) {
            router.refresh();
            window.alert("Information saved successfully");
        }
    }

    useEffect(() => {
        if (links.length > 0) {
            setLinkz(links);
        }
    }, [links]);

    const setLinkz = async (updatedLinks: Link[]) => {
        const { error, success } = await setCustLink(userId, updatedLinks);
        if (error) {
            window.alert("Error setting data");
        }
        if (success) {
            //window.alert("Information saved successfully");
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSocial((prevSocialLinks) => ({
            ...prevSocialLinks,
            [name]: value
        }));
    };

    const handleAddLink = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newLink.title.trim() && newLink.url.trim()) {
            setLinks((prevLinks) => [...prevLinks, newLink]);
            setNewLink({ title: '', url: '' });
        }
    };

    const handleRemoveLink = (index: number) => {
        setLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    if (!mounted) return null;
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="bg-card shadow">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Business Dashboard</h1>

                    {username && <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-md w-full max-w-xs">
                        <a
                            href={`http://localhost:3000/u/${username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white-600 hover:underline  w-full text-center"
                        >
                            http://localhost:3000/u/{username}

                        </a>
                    </div>}
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" onClick={toggleTheme}>
                            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                        </Button>
                        <LoginButton />
                    </div>
                </div>
            </header>
            <main className="container mx-auto p-4">
                <Tabs defaultValue="info" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="info">Information</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    </TabsList>
                    <TabsContent value="info">
                        <form>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Business Information</CardTitle>
                                    <CardDescription>Manage your business details and social links</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">

                                    {/* Business Information Form */}
                                    <div className="space-y-2">
                                        <Label htmlFor="imageUpload">Upload Business Image</Label>
                                        <Input
                                            id="imageUpload"
                                            type="file"
                                            name="logo"
                                            height={200}
                                            width={200}
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e)}
                                        />
                                        {selectedImage && (
                                            <Image
                                                src={URL.createObjectURL(selectedImage)}
                                                height={100}
                                                width={100}
                                                alt="Selected"
                                                className=" h-40 w-40 object-contain"
                                            />
                                        )}
                                    </div>
                                    <div className="rounded-full ">
                                        <Image
                                            src={`${logourl}`}
                                            alt="Company logo"
                                            width={70}
                                            height={70}
                                            className="rounded-full"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Business Name</Label>
                                        <Input
                                            id="name"
                                            name="business"
                                            placeholder="Enter your business name"
                                            value={businessName}
                                            onChange={(e) => setBusiness(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            disabled
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="Enter your phone number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="country">City</Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            type="text"
                                            placeholder="Enter your city name"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="country">Country</Label>
                                        <Input
                                            id="country"
                                            name="country"
                                            type="text"
                                            placeholder="Enter your Country/state"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="aboutUs">About Us</Label>
                                        <textarea
                                            id="aboutUs"
                                            name="aboutUs"
                                            placeholder="Enter about your company"
                                            value={about}
                                            onChange={(e) => setabout(e.target.value)}
                                            className="w-full p-2 rounded-lg border border-input bg-background"
                                            rows={4}
                                        />
                                    </div>
                                    <Separator />
                                    {/* Social Links */}
                                    <div className="space-y-2">
                                        <Label>Social Links</Label>
                                        <div className="flex space-x-2">
                                            <Input
                                                placeholder="Facebook URL"
                                                name="facebook"
                                                value={socialLinks?.facebook}
                                                onChange={handleChange}
                                            />
                                            <Facebook className="w-6 h-6" />
                                        </div>
                                        <div className="flex space-x-2">
                                            <Input
                                                placeholder="Twitter URL"
                                                name="twitter"
                                                value={socialLinks?.twitter}
                                                onChange={handleChange}
                                            />
                                            <Twitter className="w-6 h-6" />
                                        </div>
                                        <div className="flex space-x-2">
                                            <Input
                                                placeholder="Instagram URL"
                                                name="instagram"
                                                value={socialLinks?.instagram}
                                                onChange={handleChange}
                                            />
                                            <Instagram className="w-6 h-6" />
                                        </div>
                                        <div className="flex space-x-2">
                                            <Input
                                                placeholder="LinkedIn URL"
                                                name="linkedin"
                                                value={socialLinks?.linkedin}
                                                onChange={handleChange}
                                            />
                                            <Linkedin className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="space-y-2">
                                        <Label htmlFor="location">Map Location</Label>
                                        <div className="flex space-x-2">
                                            <Input
                                                id="location"
                                                placeholder="Enter your address"
                                                name="location"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                            />
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <Button formAction={setting}>Save Information</Button>
                                </CardContent>
                            </Card>
                        </form>
                        <br />
                        {/* Custom Links Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Custom Links</CardTitle>
                                <CardDescription>Add and manage your custom links</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form action="" className="space-y-4" onSubmit={handleAddLink}>
                                    <div className="space-y-2">
                                        <Label htmlFor="linkTitle">Link Title</Label>
                                        <Input
                                            id="linkTitle"
                                            name="title"
                                            value={newLink.title}
                                            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                                            placeholder="Enter link title"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="linkUrl">Link URL</Label>
                                        <Input
                                            name="url"
                                            id="linkUrl"
                                            value={newLink.url}
                                            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                            placeholder="Enter link URL"
                                            required
                                        />
                                    </div>
                                    <Button type="submit">Add Link</Button>
                                </form>
                                <Separator className="my-4" />
                                {links && links.map((link, index) => (
                                    <div key={index} className="flex items-center space-x-4 mb-2">
                                        <div className="flex-1">
                                            <a href={link.url.startsWith('http') ? link.url : `https://${link.url}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                {link.title}
                                            </a>
                                        </div>
                                        <Button
                                            variant="destructive"
                                            onClick={() => handleRemoveLink(index)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="analytics">
                        <Card>
                            <CardHeader>
                                <CardTitle>Analytics</CardTitle>
                                <CardDescription>View your visitor statistics</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                                            <User className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">10,482</div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Visitors Today</CardTitle>
                                            <User className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">342</div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
