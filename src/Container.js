import React from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import styled from "styled-components";
import Paper from "material-ui/Paper";

const Box = styled(Paper)`
  padding: 28px;
  height: 100%;
  width: 100%;
`;
const Sample = styled.div`
  width: 50%;
  margin: 0 auto;
  padding-top: 100px;
`;
export const Container = ({ progress, nativeProgress }) => {
  return (
    <Sample>
      <ResizableBox
        lockAspectRatio={true}
        width={200}
        height={200}
        minConstraints={[150, 150]}
        maxConstraints={[650, 650]}
      >
        <Box style={{ marginBottom: "28px" }}>
          <div>{progress}</div>
        </Box>
        <Box>
          <div>{nativeProgress}</div>
        </Box>
      </ResizableBox>
    </Sample>
  );
};
