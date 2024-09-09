import React from "react";
import { Flex, Steps, Row, Col } from "antd";
import { CustomerSearchS2 } from "./CustomerSearchS2";
import { useStylesContext } from "../../context";
import { Divider } from "antd";

export const DataEntryPage = () => {
  const description = "This is a description.";
  const stylesContext = useStylesContext();
  const items = [
    {
      title: "Finished",
    },
    {
      title: "Pending",
    },
    {
      title: "Pending",
    },
    {
      title: "Pending",
    },
  ];
  return (
    <>
      <div
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Steps current={1} labelPlacement="vertical" items={items} />
      </div>
      <div>
        <p></p>
        <p></p>
        <Row>
          <Col sm={10} lg={12}>
            <CustomerSearchS2 />
          </Col>
          <Col>
            <Divider
              style={{ borderColor: "red", border: "2px", height: "100%" }}
            />
          </Col>
          <Col sm={10} lg={12}>
            <CustomerSearchS2 />
          </Col>
        </Row>
      </div>
    </>
  );
};
