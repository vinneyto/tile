import React, { useCallback, useMemo, useState } from 'react';
import { Popover, Button, Collapse } from 'antd';
import cl from './TileColorPicker.module.css';

type Item = {
  src: string;
  isColor: boolean;
};

type Section = {
  section: string;
  items: Item[];
};

interface TileColorPickerProps {
  data: Section[];
  value: string;
  onChange?: (value: string) => void;
}

export const TileColorPicker: React.FC<TileColorPickerProps> = ({
  data,
  value,
  onChange,
}) => {
  const [visible, setVisible] = useState(false);

  const handleSelect = useCallback(
    (item: Item) => {
      if (onChange) {
        onChange(item.src);
      }
      setVisible(false);
    },
    [onChange],
  );

  const items = useMemo(
    () =>
      data.map((section, index) => ({
        key: index,
        label: section.section,
        children: (
          <div className={cl.itemsContainer}>
            {section.items.map((item, idx) => (
              <div
                key={idx}
                className={cl.item}
                style={{
                  backgroundColor: item.isColor ? item.src : undefined,
                  backgroundImage: !item.isColor
                    ? `url(${item.src})`
                    : undefined,
                }}
                onClick={() => handleSelect(item)}
              />
            ))}
          </div>
        ),
      })),
    [data, handleSelect],
  );

  const activeKeys = useMemo(() => items.map((_, i) => i), [items]);

  const content = (
    <div className={cl.popoverContent}>
      <Collapse
        size="small"
        defaultActiveKey={activeKeys}
        ghost
        items={items}
      />
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      open={visible}
      onOpenChange={(v) => setVisible(v)}
      overlayClassName={cl.popoverOverlay}
    >
      <Button
        className={cl.button}
        style={{
          backgroundColor:
            value && !value.startsWith('http') ? value : undefined,
          backgroundImage:
            value && value.startsWith('http') ? `url(${value})` : undefined,
        }}
      />
    </Popover>
  );
};
