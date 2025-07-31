'use client'
import React from 'react'

// Data dummy untuk multiple bootcamps
const bootcampsData = [
  {
    id: 1,
    title: "Architecting Solutions on AWS",
    description: "Skills you'll gain: Serverless Computing, AWS Identity and Access Management (IAM), Event-Driven Programming, Solution Architecture, Cloud Computing Architecture, Amazon Web Services, Software Architecture",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=400&fit=crop",
    duration: "1-4 Weeks",
    reviews: "20k Reviews",
    level: "Intermediate",
    rating: 4.7
  },
  {
    id: 2,
    title: "ChatGPT: Excel at Personal Automation with GPTs, AI & Zapier",
    description: "Skills you'll gain: Artificial Intelligence, GPT Integration, Automation Tools, Zapier Workflows, Personal Productivity, AI-Powered Solutions, Process Optimization",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    duration: "2-3 Weeks",
    reviews: "15k Reviews",
    level: "Beginner",
    rating: 4.5
  },
  {
    id: 3,
    title: "Full Stack Web Development with React & Node.js",
    description: "Skills you'll gain: React.js, Node.js, Express.js, MongoDB, RESTful APIs, Authentication, State Management, Database Design, Modern JavaScript (ES6+)",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
    duration: "6-8 Weeks",
    reviews: "35k Reviews",
    level: "Advanced",
    rating: 4.9,
    tags: [
      { label: "156.7 Hug", color: "purple" },
      { label: "78", color: "blue" }
    ]
  }
]

// Komponen untuk single bootcamp card
function BootcampCard({ data }) {
  return (
    <div className="max-w-lg w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow justify-center">
      {/* Header with title and badge */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">
            {data.title}
          </h3>
          <span className="bg-[#2EA9F8] text-white px-3 py-1 rounded-full text-xs font-medium ml-4">
            #Bootcamp
          </span>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {data.description}
        </p>
      </div>

      {/* Image with duration overlay */}
      <div className="relative px-6">
        <img
          className="w-full h-48 object-cover rounded-lg"
          src={data.image}
          alt={data.title}
        />
        <div className="absolute bottom-3 right-3 bg-white bg-opacity-70 text-black px-2 py-1 rounded text-xs font-medium">
          {data.duration}
        </div>
      </div>

      {/* Stats and ratings */}
      <div className="p-6 pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="font-bold">{data.reviews}</span>
            <span className="font-bold">{data.level}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {'★'.repeat(Math.floor(data.rating))}
              <span className="text-gray-300">★</span>
            </div>
            <span className="text-sm font-bold text-gray-700 ml-1">{data.rating} Ratings</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center">
          {/* Left side buttons */}
          <div className="flex gap-2">
            <img src="/like.svg" alt="Like" className="w-16 h-6 cursor-pointer hover:drop-shadow-md active:drop-shadow-lg transition-all" />
            <img src="/comment.svg" alt="Comment" className="w-22 h-6 cursor-pointer hover:drop-shadow-md active:drop-shadow-lg transition-all" />
          </div>
          
          {/* Right side buttons */}
          <div className="flex gap-2">
            <img src="/save.svg" alt="Save" className="w-16 h-6 cursor-pointer hover:drop-shadow-md active:drop-shadow-lg transition-all" />
            <img src="/share.svg" alt="Share" className="w-16 h-6 cursor-pointer hover:drop-shadow-md active:drop-shadow-lg transition-all" />
          </div>
        </div>

        {/* Bottom tags */}

      </div>
    </div>
  )
}

// Komponen utama yang menampilkan semua bootcamp cards
export default function BootcampCards() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex flex-col gap-6">
          {bootcampsData.map((bootcamp) => (
            <BootcampCard key={bootcamp.id} data={bootcamp} />
          ))}
        </div>
      </div>
    </div>
  )
}