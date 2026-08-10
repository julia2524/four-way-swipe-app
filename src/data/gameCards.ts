import { IGameCard } from "../types/game";

export const gameCards: IGameCard[] = [
  {
    id: 1,
    label: "파랑", // 눈에는 파랑으로 보이지만
    labelColor: "red", // 실제 색상은 빨강!
    targetDirection: "top", // 고로 빨강인 '위(top)'로 밀어야 정답!
  },
  {
    id: 2,
    label: "노랑",
    labelColor: "blue", // 실제 색상은 파랑
    targetDirection: "bottom", // 파랑인 '아래(bottom)'로 밀기
  },
  {
    id: 3,
    label: "빨강",
    labelColor: "green", // 실제 색상은 초록
    targetDirection: "left", // 초록인 '왼쪽(left)'으로 밀기
  },
  {
    id: 4,
    label: "초록",
    labelColor: "yellow", // 실제 색상은 노랑
    targetDirection: "right", // 노랑인 '오른쪽(right)'으로 밀기
  },
];
