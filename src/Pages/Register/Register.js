import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../Home/Header/Header";
import LessionForm from "../Shared/LessionForm/LessionForm";
import RiderForm from "../Shared/RiderForm/RiderForm";
import useAuth from "./../../Hooks/useAuth";

const Register = () => {
  const [signUpType, setSignUpType] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const { setError, signUp } = useAuth();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setError("");
  }, []);

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

  // default sign up type set
  useEffect(() => {
    setSignUpType("rider");
  }, []);

  useEffect(() => {
    setLicense(null);
    setProfile(null);
    setNid(null);
    setFinalNid("");
    setFinalProfile("");
    setFinalNid("");
    reset();
  }, [signUpType]);

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
    // check password
    if (data.password.length < 6) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 6 characters",
      });
    }
    // match two passwords
    if (data.password !== data.conf_pass) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password did not match",
      });
    }
    // verify age
    if (data.age.length > 2) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Age",
      });
    }
    if (
      data.vehicle_type.toLowerCase().trim() !== "car" &&
      data.vehicle_type.toLowerCase().trim() !== "bike"
    ) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Only Car and Bike is applicable",
      });
    }

    // check which type user you are
    if (signUpType === "rider") {
      data.profile = finalProfile;
      data.nid = finalNid;
      data.license = finalLicense;
      const finaldata = {
        profile: finalProfile,
        nid: finalNid,
        license: finalLicense,
        age: data.age,
        number: data.number,
        car_model: data.car_model,
        vehicle_type: data.vehicle_type,
        user_type: "rider",
      };

      signUp(
        data.email,
        data.password,
        data.name,
        data.profile,
        location,
        history,
        finaldata
      );

      console.log(finaldata);
    } else {
      data.profile = finalProfile;
      data.nid = finalNid;
      const finaldata = {
        profile: finalProfile,
        nid: finalNid,
        age: data.age,
        number: data.number,
        vehicle_type: data.vehicle_type,
        user_type: "learner",
        payment: "pending",
      };

      signUp(
        data.email,
        data.password,
        data.name,
        data.profile,
        location,
        history,
        finaldata
      );

      console.log(finaldata);
    }

    reset();
    setLicense(null);
    setProfile(null);
    setNid(null);
    setFinalNid(" ");
    setFinalProfile(" ");
    setFinalNid(" ");
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
            <div>
              <h1 className="text-5xl text-gray-700 lg:w-2/3 leading-snug w-full">
                Get ready to drive with us
              </h1>
              <p className="text-sm mt-4">
                Drive with Hero Rider. Earn on your schedule.
              </p>
            </div>

            {/* thumbnail of the page */}
            <div className="mt-20 w-[500px] mr-auto">
              <img
                src="https://i.postimg.cc/wjRkF1Mk/Cities-Home-Img2x.jpg"
                alt=""
              />
            </div>
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
                    checked={signUpType === "rider"}
                    readOnly
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
            {signUpType === "rider" ? (
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
            ) : (
              <LessionForm
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
