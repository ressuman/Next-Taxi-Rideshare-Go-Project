export default function AutocompleteAddress() {
  return (
    <form>
      <div className="relative">
        <label className="text-gray-400 text-[13px]" htmlFor="start">
          Where From?
        </label>
        <input
          type="text"
          name="start"
          id="start"
          className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300 text-[14px]"
        />

        <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-20"></div>
      </div>

      <div className="relative">
        <label className="text-gray-400 text-[13px]" htmlFor="end">
          Where To?
        </label>
        <input
          type="text"
          name="end"
          id="end"
          className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300 text-[14px]"
        />

        <div
          className="shadow-md p-1 rounded-md
            absolute w-full bg-white"
        ></div>
      </div>
    </form>
  );
}
