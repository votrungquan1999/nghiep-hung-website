"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
					<Image
						src="/nghiep_hung_logo_no_bg.svg"
						alt="Nghiệp Hưng Logo"
						width={224}
						height={224}
						className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto relative z-10 drop-shadow-2xl"
					/>
				</motion.div>

				<motion.div
					initial={{ y: 15, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 1.0, duration: 1.2, ease: "easeOut" }}
					className="mb-8"
				>
					<h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-2 tracking-tight">
						{"NGHIỆP HƯNG"}
					</h1>
					<p className="text-xl md:text-2xl font-roboto font-medium text-white/90 tracking-wide">
						{"CÔNG TY TNHH"}
					</p>
				</motion.div>
			</div>
		</motion.div>
	);
}
