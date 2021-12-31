import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../Home/Header/Header";
import RiderForm from "../Shared/RiderForm/RiderForm";

const Register = () => {
  const [signUpType, setSignUpType] = useState("");
  const { register, handleSubmit, reset } = useForm();
  // all license states
  const [license, setLicense] = useState(null);
  const [finalLicense, setFinalLicense] = useState("");
  const [readLicense, setreadLicense] = useState(null);
  const licenseRef = useRef();

  // all states for NId
  const [nid, setNid] = useState(null);
  const [finalNid, setFinalNid] = useState("");
  const [readNid, setreadNid] = useState(null);
  const nidRef = useRef();

  // all states for Profile
  const [profile, setProfile] = useState(null);
  const [finalProfile, setFinalProfile] = useState("");
  const [readProfile, setreadProfile] = useState(null);
  const profileRef = useRef();

  // upload license
  useEffect(() => {
    if (license) {
      const formData = new FormData();
      formData.append("image", license);
      axios({
        method: "post",
        url: "https://api.imgbb.com/1/upload?key=b8e0c953a6b98e5a101ba8a93b2ceb77",
        data: formData,
      }).then((data) => setFinalLicense(data.data.data.url));
    }
  }, [license]);

  // upload Nid picture
  useEffect(() => {
    if (nid) {
      const formData = new FormData();
      formData.append("image", nid);
      axios({
        method: "post",
        url: "https://api.imgbb.com/1/upload?key=b8e0c953a6b98e5a101ba8a93b2ceb77",
        data: formData,
      }).then((data) => setFinalNid(data.data.data.url));
    }
  }, [nid]);

  // upload profile picture
  useEffect(() => {
    if (profile) {
      const formData = new FormData();
      formData.append("image", profile);
      axios({
        method: "post",
        url: "https://api.imgbb.com/1/upload?key=b8e0c953a6b98e5a101ba8a93b2ceb77",
        data: formData,
      }).then((data) => setFinalProfile(data.data.data.url));
    }
  }, [profile]);

  // get license picture
  const handelLicence = (e) => {
    setLicense(e.target.files[0]);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setreadLicense(readerEvent.target.result);
    };
  };

  // get Nid picture
  const handelNid = (e) => {
    setNid(e.target.files[0]);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setreadNid(readerEvent.target.result);
    };
  };

  // get profile picture
  const handelProfile = (e) => {
    setProfile(e.target.files[0]);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setreadProfile(readerEvent.target.result);
    };
  };

  // final submit function
  const onSubmit = (data) => {
    console.log(data, finalNid, "Pro", finalProfile, "Li", finalLicense);
  };

  const handelOption = (e) => {
    setSignUpType(e.target.value);
  };

  return (
    <>
      <Header />

      <div>
        <div className="lg:max-w-6xl lg:mx-auto max-w-3xl mx-4 grid lg:grid-cols-2 grid-cols-1 transition-all my-20">
          {/* description */}
          <div>
            <h1 className="text-5xl text-gray-700 lg:w-2/3 leading-snug w-full">
              Get ready to drive with us
            </h1>
            <p className="text-sm mt-4">
              Drive with Hero Rider. Earn on your schedule.
            </p>
          </div>

          {/* sign up two ways */}
          <div>
            {/* title */}
            <h1 className="text-2xl font-medium mb-4">Sign up Now</h1>

            {/* which type sign up */}

            <div>
              <ul className="flex items-center space-x-8 flex-wrap">
                <li>
                  <input
                    onClick={handelOption}
                    type="radio"
                    id="rider"
                    name="rider"
                    value="rider"
                  />
                  <label className="cursor-pointer ml-2" htmlFor="rider">
                    Join as a rider
                  </label>
                </li>
                <li>
                  <input
                    onClick={handelOption}
                    type="radio"
                    id="learner"
                    name="rider"
                    value="learner"
                  />
                  <label className="cursor-pointer ml-2" htmlFor="learner">
                    Join as a driving lesson learner
                  </label>
                </li>
              </ul>
            </div>

            {/* Sign up fields */}
            <RiderForm
              onSubmit={onSubmit}
              handelLicence={handelLicence}
              handelNid={handelNid}
              register={register}
              handleSubmit={handleSubmit}
              readLicense={readLicense}
              licenseRef={licenseRef}
              readNid={readNid}
              nidRef={nidRef}
              nid={nid}
              setNid={setNid}
              setLicense={setLicense}
              license={license}
              setProfile={setProfile}
              readProfile={readProfile}
              profile={profile}
              profileRef={profileRef}
              handelProfile={handelProfile}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
