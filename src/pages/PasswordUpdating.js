import { useState, useEffect } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useProfil } from "../hooks/useProfil";
import { useParams } from "react-router-dom";
const PasswordUpdating = () => {
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isValidReset, setIsValidReset] = useState(false);
  const { censusTakerId } = useParams();
  const {
    updateProfilPassword,
    resetProfilInput,
    setResetProfilInput,
    isLoading,
    msgError,
    bootstrapClassname,
  } = useProfil();

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfilPassword(censusTakerId, password, password1, password2);
    setIsValidReset(true);
  };

  useEffect(() => {
    const resetAllInputs = () => {
      setPassword("");
      setPassword1("");
      setPassword2("");
      setShowPassword(false);
      setShowPassword1(false);
      setShowPassword2(false);
      setIsValidReset(false);
      setResetProfilInput(false);
    };
    if (resetProfilInput && isValidReset) {
      resetAllInputs();
    }
  }, [resetProfilInput, isValidReset, setResetProfilInput]);
  return (
    <div className="mt-5">
      <form action="" id="form2" onSubmit={handleSubmit}>
        <div className="form-group px-3">
          <label htmlFor="oldPassword">
            Insérer votre mot de passe actuelle
          </label>
          <div className="input-group">
            <input
              id="oldPassword"
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Entrer votre mot de passe actuel"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="form-control pr-2"
            />
            <div className="input-group-append">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-outline-primary btn-block"
                type="button"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>
        <div className="form-group px-3">
          <label htmlFor="newPassword">Insérer un nouveau mot de passe</label>
          <div className="input-group">
            <input
              id="newPassword"
              value={password1}
              type={showPassword1 ? "text" : "password"}
              placeholder="Entrer votre nouveau mot de passe"
              required
              onChange={(e) => setPassword1(e.target.value)}
              className="form-control pr-2"
            />
            <div className="input-group-append">
              <button
                onClick={() => setShowPassword1(!showPassword1)}
                className="btn btn-outline-primary btn-block"
                type="button"
              >
                {showPassword1 ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>
        <div className="form-group px-3">
          <label htmlFor="confirmPassword">Confirmer votre mot de passe</label>
          <div className="input-group">
            <input
              id="confirmPassword"
              value={password2}
              type={showPassword2 ? "text" : "password"}
              placeholder="Confirmer votre nouveau mot de passe"
              required
              onChange={(e) => setPassword2(e.target.value)}
              className="form-control pr-2"
            />
            <div className="input-group-append">
              <button
                onClick={() => setShowPassword2(!showPassword2)}
                className="btn btn-outline-primary btn-block"
                type="button"
              >
                {showPassword2 ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>

        <button
          style={{ width: "289px" }}
          disabled={isLoading}
          className="btn btn-primary btn-block m-3"
          type="submit"
        >
          Sauvegarder
        </button>
      </form>
      {msgError && <div className={bootstrapClassname}>{msgError}</div>}
    </div>
  );
};
export default PasswordUpdating;
