import React from "react";
import { Link } from "react-router-dom";
import NonePaymentImage from "../../assets/img/svg/none-wish.svg"

const NonePayment = props => {
  return (
    <div className="wrapper-margin">
      <div className="payment-none">
        <div className="payment-none-inner">
          <div className="alert">You haven't saved any payment methods yet</div>
          <img src={NonePaymentImage} alt="" />
          <div className="action-blc">
            <Link className="button button-blue select-payments" to="/payments">
              Choose your payment method now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NonePayment;
