import { useState } from "react";
import { Steps } from "antd";
import React from "react";
import { Flex, Steps, Row, Col, Descriptions } from "antd";
import { CustomerSearchS2 } from "./CustomerSearchS2";
import { WorkPermitDetails } from "./WorkPermitDetails";
import { useStylesContext } from "../../context";
import { Pending } from "./Pending";

export const DataEntryPage = () => {
  const description = "This is a description.";
  const stylesContext = useStylesContext();
  const [current, setCurrent] = useState(1);  
  const items = [
    {
      title: "Finished",
      description: "Registered"
    },
    {
      title: "Pending",
      description: "Offer Information"
    },
    {
      title: "Pending",
      description: "Work Permit Details"
    },
    {
      title: "Pending",
      description: "Visa Information"
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
        
        <Steps current={current} labelPlacement="vertical" items={items} />
      </div>

      {current === 1 && <Pending />}
      <div>
        <p></p>
        <p></p>
        <Row>
          <Col sm={10} lg={12}>
            <WorkPermitDetails/>
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
