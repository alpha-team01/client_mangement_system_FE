import { useState } from "react";
import { Steps } from "antd";
import { useStylesContext } from "../../context";
import { Pending } from "./Pending";

export const DataEntryPage = () => {
  const description = "This is a description.";
  const stylesContext = useStylesContext();
  const [current, setCurrent] = useState(1);  
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
        
        <Steps current={current} labelPlacement="vertical" items={items} />
      </div>

      {current === 1 && <Pending />}
    </>
  );
};
