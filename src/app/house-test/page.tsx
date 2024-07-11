"use client";

import Page from "@/components/Page";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function HouseTestPage() {
  const [nextPage, setNextPage] = useState(0);

  // 질문 배열
  const qnaList = [
    {
      q: '1. 좋아하는 방의 분위기는?',
      a: [
        { answer: 'a. 햇볕이 잘드는 아늑한 분위기', type: ['Hufflepuff'] },
        { answer: 'b. 깔끔하고 잘정돈된 분위기', type: ['Ravenclaw'] },
        { answer: 'c. 위엄있고 엄숙한 분위기', type: ['Slytherin'] },
        { answer: 'd. 따뜻하고 시끌벅적한 분위기', type: ['Gryffindor'] },
      ]
    },
    {
      q: '2. 기숙사를 들어가려는데 문이 잠겨있다. 어떻게 할까?',
      a: [
        { answer: 'a. 문을 부순다', type: ['Gryffindor'] },
        { answer: 'b. 자물쇠를 딴다', type: ['Slytherin'] },
        { answer: 'c. 열쇠를 찾는다', type: ['Ravenclaw'] },
        { answer: 'd. 노크한다', type: ['Hufflepuff'] },
      ]
    },
    {
      q: '3. 새로운 사람을 만났을 때 어떻게 대하나요?',
      a: [
        { answer: 'a. 적극적으로 다가가서 친구가 된다', type: ['Gryffindor'] },
        { answer: 'b. 상대방의 유용성을 평가한다', type: ['Slytherin'] },
        { answer: 'c. 신중하게 관찰하고 판단한다', type: ['Ravenclaw'] },
        { answer: 'd. 친절하게 대하며 상대방을 돕는다', type: ['Hufflepuff'] },
      ]
    },
    {
      q: '4. 친구가 위험에 처해있다. 어떻게 반응할까?',
      a: [
        { answer: 'a. 즉시 달려가서 돕는다', type: ['Gryffindor'] },
        { answer: 'b. 친구를 구하기 위해 모든 수단을 동원한다', type: ['Slytherin'] },
        { answer: 'c. 침착하게 상황을 분석하고 계획을 세운다', type: ['Ravenclaw'] },
        { answer: 'd. 주변 사람들에게 도움을 요청하며 돕는다', type: ['Hufflepuff'] },
      ]
    },
    {
      q: '5. 주말에 주로 무엇을 하나요?',
      a: [
        { answer: 'a. 다음주 계획을 세운다', type: ['Slytherin'] },
        { answer: 'b. 여행을 떠난다', type: ['Gryffindor'] },
        { answer: 'c. 친구들과 시간을 보낸다', type: ['Hufflepuff'] },
        { answer: 'd. 책을 읽거나 공부를 한다', type: ['Ravenclaw'] },
      ]
    },
    {
      q: '6. 경쟁 상황에서 당신의 태도는?',
      a: [
        { answer: 'a. 정정당당하게 승부한다', type: ['Gryffindor'] },
        { answer: 'b. 수단과 방법을 가리지 않는다', type: ['Slytherin'] },
        { answer: 'c. 전략적으로 접근한다', type: ['Ravenclaw'] },
        { answer: 'd. 협력하여 모두가 이길 수 있도록 한다', type: ['Hufflepuff'] },
      ]
    },
    {
      q: '7. 어려운 문제를 만났을 때 어떻게 해결하나요?',
      a: [
        { answer: 'a. 다른 사람의 도움을 받거나 지혜를 빌린다', type: ['Slytherin'] },
        { answer: 'b. 즉각적인 행동으로 문제를 해결한다', type: ['Gryffindor'] },
        { answer: 'c. 인내심을 가지고 꾸준히 해결한다', type: ['Hufflepuff'] },
        { answer: 'd. 문제를 분석하고 논리적으로 해결한다', type: ['Ravenclaw'] },
      ]
    },
    {
      q: '테스트가 모두 끝났습니다. 결과를 보러 갑시다',
      a: [
        { answer: '나의 기숙사는 어디일까?', type: [] }
      ]
    }
  ];

  // 답변 배열
  const [answerList, setAnswerList] = useState([
    { name: 'Gryffindor', count: 0 },
    { name: 'Ravenclaw', count: 0 },
    { name: 'Hufflepuff', count: 0 },
    { name: 'Slytherin', count: 0 }
  ]);

  const handleCkAnswer = (types) => {
    let updatedAnswers = answerList.map(answer => 
      types.includes(answer.name) ? { ...answer, count: answer.count + 1 } : answer
    );
    setAnswerList(updatedAnswers);
    setNextPage(nextPage + 1);

    if (nextPage + 1 === qnaList.length) {
      setTest(updatedAnswers);
    }
  };

  // 결과함수
  const [houseContent, setHouseContent] = useState({ houseName: '', content: '', description: '' });

  function setTest(updatedAnswers) {
    let maxCount = Math.max(...updatedAnswers.map(answer => answer.count));
    let houseName = updatedAnswers.find(answer => answer.count === maxCount).name;

    let content = {
      'Gryffindor': '그리핀도르는 용기, 대담함, 결단력을 중시하는 학생들이 모이는 기숙사입니다. 기숙사의 상징 동물은 사자이며, 색깔은 빨강과 금색입니다. 창립자인 고드릭 그리핀도르의 정신을 이어받아, 그리핀도르 학생들은 정의와 진리를 위해 싸우는 경향이 있습니다. 해리 포터, 헤르미온느 그레인저, 론 위즐리 같은 주요 인물들이 그리핀도르에 소속되어 있습니다. 그리핀도르 기숙사는 호그와트 성의 높은 탑에 위치해 있으며, 포근한 분위기의 휴게실과 붉은색으로 꾸며진 기숙사 방이 있습니다.',
      'Ravenclaw': '레번클로는 지혜, 학문, 창의성을 중시하는 학생들이 모이는 기숙사입니다. 상징 동물은 독수리이며, 색깔은 파랑과 은색입니다. 로웨나 레번클로에 의해 설립된 이 기숙사는 학문적 성취와 지적 호기심을 중요시합니다. 레번클로 학생들은 논리적 사고와 독창적인 문제 해결 능력을 자랑합니다. 루나 러브굿과 초 챙 같은 주요 인물들이 레번클로에 소속되어 있습니다. 기숙사는 호그와트 성의 서쪽 탑에 위치해 있으며, 도서관 같은 분위기를 자아내는 휴게실이 있습니다.',
      'Hufflepuff': '후플푸프는 성실함, 인내, 공정함, 충성심을 중시하는 학생들이 모이는 기숙사입니다. 상징 동물은 오소리이며, 색깔은 노랑과 검정입니다. 헬가 후플푸프에 의해 설립된 이 기숙사는 누구에게나 열려 있고, 모든 학생을 공평하게 대우합니다. 후플푸프 학생들은 열심히 일하고, 다른 사람들을 돕는 것을 좋아합니다. 뉴트 스캐맨더와 같은 유명한 인물들이 후플푸프 출신입니다. 기숙사는 주방 근처 지하에 위치해 있으며, 따뜻하고 아늑한 분위기를 자아냅니다',
      'Slytherin': '슬리데린은 야망, 교활함, 지도력을 중시하는 학생들이 모이는 기숙사입니다. 상징 동물은 뱀이며, 색깔은 초록과 은색입니다. 설립자인 살라자르 슬리데린의 정신을 이어받아, 슬리데린 학생들은 권력과 영향력을 중요시합니다. 때때로 슬리데린은 부정적인 이미지로 그려지지만, 학생들은 높은 목표를 가지고 이를 이루기 위해 노력합니다. 드레이코 말포이와 세베루스 스네이프 같은 주요 인물들이 슬리데린에 소속되어 있습니다. 기숙사는 호그와트 성의 지하에 위치해 있으며, 어둡고 비밀스러운 분위기를 자아냅니다.'
    }[houseName];

    let description = {
      'Gryffindor': '용감하고 대담한 자를 위한 기숙사입니다.',
      'Ravenclaw': '현명하고 사려 깊은 자들을 위한 기숙사입니다.',
      'Hufflepuff': '성실하고 인내심 강한 자들을 위한 기숙사입니다.',
      'Slytherin': '야망 있고 교활한 자들을 위한 기숙사입니다.'
    }[houseName];

    setHouseContent({ houseName, content, description });
  }

  return (
    <div style={{ backgroundColor: "#171717" }}>

    <Page>
      {nextPage === 0 ? 
        // 시작 페이지
        <Card className="px-8 py-8 w-[500px] my-3 mx-auto ">
         <img src="/img/house-test.webp" alt="House Test" className="my-4 w-[320px] mx-auto" />
          <div className="my-7">
          <h4 className=" mb-3 text-center scroll-m-20 text-xl font-semibold tracking-tight">
          나는 어떤 기숙사일까?    </h4>
          <h1 className=" text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            호그와트기숙사 테스트
            </h1>
          </div>
          <p className=" mb-6 text-center leading-7 [&:not(:first-child)]:mt-6">
      4분소요
    </p>
          <Button className="w-full" onClick={() => setNextPage(1)}>▶ 시작하기</Button>
        </Card>
        : nextPage < qnaList.length ?
          // 질문 페이지
          <Card className="px-8 py-10 w-[500px] h-[600px]  my-3 mx-auto ">
            <div className="mb-3"><code className="object-center relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              {`${nextPage} / ${qnaList.length - 1}`}
              </code>
              </div>
              <div className="w-full h-1 bg-gray-200 rounded">
              <div className="h-full bg-gray-800 rounded" style={{ width: `${((nextPage) / (qnaList.length - 1)) * 100}%` }}></div>
            </div>
            {qnaList[nextPage - 1].q && (
              <div>
                <h3 className="my-9 text-center scroll-m-20 text-2xl font-semibold tracking-tight">
                <div>{qnaList[nextPage - 1].q}</div>
                </h3>
                <div className="grid w-full justify-center">
                  {qnaList[nextPage - 1].a.map((aval, aidx) => (
                    <div key={aidx}>
                      <Button variant="outline" className="mb-2 w-[360px]" onClick={() => handleCkAnswer(aval.type)}>{aval.answer}</Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
          :
          // 결과 페이지
          <Card className="px-8 py-9 w-[500px] my-3 mx-auto  ">
            <div className="my-8 text-center" >
              <h4 className="mb-2 scroll-m-20 text-xl font-semibold tracking-tight">당신의 기숙사는</h4>
              <h1 className="mb-5 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{houseContent.houseName}</h1>
              <p>{houseContent.description}</p>
              <img className=" mx-auto  my-9" src={`/img/${houseContent.houseName.toLowerCase()}.webp`} alt={houseContent.houseName} />
            </div>
            <div>{houseContent.content}</div>
            <Button className="my-9 mb-5 w-full" onClick={() => window.location.reload()}>다시하기</Button>
          </Card>
      }
      
    </Page>
    </div>
  );
}

export default HouseTestPage;
