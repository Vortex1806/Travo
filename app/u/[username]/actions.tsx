"use server"
import { createClient } from "@/utils/supabase/server";


export async function getUserdata(username: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("userData")
        .select()
        .eq("username", username);

    if (error) {
        console.error("Error fetching data", error);
        return { error: "Error fetching data" };
    }

    return { data };
}
