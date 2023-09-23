"use client"

import React, { useState, useEffect, useContext } from "react";

import { CrowdFundingContext } from "../Context/CrowdFunding";
import { Hero, Card, PopUp } from "../components";

const index = () => {

  const index = () => {
    const { titleData,
      getCampaigns,
      createCampaign,
      donate,
      getUserCampaigns,
      getDonations,
    } = useContext(CrowdFundingContext);

    const [allcampaigns, setAllcampaigns] = useState();
    const [userCampaigns, setUserCampaigns] = useState();

    useEffect(() => {
      const getCampaignsData = getCampaigns();
      const userCampaignsData = getUserCampaigns();

      return async () => {
        const alldata = await getCampaigns;
        const userCampaignsData = await getUserCampaignsData;

        setAllcampaigns(alldata);
        setUserCampaigns(userCampaignsData);
      }
    }, []);

    const [openModal, setOpenModal] = useState(false);
    const [donateCampaign, setDonateCampaign] = useState();

    console.log(donateCampaign);

    return (
      <>
        <Hero titleData={titleData} createCampaign={createCampaign}></Hero>

        <Card
          title="All Listed Campaigns"
          allcampaign={allcampaign} 
          setOpenModal={setOpenModal}
          setDonateCampaign={setDonateCampaign}
          />

        <Card
          title="Your Created Campaigns"
          allcampaign={usercampaign}
          setOpenModal={setOpenModal}
          setDonateCampaign={setDonateCampaign}
        />

        {openModal && (
          <PopUp setOpenModal={setOpenModal} getDonations={getDonations} donate={donateCampaign} donateFunction={donate}/>
        )}
      </>
    )
  }


  return (
    <div >
      index
    </div>
  )
}

export default index
