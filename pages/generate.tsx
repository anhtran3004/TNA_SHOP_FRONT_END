import React, { useState } from "react";
import QRCode from "react-qr-code";
// import styles from "../styles/Home.module.css";

function Generate() {
    const [qrCodeValue, setQrCodeValue] = useState("");

    return (
        <div className="main-page">
            <div className="card">Generate QR</div>

            {qrCodeValue != "" && (
                <QRCode value={qrCodeValue} className="container" />
            )}
            <input
                className="card"
                onChange={(e) => {
                    setQrCodeValue(e.target.value);
                }}
            />
        </div>
    );
}

export default Generate;