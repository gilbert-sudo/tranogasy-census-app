import {
  FaLock,
  FaEyeSlash,
  FaUser,
  FaPhoneAlt,
  FaMailBulk,
  FaEye
} from "react-icons/fa";
import { useSignup } from "../hooks/useSignup";
import { useState } from "react";

const SignUpPage = () => {
  const { signup, isLoading, error, bootstrapClassname } = useSignup();

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Render the main content
  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, email, phone, password, confirmPassword);
  };

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
            "\n        ::-webkit-scrollbar {\n            width: 8px;\n        }\n\n        /* Track */\n        ::-webkit-scrollbar-track {\n            background: #f1f1f1;\n        }\n\n        /* Handle */\n        ::-webkit-scrollbar-thumb {\n            background: #888;\n        }\n\n        /* Handle on hover */\n        ::-webkit-scrollbar-thumb:hover {\n            background: #555;\n        }\n\n        @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');\n\n        * {\n            padding: 0;\n            margin: 0;\n            box-sizing: border-box;\n            font-family: 'Poppins', sans-serif;\n        }\n\n        body {\n      background: #eeeff3;\n        }\n\n        .container {\n            margin: 0px auto;\n        }\n\n        .panel-heading {\n            text-align: center;\n            margin-bottom: 10px;\n        }\n\n        #forgot {\n            min-width: 100px;\n            margin-left: auto;\n            text-decoration: none;\n        }\n\n        a:hover {\n            text-decoration: none;\n        }\n\n        .form-inline label {\n            padding-left: 10px;\n            margin: 0;\n            cursor: pointer;\n        }\n\n        .btn.btn-primary {\n            margin-top: 20px;\n            border-radius: 15px;\n        }\n\n        .panel {\n            min-height: 380px;\n            box-shadow: 20px 20px 80px rgb(218, 218, 218);\n            border-radius: 12px;\n        }\n\n        .input-field {\n            border-radius: 5px;\n            padding: 5px;\n            display: flex;\n            align-items: center;\n            cursor: pointer;\n            border: 1px solid #ddd;\n            color: #7cbd1e;\n        }\n\n        input[type='text'],\n        input[type='password'] {\n            border: none;\n            outline: none;\n            box-shadow: none;\n            width: 100%;\n        }\n\n        .fa-eye-slash.btn {\n            border: none;\n            outline: none;\n            box-shadow: none;\n        }\n\n        img {\n            width: 40px;\n            height: 40px;\n            object-fit: cover;\n            border-radius: 50%;\n            position: relative;\n        }\n\n        a[target='_blank'] {\n            position: relative;\n            transition: all 0.1s ease-in-out;\n        }\n\n        .bordert {\n            border-top: 1px solid #aaa;\n            position: relative;\n        }\n\n        .bordert:after {\n            content: \"ou connectez-vous avec\";\n            position: absolute;\n            top: -13px;\n            left: 20%;\n            background-color: #fff;\n            padding: 0px 8px;\n        }\n\n        @media(max-width: 360px) {\n            #forgot {\n                margin-left: 0;\n                padding-top: 10px;\n            }\n\n            body {\n                height: 100%;\n            }\n\n            .container {\n                margin: 0;\n            }\n\n            .bordert:after {\n                left: 25%;\n            }\n        }\n\n      .btn-primary, .btn-primary:active {\n    background-color: #7cbd1e !important;\n    border-color: #7cbd1e !important;\n\n}\n    .btn-primary:hover, .btn-primary:active, .btn-primary:visited {\n    background-color: #C2F784 !important;\n    border-color: #C2F784 !important;\n\n}\n    ",
        }}
      />
      <div className="container">
        <div className="row" style={{ marginTop: "70px" }}>
          <div className="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
            <div className="panel border bg-white">
              <div className="panel-heading">
                <h3 className="pt-3 font-weight-bold">Inscription</h3>
              </div>
              <div className="panel-body p-3">
                <form action="" onSubmit={handleSubmit} method="POST">
                  <div className="form-group py-2">
                    <div className="input-field">
                      <span className="far p-2">
                        <FaUser />
                      </span>
                      <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="Votre nom complet"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group py-2 mb-0">
                    <div className="input-field">
                      <span className="far p-2">
                        <FaPhoneAlt />
                      </span>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        placeholder="Votre numéro de téléphone"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group py-2">
                    <label htmlFor="remember">
                      <small className="text-danger">
                        <strong>(L'adresse email n'est pas obligatoire)</strong>
                      </small>
                    </label>
                    <div className="input-field">
                      <span className="far p-2">
                        <FaMailBulk />
                      </span>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Votre adresse email"
                      />
                    </div>
                  </div>
                  <div className="form-group py-1 pb-2">
                    <div className="input-field">
                      <span className="fas px-2">
                        <FaLock />
                      </span>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder="Tapez votre mot de passe"
                        required
                      />
                      <div  onClick={() => setShowPassword(!showPassword)} className="btn bg-white text-muted">
                        <span className="far">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group py-1 pb-2">
                    <div className="input-field">
                      <span className="fas px-2">
                        <FaLock />
                      </span>
                      <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirmer votre mot de passe"
                        required
                      />
                      <div onClick={() => setShowPassword(!showPassword)} className="btn bg-white text-muted">
                        <span className="far">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="form-inline">
                    {/*<input type="checkbox" name="remember" id="remember" />
                     <label htmlFor="remember" className="text-muted">
                      Enregistrer des données
                    </label> */}
                    {/* <a to="#" id="forgot" className="font-weight-bold" style={{ color: "#7cbd1e"}}>
                      Mot de passe oublié?
                    </a> */}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-3"
                    disabled={isLoading}
                  >
                    S'inscrire
                  </button>
                  {/* <div className="text-center pt-4 text-muted">
                    Vous n'avez pas de compte ? <a href="#">S'inscrire</a>
                  </div> */}
                  <br />
                  {error && <div className={bootstrapClassname}>{error}</div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
