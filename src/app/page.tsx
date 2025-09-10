'use client';
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  redirect('/login');
  const router = useRouter();
  const handleLogout = async () => {
    const res = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (res.ok) {
      console.log("Logout successful");
      router.push('/login');
    } else {
      const errorData = await res.json();
      console.error("Logout failed:", errorData);
      alert(errorData.error || "Logout failed");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button onClick={handleLogout} className="bg-blue-500 p-3 text-white rounded-3xl">logout</button>
    </div>
  )
}