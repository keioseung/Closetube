'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Link, Users, Shield, Download, Share2, Youtube, Instagram, Video } from 'lucide-react'
import { Video as VideoType, VideoUploadRequest } from '@/types'
import { extractVideoId, getVideoPlatform } from '@/lib/utils'
import { videoApi } from '@/lib/api'

interface VideoUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (video: VideoType) => void
}

export default function VideoUploadModal({ isOpen, onClose, onUpload }: VideoUploadModalProps) {
  const [formData, setFormData] = useState<VideoUploadRequest>({
    url: '',
    title: '',
    description: '',
    groupId: '',
    isPrivate: true,
    allowDownload: false,
    allowExternalShare: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const groups = [
    { id: 'family', name: '가족', count: 4 },
    { id: 'friends', name: '친구들', count: 6 },
    { id: 'team', name: '팀 프로젝트', count: 3 },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // URL 유효성 검사
      const videoId = extractVideoId(formData.url)
      const platform = getVideoPlatform(formData.url)

      if (!videoId || platform === 'unknown') {
        throw new Error('지원하지 않는 영상 URL입니다. YouTube, Instagram, TikTok URL을 입력해주세요.')
      }

      // API 호출
      const response = await videoApi.createVideo({
        url: formData.url,
        title: formData.title,
        description: formData.description,
        group_id: formData.groupId,
        is_private: formData.isPrivate,
        allow_download: formData.allowDownload,
        allow_external_share: formData.allowExternalShare,
      })

      if (response.success && response.video) {
        onUpload(response.video)
        handleClose()
      } else {
        throw new Error(response.error || '업로드에 실패했습니다.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '업로드 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      url: '',
      title: '',
      description: '',
      groupId: '',
      isPrivate: true,
      allowDownload: false,
      allowExternalShare: false,
    })
    setError('')
    setIsLoading(false)
    onClose()
  }

  const getPlatformIcon = (url: string) => {
    const platform = getVideoPlatform(url)
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-5 h-5 text-red-500" />
      case 'instagram':
        return <Instagram className="w-5 h-5 text-pink-500" />
      case 'tiktok':
        return <Video className="w-5 h-5 text-black" />
      default:
        return <Link className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">영상 업로드</h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* URL Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  영상 URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {formData.url && getPlatformIcon(formData.url)}
                  </div>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="YouTube, Instagram, TikTok URL을 입력하세요"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  YouTube, Instagram, TikTok 영상 URL을 지원합니다.
                </p>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제목
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="영상 제목을 입력하세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  설명 (선택사항)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="영상에 대한 설명을 입력하세요"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Group Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  공유 그룹
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {groups.map((group) => (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, groupId: group.id }))}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        formData.groupId === group.id
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{group.name}</span>
                        <span className="text-sm text-gray-500">{group.count}명</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700">프라이버시 설정</h3>
                
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.isPrivate}
                      onChange={(e) => setFormData(prev => ({ ...prev, isPrivate: e.target.checked }))}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">프라이빗 영상으로 설정</span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.allowDownload}
                      onChange={(e) => setFormData(prev => ({ ...prev, allowDownload: e.target.checked }))}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <div className="flex items-center space-x-2">
                      <Download className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">다운로드 허용</span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.allowExternalShare}
                      onChange={(e) => setFormData(prev => ({ ...prev, allowExternalShare: e.target.checked }))}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <div className="flex items-center space-x-2">
                      <Share2 className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">외부 공유 허용</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>업로드 중...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>업로드</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 