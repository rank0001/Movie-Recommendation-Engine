import React from "react";
export default function Error() {
  return (
    <div style={{ backgroundColor: "black", height: "100vh" }}>
      <h1
        style={{
          position: "absolute",
          color: "yellow",
          marginTop: "200px",
          marginLeft: "400px",
        }}
      >
        Sorry,You have come to the wrong URL!
      </h1>
    </div>
  );
}
