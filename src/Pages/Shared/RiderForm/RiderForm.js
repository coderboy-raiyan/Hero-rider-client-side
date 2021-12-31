import React from "react";
import { BsCloudUpload } from "react-icons/bs";
import { RiCloseCircleFill } from "react-icons/ri";

const RiderForm = ({
  onSubmit,
  handelLicence,
  register,
  handleSubmit,
  readLicense,
  setLicense,
  licenseRef,
  license,
  handelNid,
  readNid,
  nidRef,
  setNid,
  nid,
  setProfile,
  readProfile,
  profile,
  profileRef,
  handelProfile,
}) => {
  return (
    <div>
      <div className="mt-8">
        {/* join as rider */}
        <form
          className="flex flex-col space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              required
              className="form-input"
            />
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              required
              className="form-input"
            />
          </div>
          <div className="flex space-x-4">
            <input
              type="number"
              placeholder="Age"
              {...register("age")}
              required
              className="form-input"
            />
            <input
              type="text"
              placeholder="address"
              {...register("address")}
              required
              className="form-input"
            />
            <input
              type="number"
              title="Give a country code previous your number"
              placeholder="Number"
              {...register("number")}
              required
              className="form-input"
            />
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Car model"
              {...register("car_model")}
              required
              className="form-input"
            />
            <input
              type="text"
              placeholder="Bike/Car"
              {...register("vehicle_type")}
              required
              className="form-input"
            />
          </div>
          <div className="flex space-x-4">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              required
              className="form-input"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("conf_pass")}
              required
              className="form-input"
            />
          </div>
          <div className="flex space-x-4 flex-wrap">
            {/* ==============License field =======================*/}
            <div>
              <div className="hover:bg-slate-200 cursor-pointer w-44 h-20 bg-white border rounded flex justify-center items-center">
                {license ? (
                  <div className="relative hover:opacity-40">
                    <RiCloseCircleFill
                      onClick={() => setLicense(null)}
                      className="-inset-y-4 absolute inset-x-40 text-red-500 text-2xl hover:scale-110"
                    />
                    <img
                      className="w-44 h-20 rounded"
                      src={readLicense}
                      alt=""
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => licenseRef.current.click()}
                    className="flex flex-col space-y-2 items-center"
                  >
                    <BsCloudUpload className="text-2xl" />
                    <p className="text-xs">Upload your licence</p>
                  </div>
                )}
              </div>
              <input
                onChange={handelLicence}
                ref={licenseRef}
                type="file"
                hidden
              />
            </div>

            {/* ==================NID field ==========================*/}
            <div>
              <div className="hover:bg-slate-200 cursor-pointer w-44 h-20 bg-white border rounded flex justify-center items-center">
                {nid ? (
                  <div className="relative hover:opacity-40">
                    <RiCloseCircleFill
                      onClick={() => setNid(null)}
                      className="-inset-y-4 absolute inset-x-40 text-red-500 text-2xl hover:scale-110"
                    />
                    <img className="w-44 h-20 rounded" src={readNid} alt="" />
                  </div>
                ) : (
                  <div
                    onClick={() => nidRef.current.click()}
                    className="flex flex-col space-y-2 items-center"
                  >
                    <BsCloudUpload className="text-2xl" />
                    <p className="text-xs">Upload your NID</p>
                  </div>
                )}
              </div>
              <input onChange={handelNid} ref={nidRef} type="file" hidden />
            </div>
            {/* ==================Profile field ==========================*/}
            <div>
              <div className="hover:bg-slate-200 cursor-pointer w-44 h-20 bg-white border rounded flex justify-center items-center">
                {profile ? (
                  <div className="relative hover:opacity-40">
                    <RiCloseCircleFill
                      onClick={() => setProfile(null)}
                      className="-inset-y-4 absolute inset-x-40 text-red-500 text-2xl hover:scale-110"
                    />
                    <img
                      className="w-44 h-20 rounded"
                      src={readProfile}
                      alt=""
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => profileRef.current.click()}
                    className="flex flex-col space-y-2 items-center"
                  >
                    <BsCloudUpload className="text-2xl" />
                    <p className="text-xs">Upload your Profile</p>
                  </div>
                )}
              </div>
              <input
                onChange={handelProfile}
                ref={profileRef}
                type="file"
                hidden
              />
            </div>
          </div>

          <div>
            <button
              disabled={!profile || !nid || !license}
              className="disabled:opacity-75 disabled:bg-black disabled:hover:bg-black disabled:hover:text-white primary-btn rounded py-3 px-8 block w-full font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RiderForm;
