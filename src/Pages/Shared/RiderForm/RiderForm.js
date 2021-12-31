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
}) => {
  return (
    <div>
      <div className="mt-8">
        {/* join as rider */}
        <form
          className="flex flex-col space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              required
              className="form-input"
            />
          </div>
          <div>
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
          {/* License field */}
          <div>
            <div className="hover:bg-slate-200 cursor-pointer w-44 h-20 bg-white border rounded flex justify-center items-center">
              {license ? (
                <div className="relative hover:opacity-40">
                  <RiCloseCircleFill
                    onClick={() => setLicense(null)}
                    className="-inset-y-4 absolute inset-x-40 text-red-500 text-2xl hover:scale-110"
                  />
                  <img className="w-44 h-20 rounded" src={readLicense} alt="" />
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
        </form>
      </div>
    </div>
  );
};

export default RiderForm;
