import { useEffect, useState } from "react";
import { getUserDetails, userPayment } from "../utils/api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { clearUserToken, getUserID } from "../utils/api/userDetails";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [payLoad, setPayLoad] = useState(false);
  const [error, setError] = useState("");

  const userID = getUserID();

  const fetchUser = async () => {
    try {
      const response = await getUserDetails();
      if (response.success) {
        setUser(response.data);
      } else {
        setError("Failed to fetch user details.");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status == 401) {
          navigate("/");
        }
      }
      setError("An error occurred while fetching data.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const proceed = async () => {
    setPayLoad(true);
    try {
      if (!userID) return;

      const newWindow = window.open("", "_blank");

      const response = await userPayment(userID);

      if (response?.paymentLink) {
        if (newWindow) {
          newWindow.location.href = response.paymentLink;
        } else {
          window.location.href = response.paymentLink;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setPayLoad(false);
      }, 3000);
    }
  };

  const logoutUser = () => {
    clearUserToken();
    navigate("/");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className=" w-full h-[80vh] flex items-center justify-center ">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    navigate("/");
  }

  return (
    <div className=" dashboardBack px-5 lg:px-20 pb-5 py-5 min-h-screen h-full  ">
      <div className=" glassmorph flex flex-col md:flex-row items-center justify-center p-4 gap-20 mb-5 bg-white rounded-lg shadow-md">
        <div className=" w-full lg:w-2/5 flex flex-col gap-4 items-center justify-center border-r-2 ">
          <img
            src={user.image}
            alt="User Profile"
            className=" h-[200px] w-[200px] lg:h-[300px] lg:w-[300px] bg-blend-overlay border-4 border-yellow-400 rounded-[100%] object-cover bg-gray-500 "
          />
          <h1 className="text-3xl font-bold text-center ">{user.fullName}</h1>
          <button
            className=" px-5 py-2 bg-red-500 rounded-md text-white font-bold "
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>

        <div className=" w-full md:w-3/5 ">
          <p className="text-gray-800">{user.additionalInfo}</p>

          <div className="  flex flex-col ">
            <div className=" border-b-2 pb-4 my-2 ">
              <h2 className=" font-semibold text-black tracking-wider my-2 ">
                User Details
              </h2>
              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                <p className="text-gray-900">{user.email}</p>
                <p className="text-gray-700 font-semibold">
                  <span className=" font-semibold text-gray-900 ">Gender:</span>{" "}
                  {user.gender}
                </p>
                <p className="text-gray-700 font-semibold">
                  <span className=" font-semibold text-gray-900 ">
                    Date of Birth:
                  </span>{" "}
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className=" border-b-2 pb-4 my-2 ">
              <h2 className=" font-semibold text-black tracking-wider my-2 ">
                Institution
              </h2>
              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                <p className="text-gray-900">{user.affiliatedInstitution}</p>
                <p className="text-gray-700 font-semibold">
                  <span className=" font-semibold text-gray-900 ">
                    Category:
                  </span>{" "}
                  {user.category.name} - ₦
                  {user.category.amount.toLocaleString()}
                </p>
              </div>
            </div>

            <div className=" border-b-2 pb-4 my-2 ">
              <h2 className=" font-semibold text-black tracking-wider my-2 ">
                Others
              </h2>
              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                <p className="text-gray-700 font-semibold">
                  <span className=" font-semibold text-gray-900 ">
                    Shirt Size:
                  </span>{" "}
                  {user.shirtSize}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glassmorph bg-white p-4 rounded-lg shadow-md mb-5">
        <h3 className="text-lg font-medium">Status</h3>
        <p
          className={`text-md font-bold ${
            user.paid ? "text-green-600" : "text-red-500"
          }`}
        >
          {user.paid ? "Paid" : "Not Paid"}
        </p>

        {user.paid ? (
          <div className=" flex flex-col ">
            <div className="mt-2 p-3 bg-green-100 text-green-600 rounded-lg border-l-4 border-green-600">
              ✅ Payment Successful! You now have full access to the dashboard.
            </div>

            <div className=" flex flex-col ">
              <div className=" border-b-2 pb-4 my-2 ">
                <h2 className=" font-semibold text-black tracking-wider my-4 ">
                  Committee: {user.committee.name}
                </h2>
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                  <p className="text-gray-700 font-semibold">
                    <span className=" font-semibold text-gray-900 ">
                      State:
                    </span>{" "}
                    {user.committee.state}
                  </p>
                  <p className="text-gray-700 font-semibold">
                    <span className=" font-semibold text-gray-900 ">
                      Senatorial District:
                    </span>{" "}
                    {user.committee.senatorialDistrict}
                  </p>
                  <p className="text-gray-700 font-semibold">
                    <span className=" font-semibold text-gray-900 ">
                      Party:
                    </span>{" "}
                    {user.committee.party}
                  </p>
                </div>
              </div>

              <div className=" border-b-2 pb-4 my-2 text-center ">
                <h2 className=" font-semibold text-black tracking-wider my-2 ">
                  {user.committee.partyInfo.name} - (
                  {user.committee.partyInfo.abb})
                </h2>
                <h2 className=" my-2 ">{user.committee.partyInfo.ideology}</h2>

                <p className="text-gray-700 font-semibold">
                  <span className=" font-semibold text-gray-900 ">
                    Members:
                  </span>{" "}
                  {user.committee.partyInfo.members}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-2 p-3 bg-red-100 text-red-600 rounded-lg border-l-4 border-red-600 flex flex-col">
            ⚠ Warning: Your payment is pending. To view the complete dashboard,
            please make payment.{" "}
            <span className="font-bold cursor-pointer my-2">
              {payLoad ? (
                <button
                  className={`px-4 py-2 rounded 
                      : "bg-blue-200 text-white"
                  `}
                >
                  Loading.....
                </button>
              ) : (
                <button
                  onClick={proceed}
                  className={`px-4 py-2 rounded ${
                    payLoad
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  PAYMENT DEADLINE PASSED
                </button>
              )}
            </span>
            <h2 className=" text-blue-500 font-semibold my-2 ">
              If you have any issue with payment please reach out to{" "}
              <a href="mailto:" className=" underline font-bold text-blue-600 ">oloko.ayodele@lmu.edu.ng</a>
            </h2>
          </div>
        )}
      </div>

      <div className="glassmorph bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        <h3 className="text-lg font-medium mb-4">Transactions</h3>
        {user.Transactions.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 text-left text-sm font-medium">
                  Amount (₦)
                </th>
                <th className="p-2 text-left text-sm font-medium">Status</th>
                <th className="p-2 text-left text-sm font-medium">Reference</th>
                <th className="p-2 text-left text-sm font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {user.Transactions.sort(
                (a: any, b: any) =>
                  new Date(b.updatedAt).getTime() -
                  new Date(a.updatedAt).getTime()
              ).map((txn: any, index: number) => {
                // Determine row color based on status
                const rowClass =
                  txn.status.toLowerCase() === "successful"
                    ? "bg-green-100 text-green-700"
                    : txn.status.toLowerCase() === "pending"
                    ? "bg-yellow-50 text-yellow-700"
                    : "bg-red-100 text-red-700"; // Default for failed or other statuses

                return (
                  <tr key={index} className={`border-b ${rowClass}`}>
                    <td className="p-2 text-sm">
                      {txn.amount.toLocaleString()}
                    </td>
                    <td className="p-2 text-sm capitalize">{txn.status}</td>
                    <td className="p-2 text-sm">{txn.ref}</td>
                    <td className="p-2 text-sm">
                      {new Date(txn.updatedAt).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-700 font-semibold text-sm">
            No transactions found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
