import ChipInput from "./components/ChipInput";

function App() {
  return (
    <div className="w-full h-full  flex justify-center">
      <div className="text-center">
        <div className="text-3xl text-blue-800 m-7">Pick Users</div>
        <ChipInput
          label={""}
          inputPlaceHolder={"Add new User"}
          options={[
            { name: "dsadasd1", email: "dsadasd.gmail.com" },
            { name: "mosam2", email: "mosam.gmail.com" },
            { name: "utsav3", email: "utsav.gmail.com" },
            { name: "dsadasd4", email: "dsadasd.gmail.com" },
            { name: "mosam5", email: "mosam.gmail.com" },
            { name: "utsav6", email: "utsav.gmail.com" },
            { name: "dsadasd7", email: "dsadasd.gmail.com" },
            { name: "mosam8", email: "mosam.gmail.com" },
            { name: "utsav9", email: "utsav.gmail.com" },
          ]}
        />
      </div>
    </div>
  );
}

export default App;
