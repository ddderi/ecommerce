import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordType, setPasswordType] = useState("password");

  const handlePasswordVisibility = () => {
    if (passwordVisibility) {
      setPasswordType("text");
      setPasswordVisibility(!passwordVisibility);
    } else if (!passwordVisibility) {
      setPasswordType("password");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const Icon = () => {
    if (passwordVisibility) {
      return <VisibilityIcon onClick={() => handlePasswordVisibility()} />;
    } else if (!passwordVisibility) {
      return <VisibilityOffIcon onClick={() => handlePasswordVisibility()} />;
    }
  };

  return {
    Icon,
    passwordType,
  };
};
