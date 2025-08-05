'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Heart, Eye, MoreVertical, Lock, Download, Share2 } from 'lucide-react'
import { Video } from '@/types'
import { formatDuration, formatViews, formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface VideoCardProps {
  video: Video
  onClick?: () => void
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowMenu(!showMenu)
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-200 overflow-hidden">
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            <Play className="w-12 h-12 text-white opacity-50" />
          </div>
        )}
        
        {/* Duration */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {formatDuration(video.duration)}
          </div>
        )}
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
          <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Play className="w-8 h-8 text-gray-800 ml-1" />
          </div>
        </div>

        {/* Privacy Badge */}
        {video.isPrivate && (
          <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
            <Lock className="w-3 h-3" />
            <span>프라이빗</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {video.title}
          </h3>
          <button
            onClick={handleMenuToggle}
            className="p-1 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {video.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {video.description}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{formatViews(video.views)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className={cn("w-4 h-4", isLiked && "text-red-500 fill-current")} />
              <span>{formatViews(video.likes)}</span>
            </div>
          </div>
          <span>{formatDate(video.createdAt)}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            {!video.allowDownload && (
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Download className="w-3 h-3" />
                <span>다운로드 금지</span>
              </div>
            )}
            {!video.allowExternalShare && (
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Share2 className="w-3 h-3" />
                <span>외부 공유 금지</span>
              </div>
            )}
          </div>
          
          <button
            onClick={handleLike}
            className={cn(
              "flex items-center space-x-1 text-sm transition-colors",
              isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
            )}
          >
            <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
            <span>좋아요</span>
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-12 right-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
        >
          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>공유</span>
          </button>
          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>다운로드</span>
          </button>
          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-red-600">
            <span>삭제</span>
          </button>
        </motion.div>
      )}
    </motion.div>
  )
} 