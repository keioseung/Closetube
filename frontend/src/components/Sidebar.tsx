'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Home, 
  Video, 
  Heart, 
  Clock, 
  Users, 
  Plus, 
  UserPlus, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    {
      section: '내 채널',
      items: [
        { icon: Home, label: '홈', active: true },
        { icon: Video, label: '내 영상' },
        { icon: Heart, label: '좋아요' },
        { icon: Clock, label: '시청 기록' },
      ]
    },
    {
      section: '그룹',
      items: [
        { icon: Users, label: '가족', count: 4 },
        { icon: Users, label: '친구들', count: 6 },
        { icon: Users, label: '팀 프로젝트', count: 3 },
      ]
    },
    {
      section: '도구',
      items: [
        { icon: Plus, label: '새 그룹 만들기' },
        { icon: UserPlus, label: '멤버 초대' },
        { icon: Settings, label: '설정' },
      ]
    }
  ]

  return (
    <motion.aside
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="bg-white border-r border-gray-200 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">CloseTube</span>
            </motion.div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-6">
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {!isCollapsed && (
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3"
              >
                {section.section}
              </motion.h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <button
                    className={cn(
                      "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      item.active
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-between flex-1"
                      >
                        <span>{item.label}</span>
                        {item.count && (
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {item.count}
                          </span>
                        )}
                      </motion.div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border-t border-gray-200"
        >
          <div className="text-xs text-gray-500">
            <p>CloseTube v1.0</p>
            <p>프라이빗 영상 공유</p>
          </div>
        </motion.div>
      )}
    </motion.aside>
  )
} 