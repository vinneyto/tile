import { Row, Col } from 'antd';

export interface SidebarItemProps {
  name: string;
  children: React.ReactNode;
}

export const SidebarItem = ({ name, children }: SidebarItemProps) => {
  return (
    <Row align="middle">
      <Col span={8}>
        <label>{name}:</label>
      </Col>
      <Col span={16}>{children}</Col>
    </Row>
  );
};
