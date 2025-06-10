import { FaShoppingCart } from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaTags } from "react-icons/fa6";
import { BsFillShieldLockFill } from "react-icons/bs";

const Feature = () => {
  const features = [
    {
      icon: <FaShoppingCart className="text-4xl text-red-400" />,
      title: "Free Delivery",
      details: "Get Your Order Without Any Extra Delivery Charge",
    },
    {
      icon: <VscWorkspaceTrusted className="text-4xl text-red-400" />,
      title: "Quality guarantee",
      details: "Get Your Order Without Any Extra Delivery Charge",
    },
    {
      icon: <FaTags className="text-4xl text-red-400" />,
      title: "Daily offers",
      details: "Get Your Order Without Any Extra Delivery Charge",
    },
    {
      icon: <BsFillShieldLockFill className="text-4xl text-red-400" />,
      title: "100% secure payment",
      details: "Get Your Order Without Any Extra Delivery Charge",
    },
  ];

  return (
    <section className="px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {feature.icon}
            <h3 className="text-lg font-semibold mt-2">{feature.title}</h3>
            <p className="text-gray-500 text-sm">
              {feature.details}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
