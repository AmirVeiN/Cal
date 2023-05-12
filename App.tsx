import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import SafeAreaView , {SafeAreaProvider} from "react-native-safe-area-view";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

export default function App() {
  const [top, topHandler] = useState("");

  const addList = (item: string) => topHandler(top + item);

  const removeLast = () => topHandler(top.substring(0, top.length - 1));

  const [result, resultHandler] = useState("");

  const createAlert = () =>
    Alert.alert("اشتباه", "شما نمی توانید بعد از عملگر دوباره عملگر بنویسید", [
      {
        text: "باشه متوجه شدم",
        style: "cancel",
      },
    ]);

  const MaxAlert = () =>
    Alert.alert(
      "اشتباه",
      "شما نمی توانید بیش تر از 20 عملگر همزمان استفاده کنید",
      [
        {
          text: "باشه متوجه شدم",
          style: "cancel",
        },
      ]
    );

  const element = {
    "A C": (
      <MaterialCommunityIcons name="alpha-c-circle" size={40} color="white" />
    ),
    "B backSpace": <FontAwesome5 name="backspace" size={24} color="white" />,
    "C %": <MaterialCommunityIcons name="percent" size={24} color="white" />,
    "D /": <FontAwesome5 name="divide" size={24} color="black" />,
    "E 7": "7",
    "F 8": "8",
    "G 9": "9",
    "H *": (
      <MaterialCommunityIcons name="close-thick" size={24} color="black" />
    ),
    "I 4": "5",
    "G 5": "5",
    "K 6": "6",
    "L -": <FontAwesome5 name="minus" size={24} color="black" />,
    "O 1": "1",
    "M 2": "2",
    "N 3": "3",
    "P +": <FontAwesome5 name="plus" size={24} color="black" />,
    "Q 00": "00",
    "R 0": "0",
    "S .": ",",
    "T res": <FontAwesome5 name="equals" size={24} color="white" />,
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView forceInset={{ top: "never" }}>
        <View className="flex h-full w-full flex-col bg-[#ED6E6E] p-5 pt-6">
          <View className="flex h-[355] w-full flex-col justify-end space-y-6 pb-3">
            <Text className="h-1/3 w-full text-right text-3xl text-white/60">
              {top}
            </Text>
            <Text className=" w-full text-right text-5xl  text-white">
              {result}
            </Text>
          </View>
          <View className="h-[2px] w-full bg-white/25"></View>
          <View className="h-full w-full">
            <FlatList
              numColumns={4}
              data={Object.entries(element)}
              renderItem={(e) => (
                <TouchableOpacity
                  onPress={() => {
                    if (
                      (top.slice(-1) === "-" ||
                        top.slice(-1) === "+" ||
                        top.slice(-1) === "/" ||
                        top.slice(-1) === "*" ||
                        top.slice(-1) === "%") &&
                      (e.item[0].split(" ")[1] === "+" ||
                        e.item[0].split(" ")[1] === "-" ||
                        e.item[0].split(" ")[1] === "/" ||
                        e.item[0].split(" ")[1] === "%" ||
                        e.item[0].split(" ")[1] === "*")
                    ) {
                      createAlert();
                    } else {
                      if (e.item[0].split(" ")[1] === "res")
                        resultHandler(eval(top));
                      else if (e.item[0].split(" ")[1] === "C")
                        topHandler(""), resultHandler("");
                      else if (e.item[0].split(" ")[1] === "backSpace")
                        removeLast();
                      else {
                        let count = 0;
                        for (let i of top) {
                          if (
                            i === "+" ||
                            i === "-" ||
                            i === "/" ||
                            i === "*" ||
                            i === "%"
                          ) {
                            count += 1;
                          }
                        }
                        if (count <= 20) {
                          addList(e.item[0].split(" ")[1]);
                        } else {
                          MaxAlert();
                        }
                      }
                    }
                  }}
                  className={`${
                    e.item[0].split(" ")[1] === "res" &&
                    " rounded-full bg-black"
                  } m-[15.5] flex h-16 w-16 items-center  justify-center `}
                >
                  <Text className={` text-4xl text-white `}>{e.item[1]}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
