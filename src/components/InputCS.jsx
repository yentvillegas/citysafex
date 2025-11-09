function InputCS({lbl, ...props}) {
    return <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
         {lbl}
        </label>
        <input       
        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"       
        required
        {...props}
        />
    </div>
}
export default InputCS