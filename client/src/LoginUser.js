function LoginForm() {
  const [credentials, setCredentials] = useState({
    email: "",
    passord: "",
  });

  // Henter autentiseringsnøkkelen fra lokal lagring ved første render
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (Object.values(credentials).some((value) => value === "")) {
      // Show modal alert or handle the empty fields case as needed
      return;
    }

    try {
      const { email, passord } = credentials;
      const token = await loginUser({ email, passord });

      if (token) {
        console.log("Login successful");
        setAuthToken(token);
        localStorage.setItem('authToken', token); // Lagrer token lokalt
        navigate('/LoggedInUser');
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle the error based on your application's requirements
    }
  };

  return (
    <div className="main">
      {/* ... (resten av koden uendret) */}
    </div>
  );
}

export default LoginForm;
