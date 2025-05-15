"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSupabase } from "../contexts/SupabaseContext"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./ProfilePage.css"

function ProfilePage() {
  const { supabase, user } = useSupabase()
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [profile, setProfile] = useState(null)
  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        if (error && error.code !== "PGRST116") {
          throw error
        }

        if (data) {
          setProfile(data)
          setUsername(data.username || "")
          setFullName(data.full_name || "")
        } else {
          setUsername(user?.user_metadata?.username || "")
          setFullName(user?.user_metadata?.full_name || "")
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
      } finally {
        setLoading(false)
      }
    }

    getProfile()
  }, [supabase, user])

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setUpdating(true)
    setMessage(null)

    try {
      // Check if profile exists
      const { data: existingProfile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (existingProfile) {
        // Update existing profile
        const { error } = await supabase
          .from("profiles")
          .update({
            username,
            full_name: fullName,
            updated_at: new Date(),
          })
          .eq("id", user.id)

        if (error) throw error
      } else {
        // Insert new profile
        const { error } = await supabase.from("profiles").insert([
          {
            id: user.id,
            username,
            full_name: fullName,
            created_at: new Date(),
          },
        ])

        if (error) throw error
      }

      setMessage("Profile updated successfully!")
    } catch (error) {
      setMessage(error.message)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <Footer />
        <div className="profile-page">
          <div className="container">
            <p>Loading profile...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="profile-page">
        <div className="container">
          <h1>Profile Page</h1>
          {message && <p className="message">{message}</p>}
          <form onSubmit={handleUpdateProfile}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="fullName">Full Name:</label>
              <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <button type="submit" disabled={updating}>
              {updating ? "Updating..." : "Update Profile"}
            </button>
          </form>
          <Link to="/protected">Go to Protected Page</Link>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProfilePage
