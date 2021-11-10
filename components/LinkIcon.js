import React from "react";

const Icon = ({ link, shop }) => {
  let router = {
    texxturehome: "texture-home",
    designideas: "designideasltd",
    larrytraverso: "larry-traverso-store",
  };

  console.log("link, ", link);
  console.log("shop, ", shop);
  console.log("router, ", router[shop.replace("-", "")]);

  let fullLink = `https://${
    router[shop.replace("-", "")]
  }.myshopify.com${link}`;

  return (
    <a
      style={{ cursor: "pointer", margin: "0 8px 0 0" }}
      target="_blank"
      href={fullLink}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="#4388F8"
          fillRule="evenodd"
          d="M4.222 14.121a2 2 0 000 2.829l2.828 2.828a2 2 0 002.829 0l2.828-2.828a2 2 0 000-2.829L12 13.414l-2.121 2.122a1 1 0 11-1.415-1.415l2.122-2.12-.707-.708a2 2 0 00-2.829 0l-2.828 2.828z"
          clipRule="evenodd"
          opacity="0.3"
        ></path>
        <path
          fill="#4388F8"
          fillRule="evenodd"
          d="M11.293 7.05a2 2 0 000 2.829l.707.707 2.121-2.122a1 1 0 111.415 1.415l-2.122 2.12.707.708a2 2 0 002.829 0l2.828-2.828a2 2 0 000-2.829L16.95 4.222a2 2 0 00-2.829 0L11.293 7.05z"
          clipRule="evenodd"
        ></path>
      </svg>
    </a>
  );
};

export default Icon;

// ("https://texture-home.myshopify.com//admin/customers/5467137769611");
// ("https://texture-home.myshopify.com/admin/customers/5467137769611");
