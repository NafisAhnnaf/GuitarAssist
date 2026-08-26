import React, { useMemo } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';

interface Position {
    string: number; // 1 (High E) to 6 (Low E)
    fret: number;   // -1 = muted, 0 = open, >0 = fretted
    finger: number;
}

interface ChordProps {
    positions?: Position[];
}

const DEFAULT_POSITIONS: Position[] = [
    { string: 5, fret: 2, finger: 1 },
    { string: 6, fret: 3, finger: 2 },
    { string: 2, fret: 3, finger: 3 },
    { string: 1, fret: 3, finger: 4 },
];

const STRINGS_X = [-1, 105, 85, 65, 45, 25, 5];
const STRINGS_W = [-1, 1, 1.333, 2, 2.667, 3.5, 4.417];
const BOARD_HEIGHT = 200;
const BOARD_WIDTH = 110;
const VIEWBOX_WIDTH = 135; // Extra 25px on the right for fret number labels
// Nut sits at y=15 to leave room above for open/muted indicators
const NUT_Y = 15;

const Chord = ({ positions = DEFAULT_POSITIONS }: ChordProps) => {
    const { frets, dots, indicators } = useMemo(() => {
        if (!positions || positions.length === 0) {
            return { frets: [], dots: [], indicators: [] };
        }

        // Only fretted notes (fret > 0) determine the visible fret window
        const frettedPositions = positions.filter((p) => p.fret > 0);
        const fretNumbers = frettedPositions.map((p) => p.fret);

        const minFret = fretNumbers.length > 0 ? Math.min(...fretNumbers) : 1;
        const maxFret = fretNumbers.length > 0 ? Math.max(...fretNumbers) : 1;

        // Show at least 2 frets for readability, but never add phantom frets
        const fretCount = Math.max(maxFret - minFret + 1, 2);

        // Fix: usable drawing area starts strictly below the nut
        const usableHeight = BOARD_HEIGHT - NUT_Y;
        const fretStep = usableHeight / fretCount;

        // Fix: fret lines start at NUT_Y, not 0; centerY for label placement
        const calculatedFrets = Array.from({ length: fretCount }).map((_, i) => ({
            fretNum: minFret + i,
            y: NUT_Y + (i + 1) * fretStep,
            centerY: NUT_Y + (i + 0.5) * fretStep,
        }));

        // Fix: dots anchored from NUT_Y; only fretted (>0) strings get a dot
        const calculatedDots = positions
            .filter((pos) => pos.fret > 0)
            .map((pos) => {
                const fretIndex = pos.fret - minFret; // 0-based into visible range
                const cy = NUT_Y + (fretIndex + 0.5) * fretStep; // center of that fret space
                const cx = STRINGS_X[pos.string] ?? 0;
                return { cx, cy, r: 8, finger: pos.finger, string: pos.string };
            });

        // Fix: open (0) and muted (-1) strings render as indicators above the nut
        const calculatedIndicators = positions
            .filter((pos) => pos.fret === 0 || pos.fret === -1)
            .map((pos) => ({
                cx: STRINGS_X[pos.string] ?? 0,
                type: pos.fret === -1 ? 'muted' : 'open',
                string: pos.string,
            }));

        return { frets: calculatedFrets, dots: calculatedDots, indicators: calculatedIndicators };
    }, [positions]);

    return (
        <View className="flex items-center justify-center">
            <Svg height="70%" width="60%" viewBox={`0 0 ${VIEWBOX_WIDTH} ${BOARD_HEIGHT}`}>
                {/* Open (O) and Muted (X) indicators above the nut */}
                {indicators.map((ind) =>
                    ind.type === 'open' ? (
                        <Circle
                            key={`open-${ind.string}`}
                            cx={ind.cx}
                            cy={NUT_Y / 2}
                            r={4}
                            fill="none"
                            stroke="gray"
                            strokeWidth="1.5"
                        />
                    ) : (
                        <React.Fragment key={`mute-${ind.string}`}>
                            <Line x1={ind.cx - 4} y1={NUT_Y / 2 - 4} x2={ind.cx + 4} y2={NUT_Y / 2 + 4} stroke="gray" strokeWidth="1.5" />
                            <Line x1={ind.cx + 4} y1={NUT_Y / 2 - 4} x2={ind.cx - 4} y2={NUT_Y / 2 + 4} stroke="gray" strokeWidth="1.5" />
                        </React.Fragment>
                    )
                )}

                {/* Nut */}
                <Line x1={0} y1={NUT_Y} x2={BOARD_WIDTH} y2={NUT_Y} stroke="gray" strokeWidth="4" />

                {/* Fret Lines */}
                {frets.map((fret) => (
                    <Line
                        key={`fret-${fret.fretNum}`}
                        x1={0}
                        y1={fret.y}
                        x2={BOARD_WIDTH}
                        y2={fret.y}
                        stroke="gray"
                        strokeWidth="2"
                    />
                ))}

                {/* Fret Number Labels (right of fretboard) */}
                {frets.map((fret) => (
                    <SvgText
                        key={`label-${fret.fretNum}`}
                        x={BOARD_WIDTH + 10}
                        y={fret.centerY}
                        fill="gray"
                        fontSize="9"
                        fontWeight="bold"
                        textAnchor="start"
                        alignmentBaseline="central"
                    >
                        {fret.fretNum}
                    </SvgText>
                ))}

                {/* Strings (Low E → High E) */}
                {[6, 5, 4, 3, 2, 1].map((stringNum) => (
                    <Line
                        key={`string-${stringNum}`}
                        x1={STRINGS_X[stringNum]}
                        y1={0}
                        x2={STRINGS_X[stringNum]}
                        y2={BOARD_HEIGHT}
                        stroke="white"
                        strokeWidth={STRINGS_W[stringNum]}
                    />
                ))}

                {/* Finger Dots — fretted strings only */}
                {dots.map((dot, index) => (
                    <React.Fragment key={`dot-${dot.string}-${index}`}>
                        <Circle cx={dot.cx} cy={dot.cy} r={dot.r} fill="cyan" />
                        <SvgText
                            x={dot.cx}
                            y={dot.cy}
                            fill="black"
                            fontSize="10"
                            fontWeight="bold"
                            textAnchor="middle"
                            alignmentBaseline="central"
                        >
                            {dot.finger}
                        </SvgText>
                    </React.Fragment>
                ))}
            </Svg>
        </View>
    );
};

export default Chord;