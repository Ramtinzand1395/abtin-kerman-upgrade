import image1 from "../../../../assets/Hero/Picture1.png";
import image2 from "../../../../assets/Hero/Picture2.png";
import { motion } from "framer-motion";

import AnimatedCircuit from "./banner/AnimatedCircuit";

const headerVariant = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 5,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
};

const headerVariant2 = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 5,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
};

const Hero = () => {
  return (
    <div className="w-full h-[50vh] bg-blue-950  overflow-hidden relative">
      <div className="absolute bottom-0 -left-32 ">
        <motion.img
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariant}
          src={image1}
          className="object-contain h-[25vh] md:h-[30vh] lg:h-[40vh]"
          alt=""
        />
      </div>
      <div className="absolute top-0 -right-32 ">
        <motion.img
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariant2}
          src={image2}
          className="object-contain h-[25vh] md:h-[30vh] lg:h-[40vh]"
          alt=""
        />
      </div>
      <div className="absolute top-10 left-0">
        <AnimatedCircuit />
      </div>
      <div className="absolute bottom-10 right-0 scale-x-[-1]  scale-y-[-1]">
        <AnimatedCircuit />
      </div>
      {/* text */}
      <div className="flex flex-col h-full items-center justify-around z-10">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl lg:text-6xl font-bold font-tanha text-white text-center mt-10 z-10"
        >
          کرمان آتاری
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-base md:text-xl lg:text-3xl font-vazir text-white text-center z-10"
        >
          بازی های ویدئویی و کنسول های بازی را با کمترین قیمت اینجا ببینید.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="button"
        >
          پیشنهاد های ویژه
        </motion.button>
      </div>
    </div>
  );
};

export default Hero;
