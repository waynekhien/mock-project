import React from 'react';

const PurchasePolicy: React.FC = () => {
  const policies = [
    {
      icon: "https://salt.tikicdn.com/ts/upload/c5/37/ee/76c708d43e377343e82baee8a0340297.png",
      title: "Được đồng kiểm khi nhận hàng",
      alt: "inspection-icon"
    },
    {
      icon: "https://salt.tikicdn.com/ts/upload/ea/02/b4/b024e431ec433e6c85d4734aaf35bd65.png",
      title: "Được hoàn tiền 200%",
      subtitle: "nếu là hàng giả.",
      alt: "refund-icon"
    },
    {
      icon: "https://salt.tikicdn.com/ts/upload/d8/c7/a5/1cd5bd2f27f9bd74b2c340b8e27c4d82.png",
      title: "Đổi trả miễn phí trong 30 ngày. Được đổi ý.",
      subtitle: "Chi tiết",
      hasLink: true,
      alt: "return-icon"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="text-lg font-semibold text-gray-900">
          An tâm mua sắm
        </div>
      </div>

      {/* Policy Details */}
      <div className="p-4 space-y-4">
        {policies.map((policy, index) => (
          <div key={index} className="flex items-start space-x-3">
            <img 
              src={policy.icon}
              alt={policy.alt}
              width={20}
              height={20}
              className="w-5 h-5 mt-0.5 flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex flex-col">
                <span className="text-sm text-gray-700">
                  {policy.title.includes("200%") ? (
                    <>
                      <span className="font-semibold">Được hoàn tiền 200%</span>
                      {policy.subtitle && <span> {policy.subtitle}</span>}
                    </>
                  ) : (
                    policy.title
                  )}
                </span>
                {policy.hasLink && policy.subtitle && (
                  <button className="text-sm text-blue-600 hover:text-blue-800 underline text-left w-fit mt-1">
                    {policy.subtitle}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchasePolicy;

