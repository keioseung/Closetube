'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Video, Upload, Users, Shield, Play, Heart, Eye } from 'lucide-react'
import VideoUploadModal from '@/components/VideoUploadModal'
import VideoCard from '@/components/VideoCard'
import Sidebar from '@/components/Sidebar'
import { Video as VideoType } from '@/types'
import { videoApi } from '@/lib/api'

export default function HomePage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [videos, setVideos] = useState<VideoType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadVideos()
  }, [])

  const loadVideos = async () => {
    try {
      setIsLoading(true)
      const fetchedVideos = await videoApi.getVideos()
      setVideos(fetchedVideos)
    } catch (err) {
      console.error('영상 로드 실패:', err)
      setError('영상을 불러오는데 실패했습니다.')
      // 개발 환경에서는 샘플 데이터 사용
      setVideos([
        {
          id: '1',
          title: '가족 여행 하이라이트',
          description: '올해 여름 가족과 함께한 특별한 순간들',
          url: 'https://example.com/video1',
          thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop',
          duration: 180,
          views: 12,
          likes: 5,
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-15'),
          userId: 'user1',
          groupId: 'family',
          isPrivate: true,
          allowDownload: false,
          allowExternalShare: false,
        },
        {
          id: '2',
          title: '친구들과의 게임 밤',
          description: '재미있는 보드게임 시간',
          url: 'https://example.com/video2',
          thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop',
          duration: 240,
          views: 8,
          likes: 3,
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-10'),
          userId: 'user2',
          groupId: 'friends',
          isPrivate: true,
          allowDownload: true,
          allowExternalShare: false,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleVideoUpload = async (newVideo: VideoType) => {
    setVideos(prev => [newVideo, ...prev])
    setIsUploadModalOpen(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold gradient-text">CloseTube</h1>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>프라이빗 영상 공유</span>
              </div>
            </div>
            
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>영상 업로드</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">
                  소중한 사람들과만 영상을 공유하세요
                </h2>
                <p className="text-primary-100 mb-6 text-lg">
                  가족, 친구, 팀원들과 프라이빗하게 영상을 공유하고 소통하세요. 
                  외부 공유를 차단하고 안전하게 보관됩니다.
                </p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>그룹별 관리</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>완전 프라이빗</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Video className="w-5 h-5" />
                    <span>다양한 플랫폼 지원</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Video Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">최근 영상</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>총 {videos.length}개 영상</span>
              </div>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm animate-pulse">
                    <div className="aspect-video bg-gray-200 rounded-t-xl"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={loadVideos}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
                >
                  다시 시도
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <VideoCard video={video} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Empty State */}
          {!isLoading && !error && videos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="max-w-md mx-auto">
                <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  아직 업로드된 영상이 없습니다
                </h3>
                <p className="text-gray-500 mb-6">
                  첫 번째 영상을 업로드하고 소중한 사람들과 공유해보세요.
                </p>
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  영상 업로드하기
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <VideoUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleVideoUpload}
      />
    </div>
  )
}
