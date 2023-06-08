import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useProfil } from "../hooks/useProfil";
import { useParams } from "react-router-dom";
const ContactUpdating = () => {
  const { censusTakerId } = useParams();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidReset, setIsValidReset] = useState(false);
  const {
    updateProfilContact,
    resetProfilInput,
    setResetProfilInput,
    isLoading,
    msgError,
    bootstrapClassname,
  } = useProfil();
  const resetAllInputs = () => {
    setPassword("");
    setPhoneNumber("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfilContact(censusTakerId, password, phoneNumber);
    setIsValidReset(true);
  };
  useEffect(() => {
    if (resetProfilInput && isValidReset) {
      resetAllInputs();
      setIsValidReset(false);
      setResetProfilInput(false);
    }
  }, [resetProfilInput, isValidReset, setResetProfilInput]);

  return (
    <div className="mt-5">
      <form action="" id="form3" onSubmit={handleSubmit}>
        <div className="form-group px-3">
          <label htmlFor="password">Entrer votre mot de passe</label>
          <div className="input-group">
            <input
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Tapez votre mot de passe"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="form-control pr-2"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-outline-primary"
              type="button"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="form-group px-3">
          <label htmlFor="password">Changer votre numéro de téléphone</label>
          <div className="input-group">
            <input
              value={phoneNumber}
              type="text"
              placeholder="Votre numéro de téléphone"
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="form-control pr-2"
            />
          </div>
        </div>

        <button
          style={{ width: "289px" }}
          className="btn btn-primary btn-block m-3"
          type="submit"
          disabled={isLoading}
        >
          sauvegarder
        </button>
      </form>
      {msgError && <div className={bootstrapClassname}>{msgError}</div>}
    </div>
  );
};
export default ContactUpdating;
