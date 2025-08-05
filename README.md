# CloseTube SaaS - 프라이빗 영상 공유 플랫폼

![CloseTube Logo](https://via.placeholder.com/400x100/667eea/ffffff?text=CloseTube+SaaS)

## 🚀 프로젝트 소개

CloseTube SaaS는 소중한 사람들과만 프라이빗하게 영상을 공유할 수 있는 비공개 영상 공유 플랫폼입니다. YouTube, Instagram, TikTok 등의 영상 URL을 입력하면 자동으로 처리하여 그룹별로 안전하게 공유할 수 있습니다.

## ✨ 주요 기능

### 🎥 영상 처리
- **다양한 플랫폼 지원**: YouTube, Instagram, TikTok URL 자동 인식
- **자동 메타데이터 추출**: 제목, 썸네일, 재생시간 자동 수집
- **실시간 처리**: URL 입력 즉시 영상 정보 추출

### 🔒 프라이버시 보호
- **그룹별 공유**: 가족, 친구, 팀 등 그룹별 영상 분류
- **다운로드 제어**: 다운로드 허용/금지 설정
- **외부 공유 차단**: 외부 링크 공유 제한
- **완전 프라이빗**: 초대받은 사람들만 접근 가능

### 🎨 사용자 경험
- **모던 UI/UX**: 세련되고 직관적인 인터페이스
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 지원
- **실시간 업데이트**: 실시간 댓글 및 좋아요 시스템
- **검색 및 필터링**: 그룹별, 날짜별 영상 검색

## 🏗️ 기술 스택

### Frontend
- **Next.js 15**: React 기반 풀스택 프레임워크
- **TypeScript**: 타입 안전성 보장
- **Tailwind CSS**: 모던 CSS 프레임워크
- **Framer Motion**: 부드러운 애니메이션
- **Lucide React**: 아이콘 라이브러리

### Backend
- **FastAPI**: 고성능 Python 웹 프레임워크
- **yt-dlp**: 다양한 플랫폼 영상 다운로드
- **Firebase**: 데이터베이스 및 스토리지
- **Celery**: 백그라운드 작업 처리

### Infrastructure
- **Firebase Firestore**: NoSQL 데이터베이스
- **Firebase Storage**: 파일 스토리지
- **Railway**: 클라우드 배포 플랫폼
- **Vercel**: 프론트엔드 배포

## 🚀 빠른 시작

### 요구사항
- Node.js 18+
- Python 3.9+
- Firebase 프로젝트
- Railway 계정

### 1. 프로젝트 클론
```bash
git clone https://github.com/your-username/closetube-saas.git
cd closetube-saas
```

### 2. Frontend 설정
```bash
cd frontend
npm install
npm run dev
```

### 3. Backend 설정
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### 4. 환경 변수 설정
```bash
# .env 파일 생성
cp .env.example .env

# Firebase 설정 추가
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

## 📁 프로젝트 구조

```
closetube-saas/
├── frontend/                 # Next.js 프론트엔드
│   ├── src/
│   │   ├── app/             # App Router
│   │   ├── components/      # React 컴포넌트
│   │   ├── lib/             # 유틸리티 함수
│   │   └── types/           # TypeScript 타입
│   ├── package.json
│   └── tailwind.config.js
├── backend/                  # FastAPI 백엔드
│   ├── config/              # 설정 파일
│   ├── models/              # Pydantic 모델
│   ├── services/            # 비즈니스 로직
│   ├── utils/               # 유틸리티 함수
│   ├── main.py              # FastAPI 앱
│   └── requirements.txt
├── shared/                   # 공통 타입/유틸리티
└── docs/                    # 문서
```

## 🔧 API 문서

### 주요 엔드포인트

#### 영상 업로드
```http
POST /api/videos
Content-Type: application/json

{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID",
  "title": "영상 제목",
  "description": "영상 설명",
  "group_id": "family",
  "is_private": true,
  "allow_download": false,
  "allow_external_share": false
}
```

#### 영상 목록 조회
```http
GET /api/videos?group_id=family&limit=20&offset=0
```

#### 영상 상세 조회
```http
GET /api/videos/{video_id}
```

#### 영상 좋아요
```http
POST /api/videos/{video_id}/like
```

## 🚀 배포

### Railway 배포 (백엔드)
1. Railway 계정 생성
2. GitHub 저장소 연결
3. 환경 변수 설정
4. 자동 배포

### Vercel 배포 (프론트엔드)
1. Vercel 계정 생성
2. GitHub 저장소 연결
3. 빌드 설정
4. 자동 배포

## 🔒 보안

- **CORS 설정**: 허용된 도메인만 접근 가능
- **입력 검증**: 모든 사용자 입력 검증
- **Rate Limiting**: API 요청 제한
- **Firebase Security Rules**: 데이터베이스 보안 규칙

## 📈 성능 최적화

- **이미지 최적화**: Next.js Image 컴포넌트 사용
- **코드 스플리팅**: 동적 임포트로 번들 크기 최적화
- **캐싱**: Redis를 통한 응답 캐싱
- **CDN**: Firebase CDN 활용

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 지원

- **이메일**: support@closetube.com
- **GitHub Issues**: [이슈 등록](https://github.com/your-username/closetube-saas/issues)
- **문서**: [API 문서](https://closetube-api.railway.app/docs)

## 🙏 감사의 말

- [Next.js](https://nextjs.org/) - React 프레임워크
- [FastAPI](https://fastapi.tiangolo.com/) - Python 웹 프레임워크
- [Firebase](https://firebase.google.com/) - 백엔드 서비스
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - 영상 다운로더

---

**CloseTube SaaS** - 소중한 순간을 안전하게 공유하세요 💙 