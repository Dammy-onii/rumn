interface ICustomInput {
  title: string;
  icon?: string;
  placeholder: string;
  name?: string;
  inputType?: string;
  value?: string;
  error?: string;
  onChange?: (param?: any) => void;
  onBlur?: (param?: any) => void;
  hidden?: string;
}

interface ICustomPanel {
  image?: string;
  name: string;
  selected?: boolean;
}

interface SelectInputProps {
  name: string;
  value: string;
  label: string;
  options: { label: string; value: string }[];
  icon: string;
  error?: string;
  onChange: (param?: any) => void;
  onBlur: (param?: any) => void;
  setFieldValue: (field: string, value: any) => void;
}

const CustomInput = ({
  title,
  icon,
  placeholder,
  inputType,
  name,
  value,
  error,
  onChange,
  onBlur,
  hidden,
}: ICustomInput) => {

  // useEffect(() => {
  //   // Only retrieve the email from sessionStorage if the name is "email"
  //   if (name === "email") {
  //     const savedEmail = sessionStorage.getItem(name);
  //     if (savedEmail) {
  //       // Set the value to the stored email from sessionStorage
  //       value = savedEmail;
  //     }
  //   }
  // }, [name]);



  return (
    <div className={` w-full flex flex-col my-1  ${hidden} `}>
      <h2 className=" font-light text  ">{title}</h2>
      <div className=" w-full flex flex-row border-2 border-gray-400 items-center px-1 py-1 rounded-xl hover:border-yellow-500 active:border-yellow-500  ">
        <span className="material-symbols-outlined font-extralight px-2 border-r-2 border-gray-600">
          {icon}
        </span>
        <input
          type={inputType}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="  outline-none bg-inherit rounded  px-2 py-[5px] w-full "
        />
      </div>

      {error && <h3 className=" text-xs text-[red] ">{error}</h3>}
    </div>
  );
};

const CustomPanel = ({ image, name, selected = false }: ICustomPanel) => {
  return (
    <div
      className={`flex flex-col shadow-lg rounded-lg overflow-hidden items-center px-3 py-2 transition-shadow duration-300 ${
        selected
          ? "border-4 border-green-500 bg-blue-50 shadow-2xl scale-105"
          : "hover:shadow-2xl"
      }`}
    >
      <img
        src={image}
        alt={name}
        className="h-96 w-80 bg-gray-200 object-cover rounded-lg"
      />
      <h2
        className={`text-xl my-2 ${selected ? "text-green-500 font-bold" : ""}`}
      >
        {name}
      </h2>
    </div>
  );
};

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  value,
  label,
  options,
  icon,
  error,
  setFieldValue,
  onBlur,
}) => {
  return (
    <div className="w-full flex flex-col my-1">
      <h2 className="font-light">{label}</h2>
      <div className="w-full flex flex-row border-2 border-gray-400 items-center px-1 py-1 rounded-xl hover:border-yellow-500 active:border-yellow-500">
        <span className="material-symbols-outlined font-extralight px-2 border-r-2 border-gray-600">
          {icon}
        </span>
        <select
          name={name}
          value={value || ""}
          onChange={(e) => setFieldValue(name, e.target.value)} // Ensure Formik updates state
          onBlur={onBlur}
          className="outline-none bg-inherit rounded px-2 py-[5px] w-full"
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <h3 className="text-xs text-[red]">{error}</h3>}
    </div>
  );
};


export { CustomInput, CustomPanel, SelectInput };
