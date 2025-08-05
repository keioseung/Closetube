from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import os
from datetime import datetime
import uuid

from services.video_service import VideoService
from services.firebase_service import FirebaseService
from models.video import Video, VideoCreate, VideoResponse
from models.user import User
from config.settings import Settings

# 설정 로드
settings = Settings()

# FastAPI 앱 생성
app = FastAPI(
    title="CloseTube API",
    description="프라이빗 영상 공유 플랫폼 API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://closetube.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 서비스 초기화
firebase_service = FirebaseService()
video_service = VideoService(firebase_service)

@app.get("/")
async def root():
    return {
        "message": "CloseTube API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

@app.post("/api/videos", response_model=VideoResponse)
async def create_video(video_data: VideoCreate):
    """영상 URL을 받아서 처리하고 저장"""
    try:
        video = await video_service.create_video(video_data)
        return VideoResponse(
            success=True,
            video=video,
            message="영상이 성공적으로 업로드되었습니다."
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@app.get("/api/videos", response_model=List[Video])
async def get_videos(
    group_id: Optional[str] = None,
    limit: int = 20,
    offset: int = 0
):
    """영상 목록 조회"""
    try:
        videos = await video_service.get_videos(group_id, limit, offset)
        return videos
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.get("/api/videos/{video_id}", response_model=Video)
async def get_video(video_id: str):
    """특정 영상 조회"""
    try:
        video = await video_service.get_video(video_id)
        if not video:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="영상을 찾을 수 없습니다."
            )
        return video
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.delete("/api/videos/{video_id}")
async def delete_video(video_id: str):
    """영상 삭제"""
    try:
        success = await video_service.delete_video(video_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="영상을 찾을 수 없습니다."
            )
        return {"message": "영상이 삭제되었습니다."}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.post("/api/videos/{video_id}/like")
async def like_video(video_id: str):
    """영상 좋아요"""
    try:
        success = await video_service.like_video(video_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="영상을 찾을 수 없습니다."
            )
        return {"message": "좋아요가 추가되었습니다."}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.get("/api/groups")
async def get_groups():
    """그룹 목록 조회"""
    try:
        groups = await firebase_service.get_groups()
        return groups
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": "서버 내부 오류가 발생했습니다."}
    )

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    ) 