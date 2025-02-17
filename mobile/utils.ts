import { Dimensions  } from 'react-native';


export const getScreenHeightRespValue = (height: number = 0.5) => {
    const ScreenHeight = Dimensions.get("window").height;
    const heightValue = ScreenHeight * height;
    return heightValue
}

