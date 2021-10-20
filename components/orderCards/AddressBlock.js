const CustomerPage = (props) => {
  return (
    <div>
      <div className="orders-page-address-card-address-wrapper">
        <p>
          {props.address.name}
          {props.address.address2 && props.address.company}
          {props.address.company && <br />}
          {props.address.address1}
          <br />
          {props.address.address2 && props.address.address2}
          {props.address.address2 && <br />}
          {props.address.city}, {props.address.provinceCode}
          <br />
          {props.address.zip}
          <br />
          {props.address.country}
        </p>
      </div>
    </div>
  );
};

export default CustomerPage;
