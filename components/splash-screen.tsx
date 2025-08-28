"use client"

import { motion } from "framer-motion"

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary via-primary to-primary/90"
    >
      <div className="text-center max-w-2xl px-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ delay: 0.2, duration: 1.2, type: "spring", stiffness: 100 }}
          className="mb-12 relative"
        >
          <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-150"></div>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nghiep_hung_logo_bg-T8322MemfFo82wE4Lyl1TRt5fZ5AVe.svg"
            alt="Nghiệp Hưng Logo"
            className="w-72 h-72 mx-auto relative z-10 drop-shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-2 tracking-tight">{"Nghiệp Hưng"}</h1>
          <p className="text-xl md:text-2xl font-sans font-medium text-white/90 tracking-wide">{"Công ty TNHH"}</p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex items-center justify-center mb-8"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/60 to-transparent w-32"></div>
          <div className="mx-4 w-2 h-2 bg-white rounded-full"></div>
          <div className="h-px bg-gradient-to-r from-transparent via-white/60 to-transparent w-32"></div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="relative"
        >
          <p className="text-2xl md:text-3xl font-sans font-medium text-white/95 italic leading-relaxed">
            {"Ống gió chuẩn dịch vụ nhanh giá thành tốt"}
          </p>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-white/80 to-white/30 rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="mt-16"
        >
          <div className="flex justify-center space-x-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
              className="w-2 h-2 bg-white/70 rounded-full"
            ></motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
              className="w-2 h-2 bg-white/70 rounded-full"
            ></motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
              className="w-2 h-2 bg-white/70 rounded-full"
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
