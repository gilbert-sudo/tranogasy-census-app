import { useState, useEffect } from "react";
import { FaCopy } from "react-icons/fa";
import { useLogin } from "../hooks/useLogin";
import { useSignup } from "../hooks/useSignup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginSocialFacebook } from "reactjs-social-login";
import "./SocialButton.css"; // styles for the button

const LoginPage = () => {

  const [facebookID, setFacebookID] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const { signupWithFacebook } = useSignup();


  const user = useSelector((state) => state.user);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(facebookID);
    setShowNotification(true);
  };

  //login with facebook
  const loginWithFacebook = async (username, email, facebookID, thumbnail) => {
    signupWithFacebook(username, email, facebookID, thumbnail);
  };

  if (!facebookID) {
    return (
      <>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n        ::-webkit-scrollbar {\n            width: 8px;\n        }\n\n        /* Track */\n        ::-webkit-scrollbar-track {\n            background: #f1f1f1;\n        }\n\n        /* Handle */\n        ::-webkit-scrollbar-thumb {\n            background: #888;\n        }\n\n        /* Handle on hover */\n        ::-webkit-scrollbar-thumb:hover {\n            background: #555;\n        }\n\n        @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');\n\n        * {\n            padding: 0;\n            margin: 0;\n            box-sizing: border-box;\n            font-family: 'Poppins', sans-serif;\n        }\n\n        body {\n      background: #eeeff3;\n        }\n\n        .container {\n            margin: 0px auto;\n        }\n\n        .panel-heading {\n            text-align: center;\n            margin-bottom: 10px;\n        }\n\n        #forgot {\n            min-width: 100px;\n            margin-left: auto;\n            text-decoration: none;\n        }\n\n        a:hover {\n            text-decoration: none;\n        }\n\n        .form-inline label {\n            padding-left: 10px;\n            margin: 0;\n            cursor: pointer;\n        }\n\n        .btn.btn-primary {\n            margin-top: 20px;\n            border-radius: 15px;\n        }\n\n        .panel {\n            min-height: 380px;\n            box-shadow: 20px 20px 80px rgb(218, 218, 218);\n            border-radius: 12px;\n        }\n\n        .input-field {\n            border-radius: 5px;\n            padding: 5px;\n            display: flex;\n            align-items: center;\n            cursor: pointer;\n            border: 1px solid #ddd;\n            color: #7cbd1e;\n        }\n\n        input[type='text'],\n        input[type='password'] {\n            border: none;\n            outline: none;\n            box-shadow: none;\n            width: 100%;\n        }\n\n        .fa-eye-slash.btn {\n            border: none;\n            outline: none;\n            box-shadow: none;\n        }\n\n        img {\n            width: 80px;\n            height: 80px;\n            object-fit: cover;\n            border-radius: 50%;\n            position: relative;\n        }\n\n        a[target='_blank'] {\n            position: relative;\n            transition: all 0.1s ease-in-out;\n        }\n\n        .bordert {\n            border-top: 1px solid #aaa;\n            position: relative;\n        }\n\n        .bordert:after {\n       position: absolute;\n            top: -13px;\n            left: 20%;\n            background-color: #fff;\n            padding: 0px 8px;\n        }\n\n        @media(max-width: 360px) {\n            #forgot {\n                margin-left: 0;\n                padding-top: 10px;\n            }\n\n            body {\n                height: 100%;\n            }\n\n            .container {\n                margin: 0;\n            }\n\n            .bordert:after {\n                left: 25%;\n            }\n        }\n\n      .btn-primary, .btn-primary:active {\n    background-color: #7cbd1e !important;\n    border-color: #7cbd1e !important;\n\n}\n    .btn-primary:hover, .btn-primary:active, .btn-primary:visited {\n    background-color: #C2F784 !important;\n    border-color: #C2F784 !important;\n\n}\n    ",
          }}
        />
        <div className="container">
          <div
            className="row"
            style={{ marginTop: "70px", marginBottom: "100px" }}
          >
            <div className="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
              <div className="panel border bg-white">
                <div className="panel-heading">
                  <h6 className="pt-3 font-weight-bold">
                    Connexion a TranoGasy
                  </h6>
                </div>
                <div className="panel-body p-3">
                  <div className="container d-flex justify-content-center align-items-center">
                    <div>
                      <img
                        src="https://ik.imagekit.io/ryxb55mhk/Tranogasy/logo2.png?updatedAt=1679052755455"
                        alt="your image"
                      />
                    </div>
                  </div>
                </div>
                <div className="mx-3 my-2 py-2 bordert">
                  <div className="text-center py-3">
                    <LoginSocialFacebook
                      appId="943901416807958"
                      onResolve={(response) => {
                        console.log(response);
                        setFacebookID(response.data.userID);
                        loginWithFacebook(
                          response.data.name,
                          response.data.email,
                          response.data.userID,
                          response.data.picture.data.url
                        );
                      }}
                      onReject={(error) => {
                        console.log(error);
                      }}
                    >
                      <div className="row  align-items-center justify-content-center">
                        {" "}
                        <button className="facebook-button">
                          <svg viewBox="0 0 24 24" className="facebook-icon">
                            <path
                              fill="#1877f2"
                              d="M21.91 0H2.09C.942 0 0 .942 0 2.09v19.82C0 23.058.942 24 2.09 24h19.82c1.148 0 2.09-.942 2.09-2.09V2.09c0-1.148-.942-2.09-2.09-2.09z"
                            />
                            <path
                              fill="#fff"
                              d="M15.24 23V14.82h2.89l.43-3.37h-3.32v-2.15c0-.98.27-1.64 1.67-1.64h1.78V4.13a24.18 24.18 0 00-2.61-.13c-2.58 0-4.35 1.58-4.35 4.5v2.5H9.56v3.37h3.33V23h2.35z"
                            />
                          </svg>
                          <span>Continuer avec Facebook</span>
                        </button>{" "}
                      </div>
                    </LoginSocialFacebook>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n        ::-webkit-scrollbar {\n            width: 8px;\n        }\n\n        /* Track */\n        ::-webkit-scrollbar-track {\n            background: #f1f1f1;\n        }\n\n        /* Handle */\n        ::-webkit-scrollbar-thumb {\n            background: #888;\n        }\n\n        /* Handle on hover */\n        ::-webkit-scrollbar-thumb:hover {\n            background: #555;\n        }\n\n        @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');\n\n        * {\n            padding: 0;\n            margin: 0;\n            box-sizing: border-box;\n            font-family: 'Poppins', sans-serif;\n        }\n\n        body {\n      background: #eeeff3;\n        }\n\n        .container {\n            margin: 0px auto;\n        }\n\n        .panel-heading {\n            text-align: center;\n            margin-bottom: 10px;\n        }\n\n        #forgot {\n            min-width: 100px;\n            margin-left: auto;\n            text-decoration: none;\n        }\n\n        a:hover {\n            text-decoration: none;\n        }\n\n        .form-inline label {\n            padding-left: 10px;\n            margin: 0;\n            cursor: pointer;\n        }\n\n        .btn.btn-primary {\n            margin-top: 20px;\n            border-radius: 15px;\n        }\n\n        .panel {\n            min-height: 380px;\n            box-shadow: 20px 20px 80px rgb(218, 218, 218);\n            border-radius: 12px;\n        }\n\n        .input-field {\n            border-radius: 5px;\n            padding: 5px;\n            display: flex;\n            align-items: center;\n            cursor: pointer;\n            border: 1px solid #ddd;\n            color: #7cbd1e;\n        }\n\n        input[type='text'],\n        input[type='password'] {\n            border: none;\n            outline: none;\n            box-shadow: none;\n            width: 100%;\n        }\n\n        .fa-eye-slash.btn {\n            border: none;\n            outline: none;\n            box-shadow: none;\n        }\n\n        img {\n            width: 80px;\n            height: 80px;\n            object-fit: cover;\n            border-radius: 50%;\n            position: relative;\n        }\n\n        a[target='_blank'] {\n            position: relative;\n            transition: all 0.1s ease-in-out;\n        }\n\n        .bordert {\n            border-top: 1px solid #aaa;\n            position: relative;\n        }\n\n        .bordert:after {\n           position: absolute;\n            top: -13px;\n            left: 20%;\n            background-color: #fff;\n            padding: 0px 8px;\n        }\n\n        @media(max-width: 360px) {\n            #forgot {\n                margin-left: 0;\n                padding-top: 10px;\n            }\n\n            body {\n                height: 100%;\n            }\n\n            .container {\n                margin: 0;\n            }\n\n            .bordert:after {\n                left: 25%;\n            }\n        }\n\n      .btn-primary, .btn-primary:active {\n    background-color: #7cbd1e !important;\n    border-color: #7cbd1e !important;\n\n}\n    .btn-primary:hover, .btn-primary:active, .btn-primary:visited {\n    background-color: #C2F784 !important;\n    border-color: #C2F784 !important;\n\n}\n    ",
          }}
        />
        <div className="container">
          <div
            className="row"
            style={{ marginTop: "70px", marginBottom: "100px" }}
          >
            <div className="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
              <div className="panel border bg-white">
                <div className="panel-heading">
                  <h6 className="pt-3 font-weight-bold">Connexion réussie</h6>
                </div>
                <div className="panel-body p-3">
                  <div className="container d-flex justify-content-center align-items-center">
                    <div>
                      <img
                        src="https://ik.imagekit.io/ryxb55mhk/Tranogasy/okay.png?updatedAt=1680703738532"
                        alt="your image"
                      />
                    </div>
                  </div>
                </div>
                <div className="mx-3 my-2 py-2 bordert">
                  <div className="text-center py-3">
                    <div className="row  align-items-center justify-content-center">
                      <h>Voici votre Facebook ID</h>
                    </div>
                    <div className="row  align-items-center justify-content-center">
                      <h3><strong>{facebookID}</strong></h3>
                    </div>
                    <div className="row  align-items-center justify-content-center">
                      {" "}
                      <button onClick={copyToClipboard} className="facebook-button">
                        <FaCopy className="facebook-icon" />
                        <span>Copier</span>
                      </button>{" "}
                    </div>
                    <br />
                    {showNotification && <h className="alert alert-success">Copié dans le presse-papiers !</h>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default LoginPage;
