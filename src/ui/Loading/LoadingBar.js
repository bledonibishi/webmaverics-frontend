import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import "./loading.css";

const LoadingBar = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading && (
        <div className="loading-bar ">
          <ClipLoader
            color={"rgb(54, 215, 183)"}
            loading={loading}
            height={7}
            size={50}
            width={300}
          />
          {/* set height and width props to make loader bigger */}
        </div>
      )}
    </>
  );
};

export default LoadingBar;
