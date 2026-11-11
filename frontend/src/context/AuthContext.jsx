import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../services/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  // On mount, hydrate session from Supabase if configured
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // ─── Auth actions ───────────────────────────────────────────────────────────

  const signUp = useCallback(async (email, password, fullName) => {
    setLoading(true)
    try {
      if (!isSupabaseConfigured) {
        // Fallback simulation for preview
        const dummyUser = { id: 'demo-user', email, user_metadata: { full_name: fullName } }
        setUser(dummyUser)
        return { data: { user: dummyUser }, error: null }
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      })
      if (error) throw error

      if (data.user) {
        await supabase.from('user_profiles').upsert({
          id: data.user.id,
          full_name: fullName,
        })
      }

      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const signIn = useCallback(async (email, password) => {
    setLoading(true)
    try {
      if (!isSupabaseConfigured) {
        const dummyUser = { id: 'demo-user', email, user_metadata: { full_name: 'Demo Customer' } }
        setUser(dummyUser)
        return { data: { user: dummyUser }, error: null }
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    setLoading(true)
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut()
      }
      setUser(null)
      setSession(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const resetPassword = useCallback(async (email) => {
    if (!isSupabaseConfigured) return { data: null, error: null }
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/account?reset=true`,
    })
    if (error) throw error
    return data
  }, [])

  const getProfile = useCallback(async () => {
    if (!user) return null
    if (!isSupabaseConfigured) return user
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    if (error) throw error
    return data
  }, [user])

  const updateProfile = useCallback(
    async (updates) => {
      if (!user) return null
      if (!isSupabaseConfigured) return updates
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()
      if (error) throw error
      return data
    },
    [user]
  )

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    getProfile,
    updateProfile,
    isSupabaseConfigured,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
