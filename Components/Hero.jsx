"use client"

import React, { useState } from "react";

const Hero = ({ titleData, createCampaign }) => {

  const [camapaign, setCampaign] = useState({
    title: "",
    description: "",
    amount: "",
    deadLine: "",
  });

  const createNewCampaign = async (e) => {
    e.preventDefault();
    try {
      await createCampaign(campaign);
    }
    catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="relative">
      <span className="coverLine"></span>
      <img src="" className="absolute inset-0 object-cover w-full h-full" alt=""></img>
      <div className="relative bg-opacity-75 backgroundMain"></div>
    </div>
  );
};

export default Hero;
