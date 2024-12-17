const express = require('express');
const axios = require('axios'); // Axios를 사용하여 API 요청
const app = express();
const PORT = process.env.PORT || 3000;

// 공공데이터 API 요청에 필요한 키 및 URL
const API_KEY = 'g9sZFsfNIi++nvwuLDqQuik41v5SwZvtB7ZZaipaVP85HQbBT7xQmE+5bByNUTy7zjVh7W6U++Oiy2kd8i/2ng=='; // 공공데이터 포털에서 발급받은 API 키를 입력하세요.
const API_URL = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';

// 오늘 날짜를 YYYYMMDD 형식으로 반환하는 함수
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const date = String(today.getDate()).padStart(2, '0'); // 날짜가 한 자리일 경우 0 추가
    return `${year}${month}${date}`;
}

// API 요청 핸들러
app.get('/api/weather', async (req, res) => {
    try {
        // 오늘 날짜를 가져옴
        const todayDate = getTodayDate();

        // 요청에 필요한 파라미터 설정
        const params = {
            serviceKey: API_KEY,  // API 키
            numOfRows: 10,        // 가져올 데이터 개수
            pageNo: 1,            // 페이지 번호
            dataType: 'JSON',     // JSON 형식으로 결과 반환
            base_date: todayDate, // 오늘 날짜 (YYYYMMDD)
            base_time: '0600',    // 발표 시각 (HHMM)
            nx: 55,               // 예보지점 X 좌표 (서울 중구 예시)
            ny: 127               // 예보지점 Y 좌표 (서울 중구 예시)
        };

        // Axios를 사용하여 API 요청
        const response = await axios.get(API_URL, { params });

        // API에서 반환된 데이터를 클라이언트로 응답
        res.json(response.data);
    } catch (error) {
        console.error('API 요청 실패:', error);
        res.status(500).send('API 요청 중 오류가 발생했습니다.');
    }
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
