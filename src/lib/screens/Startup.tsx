import React from "react";
import { Card, Typography, Button, Space, Row, Col } from "antd";

const { Title, Paragraph } = Typography;
export const Startup: React.FC = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card>
            <Typography>
              <Title level={2}>Welcome to Condutor-PM</Title>
              <Paragraph>
                Start managing your projects efficiently with Condutor-PM. Our
                application offers a comprehensive suite of tools to streamline
                your project management workflow.
              </Paragraph>

              <Space direction="vertical" style={{ width: "100%" }}>
                <Button type="primary" block>
                  Create New Project
                </Button>
                <Button block>View Existing Projects</Button>
                <Button block>Explore Features</Button>
              </Space>
            </Typography>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
