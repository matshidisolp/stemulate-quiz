import logoUrl from "../../assets/Logo.svg";

export default function Logo ({ className = "w-10 h-10" }) {
    return (
        <img
          src={logoUrl}
          alt="Quiz App logo"
          className={className}
        />
    );
}