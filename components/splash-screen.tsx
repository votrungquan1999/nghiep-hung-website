"use client"

import { motion } from "framer-motion"

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary via-primary to-primary/90"
    >
      <div className="text-center max-w-2xl px-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.8, ease: "easeOut" }}
          className="mb-12 relative"
        >
          <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-150"></div>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nghiep_hung_logo_bg-T8322MemfFo82wE4Lyl1TRt5fZ5AVe.svg"
            alt="Nghiệp Hưng Logo"
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto relative z-10 drop-shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-2 tracking-tight">{"Nghiệp Hưng"}</h1>
          <p className="text-xl md:text-2xl font-sans font-medium text-white/90 tracking-wide">{"Công ty TNHH"}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.0, ease: "easeInOut" }}
          className="mt-16"
        >
          <div className="flex justify-center space-x-2">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.0, repeat: Number.POSITIVE_INFINITY, delay: 0, ease: "easeInOut" }}
              className="w-2 h-2 bg-white/70 rounded-full"
            ></motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.0, repeat: Number.POSITIVE_INFINITY, delay: 0.3, ease: "easeInOut" }}
              className="w-2 h-2 bg-white/70 rounded-full"
            ></motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.0, repeat: Number.POSITIVE_INFINITY, delay: 0.6, ease: "easeInOut" }}
              className="w-2 h-2 bg-white/70 rounded-full"
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
