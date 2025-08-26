import { motion } from "framer-motion";

const AnimatedCircuit = () => {
  return (
    <svg
      viewBox="0 0 550 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[200px] md:max-w-[550px] h-auto"
      preserveAspectRatio="xMinYMid meet"
    >
      <motion.path
        d="M0 0 H250 L300 50 H540"
        stroke="#7B2D2D"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.circle
        cx="545"
        cy="50"
        r="4"
        fill="#7B2D2D"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, duration: 0.3 }}
      />
    </svg>
  );
};

export default AnimatedCircuit;
