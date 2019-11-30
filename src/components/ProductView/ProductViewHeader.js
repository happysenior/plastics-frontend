import React, { Component } from "react";
import { Link } from "react-router-dom";

import MainImage from "./MainImage";
import ImageSlider from "./ImageSlider";
import AuctionForm from "./Auction";
var Translate = require("react-redux-i18n").Translate;
var I18n = require("react-redux-i18n").I18n;

class ProductViewHeader extends Component {
  render = () => {
    const { productDetail, userId } = this.props;
    const urls =
      productDetail.ListingFiles && productDetail.ListingFiles.length > 0
        ? productDetail.ListingFiles
        : null;
    let files = [];
    let pdfUrl = [];
    if (urls) {
      for (let i = 0; i < urls.length; i++) {
        if (urls[i].type === "PDF") pdfUrl.push(urls[i]);
        else files.push(urls[i]);
      }
    } else files = null;

    return (
      <div className="row pb-4 product-view-header">
        <div className="col-sm-12 col-md-5 p-0 mb-3 gallery">
          <MainImage
            imgLink={files && files.length > 0 ? files[0].url : null}
            type={files && files.length > 0 ? files[0].type : null}
            imgAlt={productDetail.title}
          />
          <ImageSlider className="slider-blc" files={files} />
        </div>
        <div className="col-sm-12 col-md-6 offset-md-1 product-small-info">
          {this.renderProductTitle()}
          {this.renderShortText()}
          {!productDetail.isAuction && this.renderProductPrice()}
          {productDetail.UserId !== userId && this.renderProductInfoAction()}
        </div>
        {pdfUrl.length > 0 ? this.renderPDF(pdfUrl) : null}
      </div>
    );
  };

  renderPDF = pdfUrl =>
    pdfUrl.map((item, index) => {
      return (
        <div key={index} className="row pdf-blc">
          <span>[PDF]</span>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <h5>
              {item.url
                ? decodeURIComponent(item.url
                    .substring(item.url.lastIndexOf("/") + 1)
                    .split("+")
                    .join(" "))
                : null}
            </h5>
          </a>
        </div>
      );
    });

  renderProductTitle = () => (
    <h1
      className="product-small-info-title"
      title={this.props.productDetail.title}
    >
      {this.props.productDetail.title}
    </h1>
  );

  renderShortText = () => (
    <div className="product-small-info-description">
      <div
        className="shot-text"
        ref={divRef => {
          if (divRef) divRef.innerHTML = this.props.productDetail.description;
        }}
      />
    </div>
  );

  renderProductPrice = () => (
    <div className="product-price">
      <span className="value-price">
        <b>
          <span
            ref={spanRef => {
              if (spanRef)
                spanRef.innerHTML = this.props.productDetail.Country.Currency.symbol;
            }}
          />
          {this.props.productDetail.pricePerUnit}
        </b>
        {"/" + this.props.productDetail.unit}
      </span>
    </div>
  );

  renderProductInfoAction = () => (
    <div className="row pl-3 product-small-info-action">
      <Link
        className="col-sm-6 col-md-8 button button-primary"
        to="#"
        onClick={this.props.onClickChat}
      >
        <i className="far fa-comments" />
        <span>
          <Translate value="product_detail.chat_seller" />
        </span>
      </Link>
      {this.renderWish()}
    </div>
  );

  renderWish = () => {
    const checkedIcon = this.props.wishCheck ? "fas fa-heart" : "far fa-heart";
    const toolTip = this.props.wishCheck
      ? I18n.t("common.remove")
      : I18n.t("common.save");
    return (
      <div
        className="col-sm-6 col-md-4 pinSpan save-btn"
        onClick={this.props.onClick}
      >
        <i className={checkedIcon} />
        <div className="profile-tooltip">
          <p className="txt">{toolTip}</p>
          <span>▲</span>
        </div>
      </div>
    );
  };

  renderAuction = data => (
    <AuctionForm
      bidAuction={data.bidAuction}
      initialPrice={data.initialPrice}
      data={data.data}
      isMyListing={data.isMyListing}
      usdPrice={data.usdPrice}
      getCurrentListing={data.getCurrentListing}
    />
  );
}

export default ProductViewHeader;
