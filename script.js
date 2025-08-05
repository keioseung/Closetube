// DOM 요소들
const sidebar = document.querySelector('.sidebar');
const menuToggle = document.querySelector('.menu-toggle');
const uploadBtn = document.querySelector('.upload-btn');
const uploadModal = document.getElementById('uploadModal');
const videoModal = document.getElementById('videoModal');
const closeBtns = document.querySelectorAll('.close-btn');
const videoCards = document.querySelectorAll('.video-card');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.querySelector('.search-bar input');
const uploadArea = document.querySelector('.upload-area');
const videoUpload = document.getElementById('videoUpload');
const videoGrid = document.querySelector('.video-grid');

// 영상 데이터 (실제로는 서버에서 가져와야 함)
const videoData = {
    home: [
        {
            id: 1,
            title: '가족 여행 하이라이트',
            author: '엄마',
            views: 12,
            date: '2일 전',
            duration: '3:24',
            likes: 8,
            comments: 3,
            thumbnail: 'https://via.placeholder.com/320x180/3b82f6/ffffff?text=가족+여행',
            category: '가족'
        },
        {
            id: 2,
            title: '파스타 만들기 클래스',
            author: '친구 민수',
            views: 5,
            date: '1주일 전',
            duration: '8:15',
            likes: 12,
            comments: 7,
            thumbnail: 'https://via.placeholder.com/320x180/10b981/ffffff?text=요리+클래스',
            category: '친구들'
        },
        {
            id: 3,
            title: '프로젝트 회의 녹화',
            author: '팀장 지영',
            views: 8,
            date: '3일 전',
            duration: '15:32',
            likes: 5,
            comments: 2,
            thumbnail: 'https://via.placeholder.com/320x180/f59e0b/ffffff?text=프로젝트+회의',
            category: '팀 프로젝트'
        },
        {
            id: 4,
            title: '강아지 산책 영상',
            author: '아빠',
            views: 15,
            date: '1일 전',
            duration: '2:45',
            likes: 20,
            comments: 5,
            thumbnail: 'https://via.placeholder.com/320x180/8b5cf6/ffffff?text=강아지+산책',
            category: '가족'
        },
        {
            id: 5,
            title: '게임 실시간 스트림',
            author: '친구 수진',
            views: 3,
            date: '5일 전',
            duration: '45:12',
            likes: 15,
            comments: 12,
            thumbnail: 'https://via.placeholder.com/320x180/ef4444/ffffff?text=게임+스트림',
            category: '친구들'
        },
        {
            id: 6,
            title: '코딩 튜토리얼',
            author: '팀원 준호',
            views: 10,
            date: '1주일 전',
            duration: '22:18',
            likes: 18,
            comments: 8,
            thumbnail: 'https://via.placeholder.com/320x180/06b6d4/ffffff?text=코딩+튜토리얼',
            category: '팀 프로젝트'
        }
    ],
    myVideos: [
        {
            id: 7,
            title: '내 첫 영상 업로드',
            author: '마루니',
            views: 8,
            date: '1주일 전',
            duration: '5:30',
            likes: 12,
            comments: 4,
            thumbnail: 'https://via.placeholder.com/320x180/6366f1/ffffff?text=내+첫+영상',
            category: '내 영상'
        },
        {
            id: 8,
            title: '주말 브이로그',
            author: '마루니',
            views: 15,
            date: '3일 전',
            duration: '12:45',
            likes: 25,
            comments: 7,
            thumbnail: 'https://via.placeholder.com/320x180/ec4899/ffffff?text=주말+브이로그',
            category: '내 영상'
        }
    ],
    liked: [
        {
            id: 4,
            title: '강아지 산책 영상',
            author: '아빠',
            views: 15,
            date: '1일 전',
            duration: '2:45',
            likes: 20,
            comments: 5,
            thumbnail: 'https://via.placeholder.com/320x180/8b5cf6/ffffff?text=강아지+산책',
            category: '가족'
        },
        {
            id: 6,
            title: '코딩 튜토리얼',
            author: '팀원 준호',
            views: 10,
            date: '1주일 전',
            duration: '22:18',
            likes: 18,
            comments: 8,
            thumbnail: 'https://via.placeholder.com/320x180/06b6d4/ffffff?text=코딩+튜토리얼',
            category: '팀 프로젝트'
        }
    ],
    history: [
        {
            id: 1,
            title: '가족 여행 하이라이트',
            author: '엄마',
            views: 12,
            date: '2일 전',
            duration: '3:24',
            likes: 8,
            comments: 3,
            thumbnail: 'https://via.placeholder.com/320x180/3b82f6/ffffff?text=가족+여행',
            category: '가족'
        },
        {
            id: 3,
            title: '프로젝트 회의 녹화',
            author: '팀장 지영',
            views: 8,
            date: '3일 전',
            duration: '15:32',
            likes: 5,
            comments: 2,
            thumbnail: 'https://via.placeholder.com/320x180/f59e0b/ffffff?text=프로젝트+회의',
            category: '팀 프로젝트'
        },
        {
            id: 8,
            title: '주말 브이로그',
            author: '마루니',
            views: 15,
            date: '3일 전',
            duration: '12:45',
            likes: 25,
            comments: 7,
            thumbnail: 'https://via.placeholder.com/320x180/ec4899/ffffff?text=주말+브이로그',
            category: '내 영상'
        }
    ],
    family: [
        {
            id: 1,
            title: '가족 여행 하이라이트',
            author: '엄마',
            views: 12,
            date: '2일 전',
            duration: '3:24',
            likes: 8,
            comments: 3,
            thumbnail: 'https://via.placeholder.com/320x180/3b82f6/ffffff?text=가족+여행',
            category: '가족'
        },
        {
            id: 4,
            title: '강아지 산책 영상',
            author: '아빠',
            views: 15,
            date: '1일 전',
            duration: '2:45',
            likes: 20,
            comments: 5,
            thumbnail: 'https://via.placeholder.com/320x180/8b5cf6/ffffff?text=강아지+산책',
            category: '가족'
        }
    ],
    friends: [
        {
            id: 2,
            title: '파스타 만들기 클래스',
            author: '친구 민수',
            views: 5,
            date: '1주일 전',
            duration: '8:15',
            likes: 12,
            comments: 7,
            thumbnail: 'https://via.placeholder.com/320x180/10b981/ffffff?text=요리+클래스',
            category: '친구들'
        },
        {
            id: 5,
            title: '게임 실시간 스트림',
            author: '친구 수진',
            views: 3,
            date: '5일 전',
            duration: '45:12',
            likes: 15,
            comments: 12,
            thumbnail: 'https://via.placeholder.com/320x180/ef4444/ffffff?text=게임+스트림',
            category: '친구들'
        }
    ],
    team: [
        {
            id: 3,
            title: '프로젝트 회의 녹화',
            author: '팀장 지영',
            views: 8,
            date: '3일 전',
            duration: '15:32',
            likes: 5,
            comments: 2,
            thumbnail: 'https://via.placeholder.com/320x180/f59e0b/ffffff?text=프로젝트+회의',
            category: '팀 프로젝트'
        },
        {
            id: 6,
            title: '코딩 튜토리얼',
            author: '팀원 준호',
            views: 10,
            date: '1주일 전',
            duration: '22:18',
            likes: 18,
            comments: 8,
            thumbnail: 'https://via.placeholder.com/320x180/06b6d4/ffffff?text=코딩+튜토리얼',
            category: '팀 프로젝트'
        }
    ]
};

// 현재 활성 메뉴와 필터 상태
let currentMenu = 'home';
let currentFilter = '전체';

// 모바일 메뉴 토글
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show');
});

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});

// 업로드 버튼 클릭
uploadBtn.addEventListener('click', () => {
    uploadModal.classList.add('show');
});

// 닫기 버튼들
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        modal.classList.remove('show');
    });
});

// 영상 카드 클릭
videoCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.video-title').textContent;
        const author = card.querySelector('.author').textContent;
        const videoModal = document.getElementById('videoModal');
        const videoTitle = videoModal.querySelector('.video-details h3');
        
        videoTitle.textContent = title;
        videoModal.classList.add('show');
    });
});

// 필터 버튼 클릭
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 기존 활성 버튼 제거
        filterBtns.forEach(b => b.classList.remove('active'));
        // 클릭된 버튼 활성화
        btn.classList.add('active');
        
        const filter = btn.textContent;
        currentFilter = filter;
        
        // 현재 메뉴의 영상들에 필터 적용
        loadVideosByMenu(currentMenu);
    });
});

// 검색 기능
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    console.log(`검색: ${searchTerm}`);
    
    // 검색 로직
    if (searchTerm.trim() === '') {
        // 검색어가 비어있으면 현재 메뉴의 영상들 다시 로드
        loadVideosByMenu(currentMenu);
    } else {
        searchVideos(searchTerm);
    }
});

// 파일 업로드 영역 클릭
uploadArea.addEventListener('click', () => {
    videoUpload.click();
});

// 파일 선택 시
videoUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFileUpload(file);
    }
});

// 드래그 앤 드롭
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#667eea';
    uploadArea.style.background = '#f8fafc';
});

uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#cbd5e1';
    uploadArea.style.background = 'white';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#cbd5e1';
    uploadArea.style.background = 'white';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileUpload(files[0]);
    }
});

// 파일 업로드 처리
function handleFileUpload(file) {
    // 파일 타입 검증
    if (!file.type.startsWith('video/')) {
        showToast('비디오 파일만 업로드 가능합니다.', 'error');
        return;
    }
    
    // 파일 크기 검증 (100MB 제한)
    if (file.size > 100 * 1024 * 1024) {
        showToast('파일 크기는 100MB 이하여야 합니다.', 'error');
        return;
    }
    
    // 업로드 진행 상태 표시
    const uploadArea = document.querySelector('.upload-area');
    const originalContent = uploadArea.innerHTML;
    
    uploadArea.innerHTML = `
        <div class="loading"></div>
        <p>업로드 중... ${file.name}</p>
    `;
    
    // 실제 업로드 시뮬레이션
    setTimeout(() => {
        uploadArea.innerHTML = `
            <i class="fas fa-check-circle" style="color: #10b981; font-size: 48px;"></i>
            <p>업로드 완료!</p>
        `;
        
        showToast('영상이 성공적으로 업로드되었습니다!', 'success');
        
        // 2초 후 원래 상태로 복원
        setTimeout(() => {
            uploadArea.innerHTML = originalContent;
        }, 2000);
    }, 3000);
}

// 영상 필터링 (기존 함수 수정)
function filterVideos(filter) {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        const author = card.querySelector('.author').textContent;
        let shouldShow = true;
        
        switch (filter) {
            case '가족':
                shouldShow = ['엄마', '아빠'].includes(author);
                break;
            case '친구들':
                shouldShow = ['친구 민수', '친구 수진'].includes(author);
                break;
            case '팀 프로젝트':
                shouldShow = ['팀장 지영', '팀원 준호'].includes(author);
                break;
            case '최신순':
                // 실제로는 날짜 기준으로 정렬
                break;
            case '인기순':
                // 실제로는 좋아요 수 기준으로 정렬
                break;
            default:
                shouldShow = true;
        }
        
        card.style.display = shouldShow ? 'block' : 'none';
    });
}

// 영상 검색
function searchVideos(searchTerm) {
    // 현재 메뉴의 모든 영상에서 검색
    let allVideos = [];
    
    switch (currentMenu) {
        case 'home':
            allVideos = videoData.home;
            break;
        case 'myVideos':
            allVideos = videoData.myVideos;
            break;
        case 'liked':
            allVideos = videoData.liked;
            break;
        case 'history':
            allVideos = videoData.history;
            break;
        case 'family':
            allVideos = videoData.family;
            break;
        case 'friends':
            allVideos = videoData.friends;
            break;
        case 'team':
            allVideos = videoData.team;
            break;
        default:
            allVideos = videoData.home;
    }
    
    // 검색어와 일치하는 영상 필터링
    const filteredVideos = allVideos.filter(video => {
        const title = video.title.toLowerCase();
        const author = video.author.toLowerCase();
        return title.includes(searchTerm) || author.includes(searchTerm);
    });
    
    // 검색 결과 표시
    updateVideoGrid(filteredVideos);
    
    if (filteredVideos.length === 0) {
        showToast('검색 결과가 없습니다.', 'error');
    } else {
        showToast(`${filteredVideos.length}개의 영상을 찾았습니다.`, 'success');
    }
}

// 토스트 알림
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // 애니메이션을 위한 지연
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // 3초 후 제거
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// 좋아요 기능
document.addEventListener('click', (e) => {
    if (e.target.closest('.likes')) {
        const likesElement = e.target.closest('.likes');
        const currentLikes = parseInt(likesElement.textContent.match(/\d+/)[0]);
        const isLiked = likesElement.classList.contains('liked');
        
        if (isLiked) {
            likesElement.innerHTML = `<i class="fas fa-heart"></i> ${currentLikes - 1}`;
            likesElement.classList.remove('liked');
        } else {
            likesElement.innerHTML = `<i class="fas fa-heart" style="color: #ef4444;"></i> ${currentLikes + 1}`;
            likesElement.classList.add('liked');
        }
    }
});

// 댓글 작성
document.addEventListener('click', (e) => {
    if (e.target.closest('.comment-input button')) {
        const commentInput = e.target.closest('.comment-input').querySelector('input');
        const comment = commentInput.value.trim();
        
        if (comment) {
            addComment(comment);
            commentInput.value = '';
        }
    }
});

// 댓글 추가
function addComment(text) {
    const commentsList = document.querySelector('.comments-list');
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.innerHTML = `
        <img src="https://via.placeholder.com/32x32/6366f1/ffffff?text=ME" alt="사용자">
        <div class="comment-content">
            <div class="comment-author">마루니</div>
            <div class="comment-text">${text}</div>
            <div class="comment-time">방금 전</div>
        </div>
    `;
    
    commentsList.appendChild(newComment);
}

// 키보드 단축키
document.addEventListener('keydown', (e) => {
    // ESC 키로 모달 닫기
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            openModal.classList.remove('show');
        }
    }
    
    // Ctrl/Cmd + U로 업로드 모달 열기
    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
        uploadModal.classList.add('show');
    }
    
    // Ctrl/Cmd + K로 검색 포커스
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
});

// 무한 스크롤 (실제 구현 시)
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
        // 페이지 하단에 가까워지면 더 많은 영상 로드
        console.log('더 많은 영상 로드...');
    }
});

// 영상 카드 생성 함수
function createVideoCard(video) {
    return `
        <div class="video-card" data-video-id="${video.id}">
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="영상 썸네일">
                <div class="video-duration">${video.duration}</div>
                <div class="video-overlay">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="video-info">
                <div class="video-title">${video.title}</div>
                <div class="video-meta">
                    <span class="author">${video.author}</span>
                    <span class="views">${video.views}회 시청</span>
                    <span class="date">${video.date}</span>
                </div>
                <div class="video-stats">
                    <span class="likes"><i class="fas fa-heart"></i> ${video.likes}</span>
                    <span class="comments"><i class="fas fa-comment"></i> ${video.comments}</span>
                </div>
            </div>
        </div>
    `;
}

// 영상 그리드 업데이트 함수
function updateVideoGrid(videos) {
    videoGrid.innerHTML = videos.map(video => createVideoCard(video)).join('');
    
    // 새로 생성된 영상 카드들에 이벤트 리스너 추가
    const newVideoCards = document.querySelectorAll('.video-card');
    newVideoCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.video-title').textContent;
            const videoModal = document.getElementById('videoModal');
            const videoTitle = videoModal.querySelector('.video-details h3');
            
            videoTitle.textContent = title;
            videoModal.classList.add('show');
        });
    });
}

// 메뉴별 영상 로드 함수
function loadVideosByMenu(menuType) {
    let videos = [];
    
    switch (menuType) {
        case 'home':
            videos = videoData.home;
            break;
        case 'myVideos':
            videos = videoData.myVideos;
            break;
        case 'liked':
            videos = videoData.liked;
            break;
        case 'history':
            videos = videoData.history;
            break;
        case 'family':
            videos = videoData.family;
            break;
        case 'friends':
            videos = videoData.friends;
            break;
        case 'team':
            videos = videoData.team;
            break;
        default:
            videos = videoData.home;
    }
    
    // 현재 필터 적용
    if (currentFilter !== '전체') {
        if (currentFilter === '최신순' || currentFilter === '인기순') {
            videos = sortVideos(videos, currentFilter);
        } else {
            videos = filterVideosByCategory(videos, currentFilter);
        }
    }
    
    updateVideoGrid(videos);
    showToast(`${getMenuDisplayName(menuType)} 영상을 로드했습니다.`, 'success');
}

// 카테고리별 필터링 함수
function filterVideosByCategory(videos, category) {
    return videos.filter(video => video.category === category);
}

// 메뉴 표시 이름 가져오기
function getMenuDisplayName(menuType) {
    const menuNames = {
        'home': '홈',
        'myVideos': '내 영상',
        'liked': '좋아요',
        'history': '시청 기록',
        'family': '가족',
        'friends': '친구들',
        'team': '팀 프로젝트'
    };
    return menuNames[menuType] || '홈';
}

// 영상 정렬 함수
function sortVideos(videos, sortType) {
    const sortedVideos = [...videos];
    
    switch (sortType) {
        case '최신순':
            // 날짜 기준으로 정렬 (실제로는 날짜 객체로 변환해야 함)
            sortedVideos.sort((a, b) => {
                const dateA = getDateFromString(a.date);
                const dateB = getDateFromString(b.date);
                return dateB - dateA;
            });
            break;
        case '인기순':
            // 좋아요 수 기준으로 정렬
            sortedVideos.sort((a, b) => b.likes - a.likes);
            break;
    }
    
    return sortedVideos;
}

// 날짜 문자열을 Date 객체로 변환
function getDateFromString(dateStr) {
    const now = new Date();
    
    if (dateStr.includes('일 전')) {
        const days = parseInt(dateStr.match(/(\d+)일/)[1]);
        return new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    } else if (dateStr.includes('주 전')) {
        const weeks = parseInt(dateStr.match(/(\d+)주/)[1]);
        return new Date(now.getTime() - weeks * 7 * 24 * 60 * 60 * 1000);
    } else if (dateStr.includes('개월 전')) {
        const months = parseInt(dateStr.match(/(\d+)개월/)[1]);
        return new Date(now.getTime() - months * 30 * 24 * 60 * 60 * 1000);
    } else if (dateStr === '오늘') {
        return now;
    } else if (dateStr === '어제') {
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }
    
    return now;
}

// 사이드바 메뉴 클릭 (기존 함수 수정)
document.querySelectorAll('.sidebar-menu li').forEach(item => {
    item.addEventListener('click', () => {
        const menuText = item.querySelector('span').textContent;
        
        // 기존 활성 메뉴 제거
        document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
        // 클릭된 메뉴 활성화
        item.classList.add('active');
        
        // 메뉴 타입 결정
        let menuType = 'home';
        switch (menuText) {
            case '홈':
                menuType = 'home';
                break;
            case '내 영상':
                menuType = 'myVideos';
                break;
            case '좋아요':
                menuType = 'liked';
                break;
            case '시청 기록':
                menuType = 'history';
                break;
            case '가족':
                menuType = 'family';
                break;
            case '친구들':
                menuType = 'friends';
                break;
            case '팀 프로젝트':
                menuType = 'team';
                break;
            default:
                menuType = 'home';
        }
        
        currentMenu = menuType;
        
        // 해당 메뉴의 영상 로드
        loadVideosByMenu(menuType);
        
        // 모바일에서 메뉴 클릭 시 사이드바 닫기
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('show');
        }
    });
});

// 영상 재생 시간 포맷팅
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// 뷰 카운트 포맷팅
function formatViewCount(count) {
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
}

// 날짜 포맷팅
function formatDate(date) {
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
        return '오늘';
    } else if (days === 1) {
        return '어제';
    } else if (days < 7) {
        return `${days}일 전`;
    } else if (days < 30) {
        return `${Math.floor(days / 7)}주 전`;
    } else {
        return `${Math.floor(days / 30)}개월 전`;
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    console.log('CloseTube 앱이 로드되었습니다!');
    
    // 초기 영상 로드
    loadVideosByMenu('home');
    
    // 로컬 스토리지에서 사용자 설정 불러오기
    const userSettings = localStorage.getItem('closeTubeSettings');
    if (userSettings) {
        const settings = JSON.parse(userSettings);
        // 설정 적용
        console.log('사용자 설정 로드:', settings);
    }
    
    // 앱 사용 통계 (실제로는 서버에 전송)
    const appStats = {
        lastVisit: new Date().toISOString(),
        userAgent: navigator.userAgent,
        screenSize: `${window.innerWidth}x${window.innerHeight}`
    };
    
    console.log('앱 통계:', appStats);
});

// 페이지 언로드 시 설정 저장
window.addEventListener('beforeunload', () => {
    const settings = {
        theme: 'light',
        language: 'ko',
        lastVisit: new Date().toISOString()
    };
    
    localStorage.setItem('closeTubeSettings', JSON.stringify(settings));
});

// 네트워크 상태 감지
window.addEventListener('online', () => {
    showToast('인터넷 연결이 복구되었습니다.', 'success');
});

window.addEventListener('offline', () => {
    showToast('인터넷 연결이 끊어졌습니다. 일부 기능이 제한될 수 있습니다.', 'error');
});

// 서비스 워커 등록 (PWA 지원)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW 등록 성공:', registration);
            })
            .catch(error => {
                console.log('SW 등록 실패:', error);
            });
    });
} 