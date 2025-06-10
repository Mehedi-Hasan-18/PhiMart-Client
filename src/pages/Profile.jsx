import { useForm } from "react-hook-form";
import ProfileForm from "../components/DashBoard/Profile/ProfileForm";
import ProfileButtons from "../components/DashBoard/Profile/ProfileButtons";
import { useEffect, useState } from "react";
import PasswordChangeForm from "../components/DashBoard/Profile/ProfileChangeForm";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlret from "../components/ErrorAlret";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUserProfile,changePassword ,errorMsg} = useAuthContext();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors ,isSubmitting},
  } = useForm();

  useEffect(() => {
    Object.keys(user).forEach((key) => setValue(key, user[key]));
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const profilePayLoad = {
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        phone_number: data.phone_number,
      };

      await updateUserProfile(profilePayLoad);

      if(data.current_password && data.new_password){
        await changePassword({current_password:data.current_password, new_password: data.new_password})
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl">
      <div className="card-body">
        {errorMsg && <ErrorAlret error={errorMsg}></ErrorAlret>} 
        <h2 className="card-title text-2xl mb-4">Profile Information</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ProfileForm
            register={register}
            errors={errors}
            isEditing={isEditing}
            user={user}
          />

          <PasswordChangeForm
            isEditing={isEditing}
            register={register}
            errors={errors}
            watch={watch}
          ></PasswordChangeForm>

          <ProfileButtons isEditing={isEditing} setIsEditing={setIsEditing} isSubmitting={isSubmitting} />
        </form>
      </div>
    </div>
  );
};

export default Profile;
