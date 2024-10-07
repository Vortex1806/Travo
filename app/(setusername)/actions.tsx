"use server"
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";


export async function checkUsernameAvailability(username: string) {
    const supabase = createClient();
    if (!username) {
        return { error: "Please enter a username" };
    }

    const { data, error } = await supabase
        .from("userData")
        .select("userName")
        .eq("userName", username);

    if (error) {
        console.error("Error checking username availability:", error);
        return { error: "Error checking username availability" };
    }

    return { available: data.length === 0, username };
}

export async function setUsername(userId: string, username: string) {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const email = data.user!.email;

    const { error } = await supabase
        .from("userData")
        .insert({ userName: username, uuid: userId, email: email }); // Add uuid here
    if (!username || username.trim() === "") {
        console.error("Invalid username provided");
        return { error: "Username cannot be empty" };
    }
    if (error) {
        console.error("Error setting username:", error);
        return { error: "Error setting username" };
    }

    revalidatePath('/dashboard'); // Optional cache revalidation
    return { success: true };
}