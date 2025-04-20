// app/(root)/code-editor/[id]/page.tsx
'use client';
import { useRouter } from "next/navigation";
import CodeEditor from "../code-editor";
import { useEffect } from "react";
import useUserStore from "@/store/userStore"; // Adjust the path as needed

export default function CodeEditorPage() {
    const router = useRouter();
    const { user, initialize } = useUserStore();

    useEffect(() => {
        initialize(); // Initialize user state from localStorage
    }, [initialize]);

    useEffect(() => {
        if (user === null) {
            router.push('/'); // Redirect to home if user is null
        }
    }, [user, router]);

    const handleSolveClick = () => {
        router.push(`/`);
    };

    // Optional: Show loading state while checking auth
    if (user === undefined) {
        return <div>Loading...</div>;
    }

    // Only render CodeEditor if user exists
    return user ? <CodeEditor /> : null;
}