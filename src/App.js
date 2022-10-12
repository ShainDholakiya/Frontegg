import "./App.css";
import { useEffect } from "react";
import { ContextHolder } from "@frontegg/rest-api";
import {
  AdminPortal,
  useAuth,
  useAuthActions,
  useLoginWithRedirect,
} from "@frontegg/react";

function App() {
  const { user, isAuthenticated } = useAuth();
  const { switchTenant } = useAuthActions();
  const loginWithRedirect = useLoginWithRedirect();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  const handlePortalClick = () => {
    AdminPortal.show();
  };

  return (
    <div className="bg-[#F5F6F8] h-screen pt-5">
      {isAuthenticated ? (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-auto">
          <img className="w-full" src={user?.profilePictureUrl} alt={user?.name} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{user?.name}</div>
            <p className="text-gray-700 text-base">Email: {user?.email}</p>
            <p className="text-gray-700 text-base">Tenant: {user?.tenantId}</p>
            <div>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 rounded"
                onClick={() => {
                  navigator.clipboard.writeText(user?.accessToken);
                  alert("Access token copied to clipboard");
                }}
              >
                Copy Access Token
              </button>
            </div>
          </div>
          <div className="px-6 py-4">
            Switch Tenant:
            <select
              defaultValue={user?.tenantId}
              className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => switchTenant(e.target.value)}
            >
              {user?.tenantIds.map((tenantId, i) => (
                <option key={tenantId} value={tenantId}>
                  {tenantId}
                </option>
              ))}
            </select>
          </div>
          <div className="px-6 pt-4 pb-2">
            <button
              onClick={handlePortalClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Open Admin Portal
            </button>
          </div>
          <div className="absolute top-0 right-0 m-5">
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center">
            <img src={"https://frontegg.com/wp-content/uploads/2022/07/logo-black-1.svg"} className="App-logo" alt="logo" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
