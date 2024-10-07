import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/lib/auth-actions"
import SignInWithGoogleButton from "./signinwithgooglebtn"

export const description =
    "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."

export function LoginForm() {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent><form action="">

                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link href="#" className="ml-auto inline-block text-sm underline">
                                Forgot your password?
                            </Link>
                        </div>
                        <Input id="password" name="password" type="password" required />
                    </div>
                    <Button type="submit" formAction={login} className="w-full">
                        Login
                    </Button>
                    <SignInWithGoogleButton />
                </div>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="underline">
                        Sign up
                    </Link>
                </div>
            </form>
            </CardContent>
        </Card>
    )
}

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { login, register, signInWithGoogle } from "@/lib/auth-actions"; // Assume register function exists
// import SignInWithGoogleButton from "./signinwithgooglebtn";

// export const description =
//     "A login and registration form with email and password options, plus Google login.";

// export function AuthForm() {
//     return (
//         <Card className="mx-auto max-w-md p-6 shadow-lg">
//             <CardHeader className="text-center">
//                 <CardTitle className="text-2xl font-bold">Welcome to LinkBiz</CardTitle>
//                 <CardDescription className="text-gray-500 mt-2">
//                     Please choose an option to proceed
//                 </CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <Tabs defaultValue="login" className="w-full">
//                     <TabsList className="flex justify-center mb-6">
//                         <TabsTrigger value="login">Login</TabsTrigger>
//                         <TabsTrigger value="register">Register</TabsTrigger>
//                     </TabsList>

//                     {/* Login Form */}
//                     <TabsContent value="login">
//                         <form formAction={login}>
//                             <div className="grid gap-4">
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="login-email">Email</Label>
//                                     <Input
//                                         id="login-email"
//                                         name="email"
//                                         type="email"
//                                         placeholder="m@example.com"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="grid gap-2">
//                                     <div className="flex items-center">
//                                         <Label htmlFor="login-password">Password</Label>
//                                         <Link href="#" className="ml-auto text-sm underline">
//                                             Forgot your password?
//                                         </Link>
//                                     </div>
//                                     <Input
//                                         id="login-password"
//                                         name="password"
//                                         type="password"
//                                         required
//                                     />
//                                 </div>
//                                 <Button type="submit" className="w-full mt-4">
//                                     Login
//                                 </Button>
//                                 <div className="mt-4">
//                                     <SignInWithGoogleButton />
//                                 </div>
//                             </div>
//                             <div className="mt-4 text-center text-sm">
//                                 Don&apos;t have an account?{" "}
//                                 <TabsTrigger value="register" className="underline">
//                                     Register
//                                 </TabsTrigger>
//                             </div>
//                         </form>
//                     </TabsContent>

//                     {/* Register Form */}
//                     <TabsContent value="register">
//                         <form onSubmit={register}>
//                             <div className="grid gap-4">
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="register-email">Email</Label>
//                                     <Input
//                                         id="register-email"
//                                         name="email"
//                                         type="email"
//                                         placeholder="m@example.com"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="register-password">Password</Label>
//                                     <Input
//                                         id="register-password"
//                                         name="password"
//                                         type="password"
//                                         placeholder="Create a password"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="confirm-password">Confirm Password</Label>
//                                     <Input
//                                         id="confirm-password"
//                                         name="confirmPassword"
//                                         type="password"
//                                         placeholder="Confirm your password"
//                                         required
//                                     />
//                                 </div>
//                                 <Button type="submit" className="w-full mt-4">
//                                     Register
//                                 </Button>
//                             </div>
//                             <div className="mt-4 text-center text-sm">
//                                 Already have an account?{" "}
//                                 <TabsTrigger value="login" className="underline">
//                                     Login
//                                 </TabsTrigger>
//                             </div>
//                         </form>
//                     </TabsContent>
//                 </Tabs>
//             </CardContent>
//         </Card>
//     );
// }
