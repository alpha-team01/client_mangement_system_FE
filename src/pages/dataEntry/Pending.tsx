import { Row, Col } from "antd";
import { CustomerSearchS2 } from "./CustomerSearchS2";
import { Divider } from "antd";

export const Pending = () => {
  
  return (
    <>
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
