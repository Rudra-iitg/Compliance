"use client";
export const dynamic = "force-dynamic";
import React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  createdAt: any;
  lastLogin: any;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.replace("/login");
      } else {
        try {
          // Fetch user data from Firestore
          const userDoc = await getDoc(doc(db, "users", u.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data() as UserData);
          } else {
            // Fallback to auth data if Firestore doc doesn't exist
            setUserData({
              uid: u.uid,
              email: u.email,
              displayName: u.displayName,
              createdAt: null,
              lastLogin: null,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData({
            uid: u.uid,
            email: u.email,
            displayName: u.displayName,
            createdAt: null,
            lastLogin: null,
          });
        } finally {
          setLoading(false);
        }
      }
    });
    return () => unsub();
  }, [router]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="glass rounded-2xl p-6 border border-white/10">
          <p className="text-slate-300/90">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">
        Welcome{userData?.displayName ? `, ${userData.displayName}` : ""}! 👋
      </h1>
      
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-lg">Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-slate-400">Name</p>
              <p className="text-slate-200">{userData?.displayName || "Not set"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Email</p>
              <p className="text-slate-200">{userData?.email || "Not set"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">User ID</p>
              <p className="text-slate-200 text-xs font-mono">{userData?.uid || "N/A"}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-lg">Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-slate-400">Account Created</p>
              <p className="text-slate-200">{formatDate(userData?.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Last Login</p>
              <p className="text-slate-200">{formatDate(userData?.lastLogin)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle>Your Personal Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300/90 mb-4">
            Welcome to your personalized compliance dashboard. Your account data is securely stored and synced across all your devices.
          </p>
          <div className="flex gap-3">
            <Button className="bg-indigo-500 hover:bg-indigo-400" onClick={() => router.push('/platform')}>
              Explore Platform
            </Button>
            <Button 
              variant="outline" 
              className="border-white/20 hover:bg-white/10" 
              onClick={() => signOut(auth).then(()=>router.replace('/'))}
            >
              Sign out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
