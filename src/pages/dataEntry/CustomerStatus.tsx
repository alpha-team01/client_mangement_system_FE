import { useEffect, useState } from "react";
import { Button, Col, Flex, Row, Spin, Steps } from "antd";
import { WorkPermitDetails } from "./customer-status-components/WorkPermitDetails";
import { Pending } from "./customer-status-components/Pending";
import { useLocation } from "react-router-dom";
import { Customer } from "../../types";
import { Registered } from "./customer-status-components/Registered";
import { VisaInformation } from "./customer-status-components/VisaInformation";
import ButtonGroup from "antd/es/button/button-group";
import { toLower } from "lodash";
import { getCustomerById } from "../../api/services/Common";
import { Card } from "../../components/Card/Card";
import {
  RegistrationDetails,
  StateWiseDocDetails,
} from "../../types/customerStatus";

export const CustomerStatus = () => {
  const location = useLocation();

  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);

  const [previousBtnStatus, setPreviousBtnStatus] = useState(false);
  const [nextBtnStatus, setNextBtnStatus] = useState(false);

  const [customerData, setCustomerData] = useState<RegistrationDetails>();
  const [offerData, setOfferData] = useState<any>();
  const [workPermitData, setWorkPermitData] = useState<any>();
  const [visaData, setVisaData] = useState<any>();

  const items = [
    { title: "Registered", description: "Success" },
    {
      title: "Offer Information",
      description: offerData?.status === "S" ? "Success" : "Pending",
    },
    {
      title: "Work Permit Details",
      description: workPermitData?.status === "S" ? "Success" : "Pending",
    },
    { title: "Visa Information", description: "Pending" },
  ];

  useEffect(() => {
    setLoading(true);
    const { customer } = location.state as { customer: Customer };
    console.log("location", customer);

    // get customer details
    getCustomerById(customer.key)
      .then((res) => {
        console.log("customer details", res.data.responseObject);
        setCustomerData(res.data.responseObject);

        const offer = res.data.responseObject.stateWiseDocDetails.find(
          (doc: StateWiseDocDetails) => doc.stateId == 2
        );
        setOfferData(offer); // setting offerData

        const workPermit = res.data.responseObject.stateWiseDocDetails.find(
          (doc: StateWiseDocDetails) => doc.stateId == 3
        );
        setWorkPermitData(workPermit);

        const visa = res.data.responseObject.stateWiseDocDetails.find(
          (doc: StateWiseDocDetails) => doc.stateId == 4
        );
        setVisaData(visa);

        console.log("workPermitData", workPermitData);
      })
      .finally(() => {
        setLoading(false);
      });

    const customerStatus = toLower(customer.status.title);

    if (customerStatus === "registered") {
      setCurrent(0);
    } else if (customerStatus === "offer information") {
      setCurrent(1);
    } else if (customerStatus === "work permit details") {
      setCurrent(2);
    } else if (customerStatus === "visa information") {
      setCurrent(3);
    }
  }, [location]);

  const onStepChange = (newCurrent: number) => {
    setCurrent(newCurrent);
  };

  useEffect(() => {
    // Disable "Previous" button if on the first step
    if (current === 0) {
      setPreviousBtnStatus(true);
    } else {
      setPreviousBtnStatus(false);
    }

    // Disable "Next" button if on the last step
    if (current === items.length - 1) {
      setNextBtnStatus(true);
    } else {
      setNextBtnStatus(false);
    }
  }, [current]);

  const handlePreviousClick = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleNextClick = () => {
    if (current < items.length - 1) {
      setCurrent(current + 1);
    }
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Spin spinning={loading}>
            <Steps
              current={current}
              labelPlacement={"horizontal"}
              items={items}
              onChange={onStepChange}
            />
            {/* make this part to get the maximun heigth */}
            <Card
              style={{
                backgroundColor: "#fff",
                marginTop: "1rem",
                height: "100%",
              }}
            >
              {current === 0 && <Registered data={customerData} />}
              {current === 1 && <Pending pendingData={offerData} />}
              {current === 2 && (
                <WorkPermitDetails workPermitData={workPermitData} />
              )}
              {current === 3 && (
                <VisaInformation visaInfomationData={visaData} />
              )}
            </Card>
          </Spin>
        </Col>

        <Col span={24} style={{ marginTop: "1rem" }}>
          {/* add a button group called next pervious and edit */}
          <Flex justify="flex-end">
            <ButtonGroup>
              <Button
                onClick={handlePreviousClick}
                disabled={previousBtnStatus}
              >
                Previous
              </Button>
              <Button onClick={handleNextClick} disabled={nextBtnStatus}>
                Next
              </Button>
            </ButtonGroup>
          </Flex>
        </Col>
      </Row>
    </>
  );
};
