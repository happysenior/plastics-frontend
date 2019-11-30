import React from "react";

import { Button } from "../../UIComponents";
var I18n = require("react-redux-i18n").I18n;

class UploadPDF extends React.Component {
  render = () => {
    const { data, pdfUrl, onChange, onRemove } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-6">{this.renderUploadBtn()}</div>
          <div className="col-6">
            {this.renderPDFInput(onChange)}
            <div className="video-hint">Lorem Ipsum...</div>
            {data || pdfUrl
              ? this.renderPDFShow(data, pdfUrl, onChange, onRemove)
              : null}
          </div>
        </div>
      </div>
    );
  };

  triggerClickFileInput = e => {
    this.fileInput.click();
  };

  renderPDFInput = onChange => (
    <input
      type="file"
      accept="pdf/*"
      className="upload-file"
      onChange={e => onChange(e.target.files)}
      ref={fileInput => (this.fileInput = fileInput)}
      multiple
    />
  );

  renderUploadBtn = () => (
    <div className="upload-pdf-button-container">
      <div className="upload-pdf-button" onClick={this.triggerClickFileInput}>
        <div>
          <div className="icon">
            <i className="fas fa-file-pdf" />
          </div>
          <div className="title">{I18n.t("create_listing.add_pdf")}</div>
        </div>
      </div>
    </div>
  );

  renderPDFShow = (data, pdfUrl, onChange, onRemove) => {
    const isUpload = pdfUrl ? false : true;
    const pdfName = pdfUrl
      ? pdfUrl.url
          .substring(pdfUrl.url.lastIndexOf("/") + 1)
          .split("+")
          .join(" ")
      : null;
    return (
      <div className="container mt-2">
        <span className="video-name">{isUpload ? data.name : pdfName}</span>
        <Button
          outline={true}
          size="sm"
          onClick={isUpload ? e => onChange(null) : e => onRemove(pdfUrl)}
          title={I18n.t("common.remove")}
          color="#ff0000"
          borderColor="danger"
        />
      </div>
    );
  };
}

export default UploadPDF;
