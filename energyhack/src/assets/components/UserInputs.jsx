import React, { useState } from "react";

function UserInputs() {
        const [year, setYear] = useState("");
        const [make, setMake] = useState("");
        const [model, setModel] = useState("");

        return (
                <div className="w-[300px] h-[400px] -mt-40 p-4 bg-white rounded-[10px] border border-black">
                        <h2 className="text-lg font-bold mb-4">Car Information</h2>
                        <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="year">
                                        Year
                                </label>
                                <input
                                        type="text"
                                        id="year"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md"
                                />
                        </div>
                        <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="make">
                                        Make
                                </label>
                                <input
                                        type="text"
                                        id="make"
                                        value={make}
                                        onChange={(e) => setMake(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md"
                                />
                        </div>
                        <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="model">
                                        Model
                                </label>
                                <input
                                        type="text"
                                        id="model"
                                        value={model}
                                        onChange={(e) => setModel(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md"
                                />
                        </div>
                </div>
        );
}

export default UserInputs;