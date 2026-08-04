type PlanLimit = {
  categoryName?: string;
  categoryCode?: string;
  remaining?: number;
  usedValue?: number;
  limitValue?: number;
};

type PlanData = {
  planName?: string;
  status?: string;
  limits?: PlanLimit[];
};

interface SubsProps {
  planData?: PlanData | null;
  remainingDays?: number | null;
  isOpen: boolean;
  onClose: () => void;
}
export default function SubscriptionDets({
  planData,
  remainingDays,
  isOpen,
  onClose,
}: SubsProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-20 right-4 z-50 w-80 sm:w-96">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-linear-to-r from-[#007381] to-[#0a8c9c] px-4 py-3 flex justify-between items-center">
          <h3 className="text-white font-semibold text-sm">
            Subscription Details
          </h3>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-yellow-500 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="bg-gray-50 border border-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg shadow-sm w-full">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  Subscription Plan
                </span>
                <span className="text-lg font-bold text-[#007381]">
                  {planData?.planName || "Loading..."}
                </span>
              </div>

              <div className="mt-2 pt-2 border-t border-gray-200">
                {remainingDays !== null && remainingDays !== undefined ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Time remaining:
                    </span>
                    {remainingDays > 0 ? (
                      <span className="text-lg font-bold text-green-600">
                        {remainingDays} {remainingDays === 1 ? "day" : "days"}
                      </span>
                    ) : (
                      <span className="text-lg font-bold text-red-500">
                        Expired
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className="text-lg font-bold text-green-600">
                      {planData?.status || "Active"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {planData?.limits &&
              Array.isArray(planData?.limits) &&
              planData?.limits.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg shadow-sm w-full mt-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-600 mb-3">
                      Paper Limits
                    </span>
                    <div className="flex flex-col gap-3">
                      {planData?.limits.map((limit: PlanLimit, index: number) => {
                        const usedValue = limit.usedValue ?? 0;
                        const limitValue = limit.limitValue ?? 0;
                        const isExhausted =
                          limit.remaining === 0 ||
                          (limitValue > 0 && usedValue >= limitValue);
                        return (
                          <div
                            key={index}
                            className={`flex flex-col gap-1 ${
                              isExhausted ? "bg-red-50/50 p-2 rounded-lg" : ""
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-700 text-sm">
                                {limit.categoryName ||
                                  limit.categoryCode ||
                                  `Category ${index + 1}`}
                              </span>
                              <span className="text-xs text-gray-500">
                                {usedValue} / {limit.limitValue ?? "N/A"}
                              </span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  isExhausted ? "bg-red-500" : "bg-[#007381]"
                                }`}
                                style={{
                                  width: `${
                                    limitValue
                                      ? (usedValue / limitValue) * 100
                                      : 0
                                  }%`,
                                }}
                              />
                            </div>

                            {limit.remaining !== undefined && (
                              <span
                                className={`text-xs font-medium ${
                                  isExhausted
                                    ? "text-red-600"
                                    : "text-green-600"
                                }`}
                              >
                                {limit.remaining} left
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
