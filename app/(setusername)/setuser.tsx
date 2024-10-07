// "use client"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import LoginButton from '@/components/LoginLogoutButton'
// import { checkUsernameAvailability, setUsername } from './actions'
// import { useState } from 'react';
// import { revalidatePath } from "next/cache"
// interface SetUserNamePageProps {
//     userId: string;
// }


// export default function SetUserNamePage({ userId }: SetUserNamePageProps) {
//     const [isValid, setIsValid] = useState<boolean | null>(null);
//     var generatedLink = false;
//     const checkUsername = async (formData: FormData) => {
//         const username = formData.get('username') as string;
//         const { error, available } = await checkUsernameAvailability(username ? username : "");
//         // const isValidUsername = username.length >= 3 && username.length <= 20 && /^[a-zA-Z0-9_]+$/.test(username);
//         console.log(available)
//         setIsValid(available as boolean)
//     }

//     const getLink = async (formData: FormData) => {
//         if (isValid) {
//             const username = formData.get('username') as string;
//             console.log(username + " " + userId)
//             const { error, success } = await setUsername(userId, username)
//             if (success) {
//                 revalidatePath('/');
//             }
//             if (error) {
//                 setIsValid(false);
//             }
//         }
//     }

//     return (
//         <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//             <div className="max-w-md w-full mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
//                 <LoginButton />
//                 <h1 className="text-2xl font-bold mb-4 text-white">Get Link</h1>
//                 <form action="">
//                     <div className="space-y-4">
//                         <div>
//                             <Label htmlFor="username" className="text-white">bizlink/u/</Label>

//                             <div className="flex mt-1">
//                                 <Input
//                                     id="username"
//                                     name='username'
//                                     placeholder="Enter username"
//                                     className="flex-grow bg-gray-700 text-white border-gray-600"
//                                 />
//                                 <Button formAction={checkUsername} className="ml-2">Check</Button>
//                             </div>
//                         </div>
//                         <Button formAction={getLink} disabled={!isValid} className="w-full">Get Link</Button>
//                         {isValid !== null && (
//                             <Alert variant={isValid ? "default" : "destructive"} className="bg-gray-700 border-gray-600">
//                                 <AlertDescription className="text-white">
//                                     {isValid
//                                         ? "Username is valid!"
//                                         : "Username is already in use, Please choose another"}
//                                 </AlertDescription>
//                             </Alert>
//                         )}
//                         {generatedLink && (
//                             <Alert className="bg-gray-700 border-gray-600">
//                                 <AlertDescription className="text-white">
//                                     Your link: <a href={generatedLink} className="text-blue-400 hover:underline">{generatedLink}</a>
//                                 </AlertDescription>
//                             </Alert>
//                         )}
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

"use client"

import { useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { checkUsernameAvailability, setUsername as setUsernamex } from './actions'
import { revalidatePath } from "next/cache"

interface SetUserNamePageProps {
    userId: string;
}

export default function SetUserNamePage({ userId }: SetUserNamePageProps) {
    const [username, setUsername] = useState("")
    const [isChecking, setIsChecking] = useState(false)
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null)

    const checkAvailability = async (formData: FormData) => {
        setIsChecking(true)
        const username = formData.get('username') as string;
        // Simulating an API call to check username availability
        const { error, available } = await checkUsernameAvailability(username ? username : "");
        if (available && username.length >= 3 && !username.includes(" ")) {
            setIsAvailable(true);
        }
        if (!available || error) {
            setIsAvailable(false);
        }
        setIsChecking(false)
    }
    const getLink = async (formData: FormData) => {
        if (isAvailable) {
            const username = formData.get('username') as string;
            console.log(username + " " + userId)
            const { error, success } = await setUsernamex(userId, username)
            if (success) {
                revalidatePath('/');
            }
            if (error) {
                setIsAvailable(false);
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <form action="">
                <Card className="w-full max-w-md bg-white border-2 border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-black">Select Your Username</CardTitle>
                        <CardDescription className="text-gray-600">
                            Choose a unique username for your business link
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-sm font-medium text-gray-800">
                                    Username
                                </Label>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        id="username"
                                        name="username"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="flex-1 bg-gray-100 text-black border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                                    />
                                    <Button
                                        formAction={checkAvailability}
                                        disabled={isChecking || username.length < 3}
                                        className={`w-24 ${isChecking ? 'bg-gray-300' : 'bg-black hover:bg-gray-800 text-white'}`}
                                    >
                                        {isChecking ? <Loader2 className="h-4 w-4 animate-spin" /> : "Check"}
                                    </Button>
                                </div>
                            </div>
                            <div className="text-sm text-gray-600">
                                Your link will be: bizlinks/u/<span className="font-semibold text-black">{username}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button formAction={getLink}
                            className={`w-full font-semibold ${isAvailable
                                ? 'bg-black hover:bg-gray-800 text-white'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                            disabled={!isAvailable}
                        >
                            {isAvailable ? (
                                <>
                                    <Check className="mr-2 h-4 w-4" /> Get Link
                                </>
                            ) : (
                                "Get Link"
                            )}
                        </Button>

                    </CardFooter>
                    {isAvailable !== null && (
                        <Alert variant={isAvailable ? "default" : "destructive"} className="bg-white border-black-600">
                            <AlertDescription className="text-black">
                                {isAvailable
                                    ? "Username is valid!"
                                    : "Username is already in use, Please choose another"}
                            </AlertDescription>
                        </Alert>
                    )}
                </Card>
            </form>
        </div>
    )
}