export type ColorType = "red" | "blue" | "green" | "yellow";
//export type ShapeType = "circle" | "square" | "triangle" | "star";
export type DirectionType = "top" | "bottom" | "left" | "right";

export interface IGameCard {
  id: number;
  label: string; // 화면에 보이는 글자 (예: "파랑")
  labelColor: ColorType; // 글자의 실제 색상 (예: "red")
  targetDirection: DirectionType; // 이 카드의 정답 방향 (색상 기준 또는 텍스트 기준)
}
