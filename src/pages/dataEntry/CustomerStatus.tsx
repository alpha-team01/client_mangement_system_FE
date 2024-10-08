import { useEffect, useState } from "react";
import { Button, Col, Flex, Steps } from "antd";
import { WorkPermitDetails } from "./customer-status-components/WorkPermitDetails";
import { useStylesContext } from "../../context";
import { Pending } from "./customer-status-components/Pending";
import { useLocation } from "react-router-dom";
import { Customer } from "../../types";
import { Registered } from "./customer-status-components/Registered";
import { VisaInformation } from "./customer-status-components/VisaInformation";
import ButtonGroup from "antd/es/button/button-group";
import { toLower } from "lodash";

export const CustomerStatus = () => {
  const location = useLocation();

  const [current, setCurrent] = useState(0);

  const [previousBtnStatus, setPreviousBtnStatus] = useState(false);
  const [nextBtnStatus, setNextBtnStatus] = useState(false);

  const [editBtnText, setEditBtnText] = useState<"Edit" | "Save">("Edit");
  const [isFormEditable, setIsFormEditable] = useState(false);

  const items = [
    { title: "Registered", description: "Pending" },
    { title: "Offer Information", description: "Pending" },
    { title: "Work Permit Details", description: "Pending" },
    { title: "Visa Information", description: "Pending" },
  ];

  useEffect(() => {
    const { customer } = location.state as { customer: Customer };
    console.log("location", customer);

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

  const handleEditClick = () => {
    if (editBtnText === "Edit") {
      setEditBtnText("Save");
      setIsFormEditable(true);

      // dissable the next and previous button
      setNextBtnStatus(true);
      setPreviousBtnStatus(true);
    } else {
      // Call a function to save the data to the backend
      // After saving, revert the form to read-only
      console.log("Save the changes");

      // Set back to read-only mode
      setEditBtnText("Edit");
      setIsFormEditable(false);
    }
  };

  const handleSaveFromChild = () => {
    // Switch back to "Edit" mode after saving
    setEditBtnText("Edit");
    setIsFormEditable(false);

    // Enable the next and previous button
    setNextBtnStatus(false);
    setPreviousBtnStatus(false);
  };
  return (
    <>
      <Col span={24}>
        <Steps
          current={current}
          labelPlacement="vertical"
          items={items}
          onChange={onStepChange}
        />

        {current === 0 && <Registered isEditable={isFormEditable} onSave={handleSaveFromChild}/>}
        {current === 1 && <Pending />}
        {current === 2 && <WorkPermitDetails />}
        {current === 3 && <VisaInformation />}
      </Col>

      <Col span={24} style={{ marginTop: "1rem" }}>
        {/* add a button group called next pervious and edit */}
        <Flex justify="flex-end">
          <ButtonGroup>
            <Button onClick={handlePreviousClick} disabled={previousBtnStatus}>Previous</Button>
            {editBtnText === "Edit" && (<Button onClick={handleEditClick}>{editBtnText}</Button>) }
            <Button onClick={handleNextClick} disabled={nextBtnStatus}>Next</Button>
          </ButtonGroup>
        </Flex>
      </Col>
    </>
  );
};
