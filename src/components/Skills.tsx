'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Skill {
  name: string
  percentage: number
}

const skills: Skill[] = [
  { name: 'HTML', percentage: 100 },
  { name: 'CSS', percentage: 100 },
  { name: 'JavaScript', percentage: 80 },
  { name: 'PHP', percentage: 80 },
  { name: 'C', percentage: 60 },
  { name: 'C++', percentage: 60 },
  { name: 'Java', percentage: 60 },
  { name: 'Python', percentage: 30 }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const skillVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
          className="text-center mb-12"
        >
          <h2 className="section-title text-4xl font-bold mb-4">Skills</h2>
          <p className="text-gray-600 dark:text-gray-400">
            I have the skills below with their level.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={skillVariants}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <div className="flex justify-between mb-2">
                <span className="text-lg font-semibold">{skill.name}</span>
                <span className="text-primary">{skill.percentage}%</span>
              </div>
              <div className="skill-bar">
                <motion.div
                  className="skill-progress"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.percentage}%` } : {}}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}