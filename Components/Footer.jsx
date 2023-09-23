import React from "react";



const Footer = () => {
  const productList = ["Market", "ERC20 Token", "Donation"];
  const contactList = ["sup@gb", "iofj@d", "fjio@fjio"];
  const usefulList = ["White paper", "Donation", "Members"]
  return (<footer className="text-center text-white backgroundMain lg:text-left">
    <div className="mx-6 py-10 text-center md:text-left">
      <div class="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="">
          <h6 className="mb-4 flex items-center font-semibold uppercase md:justify-start">Crypto King</h6>
          <p> Lorem ipsum dolor sit amet, consectetur adip</p>
        </div>
        <div className="">
          <h6 className="mb-4 flex items-center font-semibold uppercase md:justify-start">Products</h6>
          {productList.map((item, index) => (
            <p className="mb-4" key={index + 1}><a href="/">{item}</a></p>
          ))}
        </div>
        <div className="">
          <h6 className="mb-4 flex items-center font-semibold uppercase md:justify-start">Useful Link</h6>
          {usefulList.map((item, index) => (
            <p className="mb-4" key={index + 1}><a href="/">{item}</a></p>
          ))}
        </div>
        <div className="">
          <h6 className="mb-4 flex items-center font-semibold uppercase md:justify-start">Contacts</h6>
          {contactList.map((item, index) => (
            <p className="mb-4" key={index + 1}><a href="/">{item}</a></p>
          ))}
        </div>
      </div>
    </div>
    <div className="backgroundMain p-6 text-center">
      <span> 2023 CPRight </span>
      <a href="/" className="font-semibold">CK</a>
    </div>
  </footer>);
};

export default Footer;
