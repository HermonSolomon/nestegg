import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loader = () => (
  <div className="flex flex-row justify-center align-middle w-full">
    <InfinitySpin color="grey" />
  </div>
);

export default Loader;
