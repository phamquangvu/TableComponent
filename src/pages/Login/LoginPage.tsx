import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

import {
  BotMain,
  BoxContainer,
  HeaderTitle,
  MainBody,
  MainInput,
  SupText,
} from "./styled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../auth/auth";

interface LoginProps {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [data, setData] = useState<LoginProps>({
    email: "internal-clinician@lthcareline.com",
    password: "LTHC@Welcome!",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login(data);
      console.log(res);
      navigate("/list");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeInput = (key: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
    console.log("key", key, value);
  };

  return (
    <BoxContainer>
      <HeaderTitle>
        <Typography color=" black" fontWeight="bold" fontSize="24px">
          Login
        </Typography>
        <Typography color="#6B7280">
          Welcome! Please enter your details
        </Typography>
      </HeaderTitle>

      <MainBody>
        <form onSubmit={handleSubmit}>
          <MainBody>
            <MainInput>
              <label>Email</label>
              <TextField
                label="Enter your email"
                type="email"
                required
                value={data.email}
                onChange={(e) => handleChangeInput("email", e.target.value)}
              />
            </MainInput>
            <MainInput>
              <label>Password</label>
              <TextField
                label="Password"
                type="password"
                required
                value={data.password}
                onChange={(e) => handleChangeInput("password", e.target.value)}
              />
            </MainInput>
          </MainBody>

          <BotMain>
            <SupText>
              <Box>
                <FormControlLabel label="Remember me" control={<Checkbox />} />
              </Box>
              <div>Forgot password</div>
            </SupText>
            <Button type="submit" variant="contained">
              {loading ? "dang login" : "login"}
            </Button>
          </BotMain>
        </form>
      </MainBody>
    </BoxContainer>
  );
};

export default LoginPage;
