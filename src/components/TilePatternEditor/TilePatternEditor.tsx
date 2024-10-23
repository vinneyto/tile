import cl from './TilePatternEditor.module.css';
import React from 'react';
import { tileColors } from '../../colors';
import { TileColorPicker } from '../TileColorPicker';

export interface TilePatternEditorProps {
  className?: string;
  pattern: string[][];
  onChangePattern: (pattern: string[][]) => void;
}

export const TilePatternEditor = ({
  pattern,
  onChangePattern,
}: TilePatternEditorProps) => {
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      elements.push(
        <TileColorPicker
          key={i * pattern.length + j}
          data={tileColors}
          value={pattern[i][j]}
          onChange={(c) => {
            const copy = pattern.map((r) => [...r]);
            copy[i][j] = c;
            onChangePattern(copy);
          }}
        />,
      );
    }
  }

  const rowLayout = pattern.map(() => 'auto').join(' ');
  const colLayout = pattern[0].map(() => 'auto').join(' ');

  return (
    <div
      className={cl.tilePatternEditor}
      style={{
        gridTemplateColumns: colLayout,
        gridTemplateRows: rowLayout,
      }}
    >
      {elements}
    </div>
  );
};
