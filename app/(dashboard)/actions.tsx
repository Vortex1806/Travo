"use server"
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
interface Link {
    title: string;
    url: string;
}


export async function getUserdata(userid: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("userData")
        .select()
        .eq("uuid", userid);

    if (error) {
        console.error("Error fetching data", error);
        return { error: "Error fetching data" };
    }

    return { data };
}

async function geturl(userid: string, imagename: string) {
    // Get the image URL (if your bucket allows public access)
    const supabase = createClient();

    const { data } = supabase
        .storage
        .from('logoimage')
        .getPublicUrl(`public/${userid}/${imagename}`);

    return data.publicUrl; // Image URL is ready to be saved in DB
}

export async function setUserdata(userId: string, formData: FormData) {
    const supabase = createClient();
    const business = formData.get('business') as string;
    const phone = formData.get('phone') as string;
    const location = formData.get('location') as string;
    const aboutus = formData.get('aboutUs') as string;
    const city = formData.get('city') as string;
    const country = formData.get('country') as string;
    const imageFile = formData.get('logo') as File | null;
    let imageUrl = null;
    if (imageFile?.size != 0) {
        // Upload image to Supabase Storage
        const { error: uploadError } = await supabase
            .storage
            .from('logoimage')  // Replace with your actual bucket name
            .upload(`public/${userId}/${imageFile?.name}`, imageFile!, {
                cacheControl: '3600',
                upsert: true
            });

        if (uploadError) {
            console.error("Error uploading image:", uploadError);
            return { error: "Error uploading image" };
        }

        imageUrl = await geturl(userId, imageFile!.name);
    }

    const socialobj = { 'facebook': '', 'instagram': '', 'twitter': '', 'linkedin': '' };
    socialobj['facebook'] = formData.get('facebook') as string;
    socialobj['instagram'] = formData.get('instagram') as string;
    socialobj['twitter'] = formData.get('twitter') as string;
    socialobj['linkedin'] = formData.get('linkedin') as string;
    if (imageUrl) {
        const { error } = await supabase
            .from("userData")
            .update({ businessName: business, phone: phone, socialLinks: socialobj, location: location, aboutUs: aboutus, city: city, country: country, logo: imageUrl })
            .eq('uuid', userId);
        if (error) {
            console.error("Error setting data:", error);
            return { error: "Error setting data" };
        }

    } else {
        const { error } = await supabase
            .from("userData")
            .update({ businessName: business, phone: phone, socialLinks: socialobj, location: location, aboutUs: aboutus, city: city, country: country })
            .eq('uuid', userId);
        if (error) {
            console.error("Error setting data:", error);
            return { error: "Error setting data" };
        }

    }


    revalidatePath('/');

    return { success: true };

}

export async function setCustLink(userId: string, links: Link[]) {
    const supabase = createClient();
    const { error } = await supabase
        .from("userData")
        .update({ customLinks: JSON.stringify(links) })
        .eq('uuid', userId);
    if (error) {
        console.error("Error setting data:", error);
        return { error: "Error setting data" };
    }

    return { success: true };
}