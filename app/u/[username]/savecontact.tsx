'use client'

import { Button } from "@/components/ui/button";
import { User } from "lucide-react"; // Ensure you have this icon or use another if needed

export default function SaveContact() {
    const saveContact = () => {
        const intentUrl = `intent://contacts/intent/#Intent;action=android.intent.action.INSERT;type=vnd.android.cursor.dir/contact;S.name=Shubh%20Vora;S.phone=+123456789;end`;
        window.location.href = intentUrl;
    };

    return (
        <a
            href="#save-info"
            onClick={(e) => {
                e.preventDefault();
                saveContact();
            }}
            className="flex flex-col items-center justify-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
            <User className="w-8 h-8 text-gray-400 dark:text-gray-300 mb-1" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Save My Info</span>
        </a>
    );
}
