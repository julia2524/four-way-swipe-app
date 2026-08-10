import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    // bgColor: string;
    // textColor: string;
    // cardColor: string;
    // accentColor: string;

    // redTarget: string;
    // blueTarget: string;
    // greenTarget: string;
    // yellowTarget: string;
    bgColor: string;
    headerBgColor: string;
    headerTextColor: string;
    headerScoreColor: string;

    cardColor: string;
    textColor: string;
    subTextColor: string;

    // primaryColor: string;
    // correctColor: string;
    // wrongColor: string;

    borderColor: string;

    red: string;
    blue: string;
    green: string;
    yellow: string;
  }
}
