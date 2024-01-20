import { IconBaseProps } from "../../types/types";

interface Props extends IconBaseProps {}

function EyeSlash({ className, onClick }: Props) {
  return (
    <div
      className={
        `${
          onClick
            ? "cursor-pointer hover:scale-110 hover:rotate-3 transition-all duration-300 "
            : " "
        }` + className
      }
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Password_toggle"
        data-name="Password toggle"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <g id="vuesax_outline_eye-slash" data-name="vuesax/outline/eye-slash">
          <g id="eye-slash">
            <path
              id="Vector"
              d="M1.8,7.61a.742.742,0,0,1-.53-.22A4.327,4.327,0,1,1,7.39,1.27a.748.748,0,0,1,0,1.06L2.33,7.39A.742.742,0,0,1,1.8,7.61ZM4.33,1.5A2.831,2.831,0,0,0,1.87,5.73L5.73,1.87A2.816,2.816,0,0,0,4.33,1.5Z"
              transform="translate(7.67 7.67)"
              fill="#292d32"
            />
            <path
              id="Vector-2"
              data-name="Vector"
              d="M4.135,15.53a.761.761,0,0,1-.49-.18,14.514,14.514,0,0,1-2.85-3.33,6.058,6.058,0,0,1,0-6C3.235,2.2,6.785,0,10.535,0a10.415,10.415,0,0,1,6.27,2.19.75.75,0,0,1-.9,1.2,8.9,8.9,0,0,0-5.37-1.89c-3.23,0-6.32,1.94-8.48,5.33a4.544,4.544,0,0,0,0,4.38,13.73,13.73,0,0,0,2.56,3,.756.756,0,0,1,.08,1.06A.726.726,0,0,1,4.135,15.53Z"
              transform="translate(1.465 2.98)"
              fill="#292d32"
            />
            <path
              id="Vector-3"
              data-name="Vector"
              d="M4.338,13.84a9.874,9.874,0,0,1-3.88-.8.748.748,0,1,1,.58-1.38,8.393,8.393,0,0,0,3.29.68c3.23,0,6.32-1.94,8.48-5.33a4.544,4.544,0,0,0,0-4.38,14.244,14.244,0,0,0-1.01-1.4.76.76,0,0,1,.11-1.06.75.75,0,0,1,1.06.11,15.893,15.893,0,0,1,1.11,1.54,6.058,6.058,0,0,1,0,6C11.638,11.64,8.088,13.84,4.338,13.84Z"
              transform="translate(7.662 7.18)"
              fill="#292d32"
            />
            <path
              id="Vector-4"
              data-name="Vector"
              d="M.754,4.311a.758.758,0,0,1-.74-.61.736.736,0,0,1,.6-.87A2.82,2.82,0,0,0,2.834.611a.758.758,0,0,1,.88-.6.751.751,0,0,1,.6.88,4.3,4.3,0,0,1-3.42,3.42A.655.655,0,0,0,.754,4.311Z"
              transform="translate(11.936 11.959)"
              fill="#292d32"
            />
            <path
              id="Vector-5"
              data-name="Vector"
              d="M.747,8.967a.742.742,0,0,1-.53-.22.754.754,0,0,1,0-1.06L7.687.218a.75.75,0,0,1,1.06,1.06l-7.47,7.47A.742.742,0,0,1,.747,8.967Z"
              transform="translate(1.253 13.783)"
              fill="#292d32"
            />
            <path
              id="Vector-6"
              data-name="Vector"
              d="M.747,8.968a.742.742,0,0,1-.53-.22.754.754,0,0,1,0-1.06L7.687.218a.75.75,0,0,1,1.06,1.06l-7.47,7.47A.742.742,0,0,1,.747,8.968Z"
              transform="translate(13.783 1.253)"
              fill="#292d32"
            />
            <path
              id="Vector-7"
              data-name="Vector"
              d="M0,0H24V24H0Z"
              fill="none"
              opacity="0"
            />
          </g>
        </g>
        <g id="vuesax_outline_eye" data-name="vuesax/outline/eye" opacity="0">
          <g id="eye">
            <path
              id="Vector-8"
              data-name="Vector"
              d="M4.33,8.66A4.33,4.33,0,1,1,8.66,4.33,4.332,4.332,0,0,1,4.33,8.66Zm0-7.16A2.83,2.83,0,1,0,7.16,4.33,2.834,2.834,0,0,0,4.33,1.5Z"
              transform="translate(7.67 7.67)"
              fill="#292d32"
            />
            <path
              id="Vector-9"
              data-name="Vector"
              d="M10.545,18.04c-3.76,0-7.31-2.2-9.75-6.02a6.058,6.058,0,0,1,0-6C3.245,2.2,6.8,0,10.545,0s7.3,2.2,9.74,6.02a6.058,6.058,0,0,1,0,6C17.845,15.84,14.3,18.04,10.545,18.04Zm0-16.54c-3.23,0-6.32,1.94-8.48,5.33a4.544,4.544,0,0,0,0,4.38c2.16,3.39,5.25,5.33,8.48,5.33s6.32-1.94,8.48-5.33a4.544,4.544,0,0,0,0-4.38C16.865,3.44,13.775,1.5,10.545,1.5Z"
              transform="translate(1.455 2.98)"
              fill="#292d32"
            />
            <path
              id="Vector-10"
              data-name="Vector"
              d="M0,0H24V24H0Z"
              fill="none"
              opacity="0"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default EyeSlash;
