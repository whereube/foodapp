import { useContext, createContext, useState, useEffect} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("userId") || "");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const initializeUser = async () => {
            const storedUserId = localStorage.getItem("userId");
            if (storedUserId) {
                // Optionally, fetch user details from API
                setUser({ userId: storedUserId }); // Example, replace with actual user fetch
                setToken(storedUserId)
            }
            setLoading(false); // Finished loading
        };
        initializeUser();
    }, []);



    const loginAction = async (data) => {
        try {
            const response = await fetch("http://localhost:443/creator/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData)
                console.error('Error:', errorData); 
                throw new Error(errorData);
            } else {
                const res = await response.json();
                if (res && res[0].email === data.email) {
                    setUser(res[0]);
                    setToken(res[0].user_id);
                    console.log(res[0].id)
                    localStorage.setItem("userId", res[0].id);
                    return { success: true };
                } else {
                    throw new Error(res.message);
                }
            }
        } catch (err) {
            return ({ success: false, message: err.message });
        }
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("userId");
    };

    if (loading) {
        // You might want to render a loader or nothing while loading
        return <div>Loading...</div>;
    }


    return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => {
  return useContext(AuthContext);
};


