import {useEffect}from "react";
import { User, Mail, Phone } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const MyProfilePage = () => {
  const { user } = useAuth();

  const avatarUrl = `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=FB923C&color=fff&size=256`;
  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, []);
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-center">
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-md"
            />
            <h2 className="mt-4 text-xl font-semibold text-white">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-orange-100 text-sm">My Account</p>
          </div>

          {/* Details */}
          <div className="p-6 space-y-4">
            <ProfileItem
              icon={<User />}
              label="Full Name"
              value={`${user?.firstName} ${user?.lastName}`}
            />

            <ProfileItem
              icon={<Mail />}
              label="Email"
              value={user?.email}
            />

            <ProfileItem
              icon={<Phone />}
              label="Phone"
              value={user?.phone || "Not added"}
            />

            {/* Future Edit Button */}
            <button
              disabled
              className="w-full mt-4 bg-gray-200 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed"
            >
              Edit Profile (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
    <div className="text-orange-600">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

export default MyProfilePage;
