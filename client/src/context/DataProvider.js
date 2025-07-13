import { createContext, useState, useEffect } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    // Load initial account data from localStorage, if available
    const initialAccountState = JSON.parse(localStorage.getItem("account")) || { email: '', name: '', userId: '' };
    const [account, setAccount] = useState(initialAccountState);

    const refreshAccessToken = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/refresh-token`, {
                method: "POST",
                credentials: 'include' // Include cookies in requests
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Update account state if user data is returned
            if (data.userData) {
                const updatedAccount = {
                    email: data.userData.email,
                    name: data.userData.name,
                    userId: data.userData.userId
                };
                
                setAccount(updatedAccount);

                // Save account to localStorage for persistence
                localStorage.setItem("account", JSON.stringify(updatedAccount));
            }

        } catch (error) {
            console.error("Refresh of token failed:", error);
            // Optionally clear the account state if token refresh fails
            setAccount({ email: '', name: '', userId: '' });
            localStorage.removeItem("account"); // Clear account from localStorage
        }
    };

    useEffect(() => {
        refreshAccessToken(); // Initial token refresh on mount
        const interval = setInterval(refreshAccessToken, 10 * 60 * 1000); // Refresh every 10 minutes

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <DataContext.Provider value={{ account, setAccount }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataProvider;
