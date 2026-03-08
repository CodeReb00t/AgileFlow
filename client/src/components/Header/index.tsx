type Props = {
  name: string;
  buttonComponent?: any;
  isSmallText?: boolean;
};
const Header = ({ name, buttonComponent, isSmallText = false }: Props) => {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h1
        className={`${isSmallText ? "text-lg" : "text-2xl"} font-bold text-gray-900 dark:text-gray-100`}
      >
        {name}
      </h1>
      {buttonComponent}
    </div>
  );
};
export default Header;
