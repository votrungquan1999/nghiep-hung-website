"use client"

import { motion } from "framer-motion"


export default function SplashScreen() {
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8"
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nghiep_hung_logo_bg-T8322MemfFo82wE4Lyl1TRt5fZ5AVe.svg"
            alt="Nghiệp Hưng Logo"
            className="w-48 h-48 mx-auto"
          />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-2xl font-serif font-bold text-primary mb-4"
        >
          {"Công ty TNHH Nghiệp Hưng"}
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-lg text-muted-foreground"
        >
          {"Ống gió chuẩn dịch vụ nhanh giá thành tốt"}
        </motion.p>
      </div>
    </motion.div>
  )
}
