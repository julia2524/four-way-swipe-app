import { Animated, PanResponder, Text, View } from "react-native";
import { DirectionType, IGameCard } from "../types/game";
import styled, { useTheme } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";

interface SwipeCardProps {
  data: IGameCard[];
}

const SContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
  align-items: center;
  padding: 50px 20px 30px 20px;
  gap: 15px;
`;
const TopHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.headerBgColor};
  padding: 14px 16px;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
`;
const GameArea = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;
const HeaderBox = styled.View`
  align-items: center;
  flex: 1;
`;
const HeaderLabel = styled.Text`
  color: ${(props) => props.theme.headerTextColor};
  font-size: 11px;
  margin-bottom: 4px;
`;
const HeaderValue = styled.Text`
  color: ${(props) => props.theme.headerScoreColor};
  font-size: 20px;
  font-weight: bold;
`;
const TimerBarContainer = styled.View`
  width: 70%;
  height: 4px;
  background-color: #1e293b;
  border-radius: 2px;
  margin-bottom: -3px;
  overflow: hidden;
`;
const TimerBarFill = styled.View`
  width: 60%;
  height: 100%;
  background-color: #ff4757;
  border-radius: 2px;
`;
const TargetVertical = styled.View<{ targetColor: string }>`
  width: 160px;
  height: 70px;
  /* width: 100%;
  max-width: 220px;
  height: 55px; */
  background-color: ${(props) => props.theme.headerBgColor};
  border-radius: 30px;
  border: 1px solid ${(props) => props.targetColor};
  flex-direction: row;
  align-items: center;
  padding-left: 15px;
  gap: 15px;
  /* shadow-color: #ff4757;
  shadow-opacity: 0.4;
  shadow-radius: 10px;
  elevation: 5; */
`;
const IConCircle = styled.View<{ targetColor: string }>`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.targetColor};
`;
const TargetLabelHorizontal = styled.View`
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const TargetLabelVertical = styled.View`
  gap: 2px;
`;
const TargetLabelName = styled.Text<{ targetColor: string }>`
  font-weight: bold;
  font-size: 15px;
  color: ${(props) => props.targetColor};
`;
const TargetDirectionVertical = styled.Text`
  font-size: 10px;
  color: ${(props) => props.theme.subTextColor};
`;
const TargetDirectionHorizontal = styled.Text`
  font-size: 10px;
  color: ${(props) => props.theme.subTextColor};
  text-align: center;
`;
const MiddleRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
`;
const TargetHorizontal = styled.View<{ targetColor: string }>`
  width: 75px;
  height: 160px;
  background-color: ${(props) => props.theme.headerBgColor};
  border-radius: 50px;
  border: 1px solid ${(props) => props.targetColor};
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-left: 2px;
  /* shadow-color: #2ed573;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 5; */
`;
const CenterCard = styled.View`
  width: 135px;
  height: 170px;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 15px;
  padding: 8px;
  z-index: 99;
  /* shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 15px;
  elevation: 10; */
`;
const SCenterCard = Animated.createAnimatedComponent(CenterCard);
const MainWord = styled.Text<{ targetColor: string }>`
  font-size: 40px;
  font-weight: bold;
  color: ${(props) => props.targetColor};
`;

const CardSubDesc = styled.Text`
  color: ${(props) => props.theme.subTextColor};
  font-size: 11px;
  line-height: 15px;
  text-align: center;
`;
const TipBox = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.headerBgColor};
  border-radius: 16px;
  padding: 12px 16px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-top: auto;
`;

export default function SwipeCard({ data }: SwipeCardProps) {
  const theme = useTheme();
  const [index, setIndex] = useState(0);

  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: () =>
        Animated.parallel([onPressOut, goCenter]).start(),
    }),
  ).current;

  return (
    <SContainer>
      <TopHeader>
        <HeaderBox>
          <HeaderLabel>점수</HeaderLabel>
          <HeaderValue>320</HeaderValue>
        </HeaderBox>
        <HeaderBox>
          <HeaderLabel>남은 시간</HeaderLabel>
          <HeaderValue>00:45</HeaderValue>
          <TimerBarContainer>
            <TimerBarFill />
          </TimerBarContainer>
        </HeaderBox>
        <HeaderBox>
          <HeaderLabel>남은 카드</HeaderLabel>
          <HeaderValue>8 / 20</HeaderValue>
        </HeaderBox>
      </TopHeader>
      <GameArea>
        <TargetVertical targetColor={theme.red}>
          <IConCircle targetColor={theme.red}>
            <Ionicons name="arrow-up" size={20} color="#ffffff" />
          </IConCircle>
          <TargetLabelVertical>
            <TargetLabelName targetColor={theme.red}>빨강</TargetLabelName>
            <TargetDirectionVertical>위로 밀어주세요</TargetDirectionVertical>
          </TargetLabelVertical>
        </TargetVertical>
        <Ionicons
          name="chevron-up"
          size={24}
          color="#4b5563"
          style={{ opacity: 0.5 }}
        />
        <Ionicons
          name="chevron-up"
          size={24}
          color="#4b5563"
          style={{ opacity: 0.5 }}
        />
        <MiddleRow>
          <TargetHorizontal targetColor={theme.green}>
            <IConCircle targetColor={theme.green}>
              <Ionicons name="arrow-back" size={20} color="#ffffff" />
            </IConCircle>
            <TargetLabelHorizontal>
              <TargetLabelName targetColor={theme.green}>초록</TargetLabelName>
              <TargetDirectionHorizontal>
                왼쪽으로{"\n"} 밀어주세요
              </TargetDirectionHorizontal>
            </TargetLabelHorizontal>
          </TargetHorizontal>
          <Ionicons
            name="chevron-back"
            size={24}
            color="#4b5563"
            style={{ opacity: 0.5 }}
          />
          <SCenterCard
            {...panResponder.panHandlers}
            style={{
              transform: [
                { scale },
                { translateX: position.x },
                { translateY: position.y },
              ],
            }}
          >
            <MainWord targetColor={data[index].labelColor}>
              {data[index].label}
            </MainWord>
            <CardSubDesc>
              글자의 색상을 보고{"\n"} 같은 색으로 밀어주세요!
            </CardSubDesc>
          </SCenterCard>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#4b5563"
            style={{ opacity: 0.5 }}
          />
          <TargetHorizontal targetColor={theme.blue}>
            <IConCircle targetColor={theme.blue}>
              <Ionicons name="arrow-forward" size={20} color="#ffffff" />
            </IConCircle>
            <TargetLabelHorizontal>
              <TargetLabelName targetColor={theme.blue}>파랑</TargetLabelName>
              <TargetDirectionHorizontal>
                오른쪽으로{"\n"} 밀어주세요
              </TargetDirectionHorizontal>
            </TargetLabelHorizontal>
          </TargetHorizontal>
        </MiddleRow>
        <Ionicons
          name="chevron-down"
          size={24}
          color="#4b5563"
          style={{ opacity: 0.5 }}
        />
        <Ionicons
          name="chevron-down"
          size={24}
          color="#4b5563"
          style={{ opacity: 0.5 }}
        />
        <TargetVertical targetColor={theme.yellow}>
          <IConCircle targetColor={theme.yellow}>
            <Ionicons name="arrow-down" size={20} color="#ffffff" />
          </IConCircle>
          <TargetLabelVertical>
            <TargetLabelName targetColor={theme.yellow}>노랑</TargetLabelName>
            <TargetDirectionVertical>아래로 밀어주세요</TargetDirectionVertical>
          </TargetLabelVertical>
        </TargetVertical>
      </GameArea>
      <TipBox>
        <Ionicons name="bulb" size={22} color="#1e90ff" />

        <View>
          <Text
            style={{
              color: "#1e90ff",
              fontWeight: "bold",
              fontSize: 12,
              marginBottom: 2,
            }}
          >
            TIP
          </Text>
          <Text style={{ color: "#94a3b8", fontSize: 11 }}>
            글자의 색깔을 보고 해당하는 방향으로 밀어주세요!
          </Text>
        </View>
      </TipBox>
    </SContainer>
  );
}
