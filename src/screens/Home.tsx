import { Text, View } from "react-native";
import SwipeCard from "../components/SwipeCard";
import { gameCards } from "../data/gameCards";

export default function Home() {
  return <SwipeCard data={gameCards} />;
}
