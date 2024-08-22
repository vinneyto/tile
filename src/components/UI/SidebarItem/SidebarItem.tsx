import { Row, Col } from 'antd';

import cl from './SidebarItem.module.css';

export interface SidebarItemProps {
  name: string;
  children: React.ReactNode;
}

export const SidebarItem = ({ name, children }: SidebarItemProps) => {
  return (
    <Row align="middle" className={cl.sidebarItem}>
      <Col span={8}>
        <label>{name}:</label>
      </Col>
      <Col span={16}>{children}</Col>
    </Row>
  );
};
