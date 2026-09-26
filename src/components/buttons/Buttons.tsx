import type { RootObject } from "../../interfaces/dbData";


interface ButtonContent2Props {
  titleBtn?: string;
  linkBtn?: string;
  btnstyle?: string;
  gmbUrl?: boolean;
  data?: RootObject;
  onePage?: boolean;
}

const ButtonContent: React.FC<ButtonContent2Props> = ({
  titleBtn,
  linkBtn,
  btnstyle,
  gmbUrl,
  data,
  onePage,
}) => {
  return (
    <div>
      <a
        href={linkBtn ? linkBtn : (onePage ? `${`tel+1:${data?.dataGeneral.phones[0].number}`}` : "/contact")}


        target={linkBtn && gmbUrl ? "_blank" : "_self"}
        aria-label={titleBtn ? titleBtn : "Contact Us!"}
      >
        <button
          className=" text-center w-56 rounded-full h-14 relative text-black text-xl font-semibold group"
          type="button"
        >
          <div
            className="bg-primary rounded-full h-12 w-12 flex items-center justify-center group-hover:justify-end group-hover:pr-2 absolute left-1 top-[4px] group-hover:w-52 z-10 duration-500"
          >
            <i className="fa-solid fa-arrow-right text-white"></i>
          </div>
          <p className={`translate-x-3 group-hover:-translate-x-2 relative z-10 ${btnstyle ? btnstyle : "text-white"} group-hover:text-white`}>{titleBtn ? titleBtn : "Contact Us!"}</p>
        </button>
      </a>
    </div>
  );
};
export default ButtonContent;
