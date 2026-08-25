import { View } from 'react-native'
import Svg, { Circle, Line, Text } from 'react-native-svg'
const Chord = () => {
    return (
        <View className='flex justify-center items-center'>
            <Svg height="70%" width="60%" viewBox="0 0 110 200">
                {/*Frets*/}
                <Line
                    x1={0}
                    y1={100}
                    x2={110}
                    y2={100} //Y1 = Y2 => Horizontal
                    stroke="gray"
                    strokeWidth="4"
                />
                {/* Strings */}
                <Line
                    x1={5}
                    y1={200}
                    x2={1}
                    y2={-200}
                    stroke="white"
                    strokeWidth="4.417"
                />
                <Line
                    x1={25}
                    y1={200}
                    x2={20}
                    y2={-200}
                    stroke="white"
                    strokeWidth="3.5"
                />
                <Line
                    x1={45}
                    y1={200}
                    x2={40}
                    y2={-200}
                    stroke="white"
                    strokeWidth="2.667"
                />
                <Line
                    x1={65}
                    y1={200}
                    x2={60}
                    y2={-200}
                    stroke="white"
                    strokeWidth="2"
                />
                <Line
                    x1={85}
                    y1={200}
                    x2={80}
                    y2={-200}
                    stroke="white"
                    strokeWidth="1.333"
                />
                <Line
                    x1={105}
                    y1={200}
                    x2={99}
                    y2={-200}
                    stroke="white"
                    strokeWidth="1"
                />
                {/* Finger Position */}

                <Circle
                    cx={23} //  S2x - S2w
                    cy={50} // FretHeight/2
                    r={8}
                    fill={"cyan"}
                />
                <Text
                    x={23} //  Same as circle
                    y={50}
                    fill="black"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    transform="rotate(-90, 23, 50)"
                >1</Text>

                <Circle
                    cx={2} //  S2x - S2w
                    cy={150} // FretHeight/2
                    r={8}
                    fill={"cyan"}
                />
                <Text
                    x={2} //  Same as circle
                    y={150}
                    fill="black"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    transform="rotate(-90, 2, 150)"
                >2</Text>

                <Circle
                    cx={84} //  S2x - S2w
                    cy={150} // FretHeight/2
                    r={8}
                    fill={"cyan"}
                />
                <Text
                    x={84} //  Same as circle
                    y={150}
                    fill="black"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    transform="rotate(-90, 84, 150)"
                >3</Text>

                <Circle
                    cx={104.5} //  S2x - S2w
                    cy={150} // FretHeight/2
                    r={8}
                    fill={"cyan"}
                />
                <Text
                    x={104.5} //  Same as circle
                    y={150}
                    fill="black"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    transform="rotate(-90, 104.5, 150)"
                >4</Text>
            </Svg>
        </View>
    )
}

export default Chord