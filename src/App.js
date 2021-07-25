import React, { useEffect, useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


const repo = "http://148.72.206.209:127/vcard.html" 
const logo = "/assets/img/adcb_logo_new.png" 
let deferredPrompt;  
    
var QRCode = require('qrcode.react');

function App() {
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener('appinstalled', () => {
      // Log install to analytics
      console.log('INSTALL: Success');
    });
  }, []);

  const handleInstallClick = (e) => {
      // Hide the app provided install promotion
      setInstallable(false);
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
      });
  };
  
  return (



    <div className="App">
    
    <div style={{float:"right",margin:"10px"}} >
          {installable &&
            <Button variant="outline-primary" size="sm" onClick={handleInstallClick}>
              Add to Home Screen
            </Button>
            
          }
        </div>

<div className="outer-wrap">
        <div className="container">
            <div className="col-12">
                <div className="row">
                    <div className="col-lg-6 no-padding col-center">
                        <div className="card bg-white custom-card">
                            <p className="logo2"><img src={logo} alt="ADCB Logo" style={{width:"160px",height:"48px"}} ></img></p>
                            <p className="introPara">Get my Business Card from the below QR code</p>
                            <p className="QrHolder">
                            <QRCode
                              value={repo}
                              size={180}
                              bgColor={"#ffffff"}
                              fgColor={"#ba1b19"}
                              level={"L"}
                              includeMargin={false}
                              renderAs={"svg"} imageSettings={{
                                src: "/assets/img/favicon-32x32.png",
                                height: 20,
                                width: 20,
                                excavate: true,
                              }}
                            />
                            </p>
                            <p className="introPara"></p>
                            <p >
                            <Button variant="success">Share Link</Button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    
 
    </div>

    

  );
}

export default App;
