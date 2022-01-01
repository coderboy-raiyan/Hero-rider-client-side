import React, { useEffect, useState } from "react";
import useAuth from "./../../../Hooks/useAuth";
import Header from "./../Header/Header";

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, [user]);

  console.log(userData.user_type);

  return (
    <>
      <Header />

      <div className="lg:max-w-6xl lg:mx-auto max-w-3xl mx-4 my-8">
        <div className="col-span-2 lg:w-2/3 flex flex-col justify-center items-start space-x-8 border  bg-white shadow-lg py-8 space-y-5 rounded">
          <div className="w-full border-b">
            <h1 className="text-2xl font-semibold px-4 pb-2">My Profile</h1>
          </div>
          {/* all data of profile */}
          <div className="flex space-x-8">
            <div>
              <div>
                <img
                  className="w-36 rounded-full"
                  src={user?.photoURL}
                  alt=""
                />
              </div>
            </div>
            {/* all descriptions */}
            <ul className="space-y-3">
              <li>
                <span className="text-xs font-semibold text-gray-400 flex">
                  Full Name
                </span>
                {user?.displayName}
              </li>
              <li>
                {" "}
                <span className="text-xs font-semibold text-gray-400 flex">
                  Email
                </span>
                {user.email}
              </li>
              <li>
                {" "}
                <span className="text-xs font-semibold text-gray-400 flex">
                  Phone number
                </span>
                {userData?.number}
              </li>
            </ul>
          </div>
        </div>

        {/* Only for learners offer */}
        {/* If leaner need two packages */}

        {userData?.user_type === "learner" && (
          <div class="flex lg:space-x-8 mt-8 lg:flex-row flex-col space-y-4 lg:space-y-0">
            <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
              <h2 class="text-sm tracking-widest title-font mb-1 font-medium">
                START
              </h2>
              <h1 class="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                CAR $200
              </h1>
              <p class="flex items-center text-gray-600 mb-2">
                All modern support
              </p>
              <p class="flex items-center text-gray-600 mb-2">Great Teacher</p>
              <p class="flex items-center text-gray-600 mb-6">
                With 24/7 support
              </p>
              <button class="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">
                Buy Now
              </button>
              <p class="text-xs text-gray-500 mt-3">
                Literally you probably haven't heard this type of offer
              </p>
            </div>

            {/* Bike */}
            <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
              <h2 class="text-sm tracking-widest title-font mb-1 font-medium">
                START
              </h2>
              <h1 class="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                Bike $100
              </h1>
              <p class="flex items-center text-gray-600 mb-2">
                All modern support
              </p>
              <p class="flex items-center text-gray-600 mb-2">Great Teacher</p>
              <p class="flex items-center text-gray-600 mb-6">
                With 24/7 support
              </p>
              <button class="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">
                Buy Now
              </button>
              <p class="text-xs text-gray-500 mt-3">
                Literally you probably haven't heard this type of offer
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
