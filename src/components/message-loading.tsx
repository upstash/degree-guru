import React from "react";
import cx from "@/utils/cx";
import { Avatar } from "@/components/message";

const MessageLoading: React.FC = () => {
  return (
    <article
      className={cx(
        "mb-2 flex items-center gap-4 p-4 md:p-5 rounded-2xl",
        "bg-emerald-50/80",
      )}
    >
      <Avatar />

      {/* https://github.com/n3r4zzurr0/svg-spinners/blob/main/svg-smil/3-dots-bounce.svg?short_path=50864c0 */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="text-emerald-800"
      >
        <circle cx="4" cy="12" r="2" fill="currentColor">
          <animate
            id="spinner_qFRN"
            begin="0;spinner_OcgL.end+0.25s"
            attributeName="cy"
            calcMode="spline"
            dur="0.6s"
            values="12;6;12"
            keySplines=".33,.66,.66,1;.33,0,.66,.33"
          />
        </circle>
        <circle cx="12" cy="12" r="2" fill="currentColor">
          <animate
            begin="spinner_qFRN.begin+0.1s"
            attributeName="cy"
            calcMode="spline"
            dur="0.6s"
            values="12;6;12"
            keySplines=".33,.66,.66,1;.33,0,.66,.33"
          />
        </circle>
        <circle cx="20" cy="12" r="2" fill="currentColor">
          <animate
            id="spinner_OcgL"
            begin="spinner_qFRN.begin+0.2s"
            attributeName="cy"
            calcMode="spline"
            dur="0.6s"
            values="12;6;12"
            keySplines=".33,.66,.66,1;.33,0,.66,.33"
          />
        </circle>
      </svg>
    </article>
  );
};

export default MessageLoading;
